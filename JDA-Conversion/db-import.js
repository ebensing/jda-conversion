var fs = require('fs');
var cnfTxt = fs.readFileSync('../.my.cnf');
var password = cnfTxt.substring(cnfTxt.lastIndexOf("="));
console.log(password);
//@ sourceMappingURL=db-import.js.map
