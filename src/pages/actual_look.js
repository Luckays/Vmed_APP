import React, { Component,useState, useEffect} from 'react';
import HeadTitle from "../components/Head_title";
import Plzen from "../components/places/Plzen";
import Pruhonice from "../components/places/Pruhonice";
import Polom from "../components/places/Polom";
import Pecny from "../components/places/Pecny";
import Kunzak from "../components/places/Kunzak";
import Olomouc from "../components/places/Olomouc";
import Ostrava from "../components/places/Ostrava";
import Brno from "../components/places/Brno";
import LysaHora from "../components/places/LysaHora";


function ActualLook() {

    const [showPlzen, setShowPlzen] = useState(false);
    const [showPruhonice, setShowPruhonice] = useState(false);
    const [showPecny, setShowPecny] = useState(false);
    const [showKunzak, setShowKunzak] = useState(false);
    const [showLysaHora, setShowLysaHora] = useState(false);
    const [showPolom, setShowPolom] = useState(false);
    const [showBrno, setShowBrno] = useState(false);
    const [showOlomouc, setShowOlomouc] = useState(false);
    const [showOstrava, setShowOstrava] = useState(false);
    const [showVse, setShowVse] = useState(false);
    const changePlzen  = () => {if(showPlzen === false){setShowPlzen(true)}else {setShowPlzen(false)}};
    const changePruhonice  = () => {if(showPruhonice === false){setShowPruhonice(true)}else {setShowPruhonice(false)}};
    const changePecny  = () => {if(showPecny === false){setShowPecny(true)}else {setShowPecny(false)}};
    const changeKunzak  = () => {if(showKunzak === false){setShowKunzak(true)}else {setShowKunzak(false)}};
    const changeLysaHora  = () => {if(showLysaHora === false){setShowLysaHora(true)}else {setShowLysaHora(false)}};
    const changePolom  = () => {if(showPolom === false){setShowPolom(true)}else {setShowPolom(false)}};
    const changeBrno  = () => {if(showBrno === false){setShowBrno(true)}else {setShowBrno(false)}};
    const changeOlomouc  = () => {if(showOlomouc === false){setShowOlomouc(true)}else {setShowOlomouc(false)}};
    const changeOstrava  = () => {if(showOstrava === false){setShowOstrava(true)}else {setShowOstrava(false)}};
    const changeVse  = () => {
        if(showOstrava === false||showOlomouc===false||showBrno===false||showPolom===false||showKunzak===false||showPecny===false||showPlzen===false){
            setShowOstrava(true);
            setShowOlomouc(true);
            setShowBrno(true);
            setShowPolom(true);
            //setShowLysaHora(true);
            setShowKunzak(true);
            setShowPecny(true);
            setShowPlzen(true);
            //setShowPruhonice(true);
            setShowVse(true)
        }else {
            setShowOstrava(false);
            setShowOlomouc(false);
            setShowBrno(false);
            setShowPolom(false);
           // setShowLysaHora(false);
            setShowKunzak(false);
            setShowPecny(false);
            setShowPlzen(false);
            //setShowPruhonice(false);
            setShowVse(false) }};

    return(

        <div className="app h-100">
            <HeadTitle/>
            <div className="container-page">
                <div className="text-white"><div className="text-center"> <h1> Nejnovější data ze stanic VESOG</h1> </div></div>
            </div>
            <div className="check_box">

                <div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showPecny} id='checkpecny' value="1" onChange={changePecny}/><span>Pecný</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showKunzak} id='checkkunzak' value="1" onChange={changeKunzak}/><span>Kunžak</span>
                    </label>
                </div>

                {/* <div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showLysaHora} id='checklysahora' value="1" onChange={changeLysaHora}/><span>Lysá Hora</span>
                    </label>
                </div> */}

                <div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showPlzen}id='checkplzen' value="1" onChange={changePlzen}/><span>Plzeň</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showPolom} id='checkpolom' value="1" onChange={changePolom}/><span>Polom</span>
                    </label>
                </div>

                {/*<div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showPruhonice} id='checkpruhonice' value="1" onChange={changePruhonice}/><span>Průhonice</span>
                    </label>
                </div>*/}

                <div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showBrno} id='checkbrno' value="1" onChange={changeBrno}/><span>Brno</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showOlomouc} id='checkolomouc' value="1" onChange={changeOlomouc}/><span>Olomouc</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showOstrava} id='checkostrava' value="1" onChange={changeOstrava}/><span>Ostrava</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" checked={showVse} id='checkvse' value="1" onChange={changeVse}/><span>Vše</span>
                    </label>
                </div>




            </div>

            { showPecny ? <Pecny/> : null }
            { showKunzak ? <Kunzak/> : null }
            { showLysaHora ? <LysaHora/> : null }
                { showPlzen ? <Plzen/> : null }
            { showPolom ? <Polom/> : null }
                { showPruhonice ? <Pruhonice /> : null }
            { showBrno ? <Brno/> : null }
            { showOlomouc ? <Olomouc/> : null }
            { showOstrava ? <Ostrava/> : null }
        </div>


    )








}



export default ActualLook;