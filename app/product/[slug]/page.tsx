'use client'
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState, use } from "react";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { Product as ProductComponent } from '../../../components'
import {useCartContext} from '../../context/CartContext'


interface ProductPageProps {
    params: { slug: string };
}

interface SanityProduct {
    _id: string;
    name: string;
    image: any[];
    details: string;
    price: number;
    slug: {
        current: string;
    };
}

const ProductDetails = ({ params }: ProductPageProps) => {
    const unwrappedParams = use(params);
    // get Context Variables
    const {incQty,decQty,qty,addToCart,setShowCart}=useCartContext();

    // states
    const [product, setProduct] = useState<SanityProduct | null>(null);
    const [productsList, setProductsList] = useState<SanityProduct[]>([]);
    const [index, setIndex] = useState(0);

    // fetch data from sanity
    useEffect(() => {
        const { slug } = unwrappedParams || {};

        const getData = async () => {
            if (slug) {
                try {
                    const query = `*[_type == "product" && slug.current == "${slug}"]`;
                    const productData = await client.fetch(query);

                    const productsQuery = '*[_type == "product"]';
                    const productsListData = await client.fetch(productsQuery);

                    setProduct(productData[0]);
                    setProductsList(productsListData);
                } catch (error) {
                    console.error("Erreur lors de la récupération des données:", error);
                }
            }
        };

        getData();
    }, [unwrappedParams]);

    if (!product) {
        return <div>Chargement...</div>;
    }

    const { image, name, details, price } = product;

      // handel functions
     const handleBuyNow=()=>{

     };



    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        {image && image[0] && (
                            <img
                                src={urlFor(image[index]).url()}
                                alt={name}
                                className="product-detail-image"
                            />
                        )}
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img
                                key={i}
                                src={urlFor(item).url()}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                                alt={`${name} view ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>

                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>

                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                           <span className="minus" onClick={decQty}>
                               <AiOutlineMinus />
                           </span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={incQty}>
                               <AiOutlinePlus />
                           </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => addToCart(product, qty)}>
                            Add to Cart
                        </button>
                        <button type="button" className="buy-now" >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {productsList.map((item) => (
                            <ProductComponent key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;