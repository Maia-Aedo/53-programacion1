export default class Bhaskara {
    // las variables se llaman atributos porque estan dentro de la clase
    ca;
    cb;
    cc;
    // constructor es una funcion=metodo
    constructor(a, b, c) {
        this.ca = a;
        this.cb = b;
        this.cc = c;
    }
    calcular_raiz1() {
        const bloque1 = (Math.pow(this.cb, 2))-(4*this.ca*this.cc);
        const raiz = (Math.sqrt(bloque1));
        const r1 = ((-this.cb) + raiz)/(2*this.ca);
        return r1;
    }
    calcular_raiz2() {
        const bloque1 = (Math.pow(this.cb, 2))-(4*this.ca*this.cc);
        const raiz = (Math.sqrt(bloque1));
        const r2 = ((-this.cb) - raiz)/(2*this.ca);
        return r2;
    }
}

