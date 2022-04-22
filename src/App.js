import { useState } from "react";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

import firebaseApp from './credenciales'
import {
    getAuth,
    onAuthStateChanged
} from 'firebase/auth'
const auth = getAuth(firebaseApp)

function App() {
    const [sesionIniciada, setSesionIniciada] = useState(false)

    onAuthStateChanged(auth, (userIsLogged) => {
        if (userIsLogged) {
            setSesionIniciada(true)
        } else {
            setSesionIniciada(false)
        }
    })

    return (
        <>{sesionIniciada ? <Home /> : <Login />}</>
    );
}

export default App;
