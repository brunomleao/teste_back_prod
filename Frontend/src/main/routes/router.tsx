import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Acess } from '../../presentation/pages'

// Router que será responsável por controlar as páginas acessáveis
const Router: React.FC = () => {
  if(!localStorage.getItem("logged")) {
    localStorage.setItem("logged", "false")
  }

  return (
    <BrowserRouter>
      <Routes>  
        {
          // Verifica se o usuário está logado ou não, exibe a tela de login ou a home
          localStorage.getItem("logged") == 'true' ? <Route path='/*' element={<Home />} /> :
            <Route path='/*' element={<Acess />} />
        }
      </Routes>
    </BrowserRouter>
  )
}

export default Router