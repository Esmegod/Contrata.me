import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';
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
};
let v;

const CustomModal = ({ open, value, closed, platform, defaultValue }) => {
    const [val, setVal] = React.useState(defaultValue);
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {platform == "GitHub" ? "Cambiar usuario" : "Cambiar Video "}  {platform}
                </Typography>
                <FormControl sx={styles.input} variant='standard'>
                    <TextField
                        id='defaultValue'
                        type={v}
                        value={val}
                        onChange={(value) => { setVal(value.target.value) }}
                        label={platform == "GitHub" ? "Usuario" : "Video Id "}
                        variant='standard'
                    />
                </FormControl>
                <Button className='posboton' variant='contained' style={{ marginTop: 20 }} onClick={() => { value(val); closed(true); }}>
                    Modificar
                </Button>
            </Box>
        </Modal>
    )
}

CustomModal.propTypes = {
    open: PropTypes.bool,
    value: PropTypes.func,
    closed: PropTypes.func,
    platform: PropTypes.string,
    defaultValue: PropTypes.string
}

export default CustomModal