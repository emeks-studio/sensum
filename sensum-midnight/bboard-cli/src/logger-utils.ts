import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import pinoPretty from 'pino-pretty';
import pino from 'pino';
import { createWriteStream } from 'node:fs';

export const createLogger = async (logPath: string): Promise<pino.Logger> => {
  await fs.mkdir(path.dirname(logPath), { recursive: true });
  const pretty: pinoPretty.PrettyStream = pinoPretty({
    colorize: true,
    sync: true,
  });
  const level = 'info' as const;
  return pino(
    {
      level,
      depthLimit: 20,
    },
    pino.multistream([
      { stream: pretty, level: 'info' },
      { stream: createWriteStream(logPath), level },
    ]),
  );
};
