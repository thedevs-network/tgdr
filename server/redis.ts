import { promisify } from 'util';
import * as redis from 'redis';

const client = redis.createClient();

export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);
export const del = promisify(client.del).bind(client);
