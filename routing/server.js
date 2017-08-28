const amqp = require("amqplib/callback_api");
const moment = require("moment");

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    const queue1 = "router1";
    const queue2 = "router2";

    const ex = "direct_logs";

    ch.assertExchange(ex, "direct", { durable: false });

    ch.assertQueue(queue1, { durable: false });
    ch.assertQueue(queue2, { durable: false });

    ch.assertQueue("router5", { durable: false });

    ch.bindQueue(queue1, ex, "info");
    ch.bindQueue(queue2, ex, "error");

    ch.consume(
      queue1,
      msg => {
        console.log(queue1, msg.content.toString());
      },
      { noAck: true }
    );

    ch.consume(
      queue2,
      msg => {
        console.log(queue2, msg.content.toString());
      },
      { noAck: true }
    );
  });
});
