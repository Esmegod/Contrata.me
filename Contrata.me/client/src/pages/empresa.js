import React from "react";
import '../css/empresa.css';
import { Link } from "react-router-dom";
import { useGlobalContext } from "../controller/context";
import perfil from '../img/usuario.png';
import salir from '../img/salir.png';
import personal from '../img/personal.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getItem } from '../util/Storage'
import LeftBarEmpresa from "../components/LeftBarEmpresa";
import HeaderEmpresa  from "../components/HeaderEmpresa";

const ariaLabel = { 'aria-label': 'description' };
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

function Empresa() {
    const { handleUpdateEmpresa } = useGlobalContext();
    const fullUser = getItem("empresa");
    const empresa = fullUser.user;
    const [descripcion, setDescripcion] = React.useState(empresa.descripcion);
    const [direccion, setDireccion] = React.useState(empresa.direccion);

    const guardarDatos = () => {
        empresa.descripcion = descripcion
        empresa.direccion = direccion

        handleUpdateEmpresa(empresa)
    };

    return (
        <section className="empresa">
            <LeftBarEmpresa />
            <div className="em-information">
                <HeaderEmpresa/>
                <div className="form-data">
                    <div className="data-cont">
                        <div className="ent-em">
                            <label className="emform-text">Contacto:</label>
                            <br />
                            <br />
                            <TextField
                                label="Telefono"
                                id="outlined-size-small"
                                defaultValue={empresa.telefono}
                                size="small"
                            />
                            <br />
                            <br />
                            <TextField
                                label="Pagina Web"
                                id="outlined-size-small"
                                defaultValue={empresa.paginaWeb}
                                size="small"
                            />
                            <br />
                            <br />
                            <TextField
                                label="Dirección"
                                id="outlined-size-small"
                                size="small"
                                onChange={(value) => { setDireccion(value.target.value) }}
                                defaultValue={direccion}
                            />
                            <br />
                            <br />
                            <TextField
                                label="Email"
                                id="outlined-size-small"
                                defaultValue={empresa.email}
                                size="small"
                            />
                        </div>
                    </div>
                    <Button variant="contained" style={styles.btn_1, styles.btn_2} onClick={guardarDatos}>Guardar Datos</Button>
                    <div className="Desc">
                        <label className="emform-text">Acerca de nosotros como empresa:</label>
                        <br />
                        <br />
                        <TextField
                            id="outlined-multiline-static"
                            label="Descripción"
                            multiline
                            rows={4}
                            fullWidth
                            onChange={(value) => { setDescripcion(value.target.value) }}
                            defaultValue={descripcion}
                        />
                        <Button className="posboton" variant="contained" style={styles.btn_1} onClick={guardarDatos}>Guardar</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Empresa;