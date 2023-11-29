
import EpisodeModel from "../models/EpisodeModel";
import { Service } from "./Service";
export class EpisodesService extends Service{
    constructor(_url){
        super(_url);
        this.dataToModel = (row)=>{
            return new EpisodeModel(row.id, row.name,row.air_date,row.episode, row.characters);
        }
    }
}

