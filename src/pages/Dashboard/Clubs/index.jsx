import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@icedesign/container';
import { Form, Field } from '@ice/form';
import { Button, Grid, Message, Dialog, Input, Select } from '@alifd/next';
import FeatureItem from './FeatureItem';
import * as utils from '../../../utils/utils';
import * as Constant from '../../../utils/constant';
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
      teamList: [],
      myTeamList: [],
      myRobotList: [],
      createTeamVisible: false,
      pwdDialogVisible: false,
      addRobotVisible: false,
    };
  }

  componentDidMount = () => {
    utils.invokeConstantContractFunc(Constant.SoccerManager, 'getTeamNum').then(totalTeamNum => {
      for (let i = 0; i < totalTeamNum; i++) {
        utils.invokeConstantContractFunc(Constant.SoccerManager, 'robotTeams', [i]).then(async (robotTeam) => {
          console.log(robotTeam);
          let result = await utils.invokeConstantContractFunc(Constant.SoccerManager, 'getTeamRobots', [robotTeam.id.toNumber()]);
          robotTeam.robotIdArr = result.robotIds;

          result = await utils.invokeConstantContractFunc(Constant.SoccerManager, 'getTeamCompetitionDates', [robotTeam.id.toNumber()]);
          robotTeam.competitionDates = result.competitionDates;

          result = await utils.invokeConstantContractFunc(Constant.Competition, 'queryTeamAllCompetitions', [robotTeam.id.toNumber()]);
          let competitionResult = {WinNum: 0, LoseNum: 0, TiedNum: 0};
          for (let competitionId of result.competitionIdArr) {
            let competitionInfo = await utils.invokeConstantContractFunc(Constant.Competition, 'competitionInfos', [competitionId.toNumber()]);
            
            switch (competitionInfo.status) {
              case Constant.CompetitionStatus.TeamOneWin:
                competitionInfo.teamOneId == teamId ? competitionResult.WinNum++ : competitionResult.LoseNum++;
                break;
              case Constant.CompetitionStatus.TeamTwoWin:
                competitionInfo.teamOneId == teamId ? competitionResult.LoseNum++ : competitionResult.WinNum++;
                break;
              case Constant.CompetitionStatus.Tied:
                competitionResult.TiedNum++;
                break;
            }
          }
          robotTeam.competitionResult = competitionResult;
          this.state.teamList.push(robotTeam);
          this.setState({teamList: this.state.teamList});
        }).catch(error => {
          Message.error(error.message);
          console.log(error.message);
        });
      }
    }).catch(error => {
      Message.error(error.message);
      console.log(error.message);
    });
  }
  createTeam = () => {
    this.setState({createTeamVisible: true});
  }

  onCreateTeamOk = (e) => {
    this.handleSubmit(e);
  };

  onCreateTeamClose = () => {
    this.setState({
      createTeamVisible: false
    });
  };

  onCreateTeamSubmit = (values) => {
    console.log(values);
    this.state.callbackFunc = () => {
      utils.invokeContractFunc(Constant.SoccerManager, 'createTeam', 
      [values.name, values.logoUrl], this.state.password).then(result => {
        result.success ? Message.success('创建成功') : Message.error('创建失败:' + result.message);
        if (result.success) {
          const defaultAddress = utils.getDefaultAddress();
          const teamInfo = {owner: defaultAddress, logoUrl: values.logoUrl, name: values.name, 
                            robotIdArr: [], competitionDates: [], competitionResult: {WinNum: 0, LoseNum: 0, TiedNum: 0}};
          this.state.teamList.push(teamInfo);
          this.setState({teamList: this.state.teamList, createTeamVisible: false});
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

  addRobotToTeam = async () => {
    try {
      this.state.myTeamList = [];
      this.state.myRobotList = [];
      const defaultAddress = utils.getDefaultAddress();
      
      const result = await utils.invokeConstantContractFunc(Constant.RobotMgr, 'getOwnershipRobotIds', [defaultAddress]);
      for (let robotId of result.robotIds) {
        this.state.myRobotList.push({label: robotId.toNumber(), value: robotId.toNumber()});
      }

      for (let teamInfo of this.state.teamList) {
        if (utils.isEqualAddress(teamInfo.owner, defaultAddress)) {
          this.state.myTeamList.push({label: teamInfo.name, value: teamInfo.id.toNumber()});
        }
      }
      this.setState({
        addRobotVisible: true,
        myTeamList: this.state.myTeamList,
        myRobotList: this.state.myRobotList,
      });
    } catch (error) {
      Message.error(error.message);
    }
  }

  onAddRobotOk = (e) => {
    this.handleSubmit(e);
  };

  onAddRobotClose = () => {
    this.setState({
      addRobotVisible: false
    });
  };

  onAddRobotSubmit = (values) => {
    console.log(values);
    this.state.callbackFunc = () => {
      utils.invokeContractFunc(Constant.SoccerManager, 'addRobotToTeam', 
      [values.robotId, values.teamId], this.state.password).then(result => {
        result.success ? Message.success('添加成功') : Message.error('添加失败:' + result.message);
        if (result.success) {
          this.state.teamList.map(team => {
            if (team.id.toNumber() == values.teamId) {
              team.robotIdArr.push(values.robotId);
            }
          })
          this.setState({teamList: this.state.teamList, addRobotVisible: false});
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
  removeRobotFromTeam = () => {
    
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
    return (
      <div>
        <Container>
          <div className={styles.header}>
            <h2 className={styles.function} >球队列表</h2>
          </div>
          <div>
            {this.state.teamList.map((item, index) => {
              return <FeatureItem data={item} key={index} />;
            })}
            <p/>
            <Row justify="center">
              <Button onClick={this.createTeam.bind(this)}>创建球队</Button>
              &nbsp;&nbsp;
              <Button onClick={this.addRobotToTeam.bind(this)}>给球队添加机器人</Button>
              {/* &nbsp;&nbsp;
              <Button onClick={this.removeRobotFromTeam.bind(this)}>从球队中移除机器人</Button> */}
            </Row>
          </div>
        </Container>
        <Dialog
            title="创建球队"
            visible={this.state.createTeamVisible}
            onOk={this.onCreateTeamOk.bind(this)}
            onCancel={this.onCreateTeamClose.bind(this, 'cancelClick')}
            onClose={this.onCreateTeamClose.bind(this)}
            style={{
              width: 600,
            }}
          >
          <Form 
            onSubmit={this.onCreateTeamSubmit}
            layout={{labelCol: 2, wrapperCol: 8}}      
            rules={{name: [{required: true, min: 2, message: '队名至少2个字符'}]}}      
          >
            {formCore => {
              this.handleSubmit = formCore.submit.bind(formCore);
              return (
                <div>
                  <Field name="name" label="队名：" component={Input} autoFocus placeholder="请输入队名" />
                  <Field name="logoUrl" label="Logo：" component={Input} placeholder="请输入队伍Logo url" />
                </div>
              )
            }}
          </Form>
        </Dialog>
        <Dialog
            title="给球队添加机器人"
            visible={this.state.addRobotVisible}
            onOk={this.onAddRobotOk.bind(this)}
            onCancel={this.onAddRobotClose.bind(this, 'cancelClick')}
            onClose={this.onAddRobotClose.bind(this)}
            style={{
              width: 600,
            }}
          >
          <Form 
            onSubmit={this.onAddRobotSubmit}
            layout={{labelCol: 2, wrapperCol: 8}}          
          >
            {formCore => {
              this.handleSubmit = formCore.submit.bind(formCore);
              return (
                <div>
                  <Field name="teamId" label="球队" component={Select} dataSource={this.state.myTeamList} placeholder="请选择需要提添加机器人的球队" />
                  <Field name="robotId" label="机器人" component={Select} dataSource={this.state.myRobotList} placeholder="请选择需要添加的机器人" />
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
            placeholder="钱包密码，由数字加字母组成，不少于8位"
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

