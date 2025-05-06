import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { dropMyAds, getAd } from '../../api/api'

import { Author, ButtonDell, ButtonEdit, Container, Created, Description, Info, Price, Title, Type } from './ShowAd.styled'
import { jwtDecode } from 'jwt-decode'


export default function ShowAd() {
  const { id } = useParams()
  const [ad, setAd] = useState(null)
  const [error, setError] = useState(null)
  const [showButton, setShowButton] = useState(false)
  const nav = useNavigate()

  const token = localStorage.getItem('token')
  const userId = jwtDecode(token)

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await getAd(token, id)
        if (response.message) {
          setAd(response.message)
          if (response.message.user_id === userId.uid){
            setShowButton(true)
          }

        } else {
          setError(response.error || 'Ошибка при получении данных')
        }
      } catch (err) {
        setError('Ошибка сети или сервера')
      }
    };

    if (id) fetchAd()
  }, [id])

  const changeName = (app_type) => {
    switch (app_type) {
      case "sell":
        return "Продажа"
      case "buy":
        return "Покупка"
      case "exchange":
        return "Обмен"
    }
  }

  const handleClick = async (id, idBtn) => {
      if (idBtn === 'btnEdit') {
        nav(`/main/ads/edit/${id}`)
      } else if (idBtn === 'btnDell') {
        await dropMyAds(token, id) 
        nav("/main/ads")
      } else {
        console.log('idBtn')
      }
  } 

  if (error) return <div>Ошибка: {error}</div>
  if (!ad) return <div>Загрузка...</div>

  return (
    <>
      <Container>
        <Type>{changeName(ad.app_type)}</Type>
        <Type>{ad.category}</Type>
        <Created>Опубликовано: {ad.created_at}</Created>
        <Title>{ad.title}</Title>
        <img src={ad.image} alt="not_found" />
        <Info>
          <Description>{ad.description}</Description>
          <Price>{ad.price}</Price>
        </Info>
        <Author>Автор объявления: {ad.username}</Author>
        {showButton && <ButtonDell onClick={() => {handleClick(id, 'btnDell')}}>Удалить</ButtonDell>}
        {showButton && <ButtonEdit onClick={() => {handleClick(id, 'btnEdit')}}>Редактировать</ButtonEdit>}
      </Container>
    </>
  );
}