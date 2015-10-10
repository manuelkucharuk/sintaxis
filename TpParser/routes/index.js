var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var lexer = require("./lexer");
var parser = require("./parser");

//var parser = require('parser');

/* GET home page. */
router.get('/', function(req, res, next){
	fs.readFile("bin/original.txt",'utf8',function(errEntrada,dataEntrada){
		res.render('index',{entrada: dataEntrada, salida:"", resultadoParser: ""});
	});
});

router.post('/', function(req, res, next) {
	//Escribo la entrada al arhivo entrada.txt
	fs.writeFile("bin/entrada.txt",req.body.entrada,function(){
		var dir = "\""+path.join(__dirname,"../bin");
		//Analizo con lexer archivo de entrada
		lexer.analizar(dir,"lexico.exe","entrada.txt","salida.txt",function (){
			//Analizo con parser el archivo de salida
			fs.readFile("bin/salida.txt",'utf8', function(errSalida,dataSalida){
				parser.analizar(dataSalida+"$",function(resultado){
					//Muestro resultados
					res.render("index",{
						entrada: req.body.entrada,
						salida:dataSalida,
						resultadoParser: formatearResultado(resultado)
					});
				});						
			});
		});
	});
});

function formatearResultado(res){
	if(res=="Cadena aceptada") return "<p class='aceptada'>"+res+"</p>";
	else return "<p class='noAceptada'>"+res+"</p>";
}

module.exports = router;
