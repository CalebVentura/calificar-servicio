import React from 'react'

import firebaseApp from '../credenciales'
import {
    getAuth,
    signOut
} from 'firebase/auth'
const auth = getAuth(firebaseApp)

export const Home = () => {
  return (
    <div className='text-center m-5'> 
      <h3>PÁGINA DEL HOME</h3>
      <p>Solo para usuarios registrados</p>

      <button className='btn btn-danger mt-5'
        onClick={() => signOut(auth)}> Cerrar sesión</button>
    </div>
  )
}
