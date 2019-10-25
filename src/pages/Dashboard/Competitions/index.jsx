import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Form, Field } from '@ice/form';
import { Tab, Button, Message, Grid, Dialog, Select, Input } from '@alifd/next';
import styles from './index.module.scss';
import * as Constant from '../../../utils/constant';
import * as utils from '../../../utils/utils';


const { Row, Col } = Grid;
const { Item } = Tab;

export default class DownloadCard extends Component {
  static displayName = 'DownloadCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tabData: {},
      myTeamList: [],
      opponentTeamList: [],
      launchCompetitionVisible: false,
      pwdDialogVisible: false,
      password: '',
      callbackFunc: null,
    };
  }
  
  componentDidMount = () => {
    this.getCompetitionByStatus(Constant.CompetitionStatus.Running);
    this.getCompetitionByStatus(Constant.CompetitionStatus.TeamOneWin);
    this.getCompetitionByStatus(Constant.CompetitionStatus.TeamTwoWin);
    this.getCompetitionByStatus(Constant.CompetitionStatus.Tied);
    this.getCompetitionByStatus(Constant.CompetitionStatus.WaitForStart);
    this.getCompetitionByStatus(Constant.CompetitionStatus.WaitForAccept);
  }

  getCompetitionByStatus = (status) => {
    utils.invokeConstantContractFunc(Constant.Competition, 'getCompetitionsByStat', [status]).then(result => {
      const competitionIds = result.competitionIdArr;
      console.log(competitionIds);
      if (competitionIds.length == 0) return;
      competitionIds.map(competitionId => {
        utils.invokeConstantContractFunc(Constant.Competition, 'competitionInfos', [competitionId.toNumber()]).then(async (competitionInfo) => {
          console.log(competitionInfo);
          const teamOneInfo = await utils.invokeConstantContractFunc(Constant.SoccerManager, 'robotTeams', [competitionInfo.teamOneId.toNumber()]);
          const teamTwoInfo = await utils.invokeConstantContractFunc(Constant.SoccerManager, 'robotTeams', [competitionInfo.teamTwoId.toNumber()]);
          const competitionLog = await utils.invokeConstantContractFunc(Constant.Competition, 'competitionLogs', [competitionId.toNumber()]);
          const competitionResultInfo = {
            img: require('./images/img1.png'),
            teamOne: teamOneInfo.name,
            teamTwo: teamTwoInfo.name,
            teamOneScore: competitionInfo.teamOneScore.toNumber(),
            teamTwoScore: competitionInfo.teamTwoScore.toNumber(),
            startTime: new Date(competitionInfo.startTime.toNumber()).toLocaleString(),
            wager: competitionInfo.wager.toNumber(),
            liveUrl: competitionLog.liveUrl,
            logUrl: competitionLog.logUrl,
          };
          if (status == Constant.CompetitionStatus.Running) {
            if (this.state.tabData.competitionRunning == null) {
              this.state.tabData.competitionRunning = [competitionResultInfo];
            } else {
              this.state.tabData.competitionRunning.push(competitionResultInfo);
            }
          } else if (status == Constant.CompetitionStatus.WaitForStart) {
            if (this.state.tabData.competitionTodo == null) {
              this.state.tabData.competitionTodo = [competitionResultInfo];
            } else {
              this.state.tabData.competitionTodo.push(competitionResultInfo);
            }
          } else if (status == Constant.CompetitionStatus.TeamOneWin 
                  || status == Constant.CompetitionStatus.TeamTwoWin 
                  || status == Constant.CompetitionStatus.Tied) {
            if (this.state.tabData.competitionDone == null) {
              this.state.tabData.competitionDone = [competitionResultInfo];
            } else {
              this.state.tabData.competitionDone.push(competitionResultInfo);
            }
          } else if (status == Constant.CompetitionStatus.WaitForAccept) {
            if (this.state.tabData.competitionWaitingForAccept == null) {
              this.state.tabData.competitionWaitingForAccept = [competitionResultInfo];
            } else {
              this.state.tabData.competitionWaitingForAccept.push(competitionResultInfo);
            }
          }
          this.setState({tabData: this.state.tabData});
        });
      });
    }).catch(error => {
      Message.error(error.message);
      console.log(error.message);
    });
  }

  seeCompetition = (url, status) => {
    switch (status) {
      case Constant.CompetitionStatus.WaitForStart:
        alert('请加微信/电报机器人，并订阅您感兴趣的赛事');
        break;
      case Constant.CompetitionStatus.Running:
        alert('赛事直播:' + url);
        break;
      case Constant.CompetitionStatus.TeamOneWin:
      case Constant.CompetitionStatus.TeamTwoWin:
      case Constant.CompetitionStatus.Tied:
        alert('赛事录播:' + url);
        break;
    }
  }
  renderContent = (items, status) => {    
    return items.map((item, index) => {
      let teamOneScore = item.teamOneScore;
      let teamTwoScore = item.teamTwoScore;
      let btnContent = '观看赛事直播';
      let url = item.liveUrl;
      switch (status) {
        case Constant.CompetitionStatus.WaitForAccept:
          teamOneScore = '?';
          teamTwoScore = '?';
          btnContent = '等待接受挑战';
          break;
        case Constant.CompetitionStatus.WaitForStart:
          teamOneScore = '?';
          teamTwoScore = '?';
          btnContent = '提醒我观看直播';
          break;
        case Constant.CompetitionStatus.Running:
          break;
        case Constant.CompetitionStatus.TeamOneWin:
        case Constant.CompetitionStatus.TeamTwoWin:
        case Constant.CompetitionStatus.Tied:
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

  launchCompetition = () => {
    try {
      this.state.myTeamList = [];
      const defaultAddress = utils.getDefaultAddress();
      utils.invokeConstantContractFunc(Constant.SoccerManager, 'getManagerTeams', [defaultAddress]).then(async (result) => {
        for (let teamId of result.teamIds) {
          const robotTeam = await utils.invokeConstantContractFunc(Constant.SoccerManager, 'robotTeams', [teamId.toNumber()]);
          this.state.myTeamList.push({label: robotTeam.name, value: teamId.toNumber()});         
        }
        if (this.state.myTeamList.length == 0) {
          Message.error('由于您尚未拥有一支球队，故无法发起赛事。');
          return;
        }
        utils.invokeConstantContractFunc(Constant.SoccerManager, 'getTeamNum').then(async (totalTeamNum) => {
          for (let i = 0; i < totalTeamNum; i++) {
            const robotTeam = await utils.invokeConstantContractFunc(Constant.SoccerManager, 'robotTeams', [i]);
            this.state.opponentTeamList.push({label: robotTeam.name, value: robotTeam.id.toNumber()});     
          }
          this.setState({myTeamList: this.state.myTeamList, opponentTeamList: this.state.opponentTeamList, launchCompetitionVisible: true});
        }).catch(error => {
          Message.error(error.message);
          console.log(error.message);
        });
      }).catch(error => {
        Message.error(error.message);
        console.log(error.message);
      });
    } catch (error) {
      Message.error(error.message);
    }
  }

  onLaunchCompetitionOk = (e) => {
    this.handleSubmit(e);
  }

  onLaunchCompetitionClose = () => {
    this.setState({
      launchCompetitionVisible: false
    });
  }

  onLaunchCompetitionSubmit = (values) => {
    this.state.callbackFunc = () => {
      utils.invokeContractFunc(Constant.Competition, 'launchCompetition', 
      [values.myTeamId, values.opponentTeamId, Math.floor(new Date().getTime() / 1000 + 6 * 3600)], this.state.password).then(result => {
        if (result.success && result.result) {          
          Message.success('成功发起挑战，等待对方接受');
          console.log('成功发起挑战，等待对方接受');
          this.setState({launchCompetitionVisible: false});
        } else {
          Message.error('发起挑战失败:' + result.message);
          console.log('发起挑战失败:' + result.message);
        }
      }).catch(error => {
        Message.error(error.message);
        console.log(error);
      })
    };   
    this.setState({
      pwdDialogVisible: true
    });
  }
  
  processMyCompetitions = () => {
    
  }
  

  handlePasswordChange = (v) => {
    this.state.password = v;
  }
  
  onPwdOK = () => {
    if(!utils.checkPassword(this.state.password)) {
      Message.error(T('密码格式无效！'));
      return;
    }
    if (this.state.callbackFunc != null) {
      this.state.callbackFunc(); 
    }      
    this.onPwdClose();
  }

  onPwdClose = () => {
    this.setState({
      pwdDialogVisible: false,
      password: '',
    });
  };
  render() {
    const { tabData } = this.state;
    return (
      <div className={styles.downloadCard}>
        <IceContainer>
          <Tab contentStyle={{ padding: '20px 5px' }}>
            <Tab.Item title="等待接受挑战的赛事" key="1">
              <Row gutter="20" wrap>
                {(tabData.competitionWaitingForAccept != null && tabData.competitionWaitingForAccept.length > 0)
                  ? this.renderContent(tabData.competitionWaitingForAccept, Constant.CompetitionStatus.WaitForAccept)
                  : '暂无数据'}
              </Row>
            </Tab.Item>
            <Tab.Item title="进行中的赛事" key="2">
              <Row gutter="20" wrap>
                {(tabData.competitionRunning != null && tabData.competitionRunning.length > 0)
                  ? this.renderContent(tabData.competitionRunning, CompetitionStatus.Running)
                  : '暂无数据'}
              </Row>
            </Tab.Item>
            <Tab.Item title="已结束的赛事" key="3">
              <Row gutter="20" wrap>
                {tabData.competitionDone != null && tabData.competitionDone.length > 0
                  ? this.renderContent(tabData.competitionDone, CompetitionStatus.Tied)
                  : '暂无数据'}
              </Row>
            </Tab.Item>
            <Tab.Item title="未开始的赛事" key="4">
              <Row gutter="20" wrap>
                {tabData.competitionToDo != null && tabData.competitionToDo.length > 0
                  ? this.renderContent(tabData.competitionToDo, CompetitionStatus.WaitForStart)
                  : '暂无数据'}
              </Row>
            </Tab.Item>
          </Tab>
          <Row justify="center">
            <Button onClick={this.launchCompetition.bind(this)}>发起赛事</Button>
            &nbsp;&nbsp;
            <Button onClick={this.processMyCompetitions.bind(this)}>处理我的赛事</Button>
          </Row>
        </IceContainer>
        <Dialog
            visible={this.state.launchCompetitionVisible}
            onOk={this.onLaunchCompetitionOk.bind(this)}
            onCancel={this.onLaunchCompetitionClose.bind(this, 'cancelClick')}
            onClose={this.onLaunchCompetitionClose.bind(this)}
            style={{
              width: 600,
            }}
          >
          <Form 
            onSubmit={this.onLaunchCompetitionSubmit}
            layout={{labelCol: 2, wrapperCol: 8}}         
          >
            {formCore => {
              this.handleSubmit = formCore.submit.bind(formCore);
              return (
                <div>
                  <Field name="myTeamId" label="我的球队：" component={Select} dataSource={this.state.myTeamList} />
                  <Field name="opponentTeamId" label="被挑战的球队：" component={Select} dataSource={this.state.opponentTeamList} />
                </div>
              )
            }}
          </Form>
        </Dialog>
        <Dialog
          visible={this.state.pwdDialogVisible}
          onOk={this.onPwdOK.bind(this)}
          onCancel={this.onPwdClose}
          onClose={this.onPwdClose}
          title="输入密码"
          footerAlign="center"
        >
          <Input hasClear autoFocus
            htmlType="password"
            onChange={this.handlePasswordChange.bind(this)}
            style={{ width: 400 }}
            addonTextBefore="密码"
            size="medium"
            defaultValue=""
            maxLength={20}
            hasLimitHint
            onPressEnter={this.onPwdOK.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}