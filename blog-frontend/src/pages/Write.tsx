import React from 'react';
import ReactMde, { ReactMdeTypes } from 'react-mde';
import Showdown from 'showdown';
import styled from 'styled-components';

import 'react-mde/lib/styles/css/react-mde-all.css';
import client from '../lib/Client';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { isHttpStatus } from 'src/lib/common';
import { AxiosError } from 'axios';

const ButtonSet = styled.div`
  text-align: center;

  padding: 2rem 0;
`;

class Write extends React.Component<any, any> {
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

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (this.state.mdeState) {
      client
        .post('/posts/write', {
          title: this.state.title,
          body: this.state.mdeState.markdown,
        })
        .then(response => {
          this.props.history.push('/');
        })
        .catch((error: AxiosError) => {
          if (!error.response) {
            return;
          }

          if (isHttpStatus(error.response.status, '4')) {
            this.props.history.push('/login');
          }
        });
    }
  };

  public render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>글쓰기</h1>
        <TextInput type="text" placeholder="제목" onChange={this.onTitleChange} />
        <ReactMde
          onChange={this.onBodyChange}
          editorState={this.state.mdeState}
          generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
          layout="horizontal"
        />
        <ButtonSet>
          <Button type="submit" theme="push" large>
            글쓰기
          </Button>
        </ButtonSet>
      </form>
    );
  }
}

export default Write;
