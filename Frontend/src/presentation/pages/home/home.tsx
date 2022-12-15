import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom"
import { Header, Sidebar } from '../../components'
import './home.scss'

import { Location, CategoriesList, CategoriesAdd, CategoriesEdit, TagsList, TagsAdd, TagsEdit } from '../../../presentation/pages'

const verifyPage: Function = () => {
  let path = String(useLocation().pathname)

  if (path.includes("/categories")) {
    return 1
  }
  else if (path.includes("/tags")) {
    return 2
  }
  else if (path.includes("/configuration")) {
    return 4
  }
  else {
    return 0
  }
}

// Roteamento de páginas, é o componente que será responsável por mudar de páginas sem recarregá-la
const Home: React.FC = () => {
  // Define todos os estados de Tags e Categorias, usados por boa parte das telas
  const [actualTag, setActualTag] = useState(-1)
  const [actualPage, setActualPage] = useState(verifyPage())
  const [tags, setTags] = useState([])
  const [newTags, setNewTags] = useState([])
  const [categories, setCategories] = useState([])

  // Função responsável por requisitar ao Backend todas as tags existentes
  async function getTags() {
    await fetch("http://localhost:8000/api/tags", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((json) => {
        // Atualiza as Tags com as tags retornadas pela requisição
        setTags(json.data)
      })
  }

  // Função responsável por requisitar todas as novas tags, aquelas que ainda não forma cadastradas
  async function getNewTags() {
    await fetch("http://localhost:8000/api/tags/?name=&category=", {

      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((json) => {
        // Atualiza as novas tags de acordo com os dados retornados
        setNewTags(json.data)
      })
  }

  // Função responsável por solicitar ao backend todas as categorias existentes
  async function getCategories() {
    await fetch("http://localhost:8000/api/category", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        // Após retornar a solicitação, atualiza as categorias com os dados do backend
        setCategories(json.data)
      })
  }

  // Objeto que possui todas as funções e estados das páginas
  // utilizada para passar para qualquer componente filho funcionalidades da aplicação
  const props: any = {
    changeTag: (index: number) => setActualTag(index),
    changePage: (index: number) => setActualPage(index),
    actualTag: actualTag,
    actualPage: actualPage,
    tags: tags,
    getTags: getTags,
    newTags: newTags,
    getNewTags: getNewTags,
    categories: categories,
    getCategories: getCategories
  }

  // Ao carregar a página chama todas as funções que requistam dados do backend
  useEffect(() => {
    if (tags.length <= 1) {
      getTags()
    }
    if (categories.length <= 1) {
      getCategories()
    }
    if (newTags.length <= 1) {
      getNewTags()
    }

    // Define um intervalo para ficar solicitando novos dados do backend, está configurado para fazer isso a cada 5 segundos
    setInterval(() => {
      getTags()
      getCategories()
      getNewTags()
    }, 5000)
  }, [])

  return (
    <div id="home" >
      <Header />
      <Sidebar props={props} />

      <div className="container">
        <Routes>
          <Route path='/' element={<Location props={props} />} />
          <Route path='categories' element={<CategoriesList props={props} />} />
          <Route path='categories/add' element={<CategoriesAdd props={props} />} />
          <Route path='categories/edit/:id' element={<CategoriesEdit props={props} />} />
          <Route path='tags' element={<TagsList props={props} />} />
          <Route path='tags/add' element={<TagsAdd props={props} />} />
          <Route path='tags/edit/:id' element={<TagsEdit props={props} />} />
          <Route path='settings' element={<Location props={props} />} />
        </Routes>
      </div>
    </div >
  )
}

export default Home