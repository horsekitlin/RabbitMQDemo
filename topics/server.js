var amqp = require("amqplib/callback_api");

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_topic.js <facility>.<severity>");
  process.exit(1);
}

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    const ex = "topic_logs";
    const queue3 = "router3";
    const queue4 = "router4";

    ch.assertQueue(queue3, { durable: false });
    ch.assertQueue(queue4, { durable: false });

    ch.assertExchange(ex, "topic", { durable: false });

    ch.bindQueue(queue3, topic_ex, "hello.#");
    ch.bindQueue(queue4, topic_ex, "#.hello");

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
