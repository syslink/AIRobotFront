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
              src={data.headIcon}
            />
          </div>
        </Col>
        <Col l={11} s={10} xxs={24} className={styles.col}>
          <h3 className={styles.titles}>{data.name}</h3>
          <div className={styles.desc}>{data.desc}</div>
        </Col>
        <Col l={4} s={4} xxs={24} className={styles.col}>
          <div className={styles.status} >
            <Button onClick={this.showRobots.bind(this, data.address)} >
              {data.robotNum} Robots
            </Button>
          </div>
        </Col>
        <Col l={6} s={6} xxs={24} className={styles.col}>
          <div>
            <a href={data.blogUrl} className={styles.detail} >
              dev's blog
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}



export default FeatureItem;
