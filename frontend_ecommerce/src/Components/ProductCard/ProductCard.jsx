import ProductButton from "../ProductButton/ProductButton.jsx";
import ProductInfo from "../ProductInfo/ProductInfo.jsx";
import ProductImage from "../ProductImage/ProductImage.jsx";
import "./ProductCard.css";

function ProductCard() {
  return (
    <div className="product-card">
      <ProductImage />
      <ProductInfo />
      <ProductButton />
    </div>
  );
}

export default ProductCard;
