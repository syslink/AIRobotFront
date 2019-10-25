import React, { Component } from 'react';
import { Grid, Button, Table, Dialog, Message } from '@alifd/next';
import * as utils from '../../../utils/utils';
import * as Constant from '../../../utils/constant';
import styles from './index.module.scss';
const { Row, Col } = Grid;

class FeatureItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robotsVisible: false,
      aiProcedureVisible: false,
      robotList: [],
      aiProcedureList: [],
    };
  }

  showRobots = (robotIdList) => {
    this.state.robotList = [];
    robotIdList.map(robotId => {
      utils.invokeConstantContractFunc(Constant.RobotMgr, 'robots', [robotId.toNumber()]).then(async (robotInfo) => {
        console.log(robotInfo);

        const aiProcedure = await utils.invokeConstantContractFunc(Constant.AIDeveloper, 'aiProcedureList', [robotInfo.aiProcedureId.toNumber()]);
        if (aiProcedure != null) {
          robotInfo.aiProcedureInfo = utils.isEmptyObj(aiProcedure.name) ? 'id=' + robotInfo.aiProcedureId.toNumber() : aiProcedure.name;
        } else {
          robotInfo.aiProcedureInfo = '无效AI程序';
        }

        this.state.robotList.push(robotInfo);
        this.setState({robotList: this.state.robotList});
      });
    });
    this.setState({robotsVisible: true});
  }

  showAIProcedures = (aiProcedures) => {
    this.state.aiProcedureList = [];
    aiProcedures.map(aiProcedureId => {
      utils.invokeConstantContractFunc(Constant.AIDeveloper, 'aiProcedureList', [aiProcedureId.toNumber()]).then(aiProcedure => {
        console.log(aiProcedure);
        if (utils.isEmptyObj(aiProcedure.name)) {
          return;
        }
        this.state.aiProcedureList.push(aiProcedure);
        this.setState({aiProcedureList: this.state.aiProcedureList});
      });
    });
    this.setState({aiProcedureVisible: true});
  }
  onRobotClose = () => {
    this.setState({robotsVisible: false});
  }
  onAIProcedureClose = () => {
    this.setState({aiProcedureVisible: false});
  }
  renderNum = (v) => {
    return v.toString();
  }
  renderTime = (v) => {
    return new Date(v.toNumber()).toLocaleString();
  }
  renderStatus = (status) => {
    switch(status) {
      case 0:
      return '未租赁';
      case 1:
      return '待租赁';
      case 2:
      return '已租赁';
    }
  }
  renderImgUrl = (imgUrl) => {
    return <img alt='robot头像' className={styles.firstImg} src={imgUrl} />;
  }
  render() {
    const { data } = this.props;
    return (
      <div>
        <Row
          wrap
          className={styles.row}
        >
          <Col l={3} s={4} xxs={24} className={styles.col}>
            <div>
              <img
                alt={data.name}
                className={styles.firstImg}
                src={data.headIconUrl}
              />
            </div>
          </Col>
          <Col l={11} s={10} xxs={24} className={styles.col}>
            <h3 className={styles.titles}>{data.name}</h3>
            <div className={styles.desc}>{data.desc}</div>
            <a href={data.blogUrl} className={styles.detail} >dev's blog</a>
          </Col>
          <Col l={4} s={4} xxs={24} className={styles.col}>
            <div className={styles.status} >
              <Button onClick={this.showAIProcedures.bind(this, data.aiProcedures)} >
                {data.aiProcedures.length} 个AI程序
              </Button>
            </div>
          </Col>
          <Col l={4} s={4} xxs={24} className={styles.col}>
            <div className={styles.status} >
              <Button onClick={this.showRobots.bind(this, data.robotList)} >
                {data.robotList.length} Robots
              </Button>
            </div>
          </Col>
        </Row>
        <Dialog
          visible={this.state.robotsVisible}
          onOk={this.onRobotClose.bind(this)}
          onCancel={this.onRobotClose}
          onClose={this.onRobotClose}
          title="机器人列表"
          footerAlign="center"
        >        
          <Table dataSource={this.state.robotList} hasBorder={false}>
            <Table.Column width={60} title="ID" dataIndex="id" cell={this.renderNum.bind(this)}/>
            <Table.Column width={120} title='头像' dataIndex="bodyImageUrl" cell={this.renderImgUrl.bind(this)}/>
            <Table.Column width={120} title='绑定的AI程序' dataIndex="aiProcedureInfo"/>
            <Table.Column width={120} title='当前状态' dataIndex="status" cell={this.renderStatus.bind(this)}/>
            {/* <Table.Column title="操作" width={300} cell={this.renderOperation.bind(this)} /> */}
            </Table>
        </Dialog>
        <Dialog
          visible={this.state.aiProcedureVisible}
          onOk={this.onAIProcedureClose.bind(this)}
          onCancel={this.onAIProcedureClose}
          onClose={this.onAIProcedureClose}
          title="AI程序列表（仅显示有效数据）"
          footerAlign="center"
        >        
          <Table dataSource={this.state.aiProcedureList} hasBorder={false}>
            <Table.Column width={60} title="ID" dataIndex="id" cell={this.renderNum.bind(this)}/>
            <Table.Column width={120} title='名称' dataIndex="name"/>
            <Table.Column width={120} title='描述' dataIndex="desc"/>
            {/* <Table.Column width={120} title='上传时间' dataIndex="uploadTime"  cell={this.renderTime.bind(this)}/> */}
            <Table.Column width={120} title='下载连接' dataIndex="storeUrl" />
            <Table.Column width={120} title='hash值' dataIndex="hashValue" />
            <Table.Column width={120} title='大小(K)' dataIndex="size"  cell={this.renderNum.bind(this)}/>
            {/* <Table.Column title="操作" width={300} cell={this.renderOperation.bind(this)} /> */}
            </Table>
        </Dialog>
      </div>
    );
  }
}



export default FeatureItem;
