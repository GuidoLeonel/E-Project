import "./ItemCount.css";
import PropTypes from "prop-types";
import { useState } from "react";

function ItemCount(props) {
  const [counter, setCounter] = useState(props.init); //Coloco el valor inicial del estado.

  const addOne = () => {
    if (counter < props.stock) {
      setCounter(counter + 1);
    }
  };

  const substractOne = () => {
    if (counter > props.init) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="counterContainer">
      <button onClick={substractOne} className="btn btn-secondary">
        -
      </button>
      <p> {counter} </p>
      <button onClick={addOne} className="btn btn-secondary">
        +
      </button>
    </div>
  );
}

ItemCount.propTypes = {
  init: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
};

export default ItemCount;
