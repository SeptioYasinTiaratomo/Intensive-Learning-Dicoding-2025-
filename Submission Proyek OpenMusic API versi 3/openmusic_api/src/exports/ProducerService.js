const amqp = require('amqplib');

const ProducerService = {
  sendMessage: async (queue, message) => {
    let connection;
    try {
      connection = await amqp.connect(process.env.RABBITMQ_SERVER);
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(message));

    } catch (error) {
      console.error('Failed to send message to queue:', error);
      throw error;
    } finally {
      if (connection) {
        setTimeout(() => {
          connection.close();
        }, 500); // lebih cepat agar tidak delay saat testing
      }
    }
  },
};

module.exports = ProducerService;
