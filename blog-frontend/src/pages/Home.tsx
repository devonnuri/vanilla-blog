import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Item from '../components/Item';

interface IPost {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
}

const query = gql`
  {
    post {
      id
      title
      body
      createdAt
    }
  }
`;

const Home = () => {
  return (
    <Query query={query}>
      {({ loading, data, error }) => {
        if (loading) {
          return <h3>Loading</h3>;
        }
        if (error) {
          return <h3>Error Occurred</h3>;
        }

        if (data.post.length < 1) {
          return <h1>아직 포스트가 없네요 ㅠㅠ</h1>;
        }

        return data.post
          .slice()
          .sort((a: IPost, b: IPost) => b.id - a.id)
          .map((post: IPost) => (
            <Item
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              createdAt={post.createdAt}
            />
          ));
      }}
    </Query>
  );
};

export default Home;
