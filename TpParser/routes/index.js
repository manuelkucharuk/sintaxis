var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var lexer = require("./lexer");
var parser = require("./parser");

//var parser = require('parser');

/* GET home page. */
router.get('/', function(req, res, next){
	fs.readFile("bin/original.txt",'utf8',function (errEntrada,dataEntrada){
		res.render('index',{entrada: dataEntrada, salida:"", resultadoParser: ""});
	});
});

router.post('/', function(req, res, next) {
	//path de lexer.exe
	var pathLexer = path.join(__dirname,"../bin","lexico.exe");
	//Analizo con lexer la entrada
	lexer.analizar(pathLexer,req.body.entrada,function (resLexer){
		//Analizo con parser el resultado del lexer
		parser.analizar(resLexer+"$",function (resParser){
			//Muestro resultados
			res.render("index",{
				entrada: req.body.entrada,
				salida: resLexer,
				resultadoParser: formatearResultado(resParser)
			});
		});						
	});
});

function formatearResultado(res){
	if(res) return "<p class='aceptada'>"+"Cadena aceptada :)"+"</p>";
	else return "<p class='noAceptada'>"+"Cadena no aceptada :("+"</p>";
}

module.exports = router;
