const validateTalkDate = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!regexDate.test(talk.watchedAt)) {
    return res.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  } 
  if (!(talk.rate >= 1 && talk.rate <= 5 && talk.rate % 1 === 0)) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  return next();
};

module.exports = {
  validateTalkDate,
};