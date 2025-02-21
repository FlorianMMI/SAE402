import { getRequest } from "./api.js";

const userData = await getRequest("user?name=" + storedUserInput);

// mise en position des valeurs de l'utilisateur
const user = userData[0];
const userMoney = user.money;
const userRound = user.round;

console.log("userMoney", userMoney);
// setmoney
document.getElementById("money").value = userMoney;
// setround