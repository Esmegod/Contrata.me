import React from "react";
import '../css/cvs.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LeftBar from "../components/LeftBar";
import HeaderEstudiante from "../components/HeaderEstudiante";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useGlobalContext } from "../controller/context";
import { getItem } from "../util/Storage";
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
        marginTop: 20,
        left: "25%",
        width: "50%"
    },
    btn_añadir2: {
        marginTop: 20,
        left: "25%",
        marginLeft: 20,
        width: "25%"
    },
    btn_curriculum: {
        left: "85%",
    },
};
const fullUser = getItem("estudiante");
const usuario = fullUser;
let cv = {};
if (usuario && usuario.cv) {

    cv = usuario.cv
}
function Cvs() {

    const { handleCV } = useGlobalContext();
    const animatedComponents = makeAnimated();
    const [paso, setPaso] = React.useState(1);
    const [lang, setLang] = React.useState([]);
    const [tool, setTool] = React.useState([]);
    const optionsLang = [
        { value: 'Español', label: 'Español' },
        { value: 'Inglés', label: 'Inglés' },
        { value: 'Francés', label: 'Francés' },
        { value: 'Chino', label: 'Chino' },
        { value: 'Portugues', label: 'Portugues' },
    ];
    const optionsTools = [
        { value: 'MySQL', label: 'MySQL' },
        { value: 'PHP', label: 'PHP' },
        { value: 'Java', label: 'Java' },
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'Python', label: 'Python' },
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'React', label: 'React' },
    ];

    const parseList = (list) => {
        let l = []
        list.forEach(e => {
            l.push(e.value);
        });
        return l
    }

    const saveStepHandler = (text) => {
        setPaso(val => paso < 6 ? val + 1 : val)
        if (paso == 1) {
            cv.descripcion = text
        }
        if (paso == 2) {
            cv.formacionAcademica = text
        }
        if (paso == 3) {
            cv.tecnologias = parseList(tool)
        }
        if (paso == 4) {
            cv.idiomas = parseList(lang)
        }
        if (paso == 5) {
            cv.direccion = text
        }
        if (paso == 6) {
            cv.telefono = text
            handleCV(cv)
        }
    }

    const backHandler = () => {
        setPaso(val => paso > 1 ? val - 1 : val)
    }

    const Step = ({ label, placeholder, value, back, defaultValue }) => {
        const [textValue, setTextValue] = React.useState(defaultValue);
        const textHandler = () => {
            value(textValue)
        }
        return (
            <div>
                <TextField
                    style={{ marginTop: "5%" }}
                    id="outlined-multiline-static"
                    label={label}
                    multiline
                    value={textValue}
                    onChange={(val) => { setTextValue(val.target.value) }}
                    rows={4}
                    fullWidth
                    placeholder={placeholder}
                />
                <Button
                    onClick={textHandler}
                    variant="contained"
                    style={paso == 1 ? styles.btn_añadir : styles.btn_añadir2}>
                    {paso != 6 ? "Añadir" : "Generar CVs"}
                </Button>

                {paso == 1 ? null :

                    <Button
                        onClick={back}
                        variant="contained"
                        style={styles.btn_añadir2}>
                        Regresar
                    </Button>
                }


            </div>

        )
    }

    const StepList = ({ title, options, selected, back, defaultOptions }) => {
        let values = []

        return (
            <div>
                <br />
                <br />
                <h3 style={{}}>{title}</h3>
                <Select
                    defaultValue={defaultOptions}
                    isMulti
                    name="colors"
                    options={options}
                    components={animatedComponents}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(val) => { paso == 3 ? setTool(val) : setLang(val) }}
                />
                <Button
                    onClick={() => { selected(values) }}
                    variant="contained"
                    style={paso == 1 ? styles.btn_añadir : styles.btn_añadir2}>
                    Añadir
                </Button>
                {paso == 1 ? null :

                    <Button
                        onClick={back}
                        variant="contained"
                        style={styles.btn_añadir2}>
                        Regresar
                    </Button>
                }
            </div>
        )


    }

    React.useEffect(() => {
        if (cv != null) {
            console.log(cv.idiomas);
            console.log(cv.tecnologias);
            if (cv.tecnologias != null && cv.tecnologias != []) {
                let tecnologias = [];
                cv.tecnologias.forEach(e => {
                    tecnologias.push({ value: e, label: e })
                });
                setTool(tecnologias)
            }
            if (cv.idiomas != null && cv.idiomas != []) {
                let idiomas = [];
                cv.idiomas.forEach(e => {
                    idiomas.push({ value: e, label: e })
                });
                setLang(idiomas)
            }
        }
    }, [])

    return (
        <section className="cvs">
            <LeftBar />
            <div className="cv-information">
                <HeaderEstudiante />
                <div className="cv-genData">
                    <div className="desc-cv">
                        <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
                            <h3>Crear curriculum</h3>
                            <h4 style={{ marginTop: 10 }}>Paso {paso}/6</h4>
                        </div>
                        {paso == 1 ? <Step label={"Descripción"} defaultValue={cv ? cv.descripcion : null} placeholder={"Descripción breve de ti"} value={saveStepHandler} back={backHandler} /> : null}
                        {paso == 2 ? <Step label={"Proyectos"} defaultValue={cv ? cv.formacionAcademica : null} placeholder={"Proyectos en los que haz trabajado"} value={saveStepHandler} back={backHandler} /> : null}
                        {paso == 3 ? <StepList title={"Herramientas"} defaultOptions={tool} options={optionsTools} selected={saveStepHandler} back={backHandler} /> : null}
                        {paso == 4 ? <StepList title={"Idiomas"} defaultOptions={lang} options={optionsLang} selected={saveStepHandler} back={backHandler} /> : null}
                        {paso == 5 ? <Step label={"Dirección"} defaultValue={cv ? cv.direccion : null} placeholder={"¿Donde te ubicas?"} value={saveStepHandler} back={backHandler} /> : null}
                        {paso == 6 ? <Step label={"Teléfono"} defaultValue={cv ? cv.telefono : null} placeholder={"¿Donde te podemos localizar?"} value={saveStepHandler} back={backHandler} /> : null}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Cvs;