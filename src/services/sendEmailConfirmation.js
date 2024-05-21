import nodemailer from "nodemailer";
import dotenv from "dotenv";
import convertToReal from "../utils/convertToReal.js";

export default async function sendEmailConfirmation(userData, saleData) {
  const { name: userName, email } = userData;
  const { total } = saleData;
  const date = new Date(saleData.createdAt);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    dateStyle: "short",
  });
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    timeStyle: "short",
  });

  dotenv.config();
  const USER_EMAIL = process.env.USER_LOGIN_EMAIL;
  const USER_PASSWORD = process.env.USER_LOGIN_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USER_EMAIL,
      pass: USER_PASSWORD,
    },
  });

  const saleItemsHtml = saleData.salesProductsInfo
    .map(
      ({ name, type, quantity, unitPrice, total, createdAt }) => `
    <tr>
      <td>${name}</td>
      <td>${type}</td>
      <td style="text-align: center;">${quantity}</td>
      <td style="text-align: center;">${convertToReal(unitPrice)}</td>
      <td style="text-align: start;">${convertToReal(
        unitPrice * quantity
      )}</td>
    </tr>
  `
    )
    .join("");

  const mailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: `Olá, ${userName.split(" ")[0]}! Você comprou conosco!`,
    html: `
      <h3>Olá, ${userName}!</h3>
      <br>
      <p>Obrigado por comprar na VP Crossfit!</p>
      <p>Estes são os produtos que você comprou conosco no dia <b>${formattedDate}</b>, às <b>${formattedTime}</b>, no valor total de <b>${convertToReal(
      total
    )}</b>.</p>
      <table style="width:100%; border: 1px solid black; background-color: #eee">
        <tr style="background-color: #bbb">
          <th>Produto</th>
          <th>Categoria</th>
          <th>Quantidade</th>
          <th>Preço Unitário</th>
          <th>Total</th>
        </tr>
        ${saleItemsHtml}
      </table>
      <br><br>
      <p>Agradecemos pela preferência.</p>
      <p>Volte sempre!</p>
      <br><br>
      <hr>
      <b style="font-style: italic;">EQUIPE VP CROSSFIT</b>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
