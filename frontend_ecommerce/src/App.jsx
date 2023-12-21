import "./App.css";
import NavBar from "./Components/NavBar/NavBar.jsx";
import ProductCard from "./Components/ProductCard/ProductCard.jsx";
import DarkMode from "./Components/DarkMode/DarkMode.jsx";

function App() {
  return (
    <>
      <NavBar />
      <DarkMode />
      <ProductCard />
    </>
  );
}

export default App;
