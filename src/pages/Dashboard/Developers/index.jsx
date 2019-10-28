import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@icedesign/container';
import { Form, Field } from '@ice/form';
import { Button, Grid, Dialog, Input, Message, Select } from '@alifd/next';
import * as utils from '../../../utils/utils';
import * as Constant from '../../../utils/constant';
import FeatureItem from './FeatureItem';
import styles from  './index.module.scss';

const { Row, Col } = Grid;
const pwdPlaceholder = "钱包密码，由数字加字母组成，不少于8位";
export default class Index extends Component {
  static displayName = 'Index';
  handleSubmit = null;
  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'string data',
  };
  
  constructor(props) {
    super(props);
    this.state = {
      devInfoList: [],
      registerDeveloperVisible: false,
      addAIProcedureVisible: false,
      addRobotVisible: false,
      pwdDialogVisible: false,
      password: '',
      callbackFunc: null,
      addAIProcedureTitle: '',
      addRobotTitle: '',
      aiProcedureSelectData: [],
    };
  }

  componentDidMount = () => {
    utils.invokeConstantContractFunc(Constant.AIDeveloper, 'getDevNum').then(result => {
      for (let i = 0; i < result.devNum.toNumber(); i++) {
        utils.invokeConstantContractFunc(Constant.AIDeveloper, 'devList', [i]).then(async (devInfo) => {
          console.log('devInfo:' + JSON.stringify(devInfo));
          //let [id,name,org,desc,headIcon,blogUrl,owner,aiProcedures] = result;
          const robotList = await utils.invokeConstantContractFunc(Constant.RobotMgr, 'getOwnershipRobotIds', [devInfo.owner]);
          devInfo.robotList = robotList.robotIds;
          const devDetailInfo = await utils.invokeConstantContractFunc(Constant.AIDeveloper, 'getDevInfo', [devInfo.owner]);
          devInfo.aiProcedures = devDetailInfo.aiProcedures;
          this.state.devInfoList.push(devInfo);
          this.setState({devInfoList: this.state.devInfoList});
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
  

  registerDeveloper = () => {
    try {
      const defaultAddress = utils.getDefaultAddress();
      for (let devInfo of this.state.devInfoList) {
        if (defaultAddress.toLowerCase() == devInfo.owner.toLowerCase()) {
          Message.error('您已经注册开发者' + devInfo.name +  ',不可重复注册开发者');
          return;
        }
      }
      this.setState({
        registerDeveloperVisible: true
      });
    } catch (error) {
      Message.error(error.message);
    }
  }

  onRegisterOk = (e) => {
    this.handleSubmit(e);
  };

  onRegisterClose = () => {
    this.setState({
      registerDeveloperVisible: false
    });
  };

  onRegisterSubmit = (values) => {
    console.log(values);
    this.state.callbackFunc = () => {
      utils.invokeContractFunc(Constant.AIDeveloper, 'registerDev', 
      [values.name, values.org, values.desc, values.headIconUrl, values.blogUrl], this.state.password).then(result => {
        result.success ? Message.success('注册成功') : Message.error('注册失败:' + result.message);
        if (result.success) {
          const defaultAddress = utils.getDefaultAddress();
          const devInfo = {owner: defaultAddress, headIcon: values.headIconUrl, name: values.name, 
                           desc: values.desc, robotList: [], blogUrl: values.blogUrl, aiProcedures: []};
          this.state.devInfoList.push(devInfo);
          this.setState({devInfoList: this.state.devInfoList, registerDeveloperVisible: false});
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

  addAIProcedure = () => {
    try {
      this.state.addAIProcedureTitle = '';
      const defaultAddress = utils.getDefaultAddress();
      for (let devInfo of this.state.devInfoList) {
        if (defaultAddress.toLowerCase() == devInfo.owner.toLowerCase()) {
          this.state.addAIProcedureTitle = devInfo.name + '添加AI程序';
          break;
        }
      }
      if (this.state.addAIProcedureTitle == '') {
        Message.error('默认地址尚未注册开发者，无法添加AI程序');
        return;
      }
      this.setState({
        addAIProcedureTitle: this.state.addAIProcedureTitle,
        addAIProcedureVisible: true
      });
    } catch (error) {
      Message.error(error.message);
    }
  }

  onAddAIProcedureOk = (e) => {
    this.handleSubmit(e);
  }

  onAddAIProcedureClose = () => {
    this.setState({
      addAIProcedureVisible: false
    });
  }

  onAddAIProcedureSubmit = (values) => {
    this.state.callbackFunc = () => {
      utils.invokeContractFunc(Constant.AIDeveloper, 'addAIProcedure', 
      [values.name, values.desc, values.storeUrl, values.hashValue, values.size], this.state.password).then(result => {
        result.success ? Message.success('添加成功') : Message.error('添加失败:' + result.message);
        if (result.success) {
          const id = result.aiProcedureId;
          const defaultAddress = utils.getDefaultAddress();
          this.state.devInfoList.map(devInfo => {
            if (utils.isEqualAddress(devInfo.owner, defaultAddress)) {
              devInfo.aiProcedures.push(id);
            }
          })
          this.setState({devInfoList: this.state.devInfoList, addAIProcedureVisible: false});
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

  genRobot = async () => {
    try {
      this.state.aiProcedureSelectData = [];
      this.state.addRobotTitle = '';
      const defaultAddress = utils.getDefaultAddress();
      for (let devInfo of this.state.devInfoList) {
        if (defaultAddress.toLowerCase() == devInfo.owner.toLowerCase()) {
          if (devInfo.aiProcedures.length == 0) {
            Message.error(devInfo.name + '尚未添加AI程序，无法创建机器人');
            return;
          }
          for (let aiProcedureId of devInfo.aiProcedures) {
            const aiProcedure = await utils.invokeConstantContractFunc(Constant.AIDeveloper, 'getAIProcedureById', [aiProcedureId.toNumber()]);
            this.state.aiProcedureSelectData.push({label: aiProcedure.name, value: aiProcedureId.toNumber()});
          }
          this.state.addRobotTitle = devInfo.name + '创建机器人';
          break;
        }
      }
      if (this.state.addRobotTitle == '') {
        Message.error('默认地址尚未注册开发者，无法创建机器人');
        return;
      }
      this.setState({
        addRobotTitle: this.state.addRobotTitle,
        addRobotVisible: true
      });
    } catch (error) {
      Message.error(error.message);
    }
  }

  onAddRobotOk = (e) => {
    this.handleSubmit(e);
  }

  onAddRobotClose = () => {
    this.setState({
      addRobotVisible: false
    });
  }

  onAddRobotSubmit = (values) => {
    this.state.callbackFunc = () => {
      utils.invokeContractFunc(Constant.RobotMgr, 'createRobot', 
      [values.aiProcedureId, values.name, values.bodyImageUrl], this.state.password).then(result => {
        result.success ? Message.success('添加成功') : Message.error('添加失败:' + result.message);
        if (result.success) {
          const id = result.robotId;
          const defaultAddress = utils.getDefaultAddress();
          this.state.devInfoList.map(devInfo => {
            if (utils.isEqualAddress(devInfo.owner, defaultAddress)) {
              devInfo.robotList.push(id);
            }
          })
          this.setState({devInfoList: this.state.devInfoList, addAIProcedureVisible: false});
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
              <h2 className={styles.function} >开发者列表</h2>
            </div>
            <div>
              {this.state.devInfoList.map((item, index) => {
                return <FeatureItem data={item} key={index} />;
              })}
              <p/>
              <Row justify="center">
                <Button onClick={this.registerDeveloper.bind(this)}>注册开发者</Button>
                &nbsp;&nbsp;
                <Button onClick={this.addAIProcedure.bind(this)}>添加AI程序</Button>
                &nbsp;&nbsp;
                <Button onClick={this.genRobot.bind(this)}>生成机器人</Button>
              </Row>
            </div>
          </Container>

          <Dialog
            title="注册开发者"
            visible={this.state.registerDeveloperVisible}
            onOk={this.onRegisterOk.bind(this)}
            onCancel={this.onRegisterClose.bind(this, 'cancelClick')}
            onClose={this.onRegisterClose.bind(this)}
            style={{
              width: 600,
            }}
          >
          <Form 
            onSubmit={this.onRegisterSubmit}
            layout={{labelCol: 2, wrapperCol: 8}}      
            rules={{name: [{required: true, min: 2, message: '姓名至少2个字符'}]}}      
          >
            {formCore => {
              this.handleSubmit = formCore.submit.bind(formCore);
              return (
                <div>
                  <Field name="name" label="名称：" component={Input} autoFocus placeholder="请输入名字" />
                  <Field name="org" label="组织：" component={Input} placeholder="请输入所属组织，如学校/公司/个人" />
                  <Field name="desc" label="简介：" component={Input.TextArea} placeholder="请简单介绍一下自己的AI开发经历" />
                  <Field name="headIconUrl" label="头像url：" component={Input} placeholder="请输入有效的头像url" />
                  <Field name="blogUrl" label="博客url：" component={Input} placeholder="请输入有效的个人网站url"/>
                </div>
              )
            }}
          </Form>
        </Dialog>

        <Dialog
            title={this.state.addAIProcedureTitle}
            visible={this.state.addAIProcedureVisible}
            onOk={this.onAddAIProcedureOk.bind(this)}
            onCancel={this.onAddAIProcedureClose.bind(this, 'cancelClick')}
            onClose={this.onAddAIProcedureClose.bind(this)}
            style={{
              width: 600,
            }}
          >
          <Form 
            onSubmit={this.onAddAIProcedureSubmit}
            layout={{labelCol: 2, wrapperCol: 8}}      
            rules={{name: [{required: true, min: 2, message: '至少2个字符'}]}}     
          >
            {formCore => {
              this.handleSubmit = formCore.submit.bind(formCore);
              return (
                <div>
                  <Field name="name" label="名称：" component={Input} autoFocus placeholder="请输入AI程序的名称" />
                  <Field name="desc" label="描述：" component={Input.TextArea} placeholder="请描述此AI程序的特点" />
                  <Field name="storeUrl" label="程序连接：" component={Input} placeholder="请输入可下载AI程序的URL" />
                  <Field name="hashValue" label="hash值：" component={Input} placeholder="请输入AI程序的Hash值" />
                  <Field name="size" label="大小(K)：" component={Input} placeholder="请输入AI程序的大小" />
                </div>
              )
            }}
          </Form>
        </Dialog>

        <Dialog
            title={this.state.addRobotTitle}
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
            layout={{labelCol: 3, wrapperCol: 8}}         
          >
            {formCore => {
              this.handleSubmit = formCore.submit.bind(formCore);
              return (
                <div>
                  <Field name="name" label="机器人名称：" component={Input} autoFocus placeholder="请输入机器人的名称" />
                  <Field name="aiProcedureId" label="AI程序：" component={Select} dataSource={this.state.aiProcedureSelectData} placeholder="请选择需要绑定到机器人的AI程序" />
                  <Field name="bodyImageUrl" label="外观地址：" component={Input} placeholder="机器人对外显示的形象图片" />
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
            placeholder={pwdPlaceholder}
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

