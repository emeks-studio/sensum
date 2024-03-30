import { createLogger } from './logger-utils.js';
import { run } from './index.js';
import { JadeRemoteConfig } from './config';

const config = new JadeRemoteConfig();
config.setNetworkId();
const logger = await createLogger(config.logDir);
await run(config, logger);
