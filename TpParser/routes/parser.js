var parser = {};
parser.analizar = function (cadena,callback){
	var resultado;
	var producciones = require('./producciones').producciones;
	var esNoTerminal = require('./producciones').esNoTerminal;

	var w = separar(cadena);
	var error = false;

	//Ejecuto el analisis sintactico
	var posW = PNi("P",0);
	
	if (error==false && w[posW]=="$") resultado = "Cadena aceptada"
	else resultado = "Cadena no aceptada";

	return callback(resultado);

	//Funciones auxiliares para el analisis:

	function separar(w){
		//Separa la cadena de entrada en un array, eliminando los brackets
		return w.replace(/</g,"").split(">");
	};

	function cuerposProduccion(parteIzquierda){
		//Dada la parte izquierda de una produccion, devuelve el cuerpo
		for(i=0;i<producciones.length;i++)
			if(producciones[i][0]==parteIzquierda) 
				return producciones[i][1];	
	}

	function match(simbolo,posW){
		if(w[posW]==simbolo) posW++;
		else error = true;

		return posW;
	}

	function PNi(parteIzquierda,posW){
		var j;
		var cuerpos = cuerposProduccion(parteIzquierda);
		for(j=0;j<cuerpos.length;j++){
			error = false;
			posW=procesar(cuerpos[j],posW);
			if(!error) return posW;	
		} 
	}

	function procesar(cuerpo,posW){
		var i, simbolo;
		var posWOriginal=posW;
		for(i=0;i<cuerpo.length;i++){
			simbolo = cuerpo[i];

			if(esNoTerminal(simbolo)) posW=PNi(simbolo,posW);
			else posW = match(simbolo,posW);

			if(error) break;
		}
		if(error) return posWOriginal;
		else return posW;
	}
}

module.exports = parser;