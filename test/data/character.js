let CharacterData = {};

let characters = [
    {
        url: "./../character/Santa Claus.glb",
        name: "Santa Claus",
        price: "0.00",
        description: "Festive",
    },
    {
        url: "./../character/Teacher.glb",
        name: "Teacher",
        price: "0.00",
        description: "Educator",
    },
    {
        url: "./../character/Doctor.glb",
        name: "Doctor",
        price: "0.00",
        description: "Healer",
    },
    {
        url: "./../character/Police.glb",
        name: "Police",
        price: "0.00",
        description: "Protector",
    },
    {
        url: "./../character/Engineer.glb",
        name: "Engineer",
        price: "0.00",
        description: "Builder",
    },
    {
        url: "./../character/Worker.glb",
        name: "Worker",
        price: "0.00",
        description: "Laborer",
    },
    {
        url: "./../character/Student.glb",
        name: "Student",
        price: "0.00",
        description: "Learner",
    },
    {
        url: "./../character/Artist.glb",
        name: "Artist",
        price: "0.00",
        description: "Creative",
    },
    {
        url: "./../character/Programmer.glb",
        name: "Programmer",
        price: "0.00",
        description: "Coder",
    },
    {
        url: "./../character/Designer.glb",
        name: "Designer",
        price: "0.00",
        description: "Creator",
    },
];

CharacterData.fetchAll = async function () {
    return characters;
};

export { CharacterData };