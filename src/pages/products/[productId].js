import Link from "next/link";
import axios from "axios";

export default function ProductPage({ product }) {
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-des">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
      />
      <div className="product-details">
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating}</p>
        <p>Stock: {product.stock}</p>
        <p>Brand: {product.brand}</p>
        <p>Category: {product.category}</p>
        <button className="add-to-cart-button">Add to Cart</button>
        <Link href="/" className="back-to-home-button">Back to Home</Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const productId = query.productId;
    const apiUrl = `https://dummyjson.com/products/${productId}`;
    const response = await axios.get(apiUrl);
    const product = response.data;

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch {
    return {
      props: {
        product: null,
      },
    };
  }
}
