import React from "react";
import '../css/home.css';
import cv from '../img/cv.png';
import git from '../img/github.png';
import personal from '../img/personal.png';
import seguro from '../img/seguro.png';
import tiempo from '../img/tiempo.png';
import video from '../img/video.png';
import { useGlobalContext } from "../controller/context";
const styles = {
    box: {
        backgroundColor: "#DDEFF9",
    },
    img: {
        width: "80px",
        height: "80px",
        marginTop: "10px",
    },
};
function Home() {
    return (
        <section className="home">
            <h1 className="Title">¿Qué ofrecemos?</h1>
            <div className="home-options">
                <div className="home-buttons">
                    <div className="r1 c1">
                        <label>Sube tu curriculum</label>
                        <br></br>
                        <img src={cv} alt="imagen curriculum" style={styles.img}></img>
                    </div>
                    <div className="r2 c1">
                        <label>Personal calificado</label>
                        <br></br>
                        <img src={personal} alt="imagen personal cualificado" style={styles.img}></img>
                    </div>
                    <div className="r3 c1">
                        <label>Informacion segura</label>
                        <br></br>
                        <img src={seguro} alt="imagen información segura" style={styles.img}></img>
                    </div>
                    <div className="r1 c2">
                        <label>Compatibilidad con github</label>
                        <br></br>
                        <img src={git} alt="imagen logo de github" style={styles.img}></img>
                    </div>
                    <div className="r2 c2">
                        <label>Video</label>
                        <br></br>
                        <img src={video} alt="imagen que representa un video" style={styles.img}></img>
                    </div>
                    <div className="r3 c2">
                        <label>Informacion en tiempo real</label>
                        <br></br>
                        <img src={tiempo} alt="imagen de información en tiempo real" style={styles.img}></img>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}

export default Home;