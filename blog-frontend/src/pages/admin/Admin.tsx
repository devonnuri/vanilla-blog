import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const AdminContainer = styled.div`
  margin: 2rem 0;
`;

const LeftContainer = styled.div`
  float: left;
  width: 15rem;
`;

const Card = styled.div`
  display: inline-block;
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;

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

const Admin = () => {
  return (
    <AdminContainer>
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

        <Card>
          <h3>컨텐츠 관리</h3>
          <ul>
            <li>글 관리</li>
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
    </AdminContainer>
  );
};

export default Admin;
