import { fetchConToken, fetchSinToken } from "./fetch";

const isEmail = (email) => {
    let regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$");
    return regex.test(email);
};

const isPassword = (password) => {
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    return regex.test(password);
};

const isRFC = (rfc) => {
    let regex = new RegExp(
        "^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Zd]{3}))?$"
    );
    return regex.test(rfc);
};

const validateLogin = (login) => {
    login.pushLogin = true;
    login.validType = login.type !== -1 ? true : false;
    login.validUser = isEmail(login.user) ? true : false;
    //login.validPassword = isPassword(login.password) ? true : false;
    login.validPassword = true
};

const validateRecoverPassword = (recoverPassword) => {
    recoverPassword.pushRecover = true;
    recoverPassword.validEmailRecover = isEmail(recoverPassword.emailRecover);
};

const validateCreateAccount = (create) => {
    create.pushCreate = true;
    create.validType = create.type !== -1 ? true : false;
    if (create.type === 0) {
        create.validNombre = create.nombre !== "" ? true : false;
        create.validApellido_paterno = create.apellido_paterno !== "" ? true : false;
        create.validApellido_materno = create.apellido_materno !== "" ? true : false;
        create.validEmail = isEmail(create.email);
        create.validSexo = create.sexo !== "" ? true : false;
        create.validSemestre = create.semestre !== "" ? true : false;
        create.validTelefono_contacto = create.telefono_contacto !== "" ? true : false;
    } else {
        create.validNombre = create.nombre !== "" ? true : false;
        create.validEmail = isEmail(create.email);
        create.validDireccion = create.direccion !== "" ? true : false;
        create.validRfc = true
    }
    create.validPassword = true
    create.validConfirmPassword = (create.confirmPassword === create.password ? true : false);
};

export { validateLogin, validateRecoverPassword, validateCreateAccount };
