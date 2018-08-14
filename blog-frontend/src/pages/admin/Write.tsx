import React from 'react';
import ReactMde, { ReactMdeTypes, DraftUtil } from 'react-mde';
import Showdown from 'showdown';
import styled from 'styled-components';

import 'react-mde/lib/styles/css/react-mde-all.css';
import client from 'src/lib/Client';
import TextInput from 'src/components/TextInput';
import Button from 'src/components/Button';
import { isHttpStatus } from 'src/lib/common';
import { AxiosError } from 'axios';
import AdminMenu from './AdminMenu';
import { EditorState } from 'draft-js';

const WriteContainer = styled.div`
  display: flex;
  width: 100%;

  form {
    flex: 1;
  }
`;

const ButtonSet = styled.div`
  text-align: center;

  padding-top: 2rem;
`;

class Write extends React.Component<any, any> {
  public converter: Showdown.Converter;
  private uploadRef: any;

  constructor(props: any) {
    super(props);

    this.state = {
      mdeState: null,
      title: null,
    };

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
    });

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
          this.props.history.push(`/${response.data.id}`);
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

  public generateMarkdownPreview = (markdown: string) => {
    return Promise.resolve(this.converter.makeHtml(markdown));
  };

  public onSubmitClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (this.uploadRef) {
      this.uploadRef.click();
    }

    this.uploadRef.addEventListener('change', (e2: React.ChangeEvent) => {
      const form = new FormData();
      form.append('file', this.uploadRef.files[0]);

      // tslint:disable
      client
        .post("/posts/upload", form)
        .then(response => {
          const { mdeState } = this.state;
          const newDraftState: EditorState = DraftUtil.buildNewDraftState(
            mdeState.draftEditorState,
            {
              selection: {
                start: 0,
                end: 0
              },
              text:
                this.state.mdeState.markdown + `\n![](${response.data.url})\n`
            }
          );
          this.setState({
            mdeState: {
              markdown: mdeState.markdown,
              html: mdeState.html,
              draftEditorState: newDraftState
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  public render() {
    return (
      <WriteContainer>
        <AdminMenu />
        <form onSubmit={this.onSubmit}>
          <h1>글쓰기</h1>
          <TextInput
            type="text"
            placeholder="제목"
            onChange={this.onTitleChange}
          />
          <ReactMde
            onChange={this.onBodyChange}
            editorState={this.state.mdeState}
            generateMarkdownPreview={this.generateMarkdownPreview}
            layout="horizontal"
          />
          <ButtonSet>
            <Button onClick={this.onSubmitClick} theme="push" color="green">
              이미지 업로드
            </Button>
          </ButtonSet>

          <ButtonSet>
            <Button type="submit" theme="push" large>
              글쓰기
            </Button>
          </ButtonSet>
        </form>
        <input
          type="file"
          ref={ref => (this.uploadRef = ref)}
          style={{ display: "none" }}
        />
      </WriteContainer>
    );
  }
}

export default Write;
