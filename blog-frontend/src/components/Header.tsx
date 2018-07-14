import React from 'react';

import styled from 'styled-components';

const Header = styled.div`
  text-align: center;
  margin: 0;
  padding: 3rem 0;

  background-image: linear-gradient(135deg, #f761a1 10%, #8c1bab 100%);
`;

const Title = styled.a`
  margin: 0;
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

export default () => {
  return (
    <Header>
      <Title href="/">DevonLog</Title>
    </Header>
  );
};
