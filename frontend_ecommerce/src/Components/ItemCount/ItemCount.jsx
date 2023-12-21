import "./ItemCount.css";
import { useState } from "react";

function ItemCount() {
  const [counter, setCounter] = useState(1); //Coloco el valor inicial del estado.

  const addOne = () => {
    setCounter(counter + 1);
  };

  const substractOne = () => {
    setCounter(counter - 1);
  };

  return (
    <div>
      <button onClick={addOne}>+</button>
      <p> {counter} </p>
      <button onClick={substractOne}>-</button>
    </div>
  );
}

export default ItemCount;
