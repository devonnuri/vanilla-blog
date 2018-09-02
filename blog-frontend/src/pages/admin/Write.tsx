import React from 'react';
import ReactMde, { ReactMdeTypes, DraftUtil } from 'react-mde';
import Showdown from 'showdown';
import styled from 'styled-components';

import { MdCancel } from 'react-icons/md';

import 'react-mde/lib/styles/css/react-mde-all.css';
import client from 'src/lib/Client';
import TextInput from 'src/components/TextInput';
import ToggleSwitch from 'src/components/ToggleSwitch';
import Button from 'src/components/Button';
import { AxiosError } from 'axios';
import AdminMenu from './AdminMenu';
import { EditorState } from 'draft-js';

const WriteContainer = styled.div`
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

  input#tag-input {
    font-size: 1em;
  }
`;

const ButtonSet = styled.div`
  text-align: center;

  padding-top: 2rem;
`;

const TagContainer = styled.div`
  display: flex;
  margin: 1rem 0;

  input {
    flex: 1;
    flex-grow: 5;
  }
  .button {
    height: 100%;
    flex: 1;
    flex-grow: 1;
    margin-left: 1rem;
  }
`;

const TagList = styled.div`
  margin: 1rem 0;

  span {
    display: inline-block;
    margin: 0.2rem 0.4rem;
    padding: 0.4rem 0.7rem;
    border-radius: 15px;

    background-color: #eee;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    cursor: pointer;
    transition: 0.2s box-shadow ease-in-out;

    svg {
      vertical-align: -10%;
      margin-right: 0.2rem;
    }

    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
  }
`;

class Write extends React.Component<any, any> {
  public converter: Showdown.Converter;
  private uploadRef: any;

  constructor(props: any) {
    super(props);

    this.state = {
      mdeState: null,
      title: null,
      tagInput: '',
      tags: [],
      secret: false,
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
          tags: this.state.tags,
          secret: this.state.secret,
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
          alert('포스트를 작성하던 도중 문제가 발생하였습니다.');
        });
    });
  };

  public onTagRemove = (e: any) => {
    const itemText = e.target.parentNode.parentNode.innerText;

    this.setState({
      ...this.state,
      tags: this.state.tags.filter((data: any) => data !== itemText),
    });
  };

  public onTagChange = (e: any) => {
    this.setState({ ...this.state, tagInput: e.target.value });
  };

  public onTagCreate = (e: any) => {
    e.preventDefault();

    if (this.state.tags.includes(this.state.tagInput)) {
      alert('이미 존재하는 태그입니다.');
      return;
    }

    this.setState({
      ...this.state,
      tags: [...this.state.tags, this.state.tagInput],
    });
  };

  public onSecretChange = (e: any) => {
    this.setState({ ...this.state, secret: e.target.checked });
  };

  public render() {
    return (
      <WriteContainer>
        <AdminMenu />
        <form onSubmit={this.onSubmit}>
          <h1>글쓰기</h1>
          <TextInput
            id="title-input"
            type="text"
            placeholder="제목"
            onChange={this.onTitleChange}
          />
          <TagContainer>
            <TextInput
              id="tag-input"
              placeholder="태그"
              value={this.state.tagInput}
              onChange={this.onTagChange}
            />
            <Button onClick={this.onTagCreate}>태그 추가</Button>
          </TagContainer>
          <TagList>
            {this.state.tags.map((data: any) => (
              <span key={data}>
                <MdCancel onClick={this.onTagRemove} />
                {data}
              </span>
            ))}
          </TagList>
          <ToggleSwitch
            onChange={this.onSecretChange}
            value={this.state.secret}
            style={{ marginBottom: '1rem' }}
          >
            비밀글
          </ToggleSwitch>
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
      </WriteContainer>
    );
  }
}

export default Write;
