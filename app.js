import { createRequire } from "module";
const require = createRequire(import.meta.url);


const logger = require('morgan')
const express = require('express');
import start from './like.js'

const app = express();


app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.send('/go/500/  <--  количество лайков / Задержка от / до  -- в секундах');
});

app.get('/go/:amount/:run?/:stop?', async (req, res) => {
  const param = req.params
  res.send(`Будет поставлено лайков: ${param.amount} <br> Задержка по умолчанию от ${param.run || 0.5} до ${param.stop || 1.5}`);
  console.log("Start go", param.amount);
  const result = await start(param.amount)
  console.log("▶ ⇛ result:", result);
});

app.listen(3001, () => {
  console.log('Сервер запущен!!');
});
