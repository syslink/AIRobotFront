import React, { Component } from 'react';
import { Grid, Button } from '@alifd/next';
import styles from './index.module.scss';
const { Row, Col } = Grid;

class FeatureItem extends Component {
  showRobots = (ownerAddress) => {
    
  }


  render() {
    const { data } = this.props;
    return (
      <Row
        wrap
        className={styles.row}
      >
        <Col l={3} s={4} xxs={24} className={styles.col}>
          <div>
            <img
              alt={data.name}
              className={styles.firstImg}
              src={data.logoUrl}
            />
          </div>
        </Col>
        <Col l={11} s={10} xxs={24} className={styles.col}>
          <h3 className={styles.titles}>{data.name}</h3>
          <div className={styles.desc}>{data.robotNum}个机器人</div>
        </Col>
        <Col l={4} s={4} xxs={24} className={styles.col}>
          <div className={styles.status} >
            <Button onClick={this.showRobots.bind(this, data.owner)} >
              {data.competitionNum} 场比赛
            </Button>
          </div>
        </Col>
        <Col l={6} s={6} xxs={24} className={styles.col}>
          <div>
            胜:10 负:1 平:2
          </div>
        </Col>
      </Row>
    );
  }
}



export default FeatureItem;
