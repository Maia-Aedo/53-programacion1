import Area from './area.js';
const mostrar = () => {
    const baseSuperior = document.getElementById('inp_bs').value
    const baseInferior = document.getElementById('inp_bi').value
    const altura = document.getElementById('inp_h').value
    const instancia = new Area()
    instancia.bs = baseSuperior;
    instancia.bi = baseInferior;
    instancia.h = altura;
    const respuesta = instancia.calcularAreaTrap()
    document.getElementById('respuesta').textContent = respuesta
}
const boton = document.getElementById("btn_calcular");
boton.addEventListener("click", mostrar);
