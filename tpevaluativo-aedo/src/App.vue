<template>
  <!--navbar-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Tienda</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-link active" to="/"><i>Home</i></router-link>
        <router-link class="nav-link" to="/about"><i>About</i></router-link>
        <router-link v-if="usuario?.email != null" class="nav-link" to="/catalogoadmin"><i>Carga de productos</i></router-link>
        <router-link v-if="usuario?.email == null" class="nav-link" to="/catalogopublic"><i>Catalogo</i></router-link>
      </div>
       <div class="navbar-nav ms-auto">
        <!-- ? quiere decir que no siempre va a existir,
        muestra un email solo cuando exista -->
        <h6 class="nav-link">{{usuario?.email}}</h6>
        <router-link v-if="usuario?.email == null" class="nav-link" to="/autenticacion">Iniciar Sesión</router-link>
        <button @click="cerrar_sesion()" v-if="usuario?.email != null" class="btn btn-primary btn-sm"> Cerrar Sesión </button>
      </div>
    </div>
  </div>
  </nav>
  <div class="container mt-4">
    <router-view/>
  </div>
</template>
<script>
import {auth} from '@/utils/firebase.js'
import {onAuthStateChanged, signOut} from 'firebase/auth'
export default {
  data(){
    return {
      usuario: null,
    }
  },
  methods: {
    usuario_logueado(){
      onAuthStateChanged(auth, (user) => {
        this.usuario = user;
      })
    },
    cerrar_sesion(){
      // try catch intenta un operacion, si no funciona muestra un mensaje
      try {
        // signout primero necesita acceso a la autenticacion
        signOut(auth)
      } catch (error) {
        alert('Algo sucedió')
      }
      this.$router.push('/')
    }
  },
  mounted(){
    this.usuario_logueado()
  }
}
</script>

