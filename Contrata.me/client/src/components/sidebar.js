import React from "react";
import logo from "../img/logo-b.png";
import "../css/sidebar.css";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../controller/context";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import { links } from "./data";
import { getItem } from "../util/Storage";

function Sidebar() {
    let token = getItem('token');
    let typeAccount = getItem('typeAccount');
    const { isSidebarOpen, changeSidebar } = useGlobalContext();

    return (
        <aside className={`${token && isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
            <div className='sidebar-header'>
                <Link to='/' onClick={changeSidebar}>
                    <div className='logo-sidebar'>
                        <img src={logo} alt='logo' />
                    </div>
                </Link>
                <button className='close-btn' onClick={changeSidebar}>
                    <ClearIcon></ClearIcon>
                </button>
            </div>

            <ul className='links-sidebar'>
                {links.map((item) => {
                    const { id, url, text, type } = item;
                    if (typeAccount === type) {
                        return (
                            <li key={id}>
                                <Link to={url} onClick={changeSidebar}>
                                    {text}
                                </Link>
                                <Divider variant='inset' className='divider'/>
                            </li>
                        );
                    }else{
                        return null;
                    }
                })}
            </ul>
        </aside>
    );
}

export default Sidebar;
