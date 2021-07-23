import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="UploadBookmark">
        <a href="/bookmark/upload">Upload</a>
      </Menu.Item>
      <Menu.Item key="Temp1">
        <a href="/">Temp1</a>
      </Menu.Item>
      <Menu.Item key="Temp2">
        <a href="/">Temp2</a>
      </Menu.Item>
      <Menu.Item key="Temp3">
        <a href="/">Temp3</a>
      </Menu.Item>
    {/* <SubMenu title={<span>Temp</span>}>       
      
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu> */}
  </Menu>
  )
}

export default LeftMenu