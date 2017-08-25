const amqp = require("amqplib/callback_api");
const moment = require("moment");

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertQueue("hellow", { durable: false });

    ch.bindQueue("hellow", "logs", "");
    ch.consume("hellow", msg => {
      const data = msg.content.toString();
      console.log(`hellow Queue: ${data}`);
    });
  });
});
