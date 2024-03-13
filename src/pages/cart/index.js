import React from "react";

const Cart = ({ cartItems, removeFromCart, closeCart }) => {
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <>
      <div className="header">
        <h2>Shopping Cart</h2>
        <div className="header-buttons">
          <span
            className="add-to-cart-icon"
            onClick={closeCart}
            style={{ cursor: "pointer" }}
          >
            ❌
          </span>
        </div>
      </div>
      <div className="cart">
        <ul className="product-list">
          {cartItems.map((product) => (
            <li key={product.id} className="product-item">
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

                <button
                  className="add-to-cart-button"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  Remove Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Cart;
