import '../app/globals.css'
import {HeroBanner,Footer} from '../components'

export default function Home() {
  return (
    <>
      <HeroBanner/>

      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="product-container">
        list of products
      </div>

      <Footer/>
    </>
  );
}
