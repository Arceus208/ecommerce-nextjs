import React from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../lib/client";

interface HeroBannerProps {
  heroBanner: any;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image) as any}
          alt="headphones"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${heroBanner.product}`} passHref>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Decription</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
