import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 1rem auto;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  gap: 1rem;

  img {
    width: 100%;
  }
`;

export const Title = styled.p`
  font-weight: 900;
  margin-bottom: 20px;
  text-align: center;
`;

export const Type = styled.div`
  align-self: flex-start;
  background-color: rgba(114, 114, 114, 0.1);
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 2px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(50, 50, 50, 0.4);
  }
`;


export const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
`

export const Description = styled.p`
    font-weight: 400;
    margin-bottom: 10px;
    &::before {
        display: block;
        content: 'Описание: ';
        font-weight: 800;
    }
`

export const Price = styled.p`
        font-weight: 400;
    margin-bottom: 10px;
    &::before {
        display: block;
        content: 'Цена: ';
        font-weight: 800;
    }
`

export const Created = styled.p`
    margin: 0;
    font-weight: 900;
    display: flex;
    justify-content: right;
    color: #6767679d;
`

export const Author = styled.p`
    margin: 0;
    font-weight: 900;
    display: flex;
    justify-content: right;
    color: #676767cd;
`



export const ButtonDell = styled.button`
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background-color: #ff0000e1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #830000;
    color: black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }
`;

export const ButtonEdit = styled.button`
  width: 100%;
  margin-top: 2px;
  padding: 10px;
  background-color: #6d008e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #830000;
    color: black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }
`;