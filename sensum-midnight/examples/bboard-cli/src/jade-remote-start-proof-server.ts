import { createLogger } from './logger-utils.js';
import { run } from './index.js';
import { currentDir, JadeRemoteConfig } from './config.js';
import { DockerComposeEnvironment, Wait } from 'testcontainers';
import path from 'node:path';

const config = new JadeRemoteConfig();
config.setNetworkId();
const dockerEnv = new DockerComposeEnvironment(path.resolve(currentDir, '..'), 'proof-server.yml').withWaitStrategy(
  'proof-server',
  Wait.forLogMessage('Actix runtime found; starting in Actix runtime', 1),
);
const logger = await createLogger(config.logDir);
await run(config, logger, dockerEnv);
