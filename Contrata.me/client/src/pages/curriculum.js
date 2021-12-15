import React from "react";
import '../css/curriculum.css';
import { getItem } from '../util/Storage'

const styles = {
    img_opt: {
        width: "50px",
        height: "50px",
        marginTop: "5px",
    },
    btn_1: {
        top: "12px",
    },
    btn_2: {
        left: "69%",
        marginTop: "20px",
    },
};

function Curriculum() {
    const fullUser = getItem("estudiante");
    const usuario = fullUser.user;
    console.log(fullUser);
    return (
        <section className="curriculum-pg">
            <div className="cur-name">
                <label>{usuario.nombre + " " + usuario.apellido_paterno + " " + usuario.apellido_materno}</label>
                < br/>
                <label>Edad: 25 años</label>
            </div>
            <div className="cur-gen">
                <div className="cur-data">
                    <div className="cur-datos">
                        <div className="cur-lopc">
                            <label className="txt-ngr">Heramientas</label>
                            {fullUser.cv.tecnologias.map((item) => {
                                return (
                                            <div className="cur-cont-list">
                                            <li>{item}</li>
                                            </div>
                                        );
                            })}
                        </div>
                        < br/>
                        <div className="cur-lopc">
                            <label className="txt-ngr">Idiomas</label>
                            {fullUser.cv.idiomas.map((item) => {
                                            return (
                                                <div className="cur-cont-list">
                                                    <li>{item}</li>
                                                </div>
                                            );
                            })}
                        </div>
                        < br/>
                        <div className="cur-lopc">
                            <label className="txt-ngr">Contacto</label>
                            < br/>
                            <label>{fullUser.cv.telefono}</label>
                            <br />
                            <label>{fullUser.cv.email}</label>
                            <br />
                            <label>GitHub: {fullUser.user.gitUser}</label>
                        </div>
                        < br/>
                    </div>
                    <div className="cur-perfil">
                        <div className="cur-ropc">
                            <label className="txt-ngr">Perfil</label>
                            < br/>
                            {fullUser.cv.descripcion}
                        </div>
                        < br/>
                        <div className="cur-ropc">
                            <label className="txt-ngr">Experiencia</label>
                            <br />
                            <label>{fullUser.cv.formacionAcademica}</label>
                            < br/>
                        </div>
                        < br/>
                        <div className="cur-ropc">
                            <label className="txt-ngr">Residencia</label>
                            < br/>
                            <label>{fullUser.cv.direccion}</label>
                        </div>
                        < br/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Curriculum;