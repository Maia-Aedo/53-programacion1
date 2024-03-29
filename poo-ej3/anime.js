export default class Anime {
    constructor(){}
    // sin el async await no funciona
    // funciones async son las que se ejecutan en 2do plano
    async obtenerDatos() {
        const datos = await fetch("https://api.jikan.moe/v3/search/anime?q=hunter%20x%20hunter")
        const datos_json = await datos.json()
        // accedemos a result, el arreglo a recorrer
        const lista = datos_json.results
        let micatalogo = [];
        //  element = elementos del arreglo
        lista.forEach(element => {
            let columna = `
                <div class="col-6">
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${element.image_url}" class="img-fluid rounded-start" alt="${element.title}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.title}</h5>
                                    <p class="card-text">${element.synopsis}</p>
                                    <p class="card-text"><small class="text-muted"><u>Episodios: ${element.episodes}</u></small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            // push agrega un elemento al final del arreglo
            micatalogo.push(columna);
        })
        // se eliminan las comillas del texto html de col
        document.getElementById("catalogo").innerHTML = micatalogo.join('');
    }
}