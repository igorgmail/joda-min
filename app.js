import { createRequire } from "module";
const require = createRequire(import.meta.url);


const logger = require('morgan')
const express = require('express');
import start from './like.js'

const app = express();


app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.send('/go/500  <--  количество лайков' );
});

app.get('/go/:amount', async (req, res) => {
  const {amount} =  req.params
  res.send({ 'status': 200, 'Будет поставлено лайков': amount});
  console.log("Start go", amount);
  const result = await start(amount)
  console.log("▶ ⇛ result:", result);
});

app.listen(3001, () => {
  console.log('Сервер запущен!!');
});
