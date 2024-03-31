import path from 'node:path';
import {
  networkId,
  setNetworkId,
  toLedgerNetworkId,
  toRuntimeNetworkId,
  toZswapNetworkId,
} from '@midnight-ntwrk/midnight-js-network-id';
import * as zswap from '@midnight-ntwrk/zswap';
import * as runtime from '@midnight-ntwrk/compact-runtime';
import * as ledger from '@midnight-ntwrk/ledger';

export interface Config {
  readonly privateStateStoreName: string;
  readonly logDir: string;
  readonly zkConfigPath: string;
  readonly indexer: string;
  readonly indexerWS: string;
  readonly node: string;
  readonly proofServer: string;

  setNetworkId: () => void;
}

export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');

export class DevnetRemoteConfig implements Config {
  privateStateStoreName = 'bboard-private-state';
  logDir = path.resolve(currentDir, '..', 'logs', 'devnet-remote', `${new Date().toISOString()}.log`);
  zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'dist', 'managed', 'bboard');
  indexer = 'https://pubsub.devnet-midnight.network:443/api/v1/graphql';
  indexerWS = 'wss://pubsub.devnet-midnight.network:443/api/v1/graphql/ws';
  node = 'https://alb-node-peer-1.devnet-midnight.network:9944';
  proofServer = 'http://127.0.0.1:6300';
  setNetworkId() {
    const theNetworkId = networkId.devnet;
    setNetworkId(theNetworkId);
    zswap.setNetworkId(toZswapNetworkId(theNetworkId));
    runtime.setNetworkId(toRuntimeNetworkId(theNetworkId));
    ledger.setNetworkId(toLedgerNetworkId(theNetworkId));
  }
}

export class DevnetLocalConfig implements Config {
  privateStateStoreName = 'bboard-private-state';
  logDir = path.resolve(currentDir, '..', 'logs', 'devnet-local', `${new Date().toISOString()}.log`);
  zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'dist', 'managed', 'bboard');
  indexer = 'http://127.0.0.1:8088/api/v1/graphql';
  indexerWS = 'ws://127.0.0.1:8088/api/v1/graphql/ws';
  node = 'http://127.0.0.1:9944';
  proofServer = 'http://127.0.0.1:6300';
  setNetworkId() {
    const theNetworkId = networkId.devnet;
    setNetworkId(theNetworkId);
    zswap.setNetworkId(toZswapNetworkId(theNetworkId));
    runtime.setNetworkId(toRuntimeNetworkId(theNetworkId));
    ledger.setNetworkId(toLedgerNetworkId(theNetworkId));
  }
}

export class StandaloneConfig implements Config {
  privateStateStoreName = 'bboard-private-state';
  logDir = path.resolve(currentDir, '..', 'logs', 'standalone', `${new Date().toISOString()}.log`);
  zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'dist', 'managed', 'bboard');
  indexer = 'http://127.0.0.1:8088/api/v1/graphql';
  indexerWS = 'ws://127.0.0.1:8088/api/v1/graphql/ws';
  node = 'http://127.0.0.1:9944';
  proofServer = 'http://127.0.0.1:6300';
  setNetworkId() {
    const theNetworkId = networkId.undeployed;
    setNetworkId(theNetworkId);
    zswap.setNetworkId(toZswapNetworkId(theNetworkId));
    runtime.setNetworkId(toRuntimeNetworkId(theNetworkId));
    ledger.setNetworkId(toLedgerNetworkId(theNetworkId));
  }
}

export class QaRemoteConfig implements Config {
  privateStateStoreName = 'bboard-private-state';
  logDir = path.resolve(currentDir, '..', 'logs', 'qa-remote', `${new Date().toISOString()}.log`);
  zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'dist', 'managed', 'bboard');
  indexer = 'https://pubsub-qa.devnet-midnight.network:443/api/v1/graphql';
  indexerWS = 'wss://pubsub-qa.devnet-midnight.network:443/api/v1/graphql/ws';
  node = 'https://alb-node-peer-1-qa.devnet-midnight.network:9944';
  proofServer = 'http://127.0.0.1:6300';
  setNetworkId() {
    const theNetworkId = networkId.devnet;
    setNetworkId(theNetworkId);
    zswap.setNetworkId(toZswapNetworkId(theNetworkId));
    runtime.setNetworkId(toRuntimeNetworkId(theNetworkId));
    ledger.setNetworkId(toLedgerNetworkId(theNetworkId));
  }
}

export class JadeRemoteConfig implements Config {
  privateStateStoreName = 'bboard-private-state';
  logDir = path.resolve(currentDir, '..', 'logs', 'jade-remote', `${new Date().toISOString()}.log`);
  zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'dist', 'managed', 'bboard');
  indexer = 'https://pubsub.jade.midnight.network/api/v1/graphql';
  indexerWS = 'wss://pubsub.jade.midnight.network/api/v1/graphql/ws';
  node = 'http://node-01.jade.midnight.network:9944';
  proofServer = 'http://127.0.0.1:6300';
  setNetworkId() {
    const theNetworkId = networkId.devnet;
    setNetworkId(theNetworkId);
    zswap.setNetworkId(toZswapNetworkId(theNetworkId));
    runtime.setNetworkId(toRuntimeNetworkId(theNetworkId));
    ledger.setNetworkId(toLedgerNetworkId(theNetworkId));
  }
}
