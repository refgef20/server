import { createClient } from "redis";
import "dotenv/config";

const redis = createClient({ url: process.env.REDIS_URL });

redis.on("error", (error) => {
  console.error(`Произошла непредвиденная ошибка:${error}`);
});

async function Connection() {
  await redis.connect();
  console.log("Соединение установлено");

  await redis.set("testKey", "123");
  const val = await redis.get("testKey");
  console.log(`Вот и значение ключа:${val}`);
}

export { redis, Connection };
