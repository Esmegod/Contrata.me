import React from "react";
import "../css/aspirante.css";
import cv from "../img/cv.png";
import git from "../img/github.png";
import video from "../img/video.png";
import Button from "@mui/material/Button"
import { getItem } from '../util/Storage'
import LeftBar from "../components/LeftBar";
import { useGlobalContext } from "../controller/context";
import CustomModal from "../components/Modal";
import HeaderEstudiante from "../components/HeaderEstudiante";
import YouTube from 'react-youtube';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
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
    modalStyle: {

        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        flexDirection: "column",
        display: "flex",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"

    },
    input: {
        m: 1,
        width: "25ch",
    },
    gitRepo: {
        width: "100%",
        backgroundColor: "#66B4BF",
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        paddingBlock: 10,
    }
};

function Aspirante() {
    const { handleGit, handleYT } = useGlobalContext();
    const fullUser = getItem("estudiante");
    const usuario = fullUser.user;
    const [platform, setPlatform] = React.useState("GitHub");

    const [openGit, setOpenGit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [vid, setVideo] = React.useState(usuario.videoURL);
    const [repositorios, setRepositorios] = React.useState(fullUser.repos);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenGit = () => setOpenGit(true);
    const handleCloseGit = () => setOpenGit(false);

    const subirCurriculum = () => {
        console.log("Subir cv");
    };

    const handleValueChange = async (value) => {
        if (platform == "GitHub") {
            let x = await handleGit(value)
            setRepositorios(x);
        } else {
            setVideo(value)
            handleYT(value)
        }
    }

    React.useEffect(() => {

    }, [vid, repositorios])

    const List = ({ repos }) => {
        const listItems = repos.map((d) => <a href={d.url} target="_blank">
            <div style={styles.gitRepo}><Typography style={{ color: "#ffffff" }}>Proyecto: {d.name}</Typography><Typography style={{ color: "#ffffff" }}>Programado en: {d.language}</Typography></div>
        </a >);
        return (
            <div className="scroll">
                {listItems}
            </div>
        );
    }
    return (
        <section className='aspirante'>
            <LeftBar />

            <CustomModal
                open={open}
                closed={handleClose}
                value={handleValueChange}
                defaultValue={usuario.videoURL}
                platform={platform} />

            <CustomModal
                open={openGit}
                closed={handleCloseGit}
                value={handleValueChange}
                defaultValue={usuario.gitUser}
                platform={platform} />

            <div className='as-information'>
                <HeaderEstudiante />
                <div className='as-genData'>
                    <div className='curriculum'>
                    <h3 className="centrar" style={{ marginTop: 10 }}>Mi CV</h3>
                        <div className="cur-list">
                            {fullUser.cv ?
                                <div style={{}}>
                                    <li>Descripción: {fullUser.cv.descripcion}</li>
                                    <br />
                                    <li>Proyectos: {fullUser.cv.formacionAcademica}</li>
                                    <br />
                                    <li>Idiomas: </li>
                                    {fullUser.cv.idiomas.map((item) => {
                                            return (
                                                <div className="cur-cont-list">
                                                    <label>- {item}</label>
                                                </div>
                                            );
                                        })}
                                    <br />
                                    <li>Tecnologías conocidas:</li>
                                    {fullUser.cv.tecnologias.map((item) => {
                                        return (
                                            <div className="cur-cont-list">
                                                <label>- {item}</label>
                                            </div>
                                        );
                                    })}
                                    <br />
                                    <li>Dirección: {fullUser.cv.direccion}</li>
                                    <br />
                                </div>
                                : <div>
                                    <img
                                        className='usuario'
                                        src={cv}
                                        alt='imagen de perfil predeterminado'
                                        style={styles.img_in} />
                            </div>}
                        </div>
                        <Button className={fullUser.cv ? "posbotonCV" : 'posboton'} variant='contained' onClick={subirCurriculum}>
                            <Link to={{ pathname: "/cvs" }} style={{ color: "#ffffff" }}>
                                {fullUser.cv ? "Modificar" : "Agregar"} curriculum
                            </Link>
                        </Button>
                    </div>
                    <div className='vinc_git'>
                        <h3 style={{ marginTop: 10 }}>Mi GitHub</h3>
                        {repositorios ? <List repos={repositorios} /> : <img
                            className='usuario'
                            src={git}
                            alt='imagen de perfil predeterminado'
                            style={styles.img_in} />}
                        <Button className={vid ? 'posbotonGit' : "posboton"} variant='contained' onClick={() => { setPlatform("GitHub"); handleOpenGit() }}>
                            {usuario.gitUser ? "Modificar cuenta" : "Agregar Cuenta"}
                        </Button>

                    </div>
                    <div className='muestra'>
                        <h3 style={{ marginTop: 10 }}>Mi video muestra</h3>
                        {vid ?
                            <YouTube videoId={vid} opts={{ height: 300, width: "100%" }} />
                            : <img
                                className='usuario'
                                src={video}
                                alt='imagen de perfil predeterminado'
                                style={styles.img_in} />}
                        <Button className={vid ? 'posbotonYT' : "posboton"} variant='contained' onClick={() => { setPlatform("YouTube"); handleOpen() }}>
                            {usuario.videoURL ? "Modificar Video" : "Agregar Video"}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Aspirante;
