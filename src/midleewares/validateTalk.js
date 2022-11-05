const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório',
    });
  } 
  if (!talk.watchedAt) {
    return res.status(400).send({
      message: 'O campo "watchedAt" é obrigatório',
    });
  } 
  if (talk.rate == null) {
    return res.status(400).send({
      message: 'O campo "rate" é obrigatório',
    });
  }
  return next();
};

module.exports = {
  validateTalk,
};