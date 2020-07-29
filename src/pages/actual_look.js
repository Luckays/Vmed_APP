import React, { Component,useState, useEffect} from 'react';
import HeadTitle from "../components/Head_title";


function ActualLook() {

    const [showPlzen, setShowPlzen] = useState(false);
    const [showPraha, setShowPraha] = useState(false);
    const changePlzen  = () => {if(showPlzen === false){setShowPlzen(true)}else {setShowPlzen(false)}};
    const changePraha  = () => {if(showPraha === false){setShowPraha(true)}else {setShowPraha(false)}};
    return(

        <div className="app h-100">
            <HeadTitle/>
            <div className="container-page">
                <div className="text-white"><div className="text-center"> <h1>  Přehled stanic</h1> </div></div>
            </div>
            <div className="check_box">

                <div className="ck-button">
                    <label>
                        <input type="checkbox" id='checkplzen' value="1" onChange={changePlzen}/><span>Plzeň</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" id='checkpraha' value="1" onChange={changePraha}/><span>Praha</span>
                    </label>
                </div>

            </div>


                { showPlzen ? <Plzen /> : null }


                { showPraha ? <Praha /> : null }

        </div>


    )








}

const Plzen = () => (

    <div className= "box">

        Plzen

    </div>

);

const Praha = () => (
    <div className= "box">

        Praha

    </div>

);

export default ActualLook;