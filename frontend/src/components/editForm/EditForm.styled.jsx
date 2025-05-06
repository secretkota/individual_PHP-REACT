import styled from "styled-components";

export const Form = styled.form`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: #f0f0f0;
    box-sizing: border-box;
    width: 100vw;
    max-width: 400px;
    margin: 5px auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h1`
    margin-top: 20px;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
`

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
  color: #333;
  font-weight: bold;
  text-align: left;
  width: 100%;
  margin-top: 10px;
`

export const Type = styled.div`
  display: flex;
  gap: 10px;
`


export const Button = styled.button`
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }
`;

export const Textarea = styled.textarea`
width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ccc;
  border-radius: 5px;
  resize: none; 
  outline: none; 
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff; 
  box-sizing: border-box;

    &:focus {
        border-color: #4CAF50;
        box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        &::placeholder{
            color: #4CAF50;
        }
    }

`

export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 100%;

    &:focus{
        border-color: #4CAF50;
        box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    }
`

export const Error = styled.p`
    margin-top: 5px;
    margin-bottom: 10px;
    color: red;
    font-weight: bold;
`
