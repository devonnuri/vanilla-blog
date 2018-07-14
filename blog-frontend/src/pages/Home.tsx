import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Item from '../components/Item';

// const imageURL =
//   'https://78.media.tumblr.com/44df12afc32af6e363644cb5e02d52b3/tumblr_inline_oxj02kTUlQ1tqwo1w_540.png';

// const anotherImageURL =
//   'https://images.unsplash.com/photo-1506361797048-46a149213205?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=493e200df17b54d1ef10eb61e1df148a&w=1000&q=80';

interface IQuery {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
}

const Home = () => {
  return (
    <Query
      query={gql`
        {
          post {
            id
            title
            body
            createdAt
          }
        }
      `}
    >
      {({ loading, data, error }) => {
        if (loading) {
          return <h3>Loading</h3>;
        }
        if (error) {
          return <h3>Error Occurred</h3>;
        }

        if (data.post.length < 1) {
          return <h2>아직 포스트가 없네요 ㅠㅠ</h2>;
        }
        return data.post.map((post: IQuery) => (
          <Item key={post.id} title={post.title} body={post.body} createdAt={post.createdAt} />
        ));
      }}
    </Query>
  );
};

export default Home;
