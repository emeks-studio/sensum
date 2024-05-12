export const toHex = (bytes: Uint8Array): string => Buffer.from(bytes).toString('hex');

export const fromHex = (str: string): Uint8Array => Buffer.from(str, 'hex');