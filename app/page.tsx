"use client"
// import Image from "next/image";
// import axios from 'axios';
import { useState } from 'react';
import { products } from '../data';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
      <div>
        {
        products.map( (product, index) => {
          return (<Products key={index} product={product} />)
        })
      }
      </div>
  );
}

type ProductProps = {
    id: string,
    name: string,
    description: string,
    price: string,
    currency: string
}

const Products = ({ product }: ProductProps) => {
    const [loading, setLoading] =  useState(false);
    const cryptomous = async () => {
      setLoading(true)
      try {
        const data = await fetch('/api/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: product.id }),
        });
        setLoading(false)
        // window.open(data.data.hosted_url, '_blank');
      } catch (e) {
        console.error(e)
        setLoading(false)
      }
    }
  
    return (
      <div className="border-2">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p>Price: {product.price} {product.currency}</p>
        <Button onClick={cryptomous} disabled={loading}>Pay With Crypto</Button>
      </div>
    )
  }