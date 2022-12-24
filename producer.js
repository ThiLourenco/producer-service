import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['easy-duckling-12749-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'ZWFzeS1kdWNrbGluZy0xMjc0OST1c3g52U3B4b-FMw3t4MsFDgVrm_XSekEwWQc',
    password: '54f586f706a14aeea24986faf5d1ba31',
  },
  ssl: true,
})
  
  const producer = kafka.producer();

  await producer.connect();
  
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        })
      },
    ],
  })

  await producer.disconnect();

}

bootstrap();