import React from 'react';

import styled from 'styled-components';

const Header = styled.div`
  text-align: center;
  margin: 3rem 0;
`;

const TitleContainer = styled.div`
  padding: 0.3rem 0.3rem;
  border: 2px solid black;

  border-radius: 5px;

  display: inline-block;
`;

const Title = styled.h1`
  margin: 0;
  padding: 1rem 2rem;

  border: 2px solid black;
  border-radius: 5px;

  display: inline-block;

  font-size: 5em;
  font-weight: 300;
`;

export default () => {
  return (
    <Header>
      <TitleContainer>
        <Title>뎁온누리</Title>
      </TitleContainer>
    </Header>
  );
};
