import React, { Component } from 'react';

import throttle from 'lodash.throttle';

interface Props {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  throttle?: number;
  children?: any;
}

export class InfiniteScroll extends Component<Props, {}> {
  public static defaultProps: Pick<Props, 'threshold' | 'throttle'> = {
    threshold: 100,
    throttle: 64,
  };
  private ref: any;
  private scrollHandler: any;
  private resizeHandler: any;

  public componentDidMount() {
    this.scrollHandler = throttle(this.checkWindowScroll, this.props.throttle);
    this.resizeHandler = throttle(this.checkWindowScroll, this.props.throttle);

    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  public checkWindowScroll = () => {
    if (this.props.isLoading) {
      return;
    }

    if (
      this.props.hasMore &&
      this.ref.getBoundingClientRect().top - window.innerHeight < this.props.threshold!
    ) {
      this.props.onLoadMore();
    }
  };

  public render() {
    return (
      <div>
        {this.props.children}
        <div ref={ref => (this.ref = ref)} />
      </div>
    );
  }
}
