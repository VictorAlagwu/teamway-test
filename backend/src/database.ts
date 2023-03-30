import { Client } from 'redis-om';
// import * as fs from 'fs'

const url = process.env.REDIS_URL

const client: Client = new Client();

const redisConnect = async () => {
  if (!client.isOpen()) {
    await client.open(url);
  }

  console.log(await client.execute(["PING", "Redis server running"]));
};

redisConnect();

export default client;
