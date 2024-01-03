import "./CategorySelect.css";
import { useState, useEffect } from "react";

function CategorySelect() {
  // Cambia el titulo de la pagina en funcion de la categoria.
  const [category, setCategory] = useState("");

  //Revisa el estado de la categoria y altera el titulo en funcion de lo elegido.
  useEffect(() => {
    document.title = `Categoria ${category}`;
  }, [category]);

  const handlerCategory = (cat) => {
    setCategory(cat);
  };

  return (
    <div className="dropdown dropdown-menu-cstm">
      <a
        className="dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Categorias
      </a>
      <ul
        className="dropdown-menu dropdown-menu-dark"
        aria-labelledby="dropdownMenuButton1"
      >
        <li>
          <button
            className="dropdown-item"
            onClick={() => handlerCategory("Electricidad")}
          >
            Electricidad
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handlerCategory("Plomeria")}
          >
            Plomería
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handlerCategory("Albañileria")}
          >
            Albaliñería
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handlerCategory("Carpinteria")}
          >
            Carpintería
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handlerCategory("Pintura")}
          >
            Pintura
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CategorySelect;
