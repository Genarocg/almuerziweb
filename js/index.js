//console.log('Hola Mundo')
//tipos de datos en JS
//String: Cadena de caracteres. 'a' 'hola' "Hola Mundo"
//Boolean:true false.
//Null: nulo.
//Number: 12313456
// "123" es un string es distinto a 123 que es un Number.
//Undefined.
//Object: objeto
//Definición de variables
//var let const

//var miPrimeraVariable = 'lala'

let miPrimeraVariable = 'Mi Primera Variable'
//console.log(miPrimeraVariable);
//mutabilidad, es cambiar el valor
miPrimeraVariable = 'Esto ha cambiado'
//console.log(miPrimeraVariable);
//boolean
let miBoolean = true;
let miBoolean2 = false;

//Numeros
let miNumero = 0
let miNumero2 = 2
let miNumero3 =-258
//console.log(miNumero, miNumero2, miNumero3, miBoolean, miBoolean2, miPrimeraVariable);

//let Undef
//console.log(undef)

let nulo = null
//console.log(nulo);

//Objeto (Agrupación de datos, que hacen sentidos entre si)
//objeto vacio
const miPrimerObjeto = {}
//objeto
const miObjeto = {
    unNumero: 12,
    unString: 'Esta cadena de caracteres',
    unaCondicion: true,
}

//console.log(miObjeto.unString);

const arrvacio = []
const arr = [1, 2, 'hola', 'mundo', miObjeto]
//console.log(arrvacio, arr);
arrvacio.push(5)
arrvacio.push(3)
arrvacio.push(1)
arrvacio.push('hola')
arrvacio.push(miPrimeraVariable)

console.log(arrvacio);