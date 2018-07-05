const bcrypt = require('bcrypt');
const saltRounds = 8;
var pass1 = "0000mmams0";
var pass2 = "ndskdkdokd";

// var salt = bcrypt.genSaltSync(saltRounds);
//
 // console.log("salt---> " + salt);
//
var hash1 = bcrypt.hashSync(pass1, 8);
// var hash2 = bcrypt.hashSync(pass2, salt)
//
// console.log("hash1---> " + hash1);
// console.log("hash2---> " + hash2);

var passCheck = bcrypt.compareSync(pass2, hash1);

console.log(passCheck);
