var path = require('path');
var child_process = require('child_process');
var fs = require('fs');

var lexer = {};
lexer.analizar = function (dir,exe,fileIn,fileOut,callback){	
	var pathLexico = path.join(dir,exe)+"\"";
	var pathEntrada = path.join(dir,fileIn)+"\"";
	var pathSalida = path.join(dir,fileOut)+"\"";

	child_process.exec(pathLexico+"<"+pathEntrada+">"+pathSalida,callback);	
}

module.exports=lexer;
