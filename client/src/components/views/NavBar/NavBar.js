import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import logo_img from '../../../assets/images/logo.png';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <React.Fragment>
      <div className="menu-brand" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
        <div className="container">
          <div className="menu__logo">
            <a href="/"><img src = {logo_img} alt = "logo_img" className = "logo_img"/></a>
          </div>
          <div className="brand_right">
            <RightMenu mode="horizontal" />
          </div>
        </div>
      </div>
      <nav className="menu-navigation" style={{ position: 'fixed', top: '76px', zIndex: 5, width: '100%' }}>

        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <Icon type="align-right" />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </nav>
    </React.Fragment>

  )
}

export default NavBar