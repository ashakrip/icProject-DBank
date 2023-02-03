import { dbank2_backend } from "../../declarations/dbank2_backend";

window.addEventListener('load', async function () {
  update();
});

document.querySelector("form").addEventListener("submit", async function (event) {
  // console.log("Submitted");
  event.preventDefault();


  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank2_backend.topUp(inputAmount);
  }

  const currentAmount = await dbank2_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank2_backend.withdraw(outputAmount);
  }

  await dbank2_backend.compound();

  update()

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");
});

async function update() {
  const currentAmount = await dbank2_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}