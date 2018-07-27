import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Container from './Container';
import { checkLogin } from '../lib/common';

const StyledHeader = styled.div`
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

interface IState {
  login: boolean;
}

class Header extends Component<any, IState> {
  public state = {
    login: false,
  };

  public async componentDidMount() {
    await this.checkState();
  }

  public async checkState() {
    this.setState({
      login: await checkLogin(),
    });
  }

  public render() {
    return (
      <StyledHeader>
        <Title href="/">DevonLog</Title>
        <Container>
          <Navbar>
            <li>카테고리</li>
            <li>여러개</li>
            {this.state.login ? (
              <Fragment>
                <li className="right">
                  <Link to="/logout">로그아웃</Link>
                </li>
                <li className="right">
                  <Link to="/write">글쓰기</Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="right">
                  <Link to="/login">로그인</Link>
                </li>
              </Fragment>
            )}
          </Navbar>
        </Container>
      </StyledHeader>
    );
  }
}

export default Header;
