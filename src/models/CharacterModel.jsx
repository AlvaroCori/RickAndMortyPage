export class CharacterModel{
    constructor(_id, _name, _status, _gender,_species, _type,_image, _origin, _location){
        this.id = _id;
        this.nameCharacter = _name;
        this.statusCharacter = _status;
        this.gender = _gender;
        this.species = _species;
        this.type = _type;
        this.image = _image;
        this.originName = _origin;
        this.locationName = _location;
    }   
}