const amqp = require("amqplib/callback_api");
const moment = require("moment");

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertQueue("hellow", { durable: false });
    ch.assertQueue("hello2", { durable: false });

    ch.assertExchange("logs", "fanout", { durable: false });

    ch.bindQueue("hellow", "logs", "");
    ch.bindQueue("hello2", "logs", "");

    ch.consume("hello2", msg => {
      console.log(`${msg.content.toString()}, hello2`);
    });

    ch.consume("hellow", msg => {
      const data = msg.content.toString();
      console.log(`hellow Queue: ${data}`);
    });
  });
});
