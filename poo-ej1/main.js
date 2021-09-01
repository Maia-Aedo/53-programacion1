import Bhaskara from "./bhaskara.js";
const mostrar = () => {
    const a = document.getElementById("inp_a").value
    const b = document.getElementById("inp_b").value
    const c = document.getElementById("inp_c").value
    //creacion de instancias, envios de datos y ejecucion del constructor
    const bhaskara = new Bhaskara(a, b, c);
    /* haciendo uso de instancia accedo al metodo calcular */
   const raiz1 = bhaskara.calcular_raiz1()
   const raiz2 = bhaskara.calcular_raiz2()
   // comillas dobles para el nombre de una clase o porpiedades, simples para introducir un texto
   document.getElementById("r1").textContent = 'Raiz 1 = '+raiz1
   document.getElementById("r2").textContent = 'Raiz 2 = '+raiz2
}
const boton = document.getElementById("btn_calcular");
boton.addEventListener("click", mostrar);