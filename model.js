var mongoose = require('mongoose');

var newuser = mongoose.Schema({
    google : {
        username : String,
        googleid : String
    }
})
module.exports = mongoose.model('user' , newuser);