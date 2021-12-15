import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import perfil from "../img/usuario.png";
import cv from "../img/cv.png";
import git from "../img/github.png";
import video from "../img/video.png";
import salir from "../img/salir.png";
import personal from "../img/personal.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../controller/context";
const styles = {
    img_perfil: {
        width: "120px",
        height: "120px",
    },
    img_in: {
        width: "100px",
        height: "100px",
        left: "40%",
    },
    img_opt: {
        width: "50px",
        height: "50px",
        marginTop: "5px",
    },
};

const LeftBarEmpresa = () => {
    const { handleLogOut } = useGlobalContext();


    return (
        <div className="em-option">
            <div className="option-inde">
                <img src={perfil} alt="imagen de perfil predeterminado" style={styles.img_opt}></img>
                <Link to={{pathname:'/empresa'}}>
                    <Button className='posboton'>Perfil</Button>
                </Link>
                <br />
            </div>
            <div className="option-inde">
                <img src={personal} alt="imagen de perfil predeterminado" style={styles.img_opt}></img>
                <Link to='/listaAspirantes'>
                    <Button className='posboton'>Aspirantes</Button>
                </Link>
                <br />
            </div>
            <div className="option-inde">
                <img src={salir} alt="imagen de perfil predeterminado" style={styles.img_opt}></img>
                <Button className='posboton' onClick={handleLogOut}>
                    <Link to='/'>
                        Salir
                    </Link>
                </Button>
                <br />
            </div>
        </div>
    )
}

export default LeftBarEmpresa