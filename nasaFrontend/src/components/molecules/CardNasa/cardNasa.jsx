import React from 'react';
import { CardWrapper, DateText, Explanation, Title, Video, Image } from './cardNasaStyled';

const APODCard = ({ item }) => {
    return (
      <CardWrapper>
        <Title>{item.title}</Title>
        <DateText>Fecha: {item.date}</DateText>
        {item.media_type === 'image' ? (
          <Image src={item.url} alt={item.title} />
        ) : (
          <Video title="APOD Video" src={item.url} allowFullScreen />
        )}
        <Explanation>{item.explanation}</Explanation>
      </CardWrapper>
    );
  };
  
  export default APODCard;