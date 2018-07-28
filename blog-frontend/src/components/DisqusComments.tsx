import React, { Component } from 'react';

const SHORTNAME = 'devonlog';
const WEBSITE_URL = 'https://blog-6397d.firebaseapp.com';

declare global {
  interface Window {
    DISQUS?: any;
    disqus_shortname: string;
    disqus_identifier: string;
    disqus_title: string;
    disqus_url: string;
  }
}

function renderDisqus() {
  if (window.DISQUS === undefined) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://' + SHORTNAME + '.disqus.com/embed.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

interface IProps {
  id: string;
  title: string;
  path: string;
}

class DisqusThread extends Component<IProps> {
  public shouldComponentUpdate(nextProps: IProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path
    );
  }

  public componentDidMount() {
    renderDisqus();
  }

  public componentDidUpdate() {
    renderDisqus();
  }

  public render() {
    const { id, title, path, ...other } = this.props;

    if (process.env.BROWSER) {
      window.disqus_shortname = SHORTNAME;
      window.disqus_identifier = id;
      window.disqus_title = title;
      window.disqus_url = WEBSITE_URL + path;
    }

    return <div {...other} id="disqus_thread" />;
  }
}

export default DisqusThread;
