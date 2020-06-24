import React from 'react';
import HeadTitle from "../components/Head_title";

const About = () => {

    return (
        <div className="h-100">
            <HeadTitle/>
                <div className="container-page">
                <div className="text-white"><div className="text-center"> <h1>  O projektu    </h1> </div></div>
            </div>


            <p>Geodetická observatoř Pecný je experimentálním pracovištěm Výzkumného útvaru
                Geodézie a geodynamika spadající pod Výzkumný ústav geodetický, topografický
                a kartografický, v.v.i. (VÚGTK). Činnost útvaru je zaměřena na základní a aplikační výzkum v geodetických základech, kosmické a fyzikální geodézii a geodynamice. Observatoř je pracoviště určené pro experimentální geodetický výzkum.
                Je na ní umístěna geodetická referenční stanice České republiky včetně výškového
                a gravimetrického připojení. Její součástí je laboratoř, termokomora pro zkoušky
                gravimetrů a geodetických přístrojů a základna pro kalibraci GNSS techniky.</p>
                <p>Hlavní náplní observatoře je provádění permanentní GPS observace, obsluha
                sítě VESOG a sledování změn vertikální složky tíhového zrychlení. Současně jsou
                zde prováděna další experimentální měření, zpracování GPS pozorování i teoretický
                výzkum v oblasti matematické a fyzikální geodézie, teorie tvaru Země, kvazigeoidu
                a geodynamiky.</p>
                    <p> Většina prováděných pozorování se neobejde bez oprav z prostředí. Měření je
                ovlivněno teplotou, tlakem, vlhkostí, výškou podzemní vody apod. Z tohoto důvodu
                byla v minulosti na observatoři zaváděna čidla, měřící například výšku hladiny vody
                ve studni nebo teplotu u GNSS antény, data z nich byla zaznamenána a archivována.
                Postupem času byla čidla instalována na další stanoviště, ať už k měřícím přístrojům,
                do země, do laboratoří či do kanceláří.</p>
                        <p> V současné době je na observatoři přibližně 82 čidel sdružených do několika
                měřících jednotek. Všechny měřící jednotky provádějí měření v pravidelných intervalech, nejčastěji v intervalu jedné minuty, a zaznamenávají je na server.</p>





        </div>
    );
}

export default About