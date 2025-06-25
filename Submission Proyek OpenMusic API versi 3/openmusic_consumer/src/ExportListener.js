const amqp = require('amqplib');

const listen = async (listener, playlistsService, mailSender) => {
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();
  const queue = 'export:playlists';

  await channel.assertQueue(queue, { durable: true });
  console.log('✅ Menunggu pesan pada queue:', queue);

  channel.consume(queue, async (msg) => {
    try {
      await listener(msg, playlistsService, mailSender);
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Gagal memproses pesan:', error.message);
    }
  });
};

module.exports = { listen };
