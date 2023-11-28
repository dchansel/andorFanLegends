console.log("Go");
console.log(__dirname);

var fs = require('fs');
var files = fs.readdirSync(__dirname + "../../../public/legends/fr/");

//console.log(files);
//console.log(files.length)
legendList = [];
files.forEach( function (file) {
    if( file != "_legende-vierge.json" ) {

        var obj = require(__dirname + "../../../public/legends/fr/" + file);

        var shortLegend = {
            name: obj.name,
            slug: obj.slug,
            file: file,
            author: obj.author,
            abstract: obj.abstract,
            year: obj.year,
            players: obj.player,
            difficulty: obj.difficulty,
            board: obj.board,
            boxExt: obj.boxExt
        };
        legendList.push(shortLegend);
    }
});

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();
fs.writeFile(__dirname + "../../../public/legends/legends-fr." + yyyy+mm+dd + ".json", JSON.stringify(legendList), err => {
    if (err) {
      console.error(err);
    }
});

console.log("DONE");