//Declaración clase Profesional
class Professional
{
    //Constructor
    constructor (name, age, genre, nationality,
        profession)
    {
        this.name = name;
        this.age = age;
        this.genre = genre;
        // this.weight = weight;
        // this.height = height;
        // this.hairColor = hairColor;
        // this.eyeColor = eyeColor;
        // this.race = race;
        // this.isRetired = isRetired;
        this.nationality = nationality;
        // this.oscarsNumber = oscarsNumber;
        this.profession = profession;
    }

    //Métodos
    printAll() {
        console.log("The information about: " + this.name + " are:");
        console.log(" - Name: " + this.name);
        console.log(" - Age: " + this.age);
        console.log(" - Genre: " + this.genre);
        console.log(" - Nationality: " + this.nationality);
        console.log(" - Profession: " + this.profession);
        console.log("\n");
    }
}

module.exports = {Professional};