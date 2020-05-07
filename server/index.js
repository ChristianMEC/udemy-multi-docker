const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser());

// Postgress Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
  host: keys.pgHost
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)').catch(err => console.log(err));

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.REDIS_HOST,
  port: keys.REDIS_PORT,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// Express route handlers

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from values');

  res.send(values.rows);
});

app.get('/values/current', (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high');
  }

  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);

  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({ working: true });
});

app.listen(5000, () => {
  console.log('Server is listening at port 5000');
});
