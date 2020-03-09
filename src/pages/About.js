import React from 'react';
import image from "../components/logo.png";

const home = () => {
    return (
        <div className="app h-100">
            <div className="container-preface">
                <p className="text-white"><p className="text-center"> <h1>  Vizualizace meteorologických a environmentálních dat Geodetické observatoře Pecný     <img src={image} alt="Logo" height="95" width="95" align="top"/></h1> </p></p>
            </div>
                <div className="container-page">
                <p className="text-white"><p className="text-center"> <h1>  O projektu    </h1> </p></p>
            </div>
            <p>o projektu</p>





        </div>
    );
}

export default home;