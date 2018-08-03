import React from 'react';
import styled from 'styled-components';

import AdminMenu from './AdminMenu';

const AdminContainer = styled.div`
  margin: 2rem 0;
`;

const Admin = () => {
  return (
    <AdminContainer>
      <AdminMenu />
      <h1>대시보드</h1>
    </AdminContainer>
  );
};

export default Admin;
