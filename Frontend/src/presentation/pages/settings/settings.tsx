import React, { useEffect, useState } from 'react'
import './configuration.scss'

import {
  Button,
  Form,
  Input,
  Select
} from 'antd'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

// Tela de edição de Tag
const Configuration: any = (Parent: any) => {
  // Define os estados utilizados na tela assim como pega o ID passado pela URL
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const id = params.id
  const [tag, setTag] = useState({
    _id: '',
    name: location.state.name,
    macAddress: location.state.macAddress,
    category: location.state.category
  })
  const [beacons, setBeacons] = useState(Parent.props.beacons)

  // Hook para verificar se há mudança nas categorias de acordo com o componente pai
  useEffect(() => {
    // Define as categorias como as categorias definadas no componente pai
    setBeacons(Parent.props.beacons)
  }, [Parent.props.beacons])

  // Função responsável por requisitar uma Tag específica, passando como parametro o ID da tag
  async function getBeacons() {
    await fetch(`http://localhost:8000/api/tags/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        // Ao receber a resposta da requisição, armazena a Tag em seu estado
        setTag(json.data._tag)
        console.log(json.data._tag)
      })
  }

  // Função responsável por fazer a requisição que irá editar a Tag, passando como parâmetro o ID da Tag
  async function editTag(values: any) {
    await fetch(`http://localhost:8000/api/tags/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      // Envia para o backend os valores informados no formulário de edição
      body: JSON.stringify(values)
    }).then(() => {
      Parent.props.getBeaconss()
      localStorage.setItem("message", "Tag editada com sucesso!")
    }).then(() => navigate('/tags')) // Após, navega para a tela de listagem de Tags
  }

  // Ao finalizar o formulário, chama a função de edição de Tag
  const onFinish: any = (values: any) => {
    if (values) {
      editTag(values)
    }
  }

  // Ao carregar a página, chama a função que irá requisitar a Tag a ser editada
  useEffect(() => {
    getBeacons()
  }, [])

  return (
    <div id="tags-edit">
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
          label="Posição do Beacon 1"
          name="name"
          rules={[{ required: true, message: 'Preencha com o nome' }]}
          initialValue={tag.name}
        >
          <Input disabled defaultValue={0}/>
        </Form.Item>

        <Form.Item
          label="Distância para o Beacon 1 (Beacon 2)"
          name="name"
          rules={[{ required: true, message: 'Preencha com o nome' }]}
          initialValue={tag.name}
        >
          <Input disabled defaultValue={0}/>
        </Form.Item>

        <Form.Item
          label="Distância para o Beacon 1 (Beacon 3)"
          name="name"
          rules={[{ required: true, message: 'Preencha com o nome' }]}
          initialValue={tag.name}
        >
          <Input disabled defaultValue={0}/>
        </Form.Item>



        <Form.Item>
          <Button className='button' htmlType="submit">
            Salvar
          </Button>
          <Link to={"/tags"} >
            <Button className='button'>
              Cancelar
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Configuration