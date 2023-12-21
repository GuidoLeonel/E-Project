import "./Message.css";
import { useState } from "react";

function Message() {
  const [mensaje, setMensaje] = useState(false);

  const handleMessage = () => {
    setMensaje(!mensaje);
  };

  return (
    <div>
      <button onClick={handleMessage}>{mensaje ? "Ocultar" : "Mostrar"}</button>

      {mensaje && <h2 style={{ color: "white" }}>Aguante el useState</h2>}
    </div>
  );
}

export default Message;
