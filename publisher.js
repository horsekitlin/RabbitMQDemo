var q = 'tasks';

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
  console.log('error0', error0)
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    console.log('error1', error1)
    channel.assertQueue(q)
    channel.sendToQueue(q, Buffer.from('something to do'));
    channel.close();
  });
});

// var open = require('amqplib').connect('amqp://localhost');

// // Publisher
// open.then(function(conn) {
//   return conn.createChannel();
// }).then(function(ch) {
  // return ch.assertQueue(q).then(function(ok) {
  //   return ch.sendToQueue(q, Buffer.from('something to do'));
  // });
// }).catch(console.warn);
