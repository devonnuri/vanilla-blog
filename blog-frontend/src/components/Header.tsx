import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Container from './Container';
import { UserConsumer } from '../contexts/UserContext';
import { checkLogin } from '../lib/common';

const StyledHeader = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;

  background-image: linear-gradient(135deg, #f761a1 10%, #8c1bab 100%);
`;

const Title = styled.div`
  margin-top: 2.5rem;
  padding: 0.5rem 1.5rem;

  border: 2px solid white;
  border-radius: 7px;

  display: inline-block;

  color: black;
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
  flex: 0 1 auto;

  li {
    display: inline-block;
    padding: 0.6rem 1rem;
    text-align: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;

    a {
      color: white;
      text-decoration: none;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }

    &.right {
      float: right;
    }
  }
`;

interface State {
  login: boolean;
}

class Header extends Component<any, State> {
  public state = {
    login: false,
  };

  public async componentDidMount() {
    this.props.setLogin(await checkLogin());
  }

  public render() {
    return (
      <StyledHeader>
        <Link to="/">
          <Title>DevonLog</Title>
        </Link>
        <Container>
          <Navbar>
            <li>카테고리</li>
            <li>여러개</li>
            <UserConsumer>
              {({ state }: any) => {
                if (state.login) {
                  return (
                    <Fragment>
                      <li className="right">
                        <Link to="/logout">로그아웃</Link>
                      </li>
                      <li className="right">
                        <Link to="/admin/write">글쓰기</Link>
                      </li>
                      <li className="right">
                        <Link to="/admin">대시보드</Link>
                      </li>
                    </Fragment>
                  );
                } else {
                  return (
                    <Fragment>
                      <li className="right">
                        <Link to="/login">로그인</Link>
                      </li>
                    </Fragment>
                  );
                }
              }}
            </UserConsumer>
          </Navbar>
        </Container>
      </StyledHeader>
    );
  }
}

export default ({ ...rest }) => {
  return (
    <UserConsumer>
      {({ actions }: any) => {
        return <Header setLogin={actions.setLogin} {...rest} />;
      }}
    </UserConsumer>
  );
};
