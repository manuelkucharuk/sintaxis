var producciones = 
[
	["P",
		[
			["DV","DF","LC"],
			["DF","LC"],
			["DV","LC"],
			["DV","DF"],
			["DV"],
			["DF"],
			["LC"],
			[]
		]
	],

	["DV",
		[
			["Tipo","NombreVariable",";","DV"],
			["Tipo","NombreVariable",";"]
		]
	],

	["DF",
		[
			["Tipo","NombreFuncion","LP","{","LC","return","NombreVariable",";","}","DF"],
			["Tipo","NombreFuncion","LP","{","LC","return","NombreVariable",";","}"]
		]
	],
	
	["LP",
		[
			["(","LPCont",")"],
			["(",")"]
		]
	],

	["LPCont",
		[
			["Tipo","NombreVariable",",","LPCont"],
			["Tipo","NombreVariable"]
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
			["CSiEntonces"],
			["CLLamadoFuncion"],
		]
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
			["Termino","ExpEntera2"],
			["Termino"]
		]
	],
	
	["ExpEntera2",
		[
			["+","Termino","ExpEntera2"],
			["-","Termino","ExpEntera2"],
			["+","Termino"],
			["-","Termino"]
		]
	],
	
	["Termino",
		[
			["Factor","Termino2"],
			["Factor"]
		]
	],
	
	["Termino2",
		[
			["*","Factor","Termino2"],
			["*","Factor"]
		]
	],
	
	["Factor",
		[
			["(","ExpEntera",")"],
			["ConstEntera"],
			["NombreVariable"]
		]
	],
 
	["ExpLogica",
		[
			["OperandoLogico","ExpLogica2"],
			["OperandoLogico"]
		]
	],
	
	["ExpLogica2",
		[
			["O","OperandoLogico","ExpLogica2"],
			["O","OperandoLogico"]
		]
	],
	
	["OperandoLogico",
		[	
			["FactorLogico","OperandoLogico2"],
			["No","FactorLogico","OperandoLogico2"],
			["FactorLogico"],
			["NO","FactorLogico"]
		]
	],
	
	["OperandoLogico2",
		[
			["Y","FactorLogico","OperandoLogico2"],
			["Y","FactorLogico"]
		]
	],
	
	["FactorLogico",
		[
			["(","ExpLogica",")"],
			["ConstLogica"],
			//["NombreVariable"],
			["Comparacion"]
		]
	],

	["Comparacion",
		[
			["ExpEntera","Operador","ExpEntera"]
		]
	]
	
];

var esNoTerminal = function (simbolo){
	var i;
	var n = producciones.length;
	for(i=0;i<n;i++)
		if(producciones[i][0]==simbolo)
			return true;
	return false;	
}

module.exports  = {producciones, esNoTerminal};