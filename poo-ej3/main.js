import Anime from "./anime.js"
const Obtener = () => {
    //genera una instancia
    const instancia = new Anime()
    instancia.obtenerDatos()
}
const boton = document.getElementById("btn_obtener")
boton.addEventListener("click", Obtener)

