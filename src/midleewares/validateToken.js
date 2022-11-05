const validateToken = (req, res, next) => {
  const tokenValidate = req.headers.authorization;
  if (!tokenValidate) {
    return res.status(401).send({ message: 'Token não encontrado' });
  } 
  if (tokenValidate.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  return next();
};

module.exports = {
  validateToken,
};