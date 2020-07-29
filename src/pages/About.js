import React from 'react';
import HeadTitle from "../components/Head_title";

const About = () => {

    return (
        <div className="h-100">
            <HeadTitle/>
                <div className="container-page">
                <div className="text-white"><div className="text-center"> <h1>  O projektu    </h1> </div></div>
            </div>

            <div className="backround_about">
                <div>   </div>
                <div className= "about">

         Geodetická observatoř Pecný je experimentálním pracovištěm výzkumného útvaru Geodézie a geodynamika spadající pod Výzkumný ústav geodetický, topografický a kartografický, v.v.i. (VÚGTK). Činnost útvaru je zaměřena na základní a aplikační výzkum v geodetických základech, kosmické a fyzikální geodézii a geodynamice. Observatoř je pracoviště určené pro experimentální geodetický výzkum.
</div> <div className= "about">
            Hlavní náplní observatoře je provádění permanentních observací s GNSS v síti VESOG a sledování změn vertikální složky tíhového zrychlení. Současně jsou zde prováděna další experimentální měření, zpracování GNSS pozorování i teoretický výzkum v oblasti matematické a fyzikální geodézie, teorie tvaru Země, kvazigeoidu a geodynamiky.
        </div>   <div className= "about">
            Většina prováděných pozorování se neobejde bez oprav z vlivu okolního prostředí. Měření je ovlivněno teplotou, tlakem, vlhkostí, výškou podzemní vody apod. Z tohoto důvodu byla v minulosti na observatoři instalována čidla, měřící například výšku hladiny vody ve studni nebo teplotu u GNSS antény, data z nich byla zaznamenána a archivována. Postupem času byla čidla instalována na další stanoviště, ať už k měřícím přístrojům, do půdního profilu či do laboratoří.
        </div>   <div className= "about">
            V současné době je na observatoři přibližně 82 čidel sdružených do několika měřících jednotek. Všechny měřící jednotky provádějí měření v pravidelných intervalech, nejčastěji v intervalu jedné minuty, a zaznamenávají je v registračních počítačích, odkud jsou pravidelně nahrávány do této aplikace na serveru.

        </div>
        </div>
<div className="backround_about_ref"    >
            <div className= "about_ref">
            Tato webová aplikace vznikla v rámci bakalářské práce <a href="https://dspace.cvut.cz/handle/10467/88809" target="_blank">„Vizualizace meteorologických a environmentálních dat Geodetické observatoře Pecný“ </a> Bc. Lukáše Bělocha na katedře geomatiky Fakulty stavební Českého vysokého učení technického v Praze.

            </div>
        </div>
            <div className= "images">           <a href="https://www.cvut.cz/" target="_blank"><img src="logo_CVUT.jpg" alt="CVUT" class="imgcvut" /> </a>  <a href="https://www.vugtk.cz/"> <img
                src="logo.gif" alt="vugtk" className="imgvugtk"/>  </a>  <a href= "https://www.pecny.cz/"><img src="zngopecn.gif" alt="gope" class="imggope"/></a>   </div>
        </div>

    );
};

export default About