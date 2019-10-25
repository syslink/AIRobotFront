import React from 'react';
import * as utils from '../../utils/utils';
import { Button, Grid, Dialog, Input, Message, Select } from '@alifd/next';

callbackFunc = null;
pwdDialogVisible = false;
password = '';
const onPwdOK = () => {
  if(!utils.checkPassword(this.state.password)) {
    Message.error(T('密码格式无效！'));
    return;
  }
  if (callbackFunc != null) {
    callbackFunc(); 
  }      
  pwdDialogVisible = false;
}


function DisplayPwdDialog(callback) {
  callbackFunc = callback;
  pwdDialogVisible = true;
  return (
    <Dialog
      visible={pwdDialogVisible}
      onOk={() => onPwdOK()}
      onCancel={() => pwdDialogVisible = false}
      onClose={() => pwdDialogVisible = false}
      title="输入密码"
      footerAlign="center"
    >
      <Input hasClear autoFocus
        htmlType="password"
        onChange={v => password = v }
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
  );
}

export default Guide;
