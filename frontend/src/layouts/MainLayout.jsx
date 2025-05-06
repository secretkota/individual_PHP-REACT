import React from 'react'
import Header from '../components/header'
import { Outlet } from 'react-router'
import Footer from '../components/footer'

export default function MainLayout() {
  return (
    <>
      <Header />
      <div style={{minHeight: '100vh'}}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
