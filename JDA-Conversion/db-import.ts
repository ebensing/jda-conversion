/// <reference path='./node.d.ts' />

//var mysql = require('mysql');
var fs = require('fs');

var cnfTxt = fs.readFileSync('../../.my.cnf').toString();

var password = cnfTxt.substring(cnfTxt.lastIndexOf("=")+2, cnfTxt.length - 2);

console.log(password);
/*
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'jedarchi',
  password : 'CHANGE THIS',
});

connection.connect();

connection.query("SELECT * FROM Seeds where verified != 2", function (err, rows, fields) {
    if (err) {
        console.log("There be drgns here");
    } else {

    }
});*/