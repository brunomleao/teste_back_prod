import React, { useState, useEffect } from 'react'
import { Space, Table, Button, Modal, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'

import './list.scss'

import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ExclamationCircleFilled } from '@ant-design/icons';

// Define a tipagem de uma categoria
type CategoryType = {
  _id: number;
  name: string;
  nTags: number;
}

// const batteryLevel: Function = (level: number) => {
//   let type = 0
//   let difference = Math.abs(20 - level)

//   if (Math.abs(50 - level) < difference) {
//     difference = Math.abs(50 - level)
//     type = 1
//   }
//   if (Math.abs(80 - level) < difference) {
//     difference = Math.abs(80 - level)
//     type = 2
//   }
//   if (Math.abs(100 - level) < difference) {
//     difference = Math.abs(100 - level)
//     type = 3
//   }

//   switch (type) {
//     case 0:
//       return <BatteryCharging20Icon className='icon low' />
//     case 1:
//       return <BatteryCharging50Icon className='icon' />
//     case 2:
//       return <BatteryCharging80Icon className='icon' />
//     case 3:
//       return <BatteryChargingFullIcon className='icon' />
//   }
// }

// Define o modal de confirmação
const { confirm } = Modal;


// Tela de Listagem de Categorias
const List: any = (Parent: any) => {
  const navigate = useNavigate()

  // Função que chama uma função de troca de página de seu componente pai
  const handleActive: Function = (index: number) => {
    Parent.props.changePage(index)
  }

  // Define as categorias com os valores que estão sendo passados pelo componente pai
  const [categories, setCategories] = useState(Parent.props.categories)

  // Hook para que ao ter uma atualização nas categorias, atualizá-las e renderizá-las novamente na tela
  useEffect(() => {
    let messageText = localStorage.getItem("message")
    if (messageText) {
      message.success(messageText, 3);
      localStorage.removeItem("message")
    }

    setCategories(Parent.props.categories)
    console.log(categories)
  }, [Parent.props.categories])

  // Função que deletará a categoria, fazendo uma requisição para o backend utilizando do ID como parâmetro
  async function deleteCategory(id: string) {
    await fetch(`http://localhost:8000/api/category/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      localStorage.setItem("message", "Categoria deletada com sucesso!")
      Parent.props.getCategories()
    })
  }

  // Função que exibe o modal de confirmação de exclusão de categoria
  const showConfirm: Function = (id: string) => {
    confirm({
      title: 'Você realmente desaja excluir a categoria?',
      icon: <ExclamationCircleFilled />,
      // content: 'Não poderá ser desfeita',
      okText: "Excluir",
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
        deleteCategory(id)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  // Estruturação da tabela de categorias
  const columns: ColumnsType<CategoryType> = [
    {
      title: 'Categoria',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Número de Tags',
      dataIndex: 'results',
      key: 'results',
    },
    // {
    //   title: 'Categoria',
    //   dataIndex: 'category',
    //   key: 'category',
    // },
    {
      title: 'Ações',
      key: 'action',
      render: (_, obj: any, index: number) => (
        <Space size="middle">
          <Link onClick={() => handleActive(index)} to={"/"}>
            <VisibilityIcon className='actionIcon' />
          </Link>
          <Link
            to={`/categories/edit/${obj._id}`}
            state={{ name: obj.name }}
          >
            <EditIcon className='actionIcon' />
          </Link>
          <DeleteIcon onClick={() => showConfirm(obj._id)} className='actionIcon' />
        </Space>
      )
    }
  ]

  return (
    <div id="categories-list">
      <div className="buttonContainer">
        <Link to={"/categories/add"}>
          <Button>Adicionar Categoria</Button>
        </Link>
      </div>
      <Table rowKey="name" className='table' columns={columns} dataSource={categories} pagination={{ pageSize: 5 }} />
    </div>
  )
}

export default List