import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Button, Icon, Grid } from '@alifd/next';
import Layout from '@icedesign/layout';
import data from './data';
import styles from './index.module.scss';


const { Row, Col } = Grid;
const { Item } = Tab;
const CompetitionStatus = {WaitForAccept: 0, Canceled: 1, Reject: 2, WaitForEmulatePlatform: 3, WaitForStart: 4,
                            Running: 5, TeamOneWin: 6, TeamTwoWin: 7, Tied: 8, Exception: 9}

export default class DownloadCard extends Component {
  static displayName = 'DownloadCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tabData: data,
    };
  }
  seeCompetition = (url, status) => {
    switch (status) {
      case CompetitionStatus.WaitForStart:
        alert('请加微信/电报机器人，并订阅您感兴趣的赛事');
        break;
      case CompetitionStatus.Running:
        alert('赛事直播:' + url);
        break;
      case CompetitionStatus.TeamOneWin:
      case CompetitionStatus.TeamTwoWin:
      case CompetitionStatus.Tied:
        alert('赛事录播:' + url);
        break;
    }
  }
/**
 * {
        img: require('./images/img1.png'),
        teamOne: '皇马',
        teamTwo: '曼联',
        teamOneSoccer: 1,
        teamTwoSoccer: 2,
        startTime: '2019.09.09 12:00',
        wager: 0,
        liveUrl: '',
        logUrl: '',
    },
 *  */
  renderContent = (items, status) => {    
    return items.map((item, index) => {
      let teamOneScore = item.teamOneScore;
      let teamTwoScore = item.teamTwoScore;
      let btnContent = '观看赛事直播';
      let url = item.liveUrl;
      switch (status) {
        case CompetitionStatus.WaitForStart:
          teamOneScore = '?';
          teamTwoScore = '?';
          btnContent = '提醒我观看直播';
          break;
        case CompetitionStatus.Running:
          break;
        case CompetitionStatus.TeamOneWin:
        case CompetitionStatus.TeamTwoWin:
        case CompetitionStatus.Tied:
          btnContent = '观看赛事录播';
          url = item.logUrl;
          break;
      }
      return (
        <Col key={index}>
          <div key={index} className={styles.columnCardItem}>
            <div className={styles.cardBody}>
              <p className={styles.title}>{teamOneScore} : {teamTwoScore}</p>
              <Button className={styles.desc} onClick={this.seeCompetition.bind(this, url, status)}>{btnContent}</Button>
              <p className={styles.title}>赛事开始时间：{item.startTime}</p>
            </div>

            <div className={styles.downloadButtons}>
              <Button
                className={styles.leftButton}
                type="primary"
              >
                {item.teamOne}
              </Button>
              &nbsp;&nbsp;vs
              <Button
                className={styles.rightButton}
                type="primary"
              >
                {item.teamTwo}
              </Button>
            </div>
          </div>
        </Col>
      );
    });
  };

  render() {
    const { tabData } = this.state;
    return (
      <div className={styles.downloadCard}>
        <IceContainer>
          <Tab contentStyle={{ padding: '20px 5px' }}>
            <Tab.Item title="进行中的赛事" key="1">
              <Row gutter="20" wrap>
                {tabData.competitionDoing.length > 0
                  ? this.renderContent(tabData.competitionDoing, CompetitionStatus.Running)
                  : '暂无数据'}
              </Row>
              <p/>
              <Row justify="center">
                <Button>查看更多</Button>
              </Row>
            </Tab.Item>
            <Tab.Item title="已结束的赛事" key="2">
              <Row gutter="20" wrap>
                {tabData.competitionDone.length > 0
                  ? this.renderContent(tabData.competitionDone, CompetitionStatus.Tied)
                  : '暂无数据'}
              </Row>
              <p/>
              <Row justify="center">
                <Button>查看更多</Button>
              </Row>
            </Tab.Item>
            <Tab.Item title="未开始的赛事" key="3">
              <Row gutter="20" wrap>
                {tabData.competitionToDo.length > 0
                  ? this.renderContent(tabData.competitionToDo, CompetitionStatus.WaitForStart)
                  : '暂无数据'}
              </Row>
              <p/>
              <Row justify="center">
                <Button>查看更多</Button>
              </Row>
            </Tab.Item>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}