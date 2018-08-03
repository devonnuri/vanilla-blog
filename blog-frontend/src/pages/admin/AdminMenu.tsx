import React, { Component } from 'react';
import styled from 'styled-components';

import { Link, withRouter } from 'react-router-dom';
import { checkLogin } from 'src/lib/common';

const LeftContainer = styled.div`
  float: left;
  width: 15rem;
  margin: 1rem;

  a {
    color: black;
    text-decoration: none;
  }
`;

const Card = styled.div`
  display: inline-block;
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  h2,
  h3 {
    margin: 0;
  }

  ul {
    margin: 1rem 0;
    padding-left: 1rem;

    li {
      list-style: none;
    }
  }

  &.dark {
    background-color: #34495e;
    color: white;
  }
`;

const Info = styled.div`
  margin-top: 1.5rem;

  color: #888;
`;

class AdminMenu extends Component<any, any> {
  public async componentDidMount() {
    if (!(await checkLogin())) {
      alert('여긴 들어오시면 안되는데..');
      this.props.history.push('/');
    }
  }

  public render() {
    return (
      <LeftContainer>
        <Card>
          <h2>DevonLog</h2>
          <Info>
            <div>포스트 수: 0</div>
            <div>댓글 수: 0</div>
            <div>조회수: 0</div>
          </Info>
        </Card>

        <Link to="/admin/write">
          <Card className="dark" style={{ fontSize: '1.2em', textAlign: 'center' }}>
            글쓰기
          </Card>
        </Link>

        <Link to="/admin">
          <Card>
            <h3>대시보드 홈</h3>
          </Card>
        </Link>

        <Card>
          <h3>컨텐츠 관리</h3>
          <ul>
            <li>
              <Link to="/admin/post">글 관리</Link>
            </li>
            <li>카테고리 관리</li>
          </ul>
        </Card>

        <Card>
          <h3>통계</h3>
          <ul>
            <li>방문자</li>
          </ul>
        </Card>
      </LeftContainer>
    );
  }
}

export default withRouter(AdminMenu);
