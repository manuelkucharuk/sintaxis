var producciones = 
[
	["P",
		[
			["LC"],
			[]
		]
	],

	["LC",
		[
			["CAsignacion","LC"],
			["CPara","LC"],
			["CSiEntonces","LC"],
			["CLLamadoFuncion","LC"],

			//Con LC = lambda
			["CAsignacion"],
			["CPara"],
			["CSiEntonces"],
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
			["Para","NombreVariable","desde","ExpEntera","hasta","ExpEntera","{","LC","}"],
			["Para","NombreVariable","desde","ExpEntera","hasta","ExpEntera","{","}"]
		]
	],

	["CSiEntonces",
		[
			["Si","ExpLogica","entonces","{","LC","}"],
			["Si","ExpLogica","entonces","{","}"]
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

]


var esNoTerminal = function (simbolo){
	var noTerminales = [
	"P",
	"LC",
	"CAsignacion",
	"CPara",
	"CSiEntonces",
	"CLLamadoFuncion",
	"LLPar",
	"LLParCont",
	"ExpEntera",
	"ExpLogica"];

	if(noTerminales.indexOf(simbolo)>-1) return true;
	return false;
}

module.exports = {producciones, esNoTerminal};