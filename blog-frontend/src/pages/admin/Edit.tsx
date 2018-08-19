import React from 'react';
import ReactMde, { ReactMdeTypes, DraftUtil } from 'react-mde';
import Showdown from 'showdown';
import styled from 'styled-components';

import 'react-mde/lib/styles/css/react-mde-all.css';
import client from 'src/lib/Client';
import TextInput from 'src/components/TextInput';
import Button from 'src/components/Button';
import { AxiosError } from 'axios';
import AdminMenu from './AdminMenu';
import { EditorState } from 'draft-js';

const EditContainer = styled.div`
  display: flex;
  width: 100%;

  form {
    flex: 1;
  }

  .react-mde {
    img {
      width: 100%;
    }
  }
`;

const ButtonSet = styled.div`
  text-align: center;

  padding-top: 2rem;
`;

class Edit extends React.Component<any, any> {
  public converter: Showdown.Converter;
  private uploadRef: any;

  constructor(props: any) {
    super(props);

    this.state = {
      mdeState: null,
      title: '',
    };

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
    });

    this.onTitleChange = this.onTitleChange.bind(this);
  }

  public componentDidMount() {
    const postId = this.props.match.params.postId;
    client
      .get(`/posts/${postId}`)
      .then(response => {
        this.setMdeText(response.data.body);
        this.setState({ ...this.state, title: response.data.title });
      })
      .catch(() => {
        alert('기존 내용을 불러오던 중 오류가 발생했습니다.');
      });
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
          this.props.history.push('/login');
        });
    }
  };

  public generateMarkdownPreview = (markdown: string) => {
    return Promise.resolve(this.converter.makeHtml(markdown));
  };

  public setMdeText = (markdown: string) => {
    const { mdeState } = this.state;
    const newDraftState: EditorState = DraftUtil.buildNewDraftState(
      mdeState.draftEditorState,
      {
        selection: {
          start: 0,
          end: 0,
        },
        text: markdown,
      }
    );

    this.setState({
      ...this.state,
      mdeState: {
        markdown: mdeState.markdown,
        html: mdeState.html,
        draftEditorState: newDraftState,
      },
    });
  };

  public onSubmitClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (this.uploadRef) {
      this.uploadRef.click();
    }

    this.uploadRef.addEventListener('change', (e2: React.ChangeEvent) => {
      const form = new FormData();
      form.append('file', this.uploadRef.files[0]);

      client
        .post('/posts/upload', form)
        .then(response => {
          this.setMdeText(
            `${this.state.mdeState.markdown}\n![](${response.data.url})\n`
          );
        })
        .catch(() => {
          alert('포스트를 수정하던 도중 문제가 발생하였습니다.');
        });
    });
  };

  public render() {
    return (
      <EditContainer>
        <AdminMenu />
        <form onSubmit={this.onSubmit}>
          <h1>수정하기</h1>
          <TextInput
            type="text"
            placeholder="제목"
            onChange={this.onTitleChange}
            value={this.state.title}
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
          style={{ display: 'none' }}
        />
      </EditContainer>
    );
  }
}

export default Edit;
