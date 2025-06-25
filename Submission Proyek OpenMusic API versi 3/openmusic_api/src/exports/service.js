const amqp = require('amqplib');

class ProducerService {
  constructor() {
    this._channel = null;
    this._connection = null;
  }

  async connect() {
    if (!this._channel) {
      const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
      const channel = await connection.createChannel();
      await channel.assertQueue('export:playlists', {
        durable: true,
      });

      this._connection = connection;
      this._channel = channel;
    }
  }

  async sendMessage(queue, message) {
    await this.connect();
    this._channel.sendToQueue(queue, Buffer.from(message));
  }

  async close() {
    await this._channel?.close();
    await this._connection?.close();
  }
}

module.exports = ProducerService;
