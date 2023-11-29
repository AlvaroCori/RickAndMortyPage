import LocationModel from "../models/LocationModel";
import { Service } from "./Service";
export class LocationsService extends Service{
    constructor(_url){
        super(_url);
        this.dataToModel = (row)=>{
            return new LocationModel(row.id, row.name,row.type,row.dimension, row.residents);
        }
    }
}

