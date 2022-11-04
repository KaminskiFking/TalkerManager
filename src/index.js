const express = require('express');

const bodyParser = require('body-parser');
const { getAllTalkers, tokenKey, validateEmail } = require('./fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionarr
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (!talkers) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await getAllTalkers();
  const { id } = req.params;
  const updateTalkers = talkers.find((team) => team.id === Number(id));
  if (!updateTalkers) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(updateTalkers);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailValidate = validateEmail(email);
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } else if (!emailValidate) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  const tokenCode = tokenKey(16);
  return res.status(200).json({ token: tokenCode });
});
