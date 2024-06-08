import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type DeployedContract, type StateWithZswap } from '@midnight-ntwrk/midnight-js-contracts';
import type { SensumPrivateState, Contract, Witnesses } from 'sensum-contract';

export type PrivateStates = {
  sensumPrivateState: SensumPrivateState;
};

export type SensumProviders =
  MidnightProviders<'praise_the_sun' | 'cosmic_ballet' | 'transmit' | 'im_blessed', PrivateStates>;

export type SensumContract = Contract<
  StateWithZswap<SensumPrivateState>,
  Witnesses<StateWithZswap<SensumPrivateState>>
>;

export type DeployedSensumContract = DeployedContract<PrivateStates, 'sensumPrivateState', SensumContract>;
