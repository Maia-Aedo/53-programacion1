<template>
    <div class="row justify-content-md-center">
        <div class="col-md-auto">
            <div class="mb-3 text-center">
                <h4><u>Ingresar al sistema</u></h4>
            </div>
            <div class="mb-3">
                <label class="form-label">Correo electronico</label>
                <input v-model="correo" class="form-control" type="email">
            </div>
            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input v-model="password" class="form-control" type="password">
            </div>
            <button @click="registrar_usuario()" class="btn btn-outline-success">Registrar</button>
            <button @click="iniciar_sesion()" class="btn btn-outline-secondary ms-3">Ingresar</button>
        </div>
    </div>
</template>
<script>
import {auth} from '../utils/firebase.js' 
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
export default {
    name: 'AutenticacionForm',
    data() {
        return {
           correo: '',
           password: '', 
        }
    },
    methods: {
        vaciar() {
            this.correo = '',
            this.password = ''
        },
        async registrar_usuario(){
            //si falla el catch se encarga de enviar un mensaje diciendo qué pasó
            try {
                await createUserWithEmailAndPassword(auth, this.correo, this.password)
                this.vaciar()
            } catch (error) {
                alert('Error al crear el usuario')
            }
        },
        // vienen de la red, pueden venir con delay
        async iniciar_sesion(){
            try {
               await signInWithEmailAndPassword(auth, this.correo, this.password)
               alert('Se inició sesión de manera exitosa')
               // una vez iniciado sesion nos redirige a otra pantalla, en este caso, taller
               this.$router.push('tienda')
            } catch (error) {
                alert('Algo sucedió')
            }
        }
    }
}
</script>