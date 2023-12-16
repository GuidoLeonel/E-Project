import { transporter } from "../config/mailing.js";

const mailCtrl = {};

mailCtrl.sendMail = async (req, res) => {
  const resultado = await transporter.sendMail({
    from: "TEST MAIL guidolp.test@gmail.com",
    to: "guido.leonel.puyo.1@gmail.com",
    subject: "No me hagas reir el culo",
    html: `
        <div>
        <h1>Que haces Marito</h1>
        </div>
        `,
  });

  //console.log(resultado);
  res.send("Email enviado");
};

export default mailCtrl;
