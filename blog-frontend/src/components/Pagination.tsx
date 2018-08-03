import React, { SFC } from 'react';
import styled from 'styled-components';

interface Props {
  active: number;
  length: number;
}

const PageLink = styled.a`
  padding: 0.5rem 1rem;
  border: 1px solid black;
  color: black;
  text-decoration: none;

  &.active {
    background-color: #3498db;
    color: white;
  }
`;

const Pagination: SFC<Props> = ({ active, length }) => {
  return (
    <div>
      {[...Array(length).keys()].map(e => {
        return (
          <PageLink key={e + 1} href="#" className={active === e + 1 ? 'active' : ''}>
            {e + 1}
          </PageLink>
        );
      })}
    </div>
  );
};

export default Pagination;
