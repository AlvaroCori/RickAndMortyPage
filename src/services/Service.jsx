export class Service{
    constructor(_url){
        this.urlResource = _url;
        this.pages;
        this.elements = [];
        this.next = "";
        this.prev = "";
        this.dataToModel = (e => e);
    }
    getResources(){
        this.resources = [];
        console.log("cargando", this.urlResource);
        return fetch(this.urlResource).then(response => response.json())
        .then(request =>{
            if (!request["results"]){
                return [];
            }
            for (let row of request["results"]){
                this.resources.push(this.dataToModel(row));
            }
            if (request["info"] && request["info"]["next"]){
                this.next = request["info"]["next"];
            }
            if (request["info"] && request["info"]["prev"]){
                this.prev = request["info"]["prev"];
            }
            return this.resources;
        }).catch(error =>{
            console.log(error);
        });
    }
    loadWithNewUrl(url){
        this.urlResource = url;
        return this.getResources();
    }
    loadNext(){
        this.prev = this.urlResource;
        this.urlResource = this.next;
        this.next = "";
    }
    loadPrev(){
        this.next = this.urlResource;
        this.urlResource = this.prev;
        this.prev = "";
    }
}

