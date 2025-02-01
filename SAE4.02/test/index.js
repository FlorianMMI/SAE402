
import {CharacterData} from './data/character.js';
import { CharacterView } from "./templates/index.js";
let C = {};

C.init = async function(){
    V.init();
}
  
let V = {
    character: document.querySelector("#character"),
};

C.loadCharacter = async function(){
    let character = await CharacterData.fetchAll();
    console.log(character);
    V.renderCharacter(character);
}

V.renderCharacter = function(character){
    V.character.innerHTML = character.map(character => CharacterView.render(character)).join('');
}

V.init = async function(){
    C.loadCharacter();
}
C.init();

