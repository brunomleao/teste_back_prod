import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  Select
} from 'antd';
import './add.scss'
import { Link, useNavigate } from 'react-router-dom';

// Tela de Cadastro de Tag
const Add: any = (Parent: any) => {
  // Define os estados utilizados na tela
  const navigate = useNavigate()
  const [newTags, setNewTags] = useState(Parent.props.newTags)
  const [categories, setCategories] = useState(Parent.props.categories)

  // Função responsável por fazer a requisição de Cadastro de Tag para o backend
  async function createTag(values: any) {
    await fetch(`http://localhost:8000/api/tags/${values.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      // Envia para o backend os valores inseridos no formulário de cadastro
      body: JSON.stringify(values)
    }).then(() => {
      Parent.props.getTags()
      localStorage.setItem("message", "Tag criada com sucesso!")
    }).then(() => navigate('/tags')) // Navega para a tela de Lista de Tags após cadastrar
  }

  // Ao preencher corretamente o formulário, chama a função de criação de Tag caso os dados estejam corretos
  const onFinish: any = (values: any) => {
    if (values) {
      console.log(values)
      createTag(values)
    }
  }

  // Hook para verificar se há alguma mudança nas categorias de acordo com o componente pai
  useEffect(() => {
    // Define as categorias como as recebecidas pelo componente pai
    setCategories(Parent.props.categories)
  }, [Parent.props.categories])

  // Hook para verificar se há alguma mudança nas tags não cadastradas de acordo com o componente pai 
  useEffect(() => {
    // Define as novas tags como as recebecidas pelo componente pai
    setNewTags(Parent.props.newTags)
  }, [Parent.props.newTags])

  return (
    <div id="tags-add">
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
          label="Nome da Tag"
          name="name"
          rules={[{ required: true, message: 'Prencha com o nome' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="id" label="MAC Address da Tag">
          <Select>
            {
              // Para cada nova Tag, mostra seu macAddress para permití-la ser selecionada para cadastrá-la
              newTags.map((newTag: any, index: number) => {
                return (
                  <Select.Option
                    className="formSelect"
                    bordered={false}
                    value={newTag._id}
                    key={`${newTag.macAddress}-${index}`}>
                    {newTag.macAddress}
                  </Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item name='category' label="Categoria da Tag">
          <Select>
            {
              // Para cada categoria, mostra uma nova opção de categoria para ser associada à tag
              categories.map((category: any, index: number) => {
                return (
                  <Select.Option key={`${category}-${index}`} value={category.name}>{category.name}</Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className='button' htmlType="submit">
            Cadastrar
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

export default Add