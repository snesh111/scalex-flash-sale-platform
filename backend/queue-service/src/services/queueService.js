import redis from "../config/redis.js";

const QUEUE_KEY = "flash_queue";

// Add user to queue
export const joinQueue = async (userId) => {
  await redis.rpush(QUEUE_KEY, userId);
  const position = await redis.lpos(QUEUE_KEY, userId);
  return position + 1;
};

// Get position
export const getPosition = async (userId) => {
  const position = await redis.lpos(QUEUE_KEY, userId);
  return position !== null ? position + 1 : null;
};

// Process queue (remove first user)
export const popQueue = async () => {
  return await redis.lpop(QUEUE_KEY);
};