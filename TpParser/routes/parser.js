var parser = {};
parser.analizar = function (cadena,callback){
	var resultado;
	var producciones = require('./producciones2').producciones;
	console.log(producciones.length);
	var esNoTerminal = require('./producciones2').esNoTerminal;

	var w = separar(cadena);
	var error = false;

	//Ejecuto el analisis sintactico
	var posW = PNi("P",0);
	
	if (error==false && w[posW]=="$") cadenaAceptada = true
	else cadenaAceptada = false;

	return callback(cadenaAceptada);

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
		console.log("Estoy en PNi",parteIzquierda,w[posW]);
		console.log("cuerpos",cuerpos);
		for(j=0;j<cuerpos.length;j++){
			error = false;
			console.log(cuerpos[j]);
			posW=procesar(cuerpos[j],posW);
			if(!error) return posW;	
		} 
	}

	function procesar(cuerpo,posW){
		var i, simbolo;
		var posWOriginal=posW;
		for(i=0;i<cuerpo.length;i++){
			simbolo = cuerpo[i];
			console.log("simbolo",simbolo,"w[pos]",w[posW]);
			if(esNoTerminal(simbolo)){
				console.log(simbolo,w[posW]);
				posW=PNi(simbolo,posW);	
			} 
			else posW = match(simbolo,posW);

			if(error) break;
		}
		if(error) return posWOriginal;
		else return posW;
	}
}

module.exports = parser;