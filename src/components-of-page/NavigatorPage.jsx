import { removeAllChildNodes } from "../functions/RemoveAllChildNodes";
import "./NavigatorPage.css";
export default function NavigatorPage(elements) {
    const service = elements.service;
    const getResources = elements.getResources;
    const elementsIdName = elements.elementsIdName;
    function nextFunction(){
        if (service.next){
            removeAllChildNodes(document.getElementById(elementsIdName));
            service.loadNext();
            getResources();
        }
      }
      
      function beforeFunction(){
        if (service.prev){
            removeAllChildNodes(document.getElementById(elementsIdName));
            service.loadPrev();
            getResources();
        }
      }
    return (
        <div className="navigator">
            <button id="before" className="btn btn-light" onClick={beforeFunction}>ANTERIOR</button>
            <button id="next" className="btn btn-light"  onClick={nextFunction}>POSTERIOR</button>
        </div>
    )
}