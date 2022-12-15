import React, { useState, useEffect } from 'react'
import { Space, Table, Button, Popover, Modal, message } from 'antd'
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
import InfoIcon from '@mui/icons-material/Info'
import { ExclamationCircleFilled } from '@ant-design/icons';


// Define a tipagem de uma Tag
type TagType = {
  _id: number;
  macAddress: string;
  name: string;
  category: string;
  battery: any;
  isMoving: boolean
  position: [number, number]
}

// Define o modal de confirmação de exclusão
const { confirm } = Modal;

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

// const data: TagType[] = [
//   {
//     _id: 0,
//     macAddress: 'abc',
//     name: "Objeto 1",
//     battery: batteryLevel(28),
//     category: "Furadeiras",
//     isMoving: true,
//     position: [100, 250]
//   },
//   {
//     _id: 1,
//     macAddress: 'abc',
//     name: "Objeto 2",
//     battery: batteryLevel(50),
//     category: "Motoserras",
//     isMoving: true,
//     position: [100, 350]
//   },
//   {
//     _id: 2,
//     macAddress: 'abc',
//     name: "Objeto 3",
//     battery: batteryLevel(72),
//     category: "Britadeiras",
//     isMoving: false,
//     position: [50, 450]
//   },
//   {
//     _id: 3,
//     macAddress: 'abc',
//     name: "Objeto 4",
//     battery: batteryLevel(89),
//     category: "Motoserras",
//     isMoving: true,
//     position: [175, 600]
//   },
//   {
//     _id: 4,
//     macAddress: 'abc',
//     name: "Objeto 5",
//     battery: batteryLevel(10),
//     category: "Britadeiras",
//     isMoving: false,
//     position: [200, 250]
//   },
//   {
//     _id: 5,
//     macAddress: 'abc',
//     name: "Objeto 6",
//     battery: batteryLevel(0),
//     category: "Furadeiras",
//     isMoving: true,
//     position: [120, 520]
//   },
//   {
//     _id: 6,
//     macAddress: 'abc',
//     name: "Objeto 7",
//     battery: batteryLevel(100),
//     category: "Motoserras",
//     isMoving: true,
//     position: [300, 450]
//   },
//   {
//     _id: 7,
//     macAddress: 'abc',
//     name: "Objeto 8",
//     battery: batteryLevel(45),
//     category: "Britadeiras",
//     isMoving: false,
//     position: [300, 150]
//   }
// ]

// Tela de listagem de Tags
const List: any = (Parent: any) => {
  const navigate = useNavigate()
  // Função para definir uma tag como ativa ao clicar em visualizá-la na tela
  // Navegará para a tela de localização, destacando a tag selecionada
  const handleActive: Function = (index: number) => {
    Parent.props.changeTag(index)
    Parent.props.changePage(0)
  }

  // Define as tags e as novas tags de acordo com o componente pai
  const [tags, setTags] = useState(Parent.props.tags)
  const [newTags, setNewTags] = useState(Parent.props.newTags)

  // Hook para definir as tags de acordo com os dados do componente pai sempre que houver uma mudança
  useEffect(() => {
    let messageText = localStorage.getItem("message")
    if (messageText) {
      message.success(messageText, 3);
      localStorage.removeItem("message")
    }

    setTags(Parent.props.tags)
    console.log(tags)
  }, [Parent.props.tags])

  // Hook para verificar se há alguma mudança nas tags não cadastradas de acordo com o componente pai 
  useEffect(() => {
    // Define as novas tags como as recebecidas pelo componente pai
    setNewTags(Parent.props.newTags)
  }, [Parent.props.newTags])

  // Função responsável por fazer a requisição de deletação de Tag, passando como parâmetro o ID da Tag 
  async function deleteTag(id: string) {
    await fetch(`http://localhost:8000/api/tags/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      localStorage.setItem("message", "Tag deletada com sucesso!")
      Parent.props.getTags()
    }).then(() => navigate('/tags')) // Após,navega novamente para listagem de tags para atualizar a tela
  }

  // Função que renderiza o modal de confirmação de exclusão de tags
  const showConfirm: Function = (id: string) => {
    confirm({
      title: 'Você realmente desaja excluir a Tag?',
      icon: <ExclamationCircleFilled />,
      // content: 'Não poderá ser desfeita',
      okText: "Excluir",
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
        deleteTag(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // Constrói a estrutura da tabela de Tags
  const columns: ColumnsType<TagType> = [
    {
      title: 'Tag',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'battery',
      key: 'status',
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, obj, index) => (
        <Space size="middle">
          <Link onClick={() => handleActive(index)} to={"/"}>
            <VisibilityIcon className='actionIcon' />
          </Link>
          <Link
            to={`/tags/edit/${obj._id}`}
            state={{ name: obj.name, macAddress: obj.macAddress, category: obj.category }}
          >
            <EditIcon className='actionIcon' />
          </Link>
          <DeleteIcon onClick={() => showConfirm(obj._id)} className='actionIcon' />
        </Space>
      )
    }
  ]

  const content: any = (
    <div>Clique em Adicionar Tag</div>
  )

  // Função que exibirá uma notificação na tela que há novas tags caso ela não tenha sido cadastrada ainda
  const haveNewTags: Function = () => {
    if (newTags.length > 0) {
      return (
        <Popover placement='bottom' content={content} title="Novas tags encontradas" trigger="click">
          <InfoIcon className='icon' />
        </Popover>
      )
    }
  }

  return (
    <div id="tags-list">
      <Table rowKey="name" className='table' columns={columns} dataSource={tags} pagination={{ pageSize: 5 }} />
    </div>
  )
}

export default List