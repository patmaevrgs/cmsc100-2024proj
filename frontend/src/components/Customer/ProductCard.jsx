function ProductCard({ product, addToCart }) {
  const { _id, productName, productDescription, productPrice, productQuantity, productType } = product;

  const handleAddToCart = () => {
    addToCart(product);
    console.log(`Added ${productName} to cart!`);
  };

  const productTypeOptions = [
    { value: 1, label: 'Staple' },
    { value: 2, label: 'Fruits/Vegetables' },
    { value: 3, label: 'Livestock' },
    { value: 4, label: 'Seafood' },
    { value: 5, label: 'Others' },
  ];
  
  const getProductTypeLabel = (type) => {
    const option = productTypeOptions.find(option => option.value === parseInt(type));
    return option ? `${option.label} (${type})` : type;
  };

  return (
    <div className="product-card">
      <img className="product-image" src={product.productImage} alt={product.productName}/>
      <div className='product-each-info'>
        <div>
          <h3 className="product-name">{productName}</h3>
          <p className="product-price"><i className="fas fa-peso-sign" />{productPrice}</p>
          </div>
        <div className="type-qty1">
          <p className="product-description">Description: {productDescription}</p>
          <p className="product-type1">{getProductTypeLabel(product.productType)}</p>
        </div>
        {productQuantity > 0 ? (
          <div>
            <p className="product-quantity">Available Quantity: {productQuantity}</p>
            <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
          </div>
        ) : (
          <p className="product-quantity">Out of Stock</p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;