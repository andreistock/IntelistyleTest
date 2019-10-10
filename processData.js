'use strict'
var fs = require('fs')

var allLines = fs.readFileSync('./garment_items.jl').toString().split('\n'); //Load lines
allLines.pop()
fs.writeFileSync('./outputfile.json', '', function(){console.log('file is empty')}) //Create File
fs.appendFileSync("./outputfile.json","[") // Start of array
for (var i=0; i<allLines.length-1; i++){
  var newLine = allLines[i] + ","; // Add array elements delimiter
  console.log(newLine);
  fs.appendFileSync("./outputfile.json", newLine.toString() + "\n");
}
fs.appendFileSync("./outputfile.json", allLines[allLines.length-1])
fs.appendFileSync("./outputfile.json","]") // Close array
