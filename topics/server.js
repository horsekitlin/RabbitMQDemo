var amqp = require("amqplib/callback_api");

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_topic.js <facility>.<severity>");
  process.exit(1);
}

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = "topic_logs";

    ch.assertExchange(ex, "topic", { durable: false });

    ch.assertQueue("hhh", { exclusive: true }, function(err, q) {
      console.log(" [*] Waiting for logs. To exit press CTRL+C");

      ch.bindQueue(q.queue, ex, "hello.#");

      ch.consume(
        q.queue,
        function(msg) {
          console.log(
            " [x] %s:'%s'",
            msg.fields.routingKey,
            msg.content.toString()
          );
        },
        { noAck: true }
      );
    });
  });
});
