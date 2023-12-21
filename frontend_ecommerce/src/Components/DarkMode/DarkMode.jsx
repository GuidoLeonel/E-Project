import "./DarkMode.css";
import { useState } from "react";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  const changeMode = () => {
    setDarkMode(!darkMode);
  };

  const styles = darkMode ? "dark" : "clear";

  return (
    <div className={styles}>
      <button className="btn btn-primary" onClick={changeMode}>
        {darkMode ? "Claro" : "Oscuro"}
      </button>
      <h2>Componente Vista</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
        dignissimos minima a quasi incidunt tenetur similique ab exercitationem
        non. Adipisci quod numquam vitae rerum. Illum excepturi dolor maiores
        quaerat sapiente.
      </p>
    </div>
  );
}

export default DarkMode;
