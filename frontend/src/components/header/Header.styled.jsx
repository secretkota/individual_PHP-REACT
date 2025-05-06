import styled from "styled-components";


export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
`;

export const Logo = styled.h1`
    font-size: 24px;
    color: #343a40;
`;

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin-left: 20px;
    ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 20px;
    }
    li {
        font-size: 18px;
        color: #343a40;
        cursor: pointer;
        &:hover {
            color: #007bff;
        }
    }
    @media (max-width: 768px) {
        ul {
            flex-direction: column;
            align-items: center;
        }
        li {
            margin-bottom: 10px;
        }
    }
`;

export const LogoutButton = styled.button`
    padding: 10px 20px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    
    cursor: pointer;
    &:hover {
        background-color: #c82333;
    }
`;
