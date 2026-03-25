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

// All images from Pexels CDN (reliable, no hotlink blocking)
const P = "https://images.pexels.com/photos"
const Q = "?auto=compress&cs=tinysrgb&w=600"

const products = [
  // ALIMENTOS (Food)
  {
    name: "Premium Adult Dog Food 15kg",
    price: 54.99,
    category: "alimentos",
    description: "Balanced premium food with high-quality proteins, essential vitamins and minerals to keep your dog healthy and energetic. Formula with omega 3 and 6 for a shiny coat.",
    img: `${P}/6568501/pexels-photo-6568501.jpeg${Q}`,
    stock: 25
  },
  {
    name: "Indoor Cat Formula 7.5kg",
    price: 39.99,
    category: "alimentos",
    description: "Specially designed formula for indoor cats with weight control and hairball prevention. Enriched with taurine and L-carnitine for a healthy life.",
    img: `${P}/5731866/pexels-photo-5731866.jpeg${Q}`,
    stock: 18
  },
  {
    name: "Dental Treats for Dogs x12",
    price: 12.99,
    category: "alimentos",
    description: "Dental treats that help reduce tartar and maintain healthy gums. Special texture that cleans teeth while your pet enjoys them.",
    img: `${P}/5731870/pexels-photo-5731870.jpeg${Q}`,
    stock: 40
  },
  {
    name: "Puppy Small Breed Food 3kg",
    price: 24.99,
    category: "alimentos",
    description: "Complete nutrition for small breed puppies with DHA for brain development and adapted kibble size. Rich in calcium and phosphorus for strong bones.",
    img: `${P}/6957667/pexels-photo-6957667.jpeg${Q}`,
    stock: 15
  },

  // JUGUETES (Toys)
  {
    name: "Interactive Sound Ball",
    price: 8.99,
    category: "juguetes",
    description: "Durable rubber ball with built-in sound that stimulates active play. Non-toxic material, ideal for dogs of all sizes. Floats in water.",
    img: `${P}/5255590/pexels-photo-5255590.jpeg${Q}`,
    stock: 30
  },
  {
    name: "Catnip Plush Mouse",
    price: 5.99,
    category: "juguetes",
    description: "Plush mouse toy filled with premium organic catnip. Awakens your cat's hunting instinct and keeps them entertained for hours.",
    img: `${P}/7210754/pexels-photo-7210754.jpeg${Q}`,
    stock: 50
  },
  {
    name: "Kong Classic Fillable Large",
    price: 18.99,
    category: "juguetes",
    description: "Ultra-durable rubber toy that can be filled with treats or paste. Ideal for dogs that love to chew. Bounces unpredictably for more fun.",
    img: `${P}/4587998/pexels-photo-4587998.jpeg${Q}`,
    stock: 20
  },
  {
    name: "Foldable Cat Tunnel",
    price: 11.99,
    category: "juguetes",
    description: "Foldable play tunnel with crinkly material that attracts feline curiosity. Easy to store and transport. Includes hanging ball at entrance.",
    img: `${P}/4588065/pexels-photo-4588065.jpeg${Q}`,
    stock: 12
  },

  // ACCESORIOS (Accessories)
  {
    name: "Orthopedic Dog Bed Large",
    price: 45.99,
    category: "accesorios",
    description: "Bed with memory foam filling that adapts to your pet's body. Washable and non-slip cover. Ideal for senior dogs or those with joint problems.",
    img: `${P}/4587979/pexels-photo-4587979.jpeg${Q}`,
    stock: 8
  },
  {
    name: "LED Adjustable Collar",
    price: 7.99,
    category: "accesorios",
    description: "USB rechargeable LED collar with 3 lighting modes. Perfect for night walks, keeps your pet visible and safe. Water resistant.",
    img: `${P}/5731861/pexels-photo-5731861.jpeg${Q}`,
    stock: 35
  },
  {
    name: "Medium Rigid Carrier",
    price: 32.99,
    category: "accesorios",
    description: "Airline-approved carrier with top and side ventilation. Double-lock security door. Includes travel water bowl.",
    img: `${P}/4588047/pexels-photo-4588047.jpeg${Q}`,
    stock: 10
  },
  {
    name: "Cat Tower Scratcher 120cm",
    price: 38.99,
    category: "accesorios",
    description: "Multi-level scratching tower with platforms, caves and natural sisal posts. Stable and wide base. Your cat's favorite place to play and rest.",
    img: `${P}/6001387/pexels-photo-6001387.jpeg${Q}`,
    stock: 6
  },

  // HIGIENE (Grooming)
  {
    name: "Hypoallergenic Shampoo 500ml",
    price: 9.99,
    category: "higiene",
    description: "Gentle shampoo with aloe vera and colloidal oatmeal for sensitive skin. Paraben and sulfate free. Leaves coat soft, shiny with lasting fresh scent.",
    img: `${P}/5731874/pexels-photo-5731874.jpeg${Q}`,
    stock: 22
  },
  {
    name: "Brushes & Combs Kit x4",
    price: 12.99,
    category: "higiene",
    description: "Complete grooming set with detangling brush, flea comb, soft bristle brush and massage glove. For all coat types.",
    img: `${P}/6001397/pexels-photo-6001397.jpeg${Q}`,
    stock: 28
  },
  {
    name: "Professional Nail Clipper",
    price: 6.99,
    category: "higiene",
    description: "Stainless steel nail clipper with ergonomic non-slip handle and safety guard. Includes file for smooth finish. Suitable for dogs and cats.",
    img: `${P}/1254140/pexels-photo-1254140.jpeg${Q}`,
    stock: 0
  },
  {
    name: "Deodorizing Wet Wipes x80",
    price: 7.99,
    category: "higiene",
    description: "Extra thick wipes with deodorizing formula and vitamin E. Ideal for cleaning paws, coat and ears between baths. Biodegradable and alcohol-free.",
    img: `${P}/4588047/pexels-photo-4588047.jpeg${Q}`,
    stock: 45
  }
]

async function seedProducts() {
  console.log("🗑️  Removing previous products...")
  const productsRef = collection(db, "products")
  const snapshot = await getDocs(productsRef)
  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, "products", docSnap.id))
  }

  console.log(`\n🐾 Uploading ${products.length} products...`)
  for (const product of products) {
    try {
      const docRef = await addDoc(productsRef, product)
      console.log(`✅ ${product.name} — $${product.price} → ${docRef.id}`)
    } catch (error) {
      console.error(`❌ Error: ${product.name}:`, error)
    }
  }

  console.log("\n🎉 Done!")
  process.exit(0)
}

seedProducts()
