import ProductButton from "../ProductButton/ProductButton.jsx";
import ProductInfo from "../ProductInfo/ProductInfo.jsx";
import ProductImage from "../ProductImage/ProductImage.jsx";
import "./ProductCard.css";
import ItemCount from "../ItemCount/ItemCount.jsx";

function ProductCard() {
  return (
    <div className="product-card">
      <ProductImage />
      <ProductInfo />
      <ItemCount />
      <ProductButton />
    </div>
  );
}

export default ProductCard;
