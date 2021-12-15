import React from "react";
import "../css/aspirante.css";
import perfil from "../img/usuario.png";
import cv from "../img/cv.png";
import git from "../img/github.png";
import video from "../img/video.png";
import Button from "@mui/material/Button"
import { getItem, setItem } from '../util/Storage'
import LeftBarEmpresa from "../components/LeftBarEmpresa";
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

function AspiranteVO() {
    const { getEstudiante } = useGlobalContext();
    const aspiranteID = getItem('aspiranteID');
    let fullUser = null
    const [vid, setVideo] = React.useState("");
    const [repositorios, setRepositorios] = React.useState([]);
    const [user,setUser] = React.useState(null);
    if (vid == "" || repositorios == null) {

        getEstudiante(aspiranteID).then((user) => {
            fullUser = user
            setItem('estudiante',user);
            setVideo(fullUser.user.videoURL)
            setRepositorios(fullUser.repos)
        })
    }
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
            <LeftBarEmpresa />
            <HeaderEstudiante/>
            <div className='as-information'>
                <div className='as-genData'>
                    <div className='curriculum'>
                        <img
                            className='usuario'
                            src={cv}
                            alt='imagen de perfil predeterminado'
                            style={styles.img_in}/>
                            
                            <Button className={'posboton'} variant='contained' onClick={()=>{}}>
                            <Link to={{ pathname: "/curriculum" }} style={{ color: "#ffffff" }}>
                                Curriculum
                            </Link>
                        </Button>
                    </div>
                    <div className='vinc_git'>

                        {repositorios.length !=0 ? <List repos={repositorios} /> : <img
                            className='usuario'
                            src={git}
                            alt='imagen de perfil predeterminado'
                            style={styles.img_in} />}

                    </div>
                    <div className='muestra'>
                        {vid ?
                            <YouTube videoId={vid} opts={{ height: 300, width: "100%" }} />
                            : <img
                                className='usuario'
                                src={video}
                                alt='imagen de perfil predeterminado'
                                style={styles.img_in} />}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AspiranteVO;
