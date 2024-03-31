import { createLogger } from './logger-utils.js';
import { run } from './index.js';
import { DevnetRemoteConfig } from './config';

const config = new DevnetRemoteConfig();
config.setNetworkId();
const logger = await createLogger(config.logDir);
await run(config, logger);
