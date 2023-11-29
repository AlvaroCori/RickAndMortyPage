import { CharacterModel } from '../models/CharacterModel';
import { Service } from './Service';
export class CharacterService extends Service{
    constructor(_url){
        super(_url);
        this.dataToModel = (row)=>{
            let originName = "";
            let locationName = "";
            if (row.origin){
                originName = row.origin.name;
            }
            if (row.location){
                locationName = row.location.name;
            }
            return new CharacterModel(row.id, row.name, row.status, row.gender,row.species ,(row.type==""?"--":row.type), row.image, originName, locationName);
        }
    }
}

