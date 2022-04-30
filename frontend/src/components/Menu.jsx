import React from 'react'
import MenuItem from './MenuItem'
import { useEffect } from 'react';

const Menu = (props) => {

  const arr = props.menu;
  const [bev, setBev] = React.useState([])
  const [app, setApp] = React.useState([])
  const [reg, setReg] = React.useState([])
  const [fet, setFet] = React.useState([])

  useEffect(() => {
    setBev(props.menu.filter((be) => be.type === "BV"))
    setApp(props.menu.filter((be) => be.type === "AP"))
    setReg(props.menu.filter((be) => be.type === "RD"))
    setFet(props.menu.filter((be) => be.type === "FD"))
  }, [props])

  return (
    <>

      <ul>
      {fet.length > 0 && (
          <h1 class="display-5">Featured Dishes</h1>)
        }
        {
          [fet.map(item => <MenuItem name={item.name} price={item.price} description={item.description} />)]
        }
         {app.length > 0 && (
          <h1 class="display-5">Appetizers</h1>)
        }
        {
          [app.map(item => <MenuItem name={item.name} price={item.price} description={item.description} />)]
        }
         {reg.length > 0 && (
          <h1 class="display-5">Regular Dishes</h1>)
        }
        {
          [reg.map(item => <MenuItem name={item.name} price={item.price} description={item.description} />)]
        }
        {bev.length > 0 && (
          <h1 class="display-5">Beverages</h1>)
        }
        {
          [bev.map(item => <MenuItem name={item.name} price={item.price} description={item.description} />)]
        }
        
      </ul>
    </>
  )
}

export default Menu