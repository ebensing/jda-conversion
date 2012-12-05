var mysql = require('mysql');
var fs = require('fs');
var cnfTxt = fs.readFileSync('../../.my.cnf').toString();
var password = cnfTxt.substring(cnfTxt.lastIndexOf("=") + 2, cnfTxt.length - 3);
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'jedarchi',
    password: password,
    database: 'jedarchi_seeds'
});
connection.connect();
connection.query("SELECT * FROM seeds where verified != 2", function (err, rows, fields) {
    if(err) {
        console.log(err);
    } else {
        console.log("working!!");
    }
});
//@ sourceMappingURL=db-import.js.map
