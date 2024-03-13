import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cart from "./cart";

export default function Home({ products }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Filter products based on search query and category
  const filterAndSortProducts = () => {
    const filteredProducts = products?.products?.filter((product) => {
      const matchesSearch =
        product?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product?.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return filteredProducts?.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const sortedProducts = filterAndSortProducts();

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  if (!products) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isCartOpen ? (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          closeCart={closeCart}
        />
      ) : (
        <div>
          <div className="header">
            <h1>Product Listing</h1>
            <div className="header-buttons">
              <span
                className="add-to-cart-icon"
                onClick={openCart}
                style={{ cursor: "pointer" }}
              >
                🛒
                <span className="notification-count">{cartItems.length}</span>
              </span>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="filter-container">
            <label>Filter by:</label>
            <div className="filter-options">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="select-box"
              >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>

              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="select-box"
              >
                <option value="">All Categories</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">Fragrances</option>
                <option value="skincare">Skincare</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Home decoration</option>
              </select>
            </div>
          </div>

          <ul className="product-list">
            {sortedProducts.map((product) => (
              <li key={product.id} className="product-item">
                <Link href={`/products/${product.id}`}>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                </Link>
                <div className="product-details">
                  <p>Price: ${product.price}</p>
                  <p>Rating: {product.rating}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Brand: {product.brand}</p>
                  <p>Category: {product.category}</p>

                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const apiUrl = "https://dummyjson.com/products";
  const response = await axios.get(apiUrl);
  const products = response.data;
  return {
    props: {
      products,
    },
  };
}
