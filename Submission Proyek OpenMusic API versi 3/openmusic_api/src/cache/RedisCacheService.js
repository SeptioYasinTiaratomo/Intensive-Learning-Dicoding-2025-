// src/cache/CacheService.js
const redis = require('redis');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });

    this._client.on('error', (error) => {
      console.error(`Redis error: ${error}`);
    });

    this._client.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err.message);
    });
  }

  async set(key, value, expirationInSeconds = 1800) {
    await this._client.set(key, value, {
      EX: expirationInSeconds,
    });
  }

  async get(key) {
    const result = await this._client.get(key);
    if (result === null) {
      throw new Error('Cache not found');
    }
    return result;
  }

  // ✅ Ganti nama dari `remove` menjadi `delete` agar konsisten dan umum
  async del(key) {
    await this._client.del(key);
  }
}

module.exports = CacheService;
