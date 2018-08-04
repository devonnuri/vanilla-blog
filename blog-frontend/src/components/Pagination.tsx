import React, { SFC } from 'react';
import styled from 'styled-components';

interface Props {
  active: number;
  length: number;
}

const PaginationContainer = styled.div`
  text-align: center;
`;

const PageLink = styled.a`
  padding: 0.5rem 1rem;
  border: 1px solid black;
  color: black;
  text-decoration: none;

  &.active {
    background-color: #3498db;
    color: white;
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const Pagination: SFC<Props> = ({ active, length }) => {
  return (
    <PaginationContainer>
      {[...Array(length).keys()].map(e => {
        return (
          <PageLink
            key={e + 1}
            href={`?page=${e + 1}`}
            className={active === e + 1 ? 'active' : ''}
          >
            {e + 1}
          </PageLink>
        );
      })}
    </PaginationContainer>
  );
};

export default Pagination;
