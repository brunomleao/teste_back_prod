import React, { useEffect, useState } from 'react'
import { Select, Tag } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import { Input, Button, Popover } from 'antd'
import './location.scss'
  ;
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { stringify } from 'rc-field-form/es/useWatch'

// Define a tipagem de um beacon
type BeaconType = {
  id: number;
  macAddress: string;
  name: string;
  position: [number, number];
}

// Define a tipagem de uma Tag
type TagType = {
  id: number;
  macAddress: string;
  name: string;
  category: string;
  battery: any;
  isMoving: boolean;
  lastPosition: [number, number];
}

// Função responsável por enviar para o backend a ativação de uma Tag específica
const sendStatus: Function = async (id: number, status: boolean) => {
  console.log(id)
  await fetch(`http://localhost:8000/api/tags/${id}`, {
    method: "PATCH",
    // mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // Envia para o backend se a Tag está ativada ou não
    body: JSON.stringify({ activated: status })
    // credentials: 'same-origin',
    // referrerPolicy: 'unsafe-url'
  }).then((response) => response.json())
    .then((json) => {
      // Console para verificar se o dado foi enviado corretamente
      console.log(json)
    })
}

// Função para renderizar as categorias de uma Tag
const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  };
  return (
    <Tag
      color={"lime"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}

// Função usada para converter o nível da bateria para um dos ícones de níveis de bateria
const batteryLevel: Function = (level: number) => {
  let type = 0
  let difference = Math.abs(20 - level)

  if (Math.abs(50 - level) < difference) {
    difference = Math.abs(50 - level)
    type = 1
  }
  if (Math.abs(80 - level) < difference) {
    difference = Math.abs(80 - level)
    type = 2
  }
  if (Math.abs(100 - level) < difference) {
    difference = Math.abs(100 - level)
    type = 3
  }

  switch (type) {
    case 0:
      return <BatteryCharging20Icon className='icon low' />
    case 1:
      return <BatteryCharging50Icon className='icon' />
    case 2:
      return <BatteryCharging80Icon className='icon' />
    case 3:
      return <BatteryChargingFullIcon className='icon' />
  }
}

const generatePosition: Function = (position: number) => {
  if(position > 90) {
    // return "90%"
  }
  else if(position < 5) {
    return "5%"
  }
  else {
    return `${position}%`
  }
}

// Tela de localização, responsável por exibir visualmente onde as Tags estão
const Location: any = (Parent: any) => {
  // Define estados importantes de ações com a interface
  const [active, setActive] = useState(-1)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([''])
  const [tags, setTags] = useState(Parent.props.tags)

  const [categories, setCategories] = useState(Parent.props.categories)

  // Define os Beacons
  const beacons: BeaconType[] = [
    {
      id: 0,
      macAddress: 'ada32',
      name: 'Beacon 1',
      position: [5, 5]
    },
    {
      id: 1,
      macAddress: 'ada32',
      name: 'Beacon 2',
      position: [5, 5]
    },
    {
      id: 0,
      macAddress: 'ada32',
      name: 'Beacon 3',
      position: [5, 90]
    },

  ]

  // Hook para definir as Tags e Categorias com base nos dados armazenados pelo componente pai
  useEffect(() => {
    setTags(Parent.props.tags)
    setCategories(Parent.props.categories)
    console.log(tags)
  }, [Parent.props.tags, Parent.props.categories])

  // Define a Tag ativa de acordo com a propriedade passada pelo componente pai
  useEffect(() => {
    setActive(Parent.props.actualTag)
  }, [Parent.props.actualTag])

  // Função para selecionar Tags no menu lateral e deixá-las em evicência, delay para melhorar o feedback
  const handleActive: Function = (index: number) => {
    if (index !== active) {
      setTimeout(() => Parent.props.changeTag(index), 80)
      setTimeout(() => document.getElementsByClassName("rightSide")[0].scrollTop = 0, 200)
    }

    else {
      setTimeout(() => Parent.props.changeTag(-1), 80)
      setTimeout(() => document.getElementsByClassName("rightSide")[0].scrollTop = 0, 200)
    }
  }

  // Função que altera o valor pesquisado quando o input de pesquisa é alterado, utilizada para filtrar entre tags
  const handleSearch: Function = (value: string) => {
    setSearch(value)

    // Verifica se há uma tag ativa, se houver troca para -1, para que nenhuma tag fique ativa na interface
    // Tag ativa significa que ela ficará grifada visualmente na tela, evidenciando que ela está selecionada 
    if (active != -1) {
      handleActive(-1)
    }
  }

  // Função que altera o valor do filtro de categoria, utilizada para filtrar Tags de acordo com sua categoria
  const handleFilter: Function = (value: string[]) => {
    if (active != -1) {
      handleActive(-1)
    }
    setFilter(value)
  }

  // Função que retorna uma Tag no mapa de Tags, posicionado ela de acordo com a sua posição
  const showTag: Function = (tag: any, index: number) => {
    // Verificações se a Tag satisfaz os filtros aplicados, caso não, ela não será mostrada
    if (tag.name.toLowerCase().includes(search.toLowerCase()) && tag.name !== '') {
      if (filter.includes(tag.category) || !filter[0]) {
        if (active !== -1) {
          // Verifica se a Tag está ativa, se estiver ela é evidênciada em relação as outras
          if (index === active) {
            return (
              // <Popover content={showInfo(index)} title={tag.name} trigger="focus">
              <div
                key={`tag-${tag._id}`}
                onClick={() => handleActive(index)}
                className={`tag ${tag.isMoving ? 'active' : ''}`}
                style={
                  {
                    top: generatePosition(tag.lastPosition[0]),
                    left: generatePosition(tag.lastPosition[1])
                  }}>
              </div>
              // </Popover>
            )
          }
          // Caso não esteja ativa, a Tag ficará com uma coloração mais clara, evidênciando apenas a Tag ativa
          else {
            return (
              // <Popover content={showInfo(index)} title={tag.name} trigger="focus">
              <div
                key={`tag-location-${tag._id}`}
                onClick={() => handleActive(index)}
                className={`tag outFocus ${tag.isMoving ? 'active' : ''}`}
                style={
                  {
                    top: generatePosition(tag.lastPosition[0]),
                    left: generatePosition(tag.lastPosition[1])
                  }}>
              </div>
              // </Popover>
            )
          }
        }
        // Caso não haja Tag ativa, renderiza a Tag sem nenhuma característica visualmente diferente
        else {
          return (
            // <Popover content={showInfo(index)} title={tag.name} trigger="focus">
            <div
              key={`tag-location-${tag._id}`}
              onClick={() => handleActive(index)}
              className={`tag ${tag.isMoving ? 'active' : ''}`}
              style={
                {
                  top: generatePosition(tag.lastPosition[0]),
                  left: generatePosition(tag.lastPosition[1])
                }}>
            </div>
            // </Popover>
          )
        }
      }
    }
  }

  const [buttonActivated, setButtonActivated] = useState(false)

  // Função que será responsável por chamar a função que ativa fisicamente uma Tag, assim como definir o botão da Tag como ativado
  const handleActivated: Function = async (id: number, activated: boolean) => {
    await sendStatus(id, !activated)
    // setButtonActivated(!buttonActivated)
  }

  // Função que renderiza os beacons no mapa
  const showBeacons: Function = () => {
    let content: any = []

    // Para cada Beacon, renderiza e o posiciona em sua respectiva posição
    beacons.map((beacon, index) => {
      switch (index) {
        case 0:
          return (
            content.push(
              <div
                key={`beacon-${beacon.name}`}
                className={`beacon`}
                style={
                  {
                    top: `${beacon.position[0]}%`,
                    left: `${beacon.position[1]}%`
                  }}>
              </div>
            )
          )
        case 1:
          return (
            content.push(
              <div
                key={`beacon-${beacon.name}`}
                className={`beacon`}
                style={
                  {
                    top: `${beacon.position[0]}%`,
                    right: `${beacon.position[1]}%`
                  }}>
              </div>
            )
          )
        case 2:
          return (
            content.push(
              <div
                key={`beacon-${beacon.name}`}
                className={`beacon`}
                style={
                  {
                    bottom: `${beacon.position[0]}%`,
                    left: `${beacon.position[1]}%`
                  }}>
              </div>
            )
          )
      }
    })

    return content
  }

  // Função que renderiza a info que é mostrada ao deixa alguma das Tags ativa, ou seja, quando a Tag é clicada pelo mapa ou pelo meno lateral
  const showInfo: Function = () => {
    if (active != -1) {
      return (
        <div
          className="info"
          style={
            {
              top: generatePosition(tags[active].lastPosition[0]),
              left: `calc(${generatePosition(tags[active].lastPosition[1])} + 60px`
            }
          }>
          <div className="name">
            {tags[active].name}
          </div>
          <div onClick={() => handleActivated(tags[active]._id, tags[active].activated)} className='buttonContainer'>
            <div className={tags[active].activated ? 'buttonActivated' : 'buttonDesactived'}>Acionar Tag</div>
          </div>
        </div>
      )
    }
  }

  // Função que renderiza as Tags no menu lateral, de acordo com as filtragens e a Tag que está ativa
  const showTags: Function = () => {
    let content: any = []

    // Verifica se há uma Tag ativa, e se ela satisfaz a filtragem
    if (active !== -1 && tags[active].name.toLowerCase().includes(search.toLowerCase()) && tags[active].name !== '') {
      if (filter.includes(tags[active].category) || !filter[0]) {
        content.push(
          <div
            key={`tag-${tags[active]._id}`}
            onClick={() => handleActive(active)}
            className={`item active`}
          >
            {
              tags[active].isMoving ? <DirectionsRunIcon className='runningIcon' /> : ''
            }
            <div className="name">
              {tags[active].name}
            </div>
            {/* {
              tags[active].battery
            } */}
          </div>
        )
      }
    }

    // Para cada Tag que não é ativa, irá renderizá-las caso satisfaçam os filtros
    tags.map((tag: any, index: number) => {
      if (index != active && tag.name.toLowerCase().includes(search.toLowerCase())) {
        if (filter.includes(tag.category) || !filter[0]) {
          content.push(
            <div
              key={`tag-${tag._id}`}
              onClick={() => handleActive(index)}
              className={index === active ? 'item active' : 'item'}
            >
              {
                tag.isMoving ? <DirectionsRunIcon className='runningIcon' /> : ''
              }
              <div className="name">
                {tag.name}
              </div>
              {/* {
                tag.battery
              } */}
            </div>
          )
        }
      }
    })

    // Caso nenhuma Tag tenha sido encontrada ou satisfeito os filtros, mostra que não há tags encontradas
    if (content.length === 0) {
      content.push(
        <p key={`text-0`} className='text'>Nenhuma tag encontrada</p>
      )
    }

    return content
  }

  const { Search } = Input

  // Construtor das opções de categorias utilizadas no filtro de categoria
  const options = [
    ...categories.map((category: any) => (
      {
        label: category.name,
        value: category.name
      }
    ))
  ]

  return (
    <div id="location">
      {/* <div className="container"> */}
      <div className="filter">
        <Search className='search' allowClear placeholder="Buscar por Tag" onChange={(e) => handleSearch(e.target.value)} value={search} />
        <Select
          className='select'
          mode="multiple"
          onChange={(value) => handleFilter(value)}
          notFoundContent="Categoria não encontrada"
          placeholder="Categorias"
          autoClearSearchValue
          allowClear
          showArrow
          tagRender={tagRender}
          style={{ width: '100%' }}
          options={options}
        />
      </div>
      <div className="row">
        <div className="col leftSide">
          {
            showBeacons()
          }

          {
            // Para cada tag, chama a função que renderiza a Tag no mapa
            tags.map((tag: any, index: number) => {
              if (tag.name !== '') {
                return showTag(tag, index)
              }
            })
          }

          {
            showInfo()
          }
        </div>
        <div className="col rightSide">
          {
            showTags()
          }
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default Location
