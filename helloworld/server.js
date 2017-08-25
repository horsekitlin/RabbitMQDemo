const amqp = require("amqplib/callback_api");
const moment = require("moment");

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = "hello";

    ch.assertQueue(q, { durable: false });
    ch.bindQueue(q, "logs", "");
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(
      q,
      function(msg) {
        console.log(" [x] Received %s", msg.content.toString(), moment());
      },
      { noAck: true }
    );
  });
});
