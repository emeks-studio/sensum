/*
 * This file defines the shape of the sensum's private state,
 * as well as the two witness function that accesses it.
 */

import { Ledger } from './managed/sensum/contract/index.cjs';
import { MerkleTreePath, WitnessContext } from '@midnight-ntwrk/compact-runtime';

/* **********************************************************************
 * The only hidden state needed by the sensum contract is
 * the user's secret key.  Some of the library code and
 * compiler-generated code is parameterized by the type of our
 * private state, so we define a type for it and a function to
 * make an object of that type.
 */

export type SensumPrivateState = {
  readonly secretKey: Uint8Array;
};

export const createSensumPrivateState = (secretKey: Uint8Array) => ({
  secretKey,
});

/* **********************************************************************
 * The witnesses object for the sensum contract is an object
 * with a field for each witness function, mapping the name of the function
 * to its implementation.
 *
 * The implementation of each function always takes as its first argument
 * a value of type WitnessContext<L, PS>, where L is the ledger object type
 * that corresponds to the ledger declaration in the Compact code, and PS
 * is the private state type, like SensumPrivateState defined above.
 *
 * A WitnessContext has three
 * fields:
 *  - ledger: T
 *  - privateState: PS
 *  - contractAddress: string
 *
 * The other arguments (after the first) to each witness function
 * correspond to the ones declared in Compact for the witness function.
 * The function's return value is a tuple of the new private state and
 * the declared return value. In this case, that's a SensumPrivateState
 * and a Uint8Array (because the contract declared a return value of Bytes[32],
 * and that's a Uint8Array in TypeScript).
 *
 * The secret_key witness does not need the ledger or contractAddress
 * from the WitnessContext, so it uses the parameter notation that puts
 * only the binding for the privateState in scope.
 * 
 * Question:
 * > The function's return value is a tuple of the new private state and
 *   the declared return value.
 * ^ Why there is a "new" private state returned?
 */
export const witnesses = {
  secret_key: ({ privateState }: WitnessContext<Ledger, SensumPrivateState>): [SensumPrivateState, Uint8Array] => [
    privateState, 
    privateState.secretKey,
  ],
  find_auth_path: ({ledger, privateState} : WitnessContext<Ledger,SensumPrivateState>, pk: Uint8Array): [SensumPrivateState, MerkleTreePath<Uint8Array>] => [
    privateState,
    ledger.authorizedCommitments.findPathForLeaf(pk)!,
  ],
};