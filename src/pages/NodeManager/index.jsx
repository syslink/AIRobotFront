import React, { Component } from 'react';
import Container from '@icedesign/container';
import { Button, Input } from '@alifd/next';
import * as hyperchain from 'hyperchain-web3';
import * as Constant from '../../utils/constant';

export default class NodeManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nodeInfo: '',
    };
  }

  componentDidMount = () => {
    this.setState({nodeInfo: hyperchain.utils.getProvider()});
  }
  handleNewNodeInfo = (v) => {
    this.state.nodeInfo = v;
  }
  setNewNodeInfo = () => {
    hyperchain.utils.setProvider(this.state.nodeInfo);
    global.localStorage.setItem(Constant.NodeInfo, this.state.nodeInfo);
    this.setState({nodeInfo: hyperchain.utils.getProvider()});
  }
  render() {
    return (
        <Container>
          当前节点信息：{this.state.nodeInfo}
          <p/><p/>
          <Input hasClear autoFocus
            onChange={this.handleNewNodeInfo.bind(this)}
            style={{ width: 400 }}
            addonTextBefore="节点RPC"
            placeholder="http://开头"
            size="medium"
            defaultValue=""
            hasLimitHint/>
          &nbsp;&nbsp;
          <Button onClick={this.setNewNodeInfo.bind(this)}>设置新节点</Button>
        </Container>
    );
  }
}

