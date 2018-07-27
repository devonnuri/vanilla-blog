import React from 'react';
import styled from 'styled-components';

import Container from './Container';

const Header = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;

  background-image: linear-gradient(135deg, #f761a1 10%, #8c1bab 100%);
`;

const Title = styled.a`
  margin-top: 2.5rem;
  padding: 0.5rem 1.5rem;

  border: 2px solid white;
  border-radius: 7px;

  display: inline-block;

  color: inherit;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 10%,
    rgba(255, 255, 255, 0.7) 100%
  );

  font-family: 'Lobster';
  font-weight: normal;
  font-size: 4em;
  text-decoration: none;
`;

const Navbar = styled.ul`
  margin: 0;
  padding: 0;
  text-align: left;
  list-style-type: none;
  color: white;
  li {
    display: inline-block;
    padding: 0.6rem 1rem;
    text-align: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

export default () => {
  return (
    <Header>
      <Title href="/">DevonLog</Title>
      <Container>
        <Navbar>
          <li>일상</li>
          <li>보안</li>
          <li>개발</li>
          <li>몰라</li>
        </Navbar>
      </Container>
    </Header>
  );
};
