const { validateEmail } = require('../fsUtils');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailValidate = validateEmail(email);
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } 
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } 
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 
  if (!emailValidate) {
    return res.status(400)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

module.exports = {
  validateLogin,
};