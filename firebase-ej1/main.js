const db = firebase.firestore()
const vaciar = () => {
    // se llenan con valor vacio
    document.getElementById("inp_nom").value = ''
    document.getElementById("inp_ap").value = ''
    document.getElementById("inp_dni").value = ''
}
// function
const guardar_cliente = () => {
    // value recoge el valor
    const unCliente = {
        // const nom = document.getElementById("inp_nom").value
        nombre: document.getElementById("inp_nom").value,
        apellido: document.getElementById("inp_ap").value,
        dni: document.getElementById("inp_dni").value
    }
    /* se conecta con la base de datos, coleccion clientes e inserta un doc 
    si no tengo una coleccion creada, genera igual porque la constuye */
    db.collection('clientes').doc().set(unCliente)
    // reset del formulario
    vaciar()
}
// con function addEventListener no es necesario
const boton = document.getElementById("btn_guardar")
boton.addEventListener("click", guardar_cliente)
/* tabla */
const listar_clientes = async () => {
    const lista = await db.collection("clientes").get()
    // lista clientes
    let lc = []
    // map explora los documentos individualmente 1x1
    let lista_definitiva = lista.docs.map( (doc) => {
        // nombre, apellido, dni e id se guardan en array lc
        lc = doc.data()
        lc.id = doc.id 
        return lc;
    })
    let bolsita_tr = []
    lista_definitiva.forEach(element=> {
        let fila = `
            <tr>
                <td>${element.nombre}</td>
                <td>${element.apellido}</td>
                <td>${element.dni}</td>
                <td>
                    <button class="btn btn-danger btn-sm">X</button>
                </td>
            </tr>
        `
        // push añade un elemento al array
        bolsita_tr.push(fila)
    });
    // join limpia
    document.getElementById("tbody").innerHTML = bolsita_tr.join(``)
}
// llamar o ejecutar la funcion encargada de listar
listar_clientes();