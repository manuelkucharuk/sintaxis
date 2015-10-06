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
			[""]
		],
	],

	["CAsignacion",
		[
			["NombreVariable","=","ExpEntera",";"]
		]
	],

	["CPara",
		[
			["NombreVariable","desde","ExpEntera","hasta","ExpEntera","{","LC","}"]
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

function match(simbolo){
	if(t==simbolo){
		pos++;
		t = w[pos];
	}
	else 
		error = true;
}


function cuerposProduccion(parteIzquierda){
	for(i=0;i<producciones.length;i++){
		if(producciones[i][0]==parteIzquierda)
			return producciones[i][1];
	}
}

function nt(parteIzquierda){
	var j;
	var cuerpos = cuerposProduccion(parteIzquierda);
	//console.log(parteIzquierda,cuerpos);
	for(j=0;j<cuerpos.length;j++){
		error = false;
		procesar(cuerpos[j]);
		if(error) break;
	}
}

function procesar(cuerpo){
	var i, simbolo;
	for(i=0;i<cuerpo.length;i++){
		cont++;
		simbolo = cuerpo[i];
		console.log(simbolo,esNoTerminal(simbolo),t,error,i);
		if(cont==50) throw new Error("Something went badly wrong!");
		if(esNoTerminal(simbolo)) nt(simbolo);
		else match(simbolo); 
	}
}

cont=0;

w = separar("<NombreVariable><=><ConstEntera><;>$");
error = false;
pos = 0;
t = w[pos];

nt("P");
if (error==false && t=="$"){
	console.log("Cadena aceptada");
}
else {
	console.log("No aceptada");
}



