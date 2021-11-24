// dentro de las llaves, funcion initializeApp
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBDNq-QSUWBCqL6A0JKHQRrelrlKLRxOaQ",
    authDomain: "maia-cet30.firebaseapp.com",
    projectId: "maia-cet30",
    storageBucket: "maia-cet30.appspot.com",
    messagingSenderId: "759929492502",
    appId: "1:759929492502:web:1fb09b04affd5766bd1137",
    measurementId: "G-7DJVK9FTWC"
  };
//ejecutamos funcion encargada de inicializar la coneccion con firebase
const app = initializeApp(firebaseConfig)
// conexion con base de datos firestore, getfirestore nunca va antes que initialize, db es el puente a la base de datos
const db = getFirestore() 
const storage = getStorage(app)
const auth = getAuth()
export {db, storage, auth}
