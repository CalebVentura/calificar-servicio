import React, { useState } from 'react'

import firebaseApp from '../credenciales'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithRedirect,
    GoogleAuthProvider
} from 'firebase/auth'
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()

export const Login = () => {

    const [usuarioExiste, setUsuarioExiste] = useState(false)

    const [datos, setDatos] = useState({
        email: '',
        pass: ''
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatosAFirebase = async (e) => {
        e.preventDefault()
        const email = datos.email
        const pass = datos.pass

        if (usuarioExiste) {
            // INICIAR SESIÓN
            signInWithEmailAndPassword(auth, email, pass)
        } else {
            // REGISTRO
            await createUserWithEmailAndPassword(auth, email, pass )
        }
    }

    return (
        <div className='m-5'>
            <h3 className='text-center'> Formulario de {usuarioExiste ? 'Inicio de sesión' : 'Registro'}</h3>
            <form onSubmit={enviarDatosAFirebase}>
                {/* EMAIL */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        onChange={handleInputChange}
                        />
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="pass"
                        onChange={handleInputChange}
                        />
                </div>

                {/* BOTONES */}
                <button type="submit" className="btn btn-primary">{usuarioExiste ? 'Iniciar sesión' : 'Registrarme'}</button>
                <br/>
                <br/>
                <button
                    className='btn btn-danger'
                    onClick={() => signInWithRedirect(auth, googleProvider)}
                    > {usuarioExiste ? 'Iniciar Sesión' : 'Registrarme'} con Google</button>
                
                
                
                <button className='btn btn-secondary mt-5' onClick={() => {setUsuarioExiste(!usuarioExiste)}}> Cambiar a form de {usuarioExiste ? ' registro' : 'inicio de sesión'}</button>
            
            </form>
        </div>
    )
}
