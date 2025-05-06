import React from 'react'
import { Card, Footer, Title, Type } from './AdsCard.styled'

export default function AdsCard({ image, title, created_at, username, appType }) {


  return (
    <>
      <Card>
            <img src={image} alt='not_found' />
            <Type>{appType}</Type>
            <Title>{title}</Title>
            <Footer>Создал: {username}</Footer>
            <Footer>Создано: {created_at}</Footer>
      </Card>
    </>
  )
}
