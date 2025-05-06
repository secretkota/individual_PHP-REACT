import styled from 'styled-components';

export const Card = styled.div`
  flex: 0 1 240px;
  background-color: #f0f8ff;
  border-radius: 10px;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
  }
`;

export const Type = styled.div`
  align-self: flex-start;
  background-color: rgba(114, 114, 114, 0.1);
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 10px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(50, 50, 50, 0.4);
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: #333;
  margin: 0 0 8px 0;
`;

export const Footer = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-top: auto;
  margin-bottom: 0;
`;
