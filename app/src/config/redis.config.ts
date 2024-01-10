export const getRedisConfig = (password: string, host: string, port: string) =>
  `redis://${host}:${port}`;
