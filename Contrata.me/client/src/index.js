import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { AppProvider } from "./controller/context";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
    <SnackbarProvider maxSnack={3}>
        <AppProvider>
            <App />
        </AppProvider>
    </SnackbarProvider>,
    document.getElementById("root")
);
