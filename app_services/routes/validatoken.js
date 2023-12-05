const jwt = require('jsonwebtoken');

function validaToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });

jwt.verify(token, 'Pepito2023', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });


}

module.exports = validaToken;
