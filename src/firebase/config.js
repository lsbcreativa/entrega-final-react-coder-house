// Configuración de Firebase — conexión a la base de datos Firestore
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Credenciales del proyecto Firebase (estas son públicas por diseño en apps frontend)
const firebaseConfig = {
  apiKey: "AIzaSyDRDUH_vV3YMdmMukgSRssl_hOxHj1y7qQ",
  authDomain: "house-of-prinie.firebaseapp.com",
  projectId: "house-of-prinie",
  storageBucket: "house-of-prinie.firebasestorage.app",
  messagingSenderId: "982732129981",
  appId: "1:982732129981:web:d1a12f814721e6c87e19d4"
}

// Inicializamos Firebase y exportamos la referencia a Firestore
// para usarla en toda la app al consultar productos y crear órdenes
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
