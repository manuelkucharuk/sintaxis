document.querySelector('button#analizar').addEventListener('click',
	function(){
		var	entrada = document.querySelector('#entrada').value;
		document.getElementById("salida").innerHTML = obtenerTokens(entrada).join('');
	}
); 

function obtenerTokens(str)
{
	//	Expresion regular para la deteccion de palabras reservadas
	var	palabraReservada =	new RegExp(/\b(Para|desde|hasta|Si|entonces|return|NO|Y|O)\b/);

	//	Expresion regular para la detecion de tipo de datos
	var	tipoDeDato =	new RegExp(/\b(entero|real|logica)\b/);

	//	Expresion regular para las constantes enteras
	var	constanteEntera	=	new RegExp(/\d+/g);

	//	Expresion regular para las constantes logicas
	var	constanteLogica = new RegExp(/\b(VERDADERO|FALSO)\b/);

	//	Expresion regular para los nombres de las variables
	var nombreVariable = new RegExp(/\b([a-z]+)\b/);
	
	//	Expresion regular para los nombres de las funciones
	var	nombreFuncion	=	new RegExp(/\b([A-Z][a-z]*)\b/);

	//	Expresion regular para los operadores logicos
	var	operadorLogico =	new RegExp(/\b(==|>=|<=|>|<)\b/);

	//	Expresion regular para los operadores aritmeticos
	var	operadorAritmetico = new RegExp(/(\+|\-|\*|\/)/);

	//	Simbolos terminales que no se clasifican en ninguna expresion regular anterior
	var simbolosTerminales = new RegExp(/(;|,|\(|\)|\{|\}|=)/);

	//	Remuevo los saltos de linea de la cadena de entrada
	var	str =	str.replace(/\n/g,'');

	//	Convierto la cadena de entrada en un array separando segun caracteres especiales
	var	array
	=	str.match(/[^;,\(\)\{\}\s\+\-\*\/]+|[;,=\(\)\{\}\S\+\-\*\/]/g);

	console.log(array);

	//	Mapeo el array trimeando (Remuevo espacios al principio y fin de las cadenas) las cadenas y removiendo las vacias. 
	var	array	=	array.map(
		function(cadena){
			return	cadena.trim();
		}).filter(
				function(cadena){
					return	cadena.length > 0;
				}
		);

	//	Tokenizo el array haciendo uso de las expresiones regulares
	var	tokens =	array.map(
		function(token){
				return	(
								palabraReservada.test(token)
						||	simbolosTerminales.test(token)
						||	operadorAritmetico.test(token)
						)
					?	'<'+token+'>'
					:	operadorLogico.test(token)?	'<Operador>'
					:	tipoDeDato.test(token)?	'<Tipo>'
					:	constanteEntera.test(token)?	'<ConstEntera>'
					:	constanteLogica.test(token)?	'<ConstLogica>'
					:	nombreFuncion.test(token)?	'<NombreFuncion>'
					:	nombreVariable.test(token)?	'<NombreVariable>'
					:	false;
			}
		);

	//	Devuelvo el array de tokens
	return	tokens
}