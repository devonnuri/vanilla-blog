import React from 'react';

import styled from 'styled-components';

const Header = styled.div`
  text-align: center;
  margin: 0;
  padding: 3rem 0;

  background-image: linear-gradient(135deg, #f761a1 10%, #8c1bab 100%);
`;

const Title = styled.h1`
  margin: 0;
  padding: 1rem 2rem;

  border: 2px solid white;
  border-radius: 7px;

  display: inline-block;

  font-size: 5em;
  font-weight: 500;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5) 10%,
    rgba(255, 255, 255, 0.7) 100%
  );
`;

export default () => {
  return (
    <Header>
      <Title>뎁온누리</Title>
    </Header>
  );
};
