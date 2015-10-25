%{
#include <string.h>
#include <stdlib.h>
char* limpiarUltimo(char* str){
  int longStr=strlen(str);
  char* copia=(char*) malloc((longStr+1)*sizeof(char));
  strncpy(copia,str,longStr-1);
  copia[longStr-1]='\0';
  return copia;
}
%}
delimID [-+{}()><=;,* \t\n]
%%
%{/*Palabras reservadas y simbolos que pasan tal cual estan escritos*/
%}
("Para"|"desde"|"hasta"|"Si"|"entonces"|"return"|"NO"|"Y"|"O"){delimID} {printf("<%s>",limpiarUltimo(yytext)); unput(yytext[yyleng-1]);}
[-+{}()=;,*] printf("<%s>",yytext);

%{/*Palabras reservadas de tipo*/
%}
("entero"|"real"|"logica")[ \t] printf("<Tipo>");

%{/*Constantes*/
%}
([1-9][0-9]*|0){delimID} {printf("<ConstEntera>"); unput(yytext[yyleng-1]);}
("VERDADERO"|"FALSO"){delimID} {printf("<ConstLogica>"); unput(yytext[yyleng-1]);}

%{/*Identificadores*/
%}
[a-z]+{delimID} {printf("<NombreVariable>",yytext); unput(yytext[yyleng-1]);}
[A-Z][a-z]*{delimID} {printf("<NombreFuncion>"); unput(yytext[yyleng-1]);}

%{/*Operadores*/
%}
"=="|">="|"<="|">"|"<" printf("<Operador>");

%{/*Ignorar espacios, tabulaciones y saltos de linea*/
%}
[ \t\n]

%{/*Otros caracteres dan errores y se termina la ejecucion*/
%}
. {printf("ERROR"); exit(0);}

%%

int yywrap(void){return 1;}

int main(int argc, char *argv[]) {
 yyin = stdin;
 yylex();
 fclose(yyin);
 }
