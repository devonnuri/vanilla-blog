import React from 'react';
import ReactMde, { ReactMdeTypes } from 'react-mde';
import Showdown from 'showdown';
import styled from 'styled-components';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import 'react-mde/lib/styles/css/react-mde-all.css';

const ButtonSet = styled.div`
  text-align: center;

  padding: 2rem 0;
`;

const TitleInput = styled.input`
  width: 100%;

  margin: 0 0 2rem 0;
  border: none;
  border-bottom: 2px solid #7f8c8d;
  outline: none;

  font-size: 1.5em;
  font-family: 'Noto Sans KR';

  transition: all 0.3s ease-in-out;

  &:focus {
    border-bottom: 4px solid #3498db;
  }
`;

const Submit = styled.input`
  padding: 10px 30px;
  border: none;
  border-bottom: 5px solid #2980b9;
  border-radius: 5px;

  color: white;
  background-color: #3498db;
  box-shadow: 1px 1px 10px #555;

  font-size: 1.25em;
  font-family: 'Noto Sans KR';

  transition: all 0.1s ease-in-out;

  &:active {
    box-shadow: 1px 1px 5px #555;
    border-bottom: 0px solid #2980b9;
    transform: translateY(5px);
  }
`;

const mutation = gql`
  mutation addPost($title: String!, $body: String!) {
    addPost(title: $title, body: $body) {
      id
    }
  }
`;

export default class Write extends React.Component<any, any> {
  public converter: Showdown.Converter;

  constructor(props: any) {
    super(props);

    this.state = {
      mdeState: null,
      title: null,
    };
    this.converter = new Showdown.Converter({ tables: true, simplifiedAutoLink: true });

    this.onTitleChange = this.onTitleChange.bind(this);
  }

  public onBodyChange = (mdeState: ReactMdeTypes.MdeState) => {
    this.setState({ mdeState });
  };

  public onTitleChange = (event: any) => {
    this.setState({ title: event.target.value });
  };

  public render() {
    return (
      <Mutation mutation={mutation}>
        {addPost => (
          <form
            onSubmit={e => {
              e.preventDefault();
              addPost({
                variables: {
                  title: this.state.title,
                  body: this.state.mdeState.markdown,
                },
              }).then(({ data }: any) => {
                this.props.history.push(`/${data.addPost.id}`);
              });
            }}
          >
            <h1>글쓰기</h1>
            <TitleInput type="text" placeholder="제목" onChange={this.onTitleChange} />
            <ReactMde
              onChange={this.onBodyChange}
              editorState={this.state.mdeState}
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
              layout="horizontal"
            />
            <ButtonSet>
              <Submit type="submit" value="쓰기" />
            </ButtonSet>
          </form>
        )}
      </Mutation>
    );
  }
}
