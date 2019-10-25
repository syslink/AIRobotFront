import React, { Component } from 'react';
import { Grid, Icon, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import * as utils from '../../../utils/utils';
import * as Constant from '../../../utils/constant';

const { Row, Col } = Grid;

export default class OverviewSatesChart extends Component {
  static displayName = 'OverviewSatesChart';

  constructor(props) {
    super(props);
    this.state = {
      totalCompetitions: 0,
      totalSoccerMembers: 0,
      totalTeams: 0,
      totalDevs: 0,
      mockData: [],
    };    
  }

  componentDidMount = () => {    
    const self = this;
    utils.invokeConstantContractFunc(Constant.Competition, 'getCompetitionNum').then(result => {
      self.state.totalCompetitions = result.competitionNum.toNumber();    
      
      utils.invokeConstantContractFunc(Constant.RobotMgr, 'getRobotNum').then(result => {
        self.state.totalSoccerMembers = result.robotNum.toNumber();    
        utils.invokeConstantContractFunc(Constant.SoccerManager, 'getTeamNum').then(result => {
          self.state.totalTeams = result.teamNum.toNumber();    
          utils.invokeConstantContractFunc(Constant.AIDeveloper, 'getDevNum').then(result => {
            self.state.totalDevs = result.devNum.toNumber();   
            self.setState({mockData: [{
              title: '总赛事数',
              amount: self.state.totalCompetitions,
              color: '#fff',
              borderColor: '#4FD4A4',
              background: '#1BC98E',
              },
              {
                title: '总球员数',
                amount: self.state.totalSoccerMembers,
                color: '#fff',
                borderColor: '#EB6C7A',
                background: '#E64758',
              },
              {
                title: '球队数量',
                amount: self.state.totalTeams,
                color: '#fff',
                borderColor: '#B29FFF',
                background: '#9F85FF',
              },
              {
                title: '开发者数量',
                amount: self.state.totalDevs,
                color: '#fff',
                borderColor: '#E9E063',
                background: '#E5D936',
              }]});
          }).catch(error => {
            Message.error(error.message);
            console.log(error.message);
          });
        }).catch(error => { 
          Message.error(error.message);
          console.log(error.message);
        });
      }).catch(error => {
        Message.error(error.message);
        console.log(error.message);
      });  
    }).catch(error => {
      Message.error(error.message);
      console.log(error.message);
    });
  }

  render() {
    return (
      <IceContainer>
        <Row wrap gutter={20}>
          {this.state.mockData.map((item, index) => {
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

