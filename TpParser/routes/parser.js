module.exports = function (cadena){
	console.log("Cadena",cadena);
	w=separar(cadena);
	error = false;
	t = w[0];

	var producciones = [
		["P",
			[
				["LC"]
			]
		],

		["LC",
			[
				["CAsignacion","LC"],
				["CPara","LC"],
				["CSiEntonces","LC"],
				["CLLamadoFuncion","LC"],
				["CAsignacion"],
				["CPara"],
				["CLLamadoFuncion"]
			],
		],

		["CAsignacion",
			[
				["NombreVariable","=","ExpEntera",";"]
			]
		],

		["CPara",
			[
				["Para","NombreVariable","desde","ExpEntera","hasta","ExpEntera","{","LC","}"]
			]
		],

		["CSiEntonces",
			[
				["Si","ExpLogica","entonces","{","LC","}"]
			]	
		],

		["CLLamadoFuncion",
			[
				["NombreFuncion","LLPar",";"]
			]	
		],

		["LLPar",
			[
				["(","LLParCont",")"],
				["(",")"]
			]
		],

		["LLParCont",
			[
				["NombreVariable",",","LLParCont"],
				["NombreVariable"]
			]
		],

		["ExpEntera",
			[
				["ConstEntera"],
				["NombreVariable"]
			]
		],

		["ExpLogica",
			[
				["ExpEntera","Operador","ExpEntera"]
			]
		]

	];

	function esNoTerminal(simbolo){
		if(simbolo=="P") return true;
		if(simbolo=="LC") return true;
		if(simbolo=="CAsignacion") return true;
		if(simbolo=="CSiEntonces") return true;
		if(simbolo=="CLLamadoFuncion") return true;
		if(simbolo=="LLPar") return true;
		if(simbolo=="LLParCont") return true;
		if(simbolo=="ExpEntera") return true;
		if(simbolo=="ExpLogica") return true;
		return false;
	}

	function separar(w){
		//Separa la cadena de entrada en un array, eliminando los brackets
		return w.replace(/</g,"").split(">");
	};

	function match(simbolo,posW){
		if(w[posW]==simbolo){
			console.log("Match exitoso "+ simbolo + " coincide con "+ w[posW]);
			pos++;
			t = w[posW];

		}
		else{ 
			error = true;
			console.log("Error en match "+ simbolo + " no coincide con "+ t);
		}
	}


	function cuerposProduccion(parteIzquierda){
		for(i=0;i<producciones.length;i++){
			if(producciones[i][0]==parteIzquierda)
				return producciones[i][1];
		}
	}

	function PNi(parteIzquierda,posW){
		var j;
		var cuerpos = cuerposProduccion(parteIzquierda);
		//console.log(parteIzquierda,cuerpos);
		for(j=0;j<cuerpos.length;j++){
			error = false;
			//console.log("Procesar " + parteIzquierda + " -> " + cuerpos[j].join(" "));
			posW=procesar(cuerpos[j],posW);
			console.log("Error en PNi:",error);
			if(!error){
				console.log("Estoy en PNi", parteIzquierda + " -> " + cuerpos[j].join(" "), "devuelvo: ",posW,w[posW]);
				return posW;	
			}
		} 
	}

	function procesar(cuerpo,posW){
		var i, simbolo;
		var posWOriginal=posW;
		for(i=0;i<cuerpo.length;i++){
			simbolo = cuerpo[i];
			//console.log(simbolo);

			if(esNoTerminal(simbolo)){
				console.log("Estoy en procesar",cuerpo,posW,"Llamo a PNi",simbolo,posW);
				posW=PNi(simbolo,posW);
			}
			else{
				if(w[posW]==simbolo){
					console.log("Terminal "+ w[posW] + " aceptado");
					posW++;
				}
				else error=true;
			}

			if(error) break;
		}
		if(error){
			console.log("Estoy en procesar",cuerpo,posW,"Error, Devuelvo:",posWOriginal,w[posWOriginal]);
			return posWOriginal;
		} 
		else{
			console.log("Estoy en procesar",cuerpo,posW,"OK, Devuelvo:",posW,w[posW]);
			return posW;
		} 
	}



	//OK w = separar("<NombreFuncion><(><NombreVariable><,><NombreVariable><)><;><NombreVariable><=><ConstEntera><;>$");

	var posW = PNi("P",0);
	
	if (error==false && w[posW]=="$"){
		console.log("Cadena aceptada");
	}
	else {
		console.log("No aceptada");
	}
}
