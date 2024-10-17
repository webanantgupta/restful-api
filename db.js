const mongoose = require('mongoose');



const connectTodb = () =>{                   // database name
  mongoose.connect('mongodb://localhost:27017/twitterApp')
  .then(()=> console.log('connect to database successfully'))
  .catch(()=> console.log('error in connecting'))

}

module.exports = connectTodb;