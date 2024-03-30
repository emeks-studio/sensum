import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type DeployedContract, type StateWithZswap } from '@midnight-ntwrk/midnight-js-contracts';
import type { BBoardPrivateState, Contract, Witnesses } from '@midnight-ntwrk/bboard-contract';

export type PrivateStates = {
  bboardPrivateState: BBoardPrivateState;
};

export type BBoardProviders = MidnightProviders<'post' | 'take_down', PrivateStates>;

export type BBoardContract = Contract<
  StateWithZswap<BBoardPrivateState>,
  Witnesses<StateWithZswap<BBoardPrivateState>>
>;

export type DeployedBBoardContract = DeployedContract<PrivateStates, 'bboardPrivateState', BBoardContract>;
