var jwt = require('jsonwebtoken');
let JWT_SECRET = 'Anant';


let checkToken = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);

  try {
    var decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);   //
    req.user = decoded._id;  //user key is added
    console.log(decoded._id)
    next()

  } catch (err) {
    return res.json({ msg: 'provide valid tokens!', success: false })
  }
}

module.exports = checkToken