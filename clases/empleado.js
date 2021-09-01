// variables=atributos funciones=metodos
export default class Empleado {
    nombre = '';
    apellido = '';
    // metodos
    constructor (nomb, apel) {
        this.nombre = nomb;
        this.apellido = apel;
    }
    //metodos no pueden empezar con mayus, funciones flechas no son admitidas
    mostrarDatosEmpleado(){
        console.log(`
        mi nombre es ${this.nombre}
        mi apellido es ${this.apellido}
        `)
    }
}