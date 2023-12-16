import { Schema, model } from "mongoose";

const randomCode = () => {
  let randomLetters = [];

  for (let i = 0; i < 6; i++) {
    let randomNum = Math.floor(Math.random() * 26);
    let oneRandomLetter = String.fromCharCode(65 + randomNum);
    randomLetters.push(oneRandomLetter);
  }

  let unify = randomLetters.join("");
  let randomDate = Date.now();
  let codex = randomDate + unify;
  //console.log(codex);
  return codex;
};

function formatTimestamp() {
  let time = Date.now();

  const date = new Date(time);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

const ticketSchema = new Schema({
  purchase_datetime: {
    type: String,
    default: formatTimestamp(),
  },
  code: {
    type: String,
    default: randomCode(),
  },
  amount: {
    type: Number,
    default: 0,
  },
  purchaser: {
    type: String,
    default: "Comprador",
  },
});

const ticketModel = model("tickets", ticketSchema);

export default ticketModel;
