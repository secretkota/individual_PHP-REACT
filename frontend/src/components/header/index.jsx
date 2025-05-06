import React from 'react'
import {HeaderContainer, Logo, LogoutButton, Nav } from './Header.styled'
import { Link, useNavigate } from 'react-router'

export default function Header() {
  const nav = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    if (localStorage.getItem('token') === null) {
      nav("/login")
    }
  }

  return (
    <>
        <HeaderContainer>
            <Logo>AgaADS</Logo>
            <Nav>
                <ul>
                    <li><Link to={"/main/ads"}>Текущие объявления</Link></li>
                    <li><Link to={"/main/addAds"}>Создать объявление</Link></li>
                    <li><Link to={"/main/myAds"}>Мои объявления</Link></li>
                </ul>
            </Nav>
            <LogoutButton onClick={() => {handleLogout()}}>Выйти</LogoutButton>
        </HeaderContainer>
    </>
  )
}
