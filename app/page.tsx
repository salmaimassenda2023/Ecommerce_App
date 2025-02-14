import '../app/globals.css'
import {HeroBanner,Footer,Product} from '../components'
import {client} from "@/sanity/lib/client"


async function getData() {
    try {
        const query = '*[_type == "product"]'
        const products = await client.fetch(query)

        const bannerQuery = '*[_type == "banner"]'
        const bannerData = await client.fetch(bannerQuery)

        return { products, bannerData }
    } catch (error) {
        console.error("Erreur:", error)
        return { products: [], bannerData: [] }
    }
}

// Notez le async ici et la récupération des données
export default async function Home() {
    const { products, bannerData } = await getData()
    // Log pour vérifier les données dans le composant
    console.log("Dans le composant - Produits:", products)
    console.log("Dans le composant - Bannière:", bannerData)

    return (
        <>
            <HeroBanner heroBanner={bannerData?.[0] || {}} />

            <div className="products-heading">
                <h2>Best Selling Product</h2>
                <p>speaker There are many variations passages</p>
            </div>

            <div className="products-container">
                {
                    products?.map((product) => <Product key={product._id} product={product}/>)

                }
            </div>
            <Footer />
        </>
    )
}