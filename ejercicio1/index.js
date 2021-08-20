// funcion flecha no tiene nombre, se pone el nombre de la constante (calcular) 
// el boton ejecuta la funcion
const calcular = () => {
    //encontrar al input, value extrae el dato
    const co = document.getElementById("inp_co").value;
    const ca = document.getElementById("inp_ca").value;
    const resultado = co*ca
    console.log(resultado);
}
// encuntra el boton por id y se guarda en const
const boton = document.getElementById("btn_calcular");
// event= todos lo eventos en loa que interviene el usuario
boton.addEventListener("click", calcular)
