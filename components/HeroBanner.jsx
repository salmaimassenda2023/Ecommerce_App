import React from 'react'
import Image from "next/image";
import Link from "next/link";

const HeroBanner=()=>{
    return(
        <div className="hero-banner-container">

         <div>
            <p className="beats-solo">SMALL TEXT</p>
             <h3>MID TEXT</h3>
             <Image src="" alt="headphones" className="hero-banner-image"/>
         </div>
            <div>
                 <Link href="/product/ID">
                     <button type="button">Button Text</button>
                 </Link>
                <div className="desc">
                   <h5>Description</h5>
                    <p>Description</p>
                </div>
            </div>



        </div>
    )
}
export default HeroBanner