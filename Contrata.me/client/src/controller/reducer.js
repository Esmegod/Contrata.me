import { validateLogin, validateRecoverPassword, validateCreateAccount } from "./functions";

const reducer = (state, action) => {
    //  Funciones para el navbar y sidebar
    if (action.type === "IS_SIDEBAR_OPEN") {
        let aux = state.isSidebarOpen;
        return {
            ...state,
            isSidebarOpen: !aux,
        };
    }
    //  Funciones para iniciar sesion
    if (action.type === "HANDLE_CHANGE_LOGIN") {
        let prop = action.payload.prop;
        let value = action.payload.value;
        let aux = state.login;
        aux[prop] = value;
        return {
            ...state,
        };
    }
    if (action.type === "SEE_PASSWORD_LOGIN") {
        return {
            ...state,
            ...(state.login.showPassword = !state.login.showPassword),
        };
    }
    if (action.type === "SET_TYPE_ACCOUNT") {
        return {
            ...state,
            ...(state.login.type = action.payload),
        };
    }
    if (action.type === "VALIDATE_LOGIN") {
        validateLogin(state.login);
        return {
            ...state,
        };
    }
    if (action.type === "LOGGED_IN") {
        let aux = state.login.type;
        return {
            ...state,
            typeAccount: aux,
            loggedIn: true,
        };
    }
    if (action.type === "LOGGED_OUT") {
        return {
            ...state,
            typeAccount: null,
            loggedIn: false,
        };
    }
    if (action.type === "RECOVER_MODE") {
        
        let aux = state.loginMode;
        console.log(action.payload);
        aux.mode = action.payload;
        return {
            ...state,
        };
    }
    //  Funciones para recuperar contraseña
    if (action.type === "HANDLE_CHANGE_RECOVER") {
        let prop = action.payload.prop;
        let value = action.payload.value;
        let aux = state.recoverPassword;
        aux[prop] = value;
        return {
            ...state,
        };
    }
    if (action.type === "VALIDATE_RECOVER_PASSWORD") {
        validateRecoverPassword(state.recoverPassword);
        return {
            ...state,
        };
    }
    if (action.type === "RECOVER_PASSWORD") {
        return {
            ...state,
        };
    }
    //  Funciones para crear cuenta
    if (action.type === "HANDLE_CHANGE_CREATE_ACCOUNT") {
        let prop = action.payload.prop;
        let value = action.payload.value;
        let aux = state.createAccount;
        aux[prop] = value;
        return {
            ...state,
        };
    }
    if (action.type === "SEE_PASSWORD_CREATE") {
        return {
            ...state,
            ...(state.createAccount.showPasswordCreate = !state.createAccount.showPasswordCreate),
        };
    }
    if (action.type === "SEE_CONFIRM_PASSWORD_CREATE") {
        return {
            ...state,
            ...(state.createAccount.showConfirmPasswordCreate =
                !state.createAccount.showConfirmPasswordCreate),
        };
    }
    if (action.type === "VALIDATE_CREATE_ACCOUNT") {
        validateCreateAccount(state.createAccount);
        return {
            ...state,
        };
    }
    if (action.type === "SET_TYPE_ACCOUNT_CREATE") {
        return {
            ...state,
            ...(state.createAccount.type = action.payload),
        };
    }
    if (action.type === "CREATE_ACCOUNT") {
        let aux = state.createAccount.type;
        return {
            ...state,
            typeAccount: aux,
            loggedIn: true,
        };
    }
    if(action.type === "SET_ESTUDIANTE"){
        return {
            ...state,
            estuadiante: action.payload
        }
    }
    if(action.type === "SET_EMPRESA"){
        return {
            ...state,
            empresa: action.payload
        }
    }

    if (action.type === "SET_GIT_USER"){
        return {
            ...state,
            gitUser: action.payload
        }
    }

    throw new Error("no matching action type");
};

export default reducer;
