const amqp = require("amqplib/callback_api");
const moment = require("moment");

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    const queue1 = "router1";
    const queue2 = "router2";
    const queue3 = "router3";
    const queue4 = "router4";
    const ex = "direct_logs";
    const topic_ex = "topic_logs";

    ch.assertExchange(ex, "direct", { durable: false });
    ch.assertExchange(topic_ex, "topic", { durable: false });

    ch.assertQueue(queue1, { durable: false });
    ch.assertQueue(queue2, { durable: false });
    ch.assertQueue(queue3, { durable: false });
    ch.assertQueue(queue4, { durable: false });

    ch.bindQueue(queue1, ex, "info");
    ch.bindQueue(queue2, ex, "error");

    ch.bindQueue(queue3, topic_ex, "hello.#");
    ch.bindQueue(queue4, topic_ex, "#.hello");

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

    ch.consume(
      queue3,
      msg => {
        console.log(queue3, msg.content.toString());
      },
      { noAck: true }
    );
    ch.consume(
      queue4,
      msg => {
        console.log(queue4, msg.content.toString());
      },
      { noAck: true }
    );
  });
});
