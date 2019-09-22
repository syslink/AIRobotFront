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
          address: '0xaaaaa',
          headIcon: require('./images/a.jpg'),
          name: '张健',
          desc:
            '多次获得Robocup全国冠军，并获得全球前三的好成绩',
          robotNum: '10',
          blogUrl: 'http://www.blog.com',
        },
        {
          address: '0xaaaaa',
          headIcon: require('./images/b.jpg'),
          name: '张博',
          desc:
            '2018年世界冠军队核心成员',
          robotNum: '10',
          blogUrl: 'http://www.blog.com',
        },
        {
          address: '0xaaaaa',
          headIcon: require('./images/c.png'),
          name: '程科',
          desc:
            '2015/2016年中国区决赛第二名',
          robotNum: '10',
          blogUrl: 'http://www.blog.com',
        },
        {
          address: '0xaaaaa',
          headIcon: require('./images/d.jpg'),
          name: 'Eric',
          desc:
            'TensorFlow核心贡献者',
          robotNum: '10',
          blogUrl: 'http://www.blog.com',
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <div className={styles.header}>
          <h2 className={styles.function} >开发者列表</h2>
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

