import { getRequest } from "./api-request.js";


let storedUserInput = JSON.parse(localStorage.getItem("currentUserInput"));
console.log("Render", storedUserInput);

const userData = await getRequest("user?name=" + storedUserInput);


// document.addEventListener("DOMContentLoaded", () => {
//   if (userData) {
//     const userMoney = userData[0].money;
//     console.log("userMoney: ", userMoney);
//     if (userData && userMoney !== undefined) {
//       document.querySelector("#money").setAttribute("value", userMoney);
//       console.log("Données enregistrées: ", userData);
//       console.log("Thunes dans la pocket ", userMoney);
//     }
//   }
// });





// Shop characters and colors

  let characters = [
    {
      url: "models/teacher/Astronaut.glb",
      img: "assets/teacher/Astronaut.png",
      name: "Astronaut",
      price: "10",
      description: "Space traveler",
    },
    {
      url: "models/teacher/Beach Character.glb",
      img: "assets/teacher/Beach Character.png",
      name: "Beach Character",
      price: "2",
      description: "Chill guy",
    },
    {
      url: "models/teacher/Business Man.glb",
      img: "assets/teacher/Business Man.png",
      name: "Business Man",
      price: "4",
      description: "Rich guy",
    },
    {
      url: "models/teacher/Casual Character.glb",
      img: "assets/teacher/Casual Character.png",
      name: "Casual",
      price: "3",
      description: "Casual Character",
    },
    {
      url: "models/teacher/King.glb",
      img: "assets/teacher/King.png",
      name: "King",
      price: "1",
      description: "King",
    },
    {
      url: "models/teacher/Punk.glb",
      img: "assets/teacher/Punk.png",
      name: "Punk",
      price: "2",
      description: "Punk",
    },
    {
      url: "models/teacher/Swat.glb",
      img: "assets/teacher/Swat.png",
      name: "Swat",
      price: "4",
      description: "Swat",
    },
    {
      url: "models/teacher/Worker.glb",
      img: "assets/teacher/Farmer.png",
      name: "Worker",
      price: "5",
      description: "Worker",
    },
  ];


  
  let colors = [
    { normal: "#8B5A2B", dark: "#654321", price: 5 }, // Chêne
    { normal: "#A67B5B", dark: "#6F4F28", price: 7 }, // Noyer
    { normal: "#D2B48C", dark: "#A08050", price: 3 }, // Bois clair
    { normal: "#6B4226", dark: "#4E2A14", price: 6 }, // Acajou
    { normal: "#4B3621", dark: "#2E1A0F", price: 8 }, // Ébène
    { normal: "#B0A999", dark: "#7D7461", price: 4 }, // Beige pierre
    { normal: "#5D5C61", dark: "#3C3B3D", price: 9 }, // Gris anthracite
    { normal: "#FFF8DC", dark: "#EED5B7", price: 2 }, // Ivoire
    { normal: "#C0C0C0", dark: "#808080", price: 10 }, // Métallisé
    { normal: "#3F301D", dark: "#22150C", price: 1 }  // Bois foncé
  ];
  




  
  let renderMarket = function () {
    let ascene = document.querySelector('a-scene');
//merchant
    let merchant = document.createElement('a-entity');
    merchant.setAttribute('gltf-model', '#Snorlax');
    merchant.setAttribute('scale', '3 3 1.5');
    merchant.setAttribute('position', '5.5 .8 8.5');
    merchant.setAttribute('rotation', '0 35 0');
    merchant.setAttribute('id', 'Snorlax');
    ascene.appendChild(merchant);
    merchant.addEventListener("click", function () {
      renderTableInFrontOfMerchant();
    });
  // listening to the click event on the table 
    let atable = document.getElementById("Table-shop");
    atable.addEventListener("click", function () {
      let otherboxes = document.querySelectorAll("#character-list");
      let othertext = document.querySelectorAll("#text-product");
      let money = document.getElementById("money");
      let moneyvalue = money.getAttribute("value");
      // delete the previous boxes and text if thhe shop has already been opened
      if (otherboxes) {
        otherboxes.forEach((box) => {
          box.parentNode.removeChild(box);
        });
      }
      if (othertext) {
        othertext.forEach((box) => {
          box.parentNode.removeChild(box);
        });
      }
      colors.forEach((color, index) => {
        //verification if the user has already bought the color
        if (userData.id_shop.includes(color.normal)) { // Recherche BDD 
          color.price = 0;
        }
        const aBox = document.createElement("a-box");
        aBox.setAttribute("color", color.normal);
        aBox.setAttribute("width", ".5");
        aBox.setAttribute("height", ".5");
        aBox.setAttribute("depth", ".5");
        aBox.setAttribute("rotation", `0 0 0`);
        aBox.setAttribute("id", `box-color`);
        aBox.setAttribute("position", `${3 - (index % 5) * .5} ${3.1 - Math.floor(index / 5) * 1.4} 9.25`);
        const atext = document.createElement("a-text");
        if (color.price == 0){
          atext.setAttribute("value","");
        }
        else{
          atext.setAttribute("value", color.price);
        }
        atext.setAttribute("color", "black");
        atext.setAttribute("id","text-product")
        atext.setAttribute("position", `${3.05 - (index % 5) * .49} ${2.75 - Math.floor(index / 5) * 1.4} 8.75`);
        atext.setAttribute("scale", "1 1 1");
        atext.setAttribute("rotation", "0 180 0");
        ascene.appendChild(atext);
        ascene.appendChild(aBox);
        aBox.addEventListener("click", function () {
          if (Number(color.price) > Number(moneyvalue)){
            renderBoard();
          }
          else{
            let tabletops = document.querySelectorAll("#table-top");
            tabletops.forEach((tabletop) => {
              tabletop.setAttribute("color", color.normal);
            });
            let tablebottoms = document.querySelectorAll("#table-bot");
            tablebottoms.forEach((tablebottom) => {
              tablebottom.setAttribute("color", color.dark);
          });
          atext.setAttribute("value","");
          
          moneyvalue = moneyvalue - color.price;
          money.setAttribute("value", moneyvalue);
          color.price = 0;
          if (!userData.id_shop.includes(color.normal)) {
            userData.id_shop.push(color.normal); // Insert bdd

            


            // players = players.map(player => player.player_name === storedUserInput ? userData : player);
            // localStorage.setItem("players", JSON.stringify(players));
            // console.log("Données enregistrées: ", userData);
          }
          }
  
        });
  
      });
    });
    //listening of the event on the character
    let acharacter = document.getElementById("Character-shop");
    acharacter.addEventListener("click", function () {
      let money = document.getElementById("money");
      let moneyvalue = money.getAttribute("value");
      let otherboxes = document.querySelectorAll("#box-color");
      let othertext = document.querySelectorAll("#text-product");
      //Delete the previous boxes and text if the shop has already been opened
      if (otherboxes) {
        otherboxes.forEach((box) => {
          box.parentNode.removeChild(box);
        });
      }
      if (othertext) {
        othertext.forEach((box) => {
          box.parentNode.removeChild(box);
        });
      }
  
      characters.forEach((character, index) => {
        //verification if the user has already bought the character
        console.log(userData);
        if (userData.id_shop.includes(character.name)) {
          character.price = 0;
        }
        const characterEntity = document.createElement("a-image");
        characterEntity.setAttribute("src", character.img);
        characterEntity.setAttribute("width", "0.4");
        characterEntity.setAttribute("height", "1");
        characterEntity.setAttribute("alt", character.name);
        characterEntity.setAttribute("position", `${3 - (index % 5) * .5} ${3.2 - Math.floor(index / 5) * 1.5} 9.45`);
        characterEntity.setAttribute("rotation", "0 180 0");
        characterEntity.setAttribute("id", `character-list`);
        const atext = document.createElement("a-text");
        if (character.price == 0){
          atext.setAttribute("value","");
        }
        else{
          atext.setAttribute("value", character.price);
        }
        atext.setAttribute("color", "black");
        atext.setAttribute("id","text-product")
        atext.setAttribute("position", `${3.05 - (index % 5) * .49} ${2.75 - Math.floor(index / 5) * 1.4} 8.75`);
        atext.setAttribute("scale", "1 1 1");
        atext.setAttribute("rotation", "0 180 0");
        ascene.appendChild(atext);
        ascene.appendChild(characterEntity);
        characterEntity.addEventListener("click", function () {
          
          if (Number(character.price) <= Number(moneyvalue)) {
            let characters = document.getElementById("characters");
            characters.setAttribute("gltf-model", character.url);
            moneyvalue = moneyvalue - character.price;
            //update bdd money
            money.setAttribute("value", moneyvalue);
            character.price = 0;
            atext.setAttribute("value","");
            if (!userData.id_shop.includes(character.name)) {
              userData.id_shop.push(character.name);
              //insert BDD
              // players = players.map(player => player.player_name === storedUserInput ? userData : player);
              // localStorage.setItem("players", JSON.stringify(players));
              // console.log("Données enregistrées: ", userData);
            }
          } else{
              renderBoard();
              console.log(character.price, moneyvalue);
          }
  
        });
      });
    });
  }







  
  let renderBoard = function () {
    let ascene = document.querySelector('a-scene');
    const box1 = document.createElement("a-box");
    box1.setAttribute("static-body", "");
    box1.setAttribute("position", "2 2.25 8.6");
    box1.setAttribute("scale", "4 2.5 0.01");
    box1.setAttribute("color", "#093e2e");
    ascene.appendChild(box1);
  
    const box2 = document.createElement("a-box");
    box2.setAttribute("static-body", "");
    box2.setAttribute("position", "2 3.5 8.6");
    box2.setAttribute("scale", "4.1 0.1 0.05");
    box2.setAttribute("color", "#885f32");
    ascene.appendChild(box2);
  
    const box3 = document.createElement("a-box");
    box3.setAttribute("static-body", "");
    box3.setAttribute("position", "2 1 8.6");
    box3.setAttribute("scale", "4.1 0.1 0.05");
    box3.setAttribute("color", "#885f32");
    ascene.appendChild(box3);
  
    const box4 = document.createElement("a-box");
    box4.setAttribute("static-body", "");
    box4.setAttribute("position", "0 2.25 8.6");
    box4.setAttribute("scale", "0.1 2.55 0.05");
    box4.setAttribute("color", "#885f32");
    ascene.appendChild(box4);
  
    const box5 = document.createElement("a-box");
    box5.setAttribute("static-body", "");
    box5.setAttribute("position", "4 2.25 8.6");
    box5.setAttribute("scale", "0.1 2.55 0.05");
    box5.setAttribute("color", "#885f32");
    ascene.appendChild(box5);
  
    let aText = document.createElement("a-text");
    aText.setAttribute("id", "vocab-comp");
      aText.setAttribute("value", "You don't have enough\nmoney to buy this item");
    aText.setAttribute("scale", "1 1 1");
    aText.setAttribute("position", `2 2.5 8.59`);
    aText.setAttribute("rotation", "0 180 0");
    aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
    aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
    aText.setAttribute("negate", "false");
    aText.setAttribute("align", "center");
    aText.setAttribute("color", "#FFF");
    ascene.appendChild(aText);
  
    setTimeout(() => {
    ascene.removeChild(box1);
    ascene.removeChild(box2);
    ascene.removeChild(box3);
    ascene.removeChild(box4);
    ascene.removeChild(box5);
    ascene.removeChild(aText);
    }, 3000);
  };

  let fish = document.getElementById("pufferfish");
  console.log(fish);
  fish.addEventListener("mouseup", function () {
    let fishPosition = fish.getAttribute('position');
    console.log(fishPosition);
  if ((fishPosition.x < -2 && fishPosition.x > -5) && (fishPosition.y > 0 && fishPosition.y < 3) && (fishPosition.z > 7.5 && fishPosition.z < 10)  ){
    fish.removeAttribute('animation-mixer');
    fish.setAttribute('animation-mixer', 'clip:Fish_Armature|Death; loop: once; timeScale: 1');
    setTimeout(function () {
      fish.removeAttribute('animation-mixer');
      fish.removeAttribute('dynamic-body'); 
      fish.setAttribute('rotation', '0 0 180');   
      setTimeout(function () {
        fish.setAttribute('animation', 'property: position; to:-4 1.75 8.9; dur: 2000; easing: linear');
        let ascene = document.querySelector('a-scene');
        let text = document.createElement('a-text');
        text.setAttribute('value', 'You killed the puffer fish !');
        text.setAttribute('position', '-4 2.25 8');
        text.setAttribute('align', 'center');
        text.setAttribute('color', 'red');
        text.setAttribute('font', './assets/font/Gloria-msdf.json');
        text.setAttribute('font-image', './assets/font/Gloria-msdf.png');
        text.setAttribute('negate', 'false');
        text.setAttribute('scale', '.75 .75 .75');
        text.setAttribute('rotation', '0 180 0');
        ascene.appendChild(text);
      }, 100);
    }, 100);
}
  });
renderMarket();


let renderTableInFrontOfMerchant = function () {
  let ascene = document.querySelector('a-scene');
  let existingTables = document.querySelectorAll('#market-table');
  if (existingTables.length > 0) {
    existingTables.forEach(table => ascene.removeChild(table));
  } else {
    const box1 = document.createElement("a-box");
    box1.setAttribute("static-body", "");
    box1.setAttribute("position", "5 2.25 8");
    box1.setAttribute("scale", "2 1.25 0.01");
    box1.setAttribute("color", "#093e2e");
    box1.setAttribute("rotation", "0 45 0");
    box1.setAttribute("id", "market-table");
    ascene.appendChild(box1);

    const box2 = document.createElement("a-box");
    box2.setAttribute("static-body", "");
    box2.setAttribute("position", "5 2.85 8");
    box2.setAttribute("scale", "2.05 0.05 0.05");
    box2.setAttribute("color", "#885f32");
    box2.setAttribute("rotation", "0 45 0");
    box2.setAttribute("id", "market-table");
    ascene.appendChild(box2);

    const box3 = document.createElement("a-box");
    box3.setAttribute("static-body", "");
    box3.setAttribute("position", "5 1.65 8");
    box3.setAttribute("scale", "2.05 0.05 0.05");
    box3.setAttribute("color", "#885f32");
    box3.setAttribute("rotation", "0 45 0");
    box3.setAttribute("id", "market-table");
    ascene.appendChild(box3);

    const box4 = document.createElement("a-box");
    box4.setAttribute("static-body", "");
    box4.setAttribute("position", "4.28 2.25 8.72");
    box4.setAttribute("scale", "0.05 1.25 0.05");
    box4.setAttribute("color", "#885f32");
    box4.setAttribute("rotation", "0 45 0");
    box4.setAttribute("id", "market-table");
    ascene.appendChild(box4);

    const box5 = document.createElement("a-box");
    box5.setAttribute("static-body", "");
    box5.setAttribute("position", "5.73 2.25 7.27");
    box5.setAttribute("scale", "0.05 1.25 0.05");
    box5.setAttribute("color", "#885f32");
    box5.setAttribute("rotation", "0 45 0");
    box5.setAttribute("id", "market-table");
    ascene.appendChild(box5);

    let aText = document.createElement("a-text");
    aText.setAttribute("id", "market-table");
    aText.setAttribute("value", "Welcome in the shop\nHere, you can click on the \ntable or the character to buy items\nand then you can buy\nitem by clicking on them\nif you have enough money ;)");
    aText.setAttribute("scale", "0.5 0.45 0.5");
    aText.setAttribute("position", `4.95 2.3 7.95`);
    aText.setAttribute("rotation", "0 225 0");
    aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
    aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
    aText.setAttribute("negate", "false");
    aText.setAttribute("align", "center");
    aText.setAttribute("color", "#FFF");
    ascene.appendChild(aText);
  }
  let merchantTable = document.querySelectorAll('#market-table');
  merchantTable.forEach(table => table.addEventListener("click", function () {
    let tablesToRemove = Array.from(merchantTable);
    tablesToRemove.forEach(table => ascene.removeChild(table));
  }));
};




