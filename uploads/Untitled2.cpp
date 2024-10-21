#include <stdio.h>

int cant_estudiantes;
int codigos[99];

int obtener_entero_entre(char *mensaje, int min, int max, char *error) {
	float n;
	int res;
	do {
		printf(mensaje);
		scanf("%f", &n);
		int int_n=n*10/10;
		if(n>=min && n<=max && int_n==n)
		{
			res = int_n;
			//printf(" >> Entrada valida <<\n");
		}
		else
		{
			res = -1;
			printf(error);
			printf("\n");
		}

	} while (res == -1);
	return res;
}

float obtener_decimal_entre(char *mensaje, int min, int max, char *error) {
	float n;
	float res;
	do {
		printf(mensaje);
		scanf("%f", &n);
		if(n>=min && n<=max)
		{
			res = n;
			//printf(" >> Entrada valida <<\n");
		}
		else
		{
			res = -1;
			printf(error);
			printf("\n");
		}

	} while (res == -1);
	return res;
}

int buscar_indice_estudiante(int codigo_estudiante_buscado) {
	int est = 0;
	
	int indice_encontrado1 = -1;
	while (est < cant_estudiantes) {
		if (codigos[est] == codigo_estudiante_buscado){
			indice_encontrado1 = est;
			goto SALIR;
		}
		est++;
	};
	SALIR:
	//printf("%d\n", indice_encontrado1);
	return indice_encontrado1;
}

int main()
{

	int cant_femeninos = 0;
	int cant_masculinos = 0;

	int sexos[99];
	float notas_algebra[99];
	float acum_algebra = 0;
	float prom_algebra = 0;
	float notas_fundamentos[99];
	float max_fundamentos = 0;	
	int nuevo_codigo_estudiante;
	cant_estudiantes = obtener_entero_entre("Cantidad de alumnos: ", 1, 99, "Entrada invalida: La cantidad debe ser entre 1 y 99");
	int est = 0;
	int indice_encontrado;
	while (est < cant_estudiantes) {
		printf("Estudiante #%d \n", est+1);
		CAPTURAR_ESTUDIANTE:
		nuevo_codigo_estudiante	= obtener_entero_entre(	"		Codigo Estudiante: ", 1, 999, "Entrada invalida: el codigo debe ser entre 1 y 999");
		indice_encontrado = buscar_indice_estudiante(nuevo_codigo_estudiante);
		if (indice_encontrado >= 0){
			printf("Ya existe un estudiante con ese codigo... \n" );
			goto CAPTURAR_ESTUDIANTE;
		}
		codigos[est] = nuevo_codigo_estudiante;
		
		sexos[est] 				= obtener_entero_entre(	"		Femenino [0], Masculino[1]: ", 0, 1, "Entrada invalida: el sexo debe ser 0 o 1");
		if (sexos[est] == 0){
			cant_femeninos++;
		} else {
			cant_masculinos++;
		}
		notas_algebra[est] 		= obtener_decimal_entre("		Nota Algebra: ", 0, 5,"Entrada invalida: Debe ser un decimal entre 0 y 5");
		acum_algebra 			= acum_algebra + notas_algebra[est];
		notas_fundamentos[est] 	= obtener_decimal_entre("		Nota Fundamentos: ", 0, 5,"Entrada invalida: Debe ser un decimal entre 0 y 5");
		if (notas_fundamentos[est] > max_fundamentos) {
			max_fundamentos = notas_fundamentos[est];
		}
		est++;
	} 
	prom_algebra = acum_algebra / cant_estudiantes;
	int opcion;
	//printf("prom_algebra: %f, cant_femeninos: %d, cant_masculinos: %d, max_fundamentos: %f", prom_algebra, cant_femeninos, cant_masculinos, max_fundamentos);
	do {
		printf("MENU\n");
		printf("1. Promedio de Algebra\n");
		printf("2. Mayor nota de Fundamentos de Programación\n");
		printf("3. Cantidad de Alumnos Femeninos y Masculinos\n");
		printf("4. Buscar notas de un estudiante)\n");
		printf("5. Salir\n");
		opcion = obtener_entero_entre("Seleccione opcion: ", 1, 5,"Entrada invalida: Debe ser una opcion entre 1 y 5");
		printf("RESPUESTA >>>>  ");
		if (opcion == 1){
			printf("Promedio de Algebra = %.1f \n", prom_algebra);
		}
		if (opcion == 2){
			printf("Mayor nota de Fundamentos de Programación = %.1f \n", max_fundamentos);
		}
		if (opcion == 3){
			printf("Cantidad de Alumnos Femeninos = %d y Masculinos = %d \n", cant_femeninos, cant_masculinos);
		}	
		if (opcion == 4){
			int codigo_estudiante_buscado			= obtener_entero_entre(	"		Codigo Estudiante a buscar: ", 1, 999, "Entrada invalida: el codigo debe ser entre 1 y 999");
			indice_encontrado = buscar_indice_estudiante(codigo_estudiante_buscado);
			if (indice_encontrado > 0){
				printf("Nota de Algebra = %f, Nota de Fundamentos = %f \n", notas_algebra[indice_encontrado] , notas_fundamentos[indice_encontrado]  );
			} else {
				printf("Estudiante %d no registrado \n", codigo_estudiante_buscado);
			}
		}		

		
		
	} while (opcion < 5);
	
}
