# Rabbit MQ 

## install

### Mac

#### Step 1

```
  $ brew update
```

#### Step 2

```
  $ brew install rabbitmq
```

#### Step 3

```
  $ rabbitmqctl status
```

### Demo

```
  $ yarn add amqplib
```

#### Hello world

```js
const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = "hello";

    ch.assertQueue(q, { durable: false });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(
      q,
      function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      { noAck: true }
    );
  });
});
```

* Queue - 隊列

* Task - 任務

* Exchange - 交易所

* consume - worker

#### Message acknowledgment (消息確認)

當我們的任務有需要長時間的時候

若是當 consumer 因為未知因素而死亡

但是任務尚未完成

我們希望任務仍然可以存在 Queue 中

讓重啟後的 consumer 或是其他 consumer 繼續執行

所以可以在 consume 中加入 ```js {noAck: false}```

來設定該 consume 是必須在確認完成之後

才會把該任務在 Queue 中刪除

##### Message durability

如果 RabbitMQ 服務死亡後會忘記所有 Queue 中的資訊

但是這是不允許的

我們希望若是 Server 重啟獲釋 RabbitMQ 重啟或是 Crash

Queue 資訊希望還能存在

所以我們可以藉由設定 **durable** 來留存資訊

### exclusive

當程式結束的時候

queue 也不需要存在的話

我們可以在 assertQueue 的 options 中

加上 {exclusive: true}

代表當 程式結束同時也刪除 Queue

#### persistent

在發送訊息的時候可以增加一個 persistent 的參數增加發送訊息的時候減少丟失訊息的機率

這個訊息打開的時候會將訊息寫入硬碟中

但是在他並不是使用 fssync 來做同步

所以在收到訊息與寫入硬碟這兩個動作中間還是有一點點的空窗期

所以並不能完全保證訊息不會丟失

但是在簡單的但是在簡單的任務 Queue 已經足夠使用

如果你還需要更嚴謹的保證訊息不會丟失機制

可以使用 [publisher confirms](https://www.rabbitmq.com/confirms.html)

### Publish/Subscribe

#### Exchanges

* producer 是發送訊息的程式
* queue 是儲存訊息的緩衝區
* consumer 是接收訊息的程式

RabbitMQ 的核心是

producer 不會將Message 直接發送給 Queue

甚至不知道要發送給哪些 Queue

會發送到 Exchange 再由 Exchange 來決定要將 Message 發送到哪些 Queue

他可能只會送到一個或是多個 Queue 或是要丟棄

都是藉由 Exchange 規則來定義

##### 宣告 Exchange

```js
ch.assertExchange('logs', 'fanout', {durable: false})
```

```fanout``` Exange 是最簡單的 Exchage type

他會將 Message 做廣播的行為

##### default Exchange

我們可以有一個默認的 Exchange

然後再使用 **route_key** 來指定要發送的 Queue

```js
ch.sendToQueue('hello', new Buffer('Hello World!'));
```

##### bind Queue

```js
ch.bindQueue('hello', 'logs', '');
```

#### Direct Exchange

我們可以在 bindQueue 加上一個字串

最後一個參數是 **route_key**

可以輸入一個字串

而 assertExchange 的時候類型為 direct

這時我們可以依據 這個 **route_key** 

來對發出的訊息做精確的控制

#### Topic Exchange

如果Topic Exchange 的 **route_key** 有一定的規則

* 由點分隔的單詞列表
* 單詞可以是任何東西，通常是雨 Message 相關的單字組合
* 可以有任意多的單詞，但是最多有255 bytes

與direct 一樣

可以透過 Exchange 傳到綁定的所有 Queue

其中有特殊字元可以利用

* (Star *) - 代替一個 bytes
* (hash #) - 代替一個或多個 bytes