import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@icedesign/container';
import { Button, Grid } from '@alifd/next';
import FeatureItem from './FeatureItem';
import styles from  './index.module.scss';

const { Row, Col } = Grid;

export default class Index extends Component {
  static displayName = 'Index';

  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'string data',
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          owner: '0xaaaaa',
          logoUrl: require('./images/a.jpg'),
          name: '皇马',
          robotNum: '10',
          competitionNum: '20',
        },
        {
          owner: '0xaaaaa',
          logoUrl: require('./images/b.jpg'),
          name: '曼联',
          robotNum: '20',
          competitionNum: '20',
        },
        {
          owner: '0xaaaaa',
          logoUrl: require('./images/c.jpg'),
          name: '尤文图斯',
          robotNum: '33',
          competitionNum: '20',
        },
        {
          owner: '0xaaaaa',
          logoUrl: require('./images/d.jpg'),
          name: '巴萨',
          robotNum: '14',
          competitionNum: '20',
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <div className={styles.header}>
          <h2 className={styles.function} >俱乐部列表</h2>
        </div>
        <div>
          {this.state.dataSource.map((item, index) => {
            return <FeatureItem data={item} key={index} />;
          })}
          <p/>
          <Row justify="center">
            <Button>查看更多</Button>
          </Row>
        </div>
      </Container>
    );
  }
}

