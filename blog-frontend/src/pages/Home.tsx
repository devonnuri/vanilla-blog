import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Item = styled.div`
  display: flex;

  max-height: 15rem;
  margin: 3rem 0;

  border-radius: 5px;
  box-shadow: 3px 3px 15px 0px black;
  background-image: linear-gradient(135deg, #affef4 10%, #b9b7ff 100%);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImageWrapper = styled.div`
  width: 15rem;
  height: 15rem;
  flex-shrink: 0;

  overflow: hidden;
`;

const Image = styled.img`
  width: 15rem;
  height: 15rem;

  position: relative;

  float: left;
  object-fit: cover;

  transition: ease-in-out 0.1s all;

  &:hover {
    transform: scale(1.5) rotate(20deg);
  }
`;

const Info = styled.div`
  float: left;

  padding: 2rem;
`;

const Title = styled.h2`
  margin: 0;
`;

const Description = styled.p``;

const imageURL =
  'https://78.media.tumblr.com/44df12afc32af6e363644cb5e02d52b3/tumblr_inline_oxj02kTUlQ1tqwo1w_540.png';

const anotherImageURL =
  'https://images.unsplash.com/photo-1506361797048-46a149213205?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=493e200df17b54d1ef10eb61e1df148a&w=1000&q=80';

const Home = () => {
  return (
    <Container>
      <Item>
        <ImageWrapper>
          <Image src={imageURL} />
        </ImageWrapper>
        <Info>
          <Title>ㅁㄴㅇㄹ</Title>
          <Description>
            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산
            대한사람 대한으로 길이 보전하세. 그리고 우마루는 귀엽습니다.
          </Description>
        </Info>
      </Item>
      <Item>
        <ImageWrapper>
          <Image src={anotherImageURL} />
        </ImageWrapper>
        <Info>
          <Title>ㅁㄴㅇㄹ</Title>
          <Description>
            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산
            대한사람 대한으로 길이 보전하세. 그리고 우마루는 귀엽습니다.
          </Description>
        </Info>
      </Item>
      <Item>
        <Info>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet, quam quis sodales
          fringilla, orci arcu iaculis sapien, at aliquet lorem nibh ac justo. Duis feugiat rhoncus
          placerat. Suspendisse sollicitudin cursus arcu eu consectetur. In lorem dolor, sodales at
          enim elementum, luctus interdum nisi. In augue dui, gravida quis varius non, lobortis a
          nulla. Nulla tempor placerat euismod. Integer et sodales sem. Integer quis euismod urna.
          Integer tempor maximus volutpat. Cras sit amet justo neque. Sed ut elit eget orci molestie
          blandit tincidunt sit amet nunc. In a metus vel magna consectetur gravida. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut viverra augue
          vitae porttitor vulputate.
        </Info>
      </Item>
      <Item>
        <Info>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet, quam quis sodales
          fringilla, orci arcu iaculis sapien, at aliquet lorem nibh ac justo. Duis feugiat rhoncus
          placerat. Suspendisse sollicitudin cursus arcu eu consectetur.
        </Info>
      </Item>
    </Container>
  );
};

export default Home;
