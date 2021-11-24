<template>
    <div class="row">
        <div class="col-4">
            <div class="mb-3">
                <label class="form-label"><i> Descripcion </i></label>
                <input v-model="descripcion" class="form-control" type="text" placeholder="Ingrese descripcion">
            </div>
            <div class="mb-3">
                <label class="form-label"><i> Precio </i></label>
                <input v-model="precio" class="form-control" type="number" placeholder="Ingrese precio">
            </div>
            <div class="mb-3">
                <label class="form-label"><i> Porcentaje de descuento </i></label>
                <input v-model="descuento" class="form-control" type="number" placeholder="Ingrese porcentaje">
            </div>
            <div class="mb-3">
                <label class="form-label"><i> Categoria </i></label>
                <input v-model="categoria" class="form-control" type="text" placeholder="Ingrese categoria">
            </div>
            <div class="mb-3">
                <label class="form-label"><i> Stock </i></label>
                <input v-model="stock" class="form-control" type="number" placeholder="Ingrese stock">
            </div>
            <div class="mb-3">
                <label class="form-label"><i> Estado </i></label>
                <select v-model="estado" class="form-control">
                    <option value="1" selected>Activo</option>
                    <option value="0">Inactivo</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label"><i> Adjuntar imagen </i></label>
                <input id="inp_imagen" class="form-file" type="file">
            </div>
            <button v-if="boton_estado==0" @click="guardar_datos()" class="btn btn-outline-success"><strong> Guardar </strong></button>
            <button v-if="boton_estado==1" @click="actualizar_datos()" class="btn btn-outline-secondary ms-1"><strong> Actualizar </strong></button>
        </div>
        <div class="col-8">
            <table class="table">
                <thead>
                    <tr>
                        <th> IMG </th>
                        <th> Descripcion </th>
                        <th> Precio </th>
                        <th> % Descuento </th>
                        <th> Categoria </th>
                        <th> Stock </th>
                        <th> Estado </th>
                        <th> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- con v-for se repite la fila -->
                    <tr v-for="lista of lista_productos" v-bind:key="lista.id">
                        <td>
                            <img style="width:6rem" :src="lista.url" alt="">
                        </td>
                        <td>{{lista.descripcion}}</td>
                        <td>{{lista.precio}}</td>
                        <td>{{lista.descuento}}</td>
                        <td>{{lista.categoria}}</td>
                        <td>{{lista.stock}}</td>
                        <td>{{lista.estado}}</td>
                        <td>
                            <button @click="editar_lista(lista)" class="btn btn-outline btn-info btn-sm ms-1"><strong>editar</strong></button>
                            <button @click="eliminar_lista(lista.id)" class="btn btn-outline btn-secondary btn-sm ms-1"><strong>x</strong></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {db, storage} from '../utils/firebase.js'
import {addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {uploadBytes, ref, getDownloadURL} from 'firebase/storage'
export default {
    name: 'CatalogoAdminForm',
    data() {
        return {
            descripcion: '',
            precio: null,
            descuento: null,
            categoria: '',
            stock: null,
            estado: null,
            lista_productos: [],
            url: null,
            boton_estado: 0,
        }
    },
    methods: {
        async subir_imagen() {
        // el documento extrae files que es un array, 0 xq escogemos una sola 
        const file = document.getElementById("inp_imagen").files[0]
        if(file){
              // indicar o hacer referencia en que sitio del storage vamos a guardar la imagen
            const referencia = ref(storage,'tienda/'+file.name)
            await uploadBytes(referencia, file).then(() => {
                alert("operacion exitosa!")
            })
            this.url = await getDownloadURL(referencia)
        }else{
            this.url = ''
        }
        },
        async guardar_datos () {
            await this.subir_imagen()
            // se envian los datos a firebase mediante un objeto, un objeto esta conformado por propiedades
            const objeto = {
                descripcion: this.descripcion,
                precio: this.precio,
                descuento: this.descuento,
                categoria: this.categoria,
                stock: this.stock,
                url: this.url,
                estado: this.estado
            }
            // primero se conecta con la base de datos, luego con la coleccion
            const coleccion = collection(db,'tienda')
            /* para añadir un cocumento se necesita saber a que coleccion se va a guardar 
            (coleccion) y que datos se quieren guardar (objeto)*/
            addDoc(coleccion,objeto)
            // despues de guardar, vaciamos los atributos
            this.descripcion = '';
            this.precio = null;
            this.descuento = null;
            this.categoria = '';
            this.stock = null;
            this.estado = null;
        },
        obtener_lista () {
            onSnapshot (collection(db, 'tienda'), (snapshot) => {
                // accedemos a los documentos de la captura de datos para mapearlos
                this.lista_productos = []
                snapshot.docs.map ( (doc) => {
                    /* un objeto se divide en dos partes
                    doc.data tiene internamente nombre, apellido, dni (todo lo contenido en data). 
                    cada objeto representa un documento
                    todo se guarda dentro de un arreglo para despues poder mostrar data e id juntos
                    los 3 puntos indican que dentro de data hay varias propiedades (nombre, dni, apellido, id) */
                    this.lista_productos.push ({...doc.data(), id:doc.id})
                })
            })
        },
        eliminar_lista (id) {
            // 1ro entro a la base, 2do encuentro la coleccion 3ro identifico el id
            deleteDoc(doc(db, 'tienda', id)) 
        },
        editar_lista (lista) {
            this.descripcion = lista.descripcion
            this.precio = lista.precio
            this.descuento = lista.descuento 
            this.categoria = lista.categoria
            this.stock = lista.stock
            this.id = lista.id
            this.boton_estado = 1;
        },
        actualizar_lista () {
            //conformamos objeto con los datos actualizados para enviar
            const listaActualizada = {
                descripcion: this.descripcion,
                precio: this.precio,
                descuento: this.descuento,
                categoria: this.categoria,
                stock: this.stock
            }
            // this.id que se creo en editar, para evitar crear inputs invisibles
            updateDoc (doc(db, 'tienda', this.id), listaActualizada)
            this.boton_estado = 0;
        },

    },
    mounted() {
        this.obtener_lista()
    }
}
</script>
