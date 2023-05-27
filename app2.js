
import { createRequire } from "module";
const require = createRequire(import.meta.url);


const logger = require('morgan')
const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const HTMLParser = require('node-html-parser');
import { start, like } from './like.js'

const app = express();


app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(bodyParser.json());

// Используйте bodyParser.urlencoded() для обработки данных из формы
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/go', async (req, res) => {
  const body = req.body;
  console.log('request from client', body);
  const { run, stop, likes } = body;
  app.locals.run = run;
  app.locals.stop = stop;
  app.locals.likes = likes;
  res.sendStatus(200);
});

app.get('/sse', async (req, res) => {
  const run = app.locals.run;
  const stop = app.locals.stop;
  const likes = app.locals.likes;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const result = await start({ run, stop, likes });

  async function start({ run = 1, stop = 2, likes = 10 }) {
    const timeAut = () => Math.floor(Math.random() * ((stop * 1000) - (run * 1000) + 1)) + (run * 1000);
    for (let i = 0; i < likes; i++) {
      await new Promise((r) => setTimeout(r, timeAut()));
      const resultLikes = await like();
      console.log("▶ ⇛ resultLikes:", resultLikes);
      res.write(`data: ${resultLikes}\n\n`);
    }
    console.log("▶ ⇛ resultLikes:", resultLikes);
    res.status(205)
  }
});


app.listen(3001, () => {
  console.log('Сервер запущен!!');
});
