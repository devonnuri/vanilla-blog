import React from 'react';

import Item from '../components/Item';

import removeMd from 'remove-markdown';

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
    // <Query query={query}>
    //   {({ loading, data, error }) => {
    //     if (loading) {
    //       return <h3>Loading</h3>;
      //     }
    //     if (error) {
    //       return <h3>Error Occurred</h3>;
    //     }

    //     if (data.post.length < 1) {
    //       return <h1>아직 포스트가 없네요 ㅠㅠ</h1>;
    //     }

    //     return data.post
    //       .slice()
    //       .sort((a: IPost, b: IPost) => b.id - a.id)
    //       .map((post: IPost) => (
    //         <Item
    //           key={post.id}
    //           id={post.id}
    //           title={post.title}
    //           body={removeMd(post.body)}
    //           createdAt={post.createdAt}
    //         />
    //       ));
    //   }}
    // </Query>
    <div>Hmm.. It seems not working</div>
  );
};

export default Home;
