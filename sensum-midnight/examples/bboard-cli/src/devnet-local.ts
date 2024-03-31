import { createLogger } from './logger-utils.js';
import { run } from './index.js';
import { DevnetLocalConfig } from './config';

const config = new DevnetLocalConfig();
config.setNetworkId();
const logger = await createLogger(config.logDir);
await run(config, logger);
