import React, { useState, useEffect, useRef } from 'react'
import './edit.scss'
import { useLocation, useNavigate, useParams } from "react-router-dom"

import {
  Button,
  Form,
  Input,
  Select
} from 'antd'
import { Link } from 'react-router-dom';

// Tela de edição de categoria
const Edit: any = (Parent: any) => {
  // Funções e variaveis que servirão para pegar o ID da categoria por meio da URL  
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const id = params.id

  const [category, setCategory] = useState({
    _id: '',
    name: location.state.name
  })

  // Função que pega a categoria a ser editada, requisitando ela para o backend
  async function getCategory() {
    await fetch(`http://localhost:8000/api/category/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        // Atualiza os dados da categoria com o retorno da requisição
        setCategory(json.data._category)
      })
  }

  // Função que edita a categoria, fazendo uma requisição para o backend
  async function editCategory(values: any) {
    await fetch(`http://localhost:8000/api/category/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      // Envia para o backend os dados do formulário
      body: JSON.stringify({name: values.category})
    }).then(() => {
      Parent.props.getCategories()
      localStorage.setItem('message', "Categoria editada com sucesso!")
    }
      ).then(() => navigate('/categories'))
  }

  // Função que envia os dados do formulário
  const onFinish: any = (values: any) => {
    if (values) {
      editCategory(values)
    }
  }

  // Hook que permite o React chamar uma função quando carrega a página pela primeira vez
  useEffect(() => {
    // Chama a função que irá pegar a categoria a ser editada  
    getCategory()
  }, [])

  return (
    <div id="categories-edit">
      <Form
        className='form'
        name="basic"
        labelAlign='left'
        layout="vertical"

        requiredMark={false}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nome da Categoria"
          name="category"
          rules={[{ required: true, message: 'Preencha com o nome' }]}
          initialValue={category.name}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button className='button' htmlType="submit">
            Salvar
          </Button>
          <Link to={"/categories"} >
            <Button className='button'>
              Cancelar
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Edit