class PokemonModel {
    id: number;
    name: string;
    image: string;
    attack: number;
    defense: number;
    hp: number;
    type: string;
    idAuthor: number;

    constructor(json: PokemonModel) {
        this.id = json.id;
        this.name = json.name;
        this.image = json.image;
        this.attack = json.attack;
        this.defense = json.defense;
        this.hp = json.hp;
        this.type = json.type;
        this.idAuthor = json.idAuthor;
    }
}