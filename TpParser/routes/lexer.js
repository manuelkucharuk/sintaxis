var path = require('path');
var child_process = require('child_process');
var fs = require('fs');

var lexer = {};

lexer.analizar = function (exe,cadena,callback){	
	var lexer = child_process.spawn(exe);
	
	//\x1A es Ctrl+z, con eso envia EOF a stdin
	lexer.stdin.write(cadena+"\x1A");

	//lexer.on('close') porque la entrada puede ser vacia
	// y entonces lexer.stdout.on('data') nunca se ejecuta.
	var resultado = '';
	lexer.stdout.on('data', function (res){resultado = res;});
    lexer.on('close', function(code) {return callback(resultado);});
}

module.exports=lexer;
