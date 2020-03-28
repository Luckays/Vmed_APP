import image from "./logo.png";
import React from "react"
const HeadTitle =()=> {
return(
    <div className="container-preface">
        <div className="text-white">
            <div className="text-center"><h1> Vizualizace meteorologických a environmentálních dat Geodetické observatoře
                Pecný <img src={image} alt="Logo" height="95" width="95" align="top"/></h1></div>
        </div>
    </div>
)
}

export default HeadTitle;