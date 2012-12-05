/// <reference path='./node.d.ts' />

var mysql = require('mysql');
var async = require('async');

var fs = require('fs');

var cnfTxt = fs.readFileSync('../../.my.cnf').toString();

var password = cnfTxt.substring(cnfTxt.lastIndexOf("=")+2, cnfTxt.length - 3);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'jedarchi',
  password : password,
  database: 'jedarchi_seeds',
  charset: 'LATIN1_GENERAL_CI'
});

connection.connect();

var jsonDict = {
    items : []
};

connection.query("SELECT * FROM seeds where verified != 2", function (err, rows, fields) {
    if (err) {
        console.log(err);
    } else {
        async.forEach(rows, function (x : any, cb) {
            console.log("adding seed title: %", x.title);
            var item = {};
            item['title'] = x.title;
            item['description'] = x.description;
            item['uri'] = x.url;
            item['attribution_uri'] = x.url;
            item['archive'] = "Reischauer Institute";
            switch (x.category) {
                case "website":
                    item['media_type'] = "website";
                    item['layer_type'] = "website";
                    break;
                case "blog":
                    item['media_type'] = "website";
                    item['layer_type'] = "website";
                    break;
                case "video":
                    item['media_type'] = "video";
                    item['layer_type'] = "video";
                    break;
                case "audio":
                    item['media_type'] = "audio";
                    item['layer_type'] = "audio";
                    break;
                case "photos":
                    item['media_type'] = "image";
                    item['layer_type'] = "image";
                    break;
                case "maps":
                    item['media_type'] = "website";
                    item['layer_type'] = "website";
                    break;
                default:
                    item['media_type'] = "website";
                    item['layer_type'] = "website";
            }
            item['location'] = x.location;
            item['media_geo_latitude'] = x.lat;
            item['media_geo_longitude'] = x.lng;

            item['media_date_created'] = x.added;
            item['media_creator_username'] = x.name;
            item['id_at_source'] = x.sid;

            item['attributes'] = {
                frequency: x.frequency,
                scope: x.scope,
                language: x.language,
                creator_email: x.email,
            };

            item['published'] = 1;
            var tags = x.tags.split(',');
            item['tags'] = [];
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].trim() != "") {
                    item['tags'].push(tags[i].trim());
                }
            }
            jsonDict.items.push(item);
            cb();
        }, function (err) {
            fs.writeFileSync('output.json', JSON.stringify(jsonDict), 'utf8');
            console.log("Done!");
            process.exit(0);
        });
    }
});