<template>
    <div class="row">
        <div v-for="lista of lista_catalogo" v-bind:key="lista.id" class="col-3 me-2">
            <div class="card" >
                <img :src="lista.url" class="card-img-top" alt="imagen producto">
                <div class="card-body">
                    <h5 class="card-title">Producto 1</h5>
                    <p class="card-text">{{lista.descripcion}}</p>
                </div>
                <ul class="list-group list-group-flush bg-secondary">
                    <li class="list-group-item">{{lista.estado}}</li>

                    <li class="list-group-item">
                        <template v-if="lista.descuento >0">
                            {{lista.precio*lista.descuento/100}}
                        </template>
                        <template else>
                            {{lista.precio}}
                        </template>
                    </li>
                </ul>
                <div class="card-body">
                    <a href="#" class="btn btn-primary">Comprar</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {db} from '../utils/firebase.js'
import {collection, onSnapshot} from 'firebase/firestore'
export default {
    name:'Catalogo',
    data() {
        return {
            lista_catalogo: []
        }
    },
    methods: {
        obtener_catalogo () {
            onSnapshot (collection(db, 'tienda'), (snapshot) => {
                // accedemos a los documentos de la captura de datos para mapearlos
                this.lista_catalogo = []
                snapshot.docs.map ( (doc) => {
                    /* un objeto se divide en dos partes
                    doc.data tiene internamente nombre, apellido, dni (todo lo contenido en data). 
                    cada objeto representa un documento
                    todo se guarda dentro de un arreglo para despues poder mostrar data e id juntos
                    los 3 puntos indican que dentro de data hay varias propiedades (nombre, dni, apellido, id) */
                    this.lista_catalogo.push ({...doc.data(), id:doc.id})
                })
            })
        },
    },
    mounted() {
        this.obtener_catalogo()
    }
}
</script>
