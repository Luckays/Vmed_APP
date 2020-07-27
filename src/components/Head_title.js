import image from "./logo.png"; 
import React from "react"
const HeadTitle =()=> {
return(
    <div className="container-preface">
        <div className="text-white">
            <div className="text-center"><h1> <img src={image} class="image1" alt="Logo"  align="top"/> Vizualizace meteorologických a environmentálních dat Geodetické observatoře
                 Pecný </h1></div>
        </div>
    </div>
)
};

export default HeadTitle;
