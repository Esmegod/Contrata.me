import React from "react"
import { getItem } from '../util/Storage';

const HeaderEmpresa = () => {
    const fullUser = getItem("empresa");
    const empresa = fullUser.user;
    return (
        <div className='la-name'>
            <label className='la-forname'>{empresa.nombre}</label>
            <br />
        </div>
    )
}

export default HeaderEmpresa