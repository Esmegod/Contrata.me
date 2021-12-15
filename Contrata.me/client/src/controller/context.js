import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { useSnackbar } from "notistack";
import Grow from "@material-ui/core/Grow";
import { fetchConToken, fetchSinToken } from "./fetch";
import { setItem, getItem, removeItem } from '../util/Storage'

const AppContext = React.createContext();

const styles = {
    warning: {
        preventDuplicate: false,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
        },
        variant: "warning",
        autoHideDuration: 3000,
        TransitionComponent: Grow,
    },
    success: {
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
        },
        variant: "success",
        autoHideDuration: 3000,
        TransitionComponent: Grow,
    },
};

const initialState = {
    // Sidebar y navbar
    isSidebarOpen: false,
    //  Modalidades
    typeAccount: -1,
    loggedIn: false,
    //  Login Mode
    loginMode: {
        mode: "login",
    },
    // Iniciar sesion
    login: {
        user: "",
        password: "",
        type: -1,
        showPassword: false,
        validUser: false,
        validPassword: false,
        validType: false,
        pushLogin: false,
    },
    //  Recuperar Contraseña
    recoverPassword: {
        emailRecover: "",
        validEmailRecover: false,
        pushRecover: false,
    },
    //  Crear cuenta
    createAccount: {
        type: -1,
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        email: "",
        sexo: "",
        semestre: "",
        telefono: "",
        direccion: "",
        rfc: "",
        password: "",
        confirmPassword: "",
        validNombre: false,
        validApellido_paterno: false,
        validApellido_materno: false,
        validEmail: false,
        validSexo: false,
        validSemestre: false,
        validTelefono_contacto: false,
        validDireccion: false,
        validRfc: false,
        validPassword: false,
        validConfirmPassword: false,
        showPasswordCreate: false,
        showConfirmPasswordCreate: false,
        pushCreate: false,
    },
    //  Datos del usuario activo
    estudiante: {},
    //  Datos de la empresa activa
    empresa: {},
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { enqueueSnackbar } = useSnackbar();

    //  Notificaciones
    const notiWarning = (message) => {
        enqueueSnackbar(`${message}`, styles.warning);
    };

    const notiSuccess = (message) => {
        enqueueSnackbar(`${message}`, styles.success);
    };

    // Para controlar el Sidebar y navbar
    const changeSidebar = () => {
        dispatch({ type: "IS_SIDEBAR_OPEN" });
    };

    // Funciones para Iniciar sesion
    const handleChangeLogin = (prop) => (event) => {
        dispatch({
            type: "HANDLE_CHANGE_LOGIN",
            payload: { prop, value: event.target.value },
        });
    };

    const handleClickShowPassword = () => {
        dispatch({ type: "SEE_PASSWORD_LOGIN" });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleTypeAccount = (type) => {
        dispatch({ type: "SET_TYPE_ACCOUNT", payload: type });
    };

    const handleLogin = () => {
        dispatch({ type: "VALIDATE_LOGIN" });
        notiLogin();
    };

    const notiLogin = async () => {
        let type = state.login.type;
        if (!state.login.validType) {
            notiWarning("Seleccione el tipo de cuenta");
        } else if (!state.login.validUser) {
            notiWarning("Ingrese su usuario");
        } else if (!state.login.validPassword) {
            notiWarning("Ingrese su contraseña");
        } else {
            let resultado = await fetchSinToken(type == 1 ? "auth/empresa" : "auth/estudiante", {
                email: state.login.user,
                password: state.login.password,
            }, "POST");
            if (resultado.success) {
                setItem('token', resultado.token)
                setItem('typeAccount', type)
                if (type == 1) {
                    setItem("empresa", resultado)
                    dispatch({ type: "SET_EMPRESA", payload: resultado.user });
                } else {
                    setItem("estudiante", resultado)
                    dispatch({ type: "SET_ESTUDIANTE", payload: resultado.user });
                }
                dispatch({ type: "LOGGED_IN" });
                notiSuccess("Iniciando sesion");
            } else {
                notiWarning("Usuario innexistente");
            }

        }
        state.login.pushLogin = false;
    };

    //  Funcion para cambiar de modo en el login
    const handleChangeMode = (mode) => {
        dispatch({ type: "RECOVER_MODE", payload: mode });
    };

    //  Funciones para recuperar contraseña
    const handleChangeRecoverPassword = (prop) => (event) => {
        dispatch({
            type: "HANDLE_CHANGE_RECOVER",
            payload: { prop, value: event.target.value },
        });
    };

    const handleRecover = () => {
        dispatch({ type: "VALIDATE_RECOVER_PASSWORD" });
        notiRecover();
    };

    const notiRecover = () => {
        if (state.recoverPassword.pushRecover) {
            if (!state.recoverPassword.validEmailRecover) {
                notiWarning("Email invalido");
            } else {
                notiSuccess("Email enviado");
                dispatch({ type: "RECOVER_PASSWORD" });
            }
        }
        state.recoverPassword.pushRecover = false;
    };

    //  Funciones para crear cuenta
    const handleChangeCreateAccount = (prop) => (event) => {
        dispatch({
            type: "HANDLE_CHANGE_CREATE_ACCOUNT",
            payload: { prop, value: event.target.value },
        });
    };

    const handleClickShowPasswordCreate = () => {
        dispatch({ type: "SEE_PASSWORD_CREATE" });
    };

    const handleClickShowConfirmPasswordCreate = () => {
        dispatch({ type: "SEE_CONFIRM_PASSWORD_CREATE" });
    };

    const handleTypeAccountCreate = (type) => {
        dispatch({ type: "SET_TYPE_ACCOUNT_CREATE", payload: type });
    };

    const handleCreate = () => {
        console.log(state.createAccount);
        dispatch({ type: "VALIDATE_CREATE_ACCOUNT" });
        notiCreateAccount();
    };

    const notiCreateAccount = async () => {
        let aux = state.createAccount;
        if (state.createAccount.pushCreate) {
            if (!state.createAccount.validType) {
                notiWarning("Seleccione el tipo de cuenta");
            } else {
                if (aux.type === 0) {
                    if (!aux.validNombre) {
                        notiWarning("Ingrese su nombre");
                    } else if (!aux.validApellido_paterno || !aux.validApellido_materno) {
                        notiWarning("Ingrese sus apellidos");
                    } else if (!aux.validEmail) {
                        notiWarning("Email invalido");
                    } else if (!aux.validSemestre) {
                        notiWarning("Ingrese semestre");
                    } else if (!aux.validSexo) {
                        notiWarning("Ingrese su genero");
                    } else if (!aux.validTelefono_contacto) {
                        notiWarning("Ingrese su Telefono");
                    } else if (!aux.validPassword) {
                        notiWarning("Contraseña invalida");
                    } else if (!aux.validConfirmPassword) {
                        notiWarning("Contraseñas no coinciden");
                    } else {
                        console.log(aux)

                        dispatch({ type: "CREATE_ACCOUNT" });
                        let create = await fetchSinToken('auth/estudiante/registrar', aux, "POST")
                        console.log("create",create)
                        if (create.success) {
                            notiSuccess("Registrado correctamente");
                            notiSuccess("Creando cuenta");
                        } else {
                            notiWarning("El correo ya en uso");
                        }
                    }
                } else if (aux.type === 1) {
                    if (!aux.validNombre) {
                        notiWarning("Ingrese su nombre");
                    } else if (!aux.validEmail) {
                        notiWarning("Email invalido");
                    } else if (!aux.validDireccion) {
                        notiWarning("Ingrese la direccion");
                    } else if (!aux.validRfc) {
                        notiWarning("Ingrese su RFC");
                    } else if (!aux.validPassword) {
                        notiWarning("Contraseña invalida");
                    } else if (!aux.validConfirmPassword) {
                        notiWarning("Contraseñas no coinciden");
                    } else {
                        console.log(aux);
                        let create = await fetchSinToken('auth/empresa/crear', aux, "POST")
                        console.log(create)
                        if (create.success) {
                            notiSuccess("Registrado correctamente");
                            notiSuccess("Creando cuenta");
                        } else {
                            notiWarning("El correo ya en uso");
                        }
                        notiSuccess("Creando cuenta");
                        dispatch({ type: "CREATE_ACCOUNT" });
                    }
                }
            }
            state.createAccount.pushCreate = false;
        }
    };

    const fetchOfertas = async () => {
        let resultado = await fetchConToken('empresa/oferta/ofertas/all', null, "GET");
        console.log(resultado);

        return resultado
    }

    const handleGit = async (user) => {
        if (user != null && user != "" && user.length != 0) {
            let data = { gitUser: user }
            let update = await fetchConToken('actions/estudiante/git', data, "PUT");
            if (update.success) {
                let e = getItem('estudiante')
                e.user = update.estudiante
                e.repos = update.repos
                setItem("estudiante", e)
                notiSuccess("Actualizado correctamente");
                return e.repos
            }
            return true
        } else {
            return false
        }

    }
    const handleYT = async (videoURL) => {
        if (videoURL != null && videoURL != "" && videoURL.length != 0) {
            let data = { videoURL: videoURL }
            let update = await fetchConToken('actions/estudiante/git', data, "PUT");
            if (update.success) {
                let e = getItem('estudiante')
                e.user = update.estudiante
                setItem("estudiante", e)
                notiSuccess("Actualizado correctamente");
            }
            return true
        } else {

            return false
        }


    }

    const handleCV = async (cv) => {
        if (!cv) {
            notiWarning("Hubo un error, intenta más tarde");
        }

        let create = await fetchConToken('cv/crear', cv, "POST");
        if (create.success) {
            let e = getItem('estudiante')
            e.cv = create.cv
            setItem('estudiante', e);
            notiSuccess("Creado correctamente");
        }
    }

    const handleLogOut = async () => {
        dispatch({ type: "LOGGED_OUT" });
        removeItem('token')
        removeItem('typeAccount')
        removeItem("empresa")
        removeItem("estudiante")
    }

    const handleUpdateEmpresa = async (empresa) => {
        if (!empresa) {
            notiWarning("Hubo un error, intenta más tarde");
        }
        let update = await fetchConToken('actions/empresa/actualizar', empresa, "POST");
        if (update.success) {
            console.log(update)
            let e = getItem('empresa')
            console.log(e)
            e.user = update.empresa
            setItem('empresa', e);
            notiSuccess("Actualizado correctamente");
        }
    }

    const handleEstudiantesList = async () => {

        let estudiantes = await fetchConToken('estudiantes/empresa/', null, "GET");
        if (estudiantes.success) {
            console.log(estudiantes.estudiantes)
            return estudiantes.estudiantes
        }
    }

    const getEstudiante = async (uid) => {
        let estudiante = await fetchConToken('estudiantes/empresa/'+uid,null,"GET");
        if (estudiante.success) {
            console.log(estudiante)
            return estudiante
        }
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                changeSidebar,
                handleChangeLogin,
                handleClickShowPassword,
                handleMouseDownPassword,
                handleTypeAccount,
                handleLogin,
                handleChangeMode,
                handleChangeRecoverPassword,
                handleRecover,
                handleChangeCreateAccount,
                handleClickShowPasswordCreate,
                handleClickShowConfirmPasswordCreate,
                handleTypeAccountCreate,
                handleCreate,
                fetchOfertas,
                handleGit,
                handleYT,
                handleLogOut,
                handleCV,
                handleUpdateEmpresa,
                handleEstudiantesList,
                getEstudiante
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
