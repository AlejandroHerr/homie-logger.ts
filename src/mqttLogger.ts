import { AsyncMqttClient } from 'async-mqtt';
import { Logger } from 'pino';

export default async (client: AsyncMqttClient, logger: Logger) => {
  process.on('exit', async () => {
    logger.info('Stoping mqtt client');

    await client.end();
  });

  client.on('connect', async () => {
    logger.info('Mqtt client connected');

    try {
      await client.subscribe('#');
    } catch (error) {
      await client.end();

      throw error;
    }
  });

  client.on('error', error => {
    logger.error(error, 'Error ocurred');
  });

  client.on('reconnect', () => {
    logger.info('Mqtt client Reconnecting');
  });

  client.on('message', (topic, message) => {
    logger.info(`${topic} -> ${message.toString()}`);
  });
};
