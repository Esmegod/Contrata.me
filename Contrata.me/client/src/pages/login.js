import React from "react";
import { useGlobalContext } from "../controller/context";
import "../css/login.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import NativeSelect from '@mui/material/NativeSelect';

const styles = {
    box: {
    backgroundColor: "#DDEFF9",
    },
    mainGridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    },
    gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
    flexDirection: "column",
    },
    stack: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    margin: "5px",
    },
    textLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "95%",
    fontFamily: "Roboto Slab",
    },
    display_none: {
    display: "none",
    },
    fontH1: {
    fontFamily: "Roboto Slab",
    fontSize: "5vh",
    padding: "20px",
    textAlign: "center",
    },
    avatar: {
    width: "25%",
    height: "25%",
    transition: "all 0.5s ease",
    "&:hover": {
        background: "rgba(75, 235, 35, 30)",
        transition: "all 0.5s ease",
    },
    },
    avatarSel: {
    width: "28%",
    height: "28%",
    background: "rgba(75, 235, 35, 30)",
    },
    avatarRecover: {
    width: "80%",
    height: "80%",
    marginLeft: "110px",
    marginRight: "110px",
    },
    input: {
    m: 1,
    width: "25ch",
    },
    inputCreate: {
    m: 2.1,
    width: "25ch",
    },
    boton: {
    width: "100%",
    color: "black",
    fontFamily: "Roboto Slab",
    background: "hsl(170, 33%, 86%)",
    transition: "all 0.5s ease",
    "&:hover": {
        background: "hsl(79, 33%, 70%)",
        transition: "all 0.5s ease",
    },
    },
};

function Login() {
    const {
    loginMode,
    login,
    recoverPassword,
    handleChangeLogin,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleTypeAccount,
    handleLogin,
    handleChangeMode,
    handleChangeRecoverPassword,
    handleRecover,
    createAccount,
    handleChangeCreateAccount,
    handleClickShowPasswordCreate,
    handleClickShowConfirmPasswordCreate,
    handleTypeAccountCreate,
    handleCreate,
    } = useGlobalContext();


    return (
    <section className='login'>
        <Box sx={styles.box}>
            <Grid container sx={styles.mainGridContainer}>
                {/* Iniciar sesion */}
                <Grid
                    item
                    md={6}
                    className={"login-sesion"}
                    sx={loginMode.mode === "login" ? null : styles.display_none}>
                    <Grid container spacing={2} sx={styles.gridContainer}>
                        <Grid item xs={8} md={8}>
                            <Typography variant='h1' sx={styles.fontH1}>
                                Iniciar sesion
                            </Typography>
                        </Grid>
                        {/* Selecciona el tipo de cuenta */}
                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Seleccione el tipo de cuenta
                            </Typography>
                        </Grid>
                        <Stack sx={styles.stack}>
                            <Avatar
                                alt='Empresa'
                                src={require(`../img/empresa.png`).default}
                                sx={login.type === 1 ? styles.avatarSel : styles.avatar}
                                onClick={() => handleTypeAccount(1)}
                            />
                            <Avatar
                                alt='Aspirante'
                                src={require(`../img/programador.png`).default}
                                sx={login.type === 0 ? styles.avatarSel : styles.avatar}
                                onClick={() => handleTypeAccount(0)}
                            />
                        </Stack>
                        <Stack sx={styles.stack}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Empresa
                            </Typography>
                            <Typography variant='label' sx={styles.textLabel}>
                                Aspirante
                            </Typography>
                        </Stack>

                        {/* Ingresar datos */}
                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Ingrese sus datos
                            </Typography>
                        </Grid>
                        <Grid>
                            <FormControl sx={styles.input} variant='standard'>
                                <TextField
                                    id='user'
                                    type={login.user}
                                    value={login.user}
                                    onChange={handleChangeLogin("user")}
                                    label='Usuario'
                                    variant='standard'
                                />
                            </FormControl>
                        </Grid>
                        <Grid>
                            <FormControl sx={styles.input} variant='standard'>
                                <InputLabel htmlFor='password'>Password</InputLabel>
                                <Input
                                    id='password'
                                    type={login.showPassword ? "text" : "password"}
                                    value={login.password}
                                    onChange={handleChangeLogin("password")}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}>
                                                {login.showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>

                        {/* Botones */}
                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Ingresar:
                            </Typography>
                        </Grid>
                        <Stack direction='row' spacing={2} sx={styles.stack}>
                            <Button variant='contained' sx={styles.boton} onClick={handleLogin}>
                                Iniciar Sesion
                            </Button>
                        </Stack>

                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Opciones
                            </Typography>
                        </Grid>
                        <Stack direction='row' spacing={2} sx={styles.stack}>
                            <Button
                                variant='contained'
                                sx={styles.boton}
                                onClick={() => handleChangeMode("recover")}>
                                Recuperar Contraseña
                            </Button>
                        </Stack>
                        <Stack direction='row' spacing={2} sx={styles.stack}>
                            <Button
                                variant='contained'
                                sx={styles.boton}
                                onClick={() => handleChangeMode("create")}>
                                Crear Cuenta
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Recuperar contraseña */}
                <Grid
                    item
                    md={6}
                    className={"login-recuperar"}
                    sx={loginMode.mode === "recover" ? null : styles.display_none}>
                    <Grid container spacing={2} sx={styles.gridContainer}>
                        <Grid item xs={8} md={8}>
                            <Typography variant='h1' sx={styles.fontH1}>
                                Recuperar contraseña
                            </Typography>
                        </Grid>
                        {/* Selecciona el tipo de cuenta */}
                        <Grid item xs={8} md={8}></Grid>
                        <Stack sx={styles.stack}>
                            <Avatar
                                alt='Recuperar contraseña'
                                src={require(`../img/password.png`).default}
                                sx={styles.avatarRecover}
                                onClick={() => handleTypeAccount(1)}
                            />
                        </Stack>
                        {/* Ingresar datos */}
                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Ingrese su email
                            </Typography>
                        </Grid>
                        <Grid>
                            <FormControl sx={styles.input} variant='standard'>
                                <TextField
                                    id='emailRecover'
                                    type={recoverPassword.emailRecover}
                                    value={recoverPassword.emailRecover}
                                    onChange={handleChangeRecoverPassword("emailRecover")}
                                    label='Email'
                                    variant='standard'
                                />
                            </FormControl>
                        </Grid>

                        {/* Botones */}
                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Recuperar Contraseña:
                            </Typography>
                        </Grid>
                        <Stack direction='row' spacing={2} sx={styles.stack}>
                            <Button
                                variant='contained'
                                sx={styles.boton}
                                onClick={handleRecover}>
                                Recuperar Contraseña
                            </Button>
                        </Stack>
                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Opciones
                            </Typography>
                        </Grid>
                        <Stack direction='row' spacing={2} sx={styles.stack}>
                            <Button
                                variant='contained'
                                sx={styles.boton}
                                onClick={() => handleChangeMode("login")}>
                                Iniciar Sesion
                            </Button>
                        </Stack>
                        <Stack direction='row' spacing={2} sx={styles.stack}>
                            <Button
                                variant='contained'
                                sx={styles.boton}
                                onClick={() => handleChangeMode("create")}>
                                Crear Cuenta
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Crear cuenta */}
                <Grid
                    item
                    md={6}
                    className={"login-crear"}
                    sx={loginMode.mode === "create" ? null : styles.display_none}>
                    <Grid container spacing={2} sx={styles.gridContainer}>
                        <Grid item xs={8} md={8}>
                            <Typography variant='h1' sx={styles.fontH1}>
                                Crear Cuenta
                            </Typography>
                        </Grid>
                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Seleccione el tipo de cuenta
                            </Typography>
                        </Grid>
                        <Stack sx={styles.stack}>
                            <Avatar
                                alt='Empresa'
                                src={require(`../img/empresa.png`).default}
                                sx={createAccount.type === 1 ? styles.avatarSel : styles.avatar}
                                onClick={() => handleTypeAccountCreate(1)}
                            />
                            <Avatar
                                alt='Aspirante'
                                src={require(`../img/programador.png`).default}
                                sx={createAccount.type === 0 ? styles.avatarSel : styles.avatar}
                                onClick={() => handleTypeAccountCreate(0)}
                            />
                        </Stack>
                        <Stack sx={styles.stack}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Empresa
                            </Typography>
                            <Typography variant='label' sx={styles.textLabel}>
                                Aspirante
                            </Typography>
                        </Stack>
                        {/* Ingresar datos */}
                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Ingrese sus datos
                            </Typography>
                        </Grid>

                        <Grid
                            className='estudiante'
                            sx={createAccount.type === 0 ? null : styles.display_none}>
                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='nombre'
                                        type={createAccount.nombre}
                                        value={createAccount.nombre}
                                        onChange={handleChangeCreateAccount("nombre")}
                                        label='Nombre'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>

                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='apellido_paterno'
                                        type={createAccount.apellido_paterno}
                                        value={createAccount.apellido_paterno}
                                        onChange={handleChangeCreateAccount("apellido_paterno")}
                                        label='Apellido Paterno'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>

                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='apellido_materno'
                                        type={createAccount.apellido_materno}
                                        value={createAccount.apellido_materno}
                                        onChange={handleChangeCreateAccount("apellido_materno")}
                                        label='Apellido Materno'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>

                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='email'
                                        type={createAccount.email}
                                        value={createAccount.email}
                                        onChange={handleChangeCreateAccount("email")}
                                        label='Correo electronico'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>

                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='semestre'
                                        type={createAccount.semestre}
                                        value={createAccount.semestre}
                                        onChange={handleChangeCreateAccount("semestre")}
                                        label='Semestre'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid> 
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Sexo
                                    </InputLabel>
                                    <NativeSelect
                                        id="sexo"
                                        defaultValue={"Seleccionar"}
                                        onChange={handleChangeCreateAccount(
                                            "sexo"
                                        )}
                                    >
                                        <option value={"Seleccionar"} disabled>Seleccionar</option>
                                        <option value={"Masculino"}>Masculino</option>
                                        <option value={"Femenino"}>Femenino</option>
                                        <option value={"Otro"}>Otro</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>

                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='telefono'
                                        type="number"
                                        onInput = {(e) =>{
                                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                                        }}
                                        value={createAccount.telefono}
                                        onChange={handleChangeCreateAccount(
                                            "telefono"
                                        )}
                                        label='Telefono'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid
                            className='empresas'
                            sx={createAccount.type === 1 ? null : styles.display_none}>
                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='nombre'
                                        type={createAccount.nombre}
                                        value={createAccount.nombre}
                                        onChange={handleChangeCreateAccount("nombre")}
                                        label='Nombre'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='email'
                                        type={createAccount.email}
                                        value={createAccount.email}
                                        onChange={handleChangeCreateAccount("email")}
                                        label='Correo electronico'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='direccion'
                                        type={createAccount.direccion}
                                        value={createAccount.direccion}
                                        onChange={handleChangeCreateAccount("direccion")}
                                        label='Direccion'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid>
                                <FormControl sx={styles.inputCreate} variant='standard'>
                                    <TextField
                                        id='rfc'
                                        type={createAccount.rfc}
                                        value={createAccount.rfc}
                                        onChange={handleChangeCreateAccount("rfc")}
                                        label='RFC'
                                        variant='standard'
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid className='contraseña' sx={createAccount.type !== -1 ? null : styles.display_none}>
                            <FormControl sx={styles.input} variant='standard'>
                                <InputLabel htmlFor='password'>Contraseña</InputLabel>
                                <Input
                                    id='passwordCreate'
                                    type={
                                        createAccount.showPasswordCreate ? "text" : "password"
                                    }
                                    value={createAccount.passwordCreate}
                                    onChange={handleChangeCreateAccount("passwordCreate")}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPasswordCreate}
                                                onMouseDown={handleMouseDownPassword}>
                                                {createAccount.showPasswordCreate ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl sx={styles.input} variant='standard'>
                                <InputLabel htmlFor='password'>Confirmar Contraseña</InputLabel>
                                <Input
                                    id='confirmPasswordCreate'
                                    type={
                                        createAccount.showConfirmPasswordCreate
                                            ? "text"
                                            : "password"
                                    }
                                    value={createAccount.confirmPasswordCreate}
                                    onChange={handleChangeCreateAccount(
                                        "confirmPasswordCreate"
                                    )}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowConfirmPasswordCreate}
                                                onMouseDown={handleMouseDownPassword}>
                                                {createAccount.showConfirmPasswordCreate ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>

                        {/* Botones */}
                        <Grid>
                            <Typography variant='label' sx={styles.textLabel}>
                                Crear Cuenta:
                            </Typography>
                        </Grid>
                        <Stack direction='row' spacing={2} sx={styles.stack}>
                            <Button
                                variant='contained'
                                sx={styles.boton}
                                onClick={handleCreate}>
                                Crear cuenta
                            </Button>
                        </Stack>
                        <Grid item xs={8} md={8}>
                            <Typography variant='label' sx={styles.textLabel}>
                                Opciones
                            </Typography>
                        </Grid>
                        <Stack direction='row' spacing={2} sx={styles.stack}>
                            <Button
                                variant='contained'
                                sx={styles.boton}
                                onClick={() => handleChangeMode("login")}>
                                Iniciar Sesion
                            </Button>
                        </Stack>
                        <Stack direction='row' spacing={2} sx={styles.stack}>
                            <Button
                                variant='contained'
                                sx={styles.boton}
                                onClick={() => handleChangeMode("recover")}>
                                Recuperar Contraseña
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </section>
    );
}

export default Login;