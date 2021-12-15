import React from 'react';
import { getItem } from '../util/Storage';
import perfil from '../img/usuario.png';
import PropTypes from 'prop-types'
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
    btn_añadir: {
        marginTop: "10px",
    },
    btn_curriculum: {
        left: "85%",
    },
};

const HeaderEstudiante = () => {
    

    const fullUser = getItem("estudiante");
    console.log(fullUser);
    const usuario = fullUser.user;
    return (
        <div className="cv-data">
            <div className="name">
                <img className="usuario" src={perfil} alt="imagen de perfil predeterminado" style={styles.img_perfil}></img>
                <br />
                <label className="forname">{usuario.nombre + " " + usuario.apellido_paterno + " " + usuario.apellido_materno}</label>
                <br />
            </div>
            <div className="data">
                <div className="d1">
                    <label>Telefono: {fullUser.cv ? fullUser.cv.telefono : usuario.telefono}</label>
                    <br />
                </div>
                <div className="d2">
                    <label>Email: {usuario.email}</label>
                    <br />
                </div>
                <div className="d3">
                    <label>Fecha de nacimiento: 11/12/1996</label>
                    <br />
                </div>
                <div className="d4">
                    <label>Sexo: {usuario.sexo}</label>
                    <br />
                </div>
                <br />
            </div>
        </div>
    )

}
export default HeaderEstudiante