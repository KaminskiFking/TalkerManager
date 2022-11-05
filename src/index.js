const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const bodyParser = require('body-parser');
const { getAllTalkers, tokenKey } = require('./fsUtils');
const { validateLogin } = require('./midleewares/validateLogin');
const { validateToken } = require('./midleewares/validateToken');
const { validateTalk } = require('./midleewares/validateTalk');
const { validateTalkDate } = require('./midleewares/validateTalkDate');
const { validateName } = require('./midleewares/validateName');
const { validateAge } = require('./midleewares/validateAge');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkerPath = path.resolve(__dirname, './talker.json');

// async function readFile() {
//   try {
//     const data = await getAllTalkers();
//     return JSON.parse(data);
//   } catch (error) {
//     console.error(`file not found ${error}`);
//   }
// }

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

app.post('/login', validateLogin, (_req, res) => {
  const tokenCode = tokenKey(16);
  return res.status(200).json({ token: tokenCode });
});

app.post('/talker',
validateToken, 
validateName, 
validateAge, 
validateTalk, validateTalkDate, async (req, res) => {
    const talkers = await getAllTalkers();
    const newTalker = {
      id: talkers[talkers.length - 1].id + 1,
      ...req.body,
    };
    const allTalkers = JSON.stringify([...talkers, newTalker]);
    await fs.writeFile(talkerPath, allTalkers);
    res.status(201).json(newTalker);
});

app.put('/talker/:id',
validateToken, 
validateName, 
validateAge, 
validateTalk, validateTalkDate, async (req, res) => {
    const { id } = req.params;
    const talkers = await getAllTalkers();
    const newTalker = { id: Number(id), ...req.body };
    const filterTalker = talkers.filter((e) => e.id !== Number(id));
    const allTalkers = JSON.stringify([...filterTalker, newTalker]);
    await fs.writeFile(talkerPath, allTalkers);
    res.status(200).json(newTalker);
});
