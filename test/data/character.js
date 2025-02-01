let CharacterData = {};

let characters = [
    {
        url: "./../character/Santa Claus.glb",
        name: "Santa Claus",
        price: "0.00",
        scale:"0.8 0.8 0.8",
        position:"-2 0 -3"
    },
    {
        url: "./../character/Teacher.glb",
        name: "Teacher",
        price: "0.00",
        scale:"0.2 0.2 0.2",
        position:"0 0 -3"
    }
]

CharacterData.fetchAll = async function () {
    return characters;
};

export { CharacterData };