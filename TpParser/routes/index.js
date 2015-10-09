var express = require('express');
var router = express.Router();
var fs = require('fs');
var child_process = require('child_process');
var path = require('path');

//var parser = require('parser');

/* GET home page. */
router.get('/', function(req, res, next){
	fs.readFile("bin/original.txt",'utf8',function(errEntrada,dataEntrada){
		res.render('index',{entrada: dataEntrada, salida:""});
	});
});


router.post('/', function(req, res, next) {
	//Escribo la entrada al arhivo entrada.txt
	fs.writeFileSync("bin/entrada.txt",req.body.entrada);

	//Proceso el archivo de entrada con lexico.exe
	var dir = "\""+path.join(__dirname,"../bin");
	var pathLexico = path.join(dir,"lexico.exe")+"\"";
	var pathEntrada = path.join(dir,"entrada.txt")+"\"";
	var pathSalida = path.join(dir,"salida.txt")+"\"";
	
	child_process.execSync(pathLexico+"<"+pathEntrada+">"+pathSalida);

	fs.readFile("bin/entrada.txt",'utf8',function(errEntrada,dataEntrada){
		fs.readFile("bin/salida.txt",'utf8',function(errSalida,dataSalida){
			res.render('index',{entrada:dataEntrada, salida:dataSalida});
			var parser = require("./parser");
			parser(dataSalida+"$");	
		});
	});

});

module.exports = router;
