const { readFile } = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, 'talker.json');

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function tokenKey(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let index = 0; index < length; index += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const getAllTalkers = async () => {
  const response = await readFile(talkerPath, 'utf8');
  const talkers = JSON.parse(response);
  return talkers;
};

module.exports = {
  getAllTalkers,
  tokenKey,
  validateEmail,
};