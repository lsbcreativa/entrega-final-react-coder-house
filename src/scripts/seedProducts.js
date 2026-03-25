import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDRDUH_vV3YMdmMukgSRssl_hOxHj1y7qQ",
  authDomain: "house-of-prinie.firebaseapp.com",
  projectId: "house-of-prinie",
  storageBucket: "house-of-prinie.firebasestorage.app",
  messagingSenderId: "982732129981",
  appId: "1:982732129981:web:d1a12f814721e6c87e19d4"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const P = "https://images.pexels.com/photos"
const Q = "?auto=compress&cs=tinysrgb&w=600"

const products = [
  // ALIMENTOS
  {
    name: "Alimento Premium Perro Adulto 15kg",
    price: 199.90,
    category: "alimentos",
    description: "Alimento balanceado premium con proteínas de alta calidad, vitaminas y minerales esenciales para mantener a tu perro saludable y lleno de energía. Fórmula con omega 3 y 6 para un pelaje brillante.",
    img: `${P}/6568501/pexels-photo-6568501.jpeg${Q}`,
    stock: 25
  },
  {
    name: "Alimento Gato Indoor 7.5kg",
    price: 149.90,
    category: "alimentos",
    description: "Fórmula especialmente diseñada para gatos de interior con control de peso y bolas de pelo. Enriquecido con taurina y L-carnitina para una vida saludable.",
    img: `${P}/5731866/pexels-photo-5731866.jpeg${Q}`,
    stock: 18
  },
  {
    name: "Snacks Dentales para Perro x12",
    price: 47.90,
    category: "alimentos",
    description: "Premios dentales que ayudan a reducir el sarro y mantener encías saludables. Textura especial que limpia los dientes mientras tu mascota los disfruta.",
    img: `${P}/5731870/pexels-photo-5731870.jpeg${Q}`,
    stock: 40
  },
  {
    name: "Alimento Cachorro Raza Pequeña 3kg",
    price: 89.90,
    category: "alimentos",
    description: "Nutrición completa para cachorros de raza pequeña con DHA para desarrollo cerebral y croquetas de tamaño adaptado. Rico en calcio y fósforo para huesos fuertes.",
    img: `${P}/6957667/pexels-photo-6957667.jpeg${Q}`,
    stock: 15
  },

  // JUGUETES
  {
    name: "Pelota Interactiva con Sonido",
    price: 32.90,
    category: "juguetes",
    description: "Pelota de goma resistente con sonido incluido que estimula el juego activo. Material no tóxico, ideal para perros de todos los tamaños. Flota en agua.",
    img: `${P}/5255590/pexels-photo-5255590.jpeg${Q}`,
    stock: 30
  },
  {
    name: "Ratón de Peluche con Catnip",
    price: 21.90,
    category: "juguetes",
    description: "Juguete de peluche en forma de ratón relleno con catnip orgánico premium. Despierta el instinto cazador de tu gato y lo mantiene entretenido por horas.",
    img: `${P}/7210754/pexels-photo-7210754.jpeg${Q}`,
    stock: 50
  },
  {
    name: "Kong Classic Rellenable Grande",
    price: 69.90,
    category: "juguetes",
    description: "Juguete de goma ultra resistente que se puede rellenar con premios o pasta. Ideal para perros que les gusta masticar. Rebota de forma impredecible.",
    img: `${P}/4587998/pexels-photo-4587998.jpeg${Q}`,
    stock: 20
  },
  {
    name: "Túnel Plegable para Gatos",
    price: 44.90,
    category: "juguetes",
    description: "Túnel de juego plegable con material crujiente que atrae la curiosidad felina. Fácil de guardar y transportar. Incluye pelota colgante en la entrada.",
    img: `${P}/4588065/pexels-photo-4588065.jpeg${Q}`,
    stock: 12
  },

  // ACCESORIOS
  {
    name: "Cama Ortopédica para Perro Grande",
    price: 169.90,
    category: "accesorios",
    description: "Cama con relleno de espuma viscoelástica que se adapta al cuerpo de tu mascota. Funda lavable y antideslizante. Ideal para perros senior o con problemas articulares.",
    img: `${P}/4587979/pexels-photo-4587979.jpeg${Q}`,
    stock: 8
  },
  {
    name: "Collar Ajustable con LED",
    price: 29.90,
    category: "accesorios",
    description: "Collar con luz LED recargable por USB con 3 modos de iluminación. Perfecto para paseos nocturnos, mantiene a tu mascota visible y segura. Resistente al agua.",
    img: `${P}/5731861/pexels-photo-5731861.jpeg${Q}`,
    stock: 35
  },
  {
    name: "Transportadora Rígida Mediana",
    price: 119.90,
    category: "accesorios",
    description: "Transportadora aprobada por aerolíneas con ventilación superior y lateral. Puerta de seguridad con doble cierre. Incluye bebedero de viaje.",
    img: `${P}/4588047/pexels-photo-4588047.jpeg${Q}`,
    stock: 10
  },
  {
    name: "Rascador Torre para Gatos 120cm",
    price: 144.90,
    category: "accesorios",
    description: "Torre rascador de múltiples niveles con plataformas, cuevas y postes de sisal natural. Base estable y amplia. El lugar favorito de tu gato para jugar y descansar.",
    img: `${P}/6001387/pexels-photo-6001387.jpeg${Q}`,
    stock: 6
  },

  // HIGIENE
  {
    name: "Shampoo Hipoalergénico 500ml",
    price: 36.90,
    category: "higiene",
    description: "Shampoo suave con aloe vera y avena coloidal para pieles sensibles. Sin parabenos ni sulfatos. Deja el pelaje suave, brillante y con aroma fresco duradero.",
    img: `${P}/5731874/pexels-photo-5731874.jpeg${Q}`,
    stock: 22
  },
  {
    name: "Kit de Cepillos y Peines x4",
    price: 47.90,
    category: "higiene",
    description: "Set completo de grooming con cepillo desenredante, peine de pulgas, cepillo de cerdas suaves y guante masajeador. Para todo tipo de pelaje.",
    img: `${P}/6001397/pexels-photo-6001397.jpeg${Q}`,
    stock: 28
  },
  {
    name: "Cortaúñas Profesional con Lima",
    price: 25.90,
    category: "higiene",
    description: "Cortaúñas de acero inoxidable con mango ergonómico antideslizante y protector de seguridad. Incluye lima para acabado suave. Apto para perros y gatos.",
    img: `${P}/1254140/pexels-photo-1254140.jpeg${Q}`,
    stock: 0
  },
  {
    name: "Toallitas Húmedas Desodorizantes x80",
    price: 29.90,
    category: "higiene",
    description: "Toallitas extra gruesas con fórmula desodorizante y vitamina E. Ideales para limpiar patas, pelaje y oídos entre baños. Biodegradables y sin alcohol.",
    img: `${P}/4588047/pexels-photo-4588047.jpeg${Q}`,
    stock: 45
  }
]

async function seedProducts() {
  console.log("🗑️  Eliminando productos anteriores...")
  const productsRef = collection(db, "products")
  const snapshot = await getDocs(productsRef)
  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, "products", docSnap.id))
  }

  console.log(`\n🐾 Subiendo ${products.length} productos (Soles)...`)
  for (const product of products) {
    try {
      const docRef = await addDoc(productsRef, product)
      console.log(`✅ ${product.name} — S/ ${product.price} → ${docRef.id}`)
    } catch (error) {
      console.error(`❌ Error: ${product.name}:`, error)
    }
  }

  console.log("\n🎉 ¡Listo!")
  process.exit(0)
}

seedProducts()
