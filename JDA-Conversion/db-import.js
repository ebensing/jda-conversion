var fs = require('fs');
var cnfTxt = fs.readFileSync('../../.my.cnf').toString();
var password = cnfTxt.substring(cnfTxt.lastIndexOf("=") + 2, cnfTxt.length - 3);
console.log(password);
//@ sourceMappingURL=db-import.js.map
