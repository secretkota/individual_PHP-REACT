import React, { useEffect, useState } from 'react';
import { getMyAds } from '../../api/api';
import AdsCard from '../adsCard';
import { Title, Wrapper } from './MyAds.styled';
import { useNavigate } from 'react-router';

export default function MyAds() {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getMyAds(token);
        setAds(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchAds();
  }, []);

  if (error) {
    return <div>Создайте объявление! их нет!</div>;
  }

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


  const handleClick = (id) => {
      navigate(`/main/ads/${id}`)
  }

  return (
    <>
      <Title>Мои объявления:</Title>
      <Wrapper>      
        {ads.length > 0 ? (
        ads.map((ad, index) => (
          <div onClick={() => {handleClick(ad.id)}}>
            <AdsCard 
            key={index} 
            image={ad.image} 
            title={ad.title} 
            created_at={ad.created_at}
            username={ad.username} 
            appType={changeName(ad.app_type)} 
            />
          </div>
        ))
      ) : (
        <p>Нет объявлений</p>
      )}
      </Wrapper>
    </>
  );
}
