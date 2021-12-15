import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./controller/context";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Login from "./pages/login";
import Home from "./pages/home";
import Aspirante from "./pages/aspirante";
import Ofertas from "./pages/ofertas";
import CVS from "./pages/cvs";
import Empresa from "./pages/empresa";
import Lista from "./pages/listaAspirantes";
import Error from "./pages/error";
import AspiranteVO from "./pages/aspiranteVO";
import "./css/app.css"
import { getItem } from "./util/Storage";
import Curriculum from "./pages/curriculum";

export default function App() {
    let token = getItem("token")
    const { loggedIn } = useGlobalContext()
    console.log(loggedIn)
    return (
        <div className='App'>
            <Router>
                <Navbar></Navbar>
                <Sidebar></Sidebar>
                <Routes>
                    <Route exact path='/' element={!token ? <Login /> : <Home />}>
                    </Route>
                    <Route exact path='/home' element={!token ? <Login /> : <Home />}></Route>
                    <Route exact path='/aspirante' element={!token ? <Login /> : <Aspirante />}></Route>
                    <Route exact path='/ofertas' element={!token ? <Login /> : <Ofertas />}></Route>
                    <Route exact path='/cvs' element={!token ? <Login /> : <CVS />}></Route>
                    <Route exact path='/empresa' element={!token ? <Login /> : <Empresa />}></Route>
                    <Route exact path='/curriculum' element={!token ? <Login /> : <Curriculum />}></Route>
                    <Route exact path='/listaAspirantes' element={!token ? <Login /> : <Lista />}></Route>
                    <Route exact path='/aspiranteVO' element={!token ? <Login /> : <AspiranteVO />}></Route>
                    <Route exact path='/*' element={<Error />}></Route>
                </Routes>
                <Footer></Footer>
            </Router>
        </div>
    );
}
