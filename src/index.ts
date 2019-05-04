import mqtt from 'async-mqtt';

import logger from './logger';
import config from './config';
import mqttLogger from './mqttLogger';

const main = async () => {
  logger.info('Starting mqtt client');

  const client = mqtt.connect({
    port: config.MQTT_PORT,
    protocol: config.MQTT_PROTOCOL,
    host: config.MQTT_HOST,
    clientId: config.MQTT_CLIENT_NAME,
  });

  return mqttLogger(client, logger);
};

main().catch(error => {
  logger.error(error);
});
