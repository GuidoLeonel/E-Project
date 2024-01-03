import ProductButton from "../ProductButton/ProductButton.jsx";
import ProductInfo from "../ProductInfo/ProductInfo.jsx";
import ProductImage from "../ProductImage/ProductImage.jsx";
import "./ProductCard.css";
import ItemCount from "../ItemCount/ItemCount.jsx";

function ProductCard() {
  return (
    <div className="product-card shadow">
      <ProductImage />
      <ProductInfo />
      <div className="addQuantityToCart">
        <ItemCount stock={10} init={1} />
        <ProductButton />
      </div>
    </div>
  );
}

export default ProductCard;
