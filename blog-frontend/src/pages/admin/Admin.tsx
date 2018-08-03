import React from 'react';
import styled from 'styled-components';

import AdminMenu from './AdminMenu';

const AdminContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
`;

const Admin = () => {
  return (
    <AdminContainer>
      <AdminMenu />
      <Content>
        <h1>대시보드</h1>
      </Content>
    </AdminContainer>
  );
};

export default Admin;
