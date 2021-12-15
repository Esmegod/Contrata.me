import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; //  Iconos
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box"; //  Componentes
import TextField from "@mui/material/TextField";
import logo from "../img/logo-b.png";
import "../css/navbar.css"; //  CSS
import { links } from "./data"; //  Recursos
import { useGlobalContext } from "../controller/context";
import { getItem } from "../util/Storage";

const styles = {
    box: {
        display: "flex",
        alignItems: "flex-end",
    },
    boxHidden: {
        display: "none",
    },
};

function Navbar() {
    let token = getItem('token');
    let typeAccount = getItem('typeAccount');
    const { changeSidebar, isSidebarOpen } = useGlobalContext();
    const [size, setSize] = useState(window.innerWidth);

    const checkSize = () => {
        setSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", checkSize);
        return () => {
            window.removeEventListener("resize", checkSize);
        };
    }, []);

    useEffect(() => {
        if (size > 900 && isSidebarOpen) {
            changeSidebar();
        }
    }, [size]);

    return (
        <nav>
            <div className='nav-center'>
                <div className='nav-header'>
                    <Link to='/home'>
                        <div className='logo-navbar'>
                            <img src={logo} alt='logo' />
                        </div>
                    </Link>
                    <button className='nav-toggle' onClick={changeSidebar}>
                        <MenuIcon />
                    </button>
                </div>

                <div className='nav-search'>
                    <Box sx={token ? styles.box : styles.boxHidden}>
                        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField id='input-with-sx' label='Buscar' variant='standard' />
                    </Box>
                </div>
                <div className='links-container'>
                    <Box sx={token ? styles.box : styles.boxHidden}>
                        <ul className='links'>
                            {links.map((link) => {
                                const { id, url, text, type } = link;
                                if (typeAccount === type) {
                                    return (
                                        <li key={id}>
                                            <Link className='nav-links' to={url}>
                                                {text}
                                            </Link>
                                        </li>
                                    );
                                }else{
                                    return null;
                                }
                            })}
                        </ul>
                    </Box>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
