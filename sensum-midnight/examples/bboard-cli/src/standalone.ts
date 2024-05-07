import { createLogger } from './logger-utils.js';
import { run } from './index.js';
import { StandaloneConfig } from './config.js';

const config = new StandaloneConfig();
config.setNetworkId();
const logger = await createLogger(config.logDir);
await run(config, logger);