const templateFile = await fetch("./templates/character.html"); 
const template = await templateFile.text();

let CharacterView = {};

CharacterView.render = function(characterData){
    let renderedTemplate = template;
    for (let key in characterData) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        renderedTemplate = renderedTemplate.replace(regex, characterData[key]);
    }
    return renderedTemplate;
}

export {CharacterView};