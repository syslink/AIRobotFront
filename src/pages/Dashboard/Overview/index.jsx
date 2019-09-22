import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const mockData = [
  {
    title: '总赛事数',
    amount: '1,293',
    color: '#fff',
    borderColor: '#4FD4A4',
    background: '#1BC98E',
  },
  {
    title: '总球员数',
    amount: '758',
    color: '#fff',
    borderColor: '#EB6C7A',
    background: '#E64758',
  },
  {
    title: '俱乐部数量',
    amount: '3,659',
    color: '#fff',
    borderColor: '#B29FFF',
    background: '#9F85FF',
  },
  {
    title: '开发者数量',
    amount: '298',
    color: '#fff',
    borderColor: '#E9E063',
    background: '#E5D936',
  },
];

export default class OverviewSatesChart extends Component {
  static displayName = 'OverviewSatesChart';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <Row wrap gutter={20}>
          {mockData.map((item, index) => {
            return (
              <Col xxs="24" l="6" key={index}>
                <div style= {{ background: item.background }}>
                  <div
                    style={{
                      
                      border: `1px solid ${item.borderColor}`,
                    }}
                  >
                    <p className={styles.title}>{item.title}</p>
                    <div className={styles.data}>
                      <h2 className={styles.amount}>{item.amount}</h2>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </IceContainer>
    );
  }
}

