import React, { useState, useEffect } from 'react'
import './sidebar.scss'
import { Tooltip } from 'antd'

import HomeIcon from '@mui/icons-material/Home'
// import LocationOnIcon from '@mui/icons-material/LocationOn'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import HistoryIcon from '@mui/icons-material/History'
import CategoryIcon from '@mui/icons-material/Category'
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link } from 'react-router-dom'
import { TagsAdd } from '../../pages'


const Sidebar: any = (Parent: any) => {
  const goTo: Function = (url: string) => {
    window.location.href = url
  }

  const [active, setActive] = useState(Parent.props.actualPage)

  useEffect(() => {
    setActive(Parent.props.actualPage)
  }, [Parent.props.actualPage])

  const items = [
    {
      name: 'Home',
      url: '/',
      icon: <HomeIcon />
    },
    // {
    //   name: 'Localização',
    //   url: '/',
    //   icon: <TrackChangesIcon />
    // },
    {
      name: 'Categorias',
      url: '/categories',
      icon: <CategoryIcon />
    },
    {
      name: 'Tags',
      url: '/tags',
      icon: <SettingsRemoteIcon />
    }
  ]

  const navigation: Function = (index: number) => {
    Parent.props.changeTag(-1)
    Parent.props.changePage(index)
  }

  return (
    <div id="sidebar">
      <div className="itemsContainer">
        {
          items.map((item, index) => {
            return (
              <Link key={`item-${index}`} to={item.url}>
                <Tooltip placement="right" align={{ offset: [12, 0] }} color='#29292D' title={item.name}>
                  <div onClick={() => navigation(index)} className={`item ${index === active ? 'active' : ''}`}>
                    {item.icon}
                  </div>
                </Tooltip>
              </Link>
            )
          })
        }
      </div>
      <div className="settingsContainer">
        <Link to="/settings">
          <Tooltip placement="right" align={{ offset: [12, 0] }} color='#29292D' title="Configuração">
            <div onClick={() => navigation(items.length)} className={`item ${ active === items.length ? 'active' : '' }`}>
              <SettingsIcon />
            </div>
          </Tooltip>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar