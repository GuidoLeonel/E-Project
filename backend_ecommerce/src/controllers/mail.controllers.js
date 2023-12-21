import { transporter } from "../config/mailing.js";

const mailCtrl = {};

mailCtrl.sendMail = async (req, res) => {
  const resultado = await transporter.sendMail({
    from: "TEST MAIL guidolp.test@gmail.com",
    to: "guido.leonel.puyo.1@gmail.com",
    subject: "Gracias por su compra",
    html: `
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #333333; text-align: center;">¡Gracias por tu Compra!</h1>
    
    <div style="margin-top: 20px;">
      <p>Estimado/a [Nombre del Cliente],</p>
      <p>Estamos emocionados de informarte que tu compra del siguiente producto tecnológico fue exitosa:</p>
      
      <ul>
        <li><strong>Producto:</strong> [Nombre del Producto]</li>
        <li><strong>Precio:</strong> $[Precio del Producto]</li>
        <!-- Agrega más detalles del producto según sea necesario -->
      </ul>
      
      <p>Tu pedido será enviado a la siguiente dirección:</p>
      <p>[Dirección del Cliente]</p>
      
      <p>Para cualquier pregunta o inquietud, no dudes en <a href="mailto:soporte@example.com" style="color: #4CAF50; text-decoration: none;">contactar a nuestro equipo de soporte</a>.</p>
      
      <p>¡Gracias por elegir nuestro producto tecnológico!</p>
      
      <a href="[Enlace a Información Adicional]" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Ver Detalles del Pedido</a>
    </div>
    
    <div style="margin-top: 20px; text-align: center; color: #777777;">
      <p>Saludos cordiales,<br>Nombre de Tu Empresa</p>
    </div>
  </div>
        `,
  });

  //console.log(resultado);
  res.send({ response: "Sended Email", message: resultado });
};

export default mailCtrl;
