/* eslint-disable react/no-unused-state */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button, Input, Dialog, Tag, Select, Message } from '@alifd/next';
//import { Dialog } from '@icedesign/base';
import { ethers } from 'ethers';
import EthCrypto, { sign } from 'eth-crypto';
import * as ethUtil from 'ethereumjs-util';
import copy from 'copy-to-clipboard';
import { createHashHistory } from 'history';
import * as hyperchain from 'hyperchain-web3';

import CellEditor from './CellEditor';
import * as utils from '../../../../utils/utils'; 
import { T } from '../../../../utils/lang'; 
import * as Constant from '../../../../utils/constant';
import './KeyList.scss';

const history = createHashHistory();

const { Group: TagGroup, Selectable: SelectableTag } = Tag;
const ActionType = { CreateFirstAccountByMnemonic: 0, CreateNewAccount: 1, ExportPrivateKey: 2, ExportKeyStoreInfo: 3, ExportMnemonic: 4,
                     DeleteAccount: 5, ImportKeystore: 6, ImportPrivateKey: 7, SignTxInfo: 8, CryptoInfo: 9 };
const MnemonicPath = "m/44'/550'/0'/0/";
const ConfusePwd = '*&^()!@863';
const ConfuseMnemonic = '*&^() !@863 sdfs* (*^d';
const NonMnemonicGenerate = T('非助记词生成');
const pwdPlaceholder = T("钱包密码，由数字加字母组成，不少于8位");

export default class KeyList extends Component {
  static displayName = 'KeyList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: [],
      curData: '',
      curDataIndex: -1,
      pwdDialogVisible: false,
      newPwdDialogVisible: false,
      importKeyDialogVisible: false,
      importKeystoreDialogVisible: false,
      importMnemonicDialogVisible: false,
      msgVisible: false,
      msgContent: '',
      msgTitle: T('通知'),
      method: 'keystore_listAccount',
      extraParam: [],
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
      privateKey: '',
      mnemonicVisible: false,
      mnemonicWords: '',
      bip32path: '',
      reMnemonicVisible: false,
      signVisible: false,
      cryptoVisible: false,
      chainIdVisible: false,
      signResult: '',
      cryptoResult: '',
      reMnemonicWords: '',
      mnemonicWordTagList: [],
      keystoreInfo: '',
      keystorePassword: '',
      successCallback: () => {},
      errCallback: () => {
        this.setState({
          pwdDialogVisible: false,
        });
      },
    };
  }

  testEcc = (publicKey, privateKey, msg) => {
    EthCrypto.encryptWithPublicKey(publicKey, msg).then(encrypted => {
      EthCrypto.decryptWithPrivateKey(privateKey, encrypted).then(function(plaintext) {
        console.log("Message to part A:", plaintext.toString());
      });
    })
  }

  componentDidMount = () => {
    this.loadKeyInfo();
  }

  loadKeyInfo = () => {
    const keystoreInfoObj = utils.getDataFromFile(Constant.KeyStoreFile);
    if (keystoreInfoObj == null) {
      return;
    }
    this.state.dataSource = [];
    for (const ksInfoObj of keystoreInfoObj.keyList) {
      const bip32path = Object.prototype.hasOwnProperty.call(ksInfoObj, 'x-ethers') ? ksInfoObj['x-ethers'].path : T(NonMnemonicGenerate);
      const displayKeyObj = {'bip32path': bip32path, 'address': ksInfoObj.address, 'publicKey': ksInfoObj.publicKey};
      this.state.dataSource.push(displayKeyObj);
    }
    this.setState({ dataSource: this.state.dataSource });
  }

  renderOrder = (value, index) => {
    return <span>{index}</span>;
  };

  copyValue = (value) => {
    copy(value);
    Message.success(T('已复制到粘贴板'));
  }

  renderPublicKey = (value) => {
    const displayValue = value.substr(0, 8) + '...' + value.substr(value.length - 6);
    return <address title={T('点击可复制')} onClick={ () => this.copyValue(value) }>{displayValue}</address>;
  }

  renderAddress = (value) => {
    value = '0x' + value;
    const displayValue = value.substr(0, 8) + '...' + value.substr(value.length - 6);
    return <address title={T('点击可复制')} onClick={ () => this.copyValue(value) }>{displayValue}</address>;
  }

  deleteItem = (index) => {
    this.state.method = ActionType.DeleteAccount;
    this.state.curData = this.state.dataSource[index];
    this.state.curDataIndex = index;
    this.setState({
      pwdDialogVisible: true,
    });
  };

  createNewAccount = (index) => {
    this.state.curData = this.state.dataSource[index];
    //history.push('http://localhost:8080/#/AccountManager');
    history.push({ pathname: '/AccountManager', state: { publicKey: this.state.curData.publicKey, selfCreateAccountVisible: true } });
  };

  cryptoInfo = (index) => {
    this.state.method = ActionType.CryptoInfo;
    this.state.curData = this.state.dataSource[index];
    this.setState({
      pwdDialogVisible: true,
    });
  };

  signTx = (index) => {
    this.state.method = ActionType.SignTxInfo;
    this.state.curData = this.state.dataSource[index];
    this.setState({
      pwdDialogVisible: true,
      signResult: '',
    });
  };

  signTxInfo = () => {
    try {
      const txInfoObj = JSON.parse(this.state.txInfo);
      fractal.ft.signTx(txInfoObj, this.state.msgContent).then(signature => {
        this.setState({ signResult: signature });
      }).catch(error => {
        Message.error(error.message || error);
      });
    } catch (error) {
      Message.error(error.message || error);
    }
  };

  verifySignInfo = () => {
    try {
      const txInfoObj = JSON.parse(this.state.txInfo);
      if (utils.isEmptyObj(this.state.signResult)) {
        Message.error(T('请输入签名信息'));
        return;
      }
      if (utils.isEmptyObj(this.state.signAddr)) {
        const publicKey = EthCrypto.publicKeyByPrivateKey(this.state.msgContent);
        this.state.signAddr = EthCrypto.publicKey.toAddress(publicKey);
      }
      fractal.ft.recoverSignedTx(txInfoObj, this.state.signResult).then(address => {
        if (address == this.state.signAddr) {
          Message.error(T('验证通过'));
        } else {
          Message.error(T('验证失败'));
        }
      })
    } catch (error) {
      Message.error(error.message || error);
    }
  };

  encryptoInfo = () => {
    try {
      if (utils.isEmptyObj(this.state.cryptoInfo)) {
        Message.error(T('请输入待加密的信息'));
        return;
      }
      const publicKey = EthCrypto.publicKeyByPrivateKey(this.state.msgContent);
      EthCrypto.encryptWithPublicKey(publicKey, this.state.cryptoInfo).then(encryptedInfo => {
        this.setState({cryptoResult: JSON.stringify(encryptedInfo)});        
      }).catch(error => {
        Message.error(error.message || error);
      });
    } catch (error) {
      Message.error(error.message || error);
    }
  };

  decryptoInfo = () => {
    try {
      if (utils.isEmptyObj(this.state.cryptoInfo)) {
        Message.error(T('请输入待解密的信息'));
        return;
      }
      EthCrypto.decryptWithPrivateKey(this.state.msgContent, JSON.parse(this.state.cryptoInfo)).then(plaintext => {
        this.setState({cryptoResult: plaintext.toString()});
      }).catch(error => {
        Message.error(error.message || error);
      });
    } catch (error) {
      Message.error(error.message || error);
    }
  };

  modifyPwd = (index) => {
    if (!this.hasKeyStoreFile()) {
      Message.error(T('无密码可修改'));
      return;
    }
    this.setState({
      newPwdDialogVisible: true,
    });
  };

  exportPriKey = (index) => {
    this.state.method = ActionType.ExportPrivateKey;
    this.state.curData = this.state.dataSource[index];
    this.setState({
      pwdDialogVisible: true,
    });
  };
  exportMnemonic = (index) => {
    this.state.method = ActionType.ExportMnemonic;
    this.state.curData = this.state.dataSource[index];
    this.setState({
      pwdDialogVisible: true,
    });
  }
  exportKeyStore = (index) => {
    this.state.method = ActionType.ExportKeyStoreInfo;
    this.state.curData = this.state.dataSource[index];
    this.setState({
      pwdDialogVisible: true,
    });
  }
  setDefaultAddr = (index) => {    
    global.localStorage.setItem(Constant.DefaultSelfAddress,'0x' + this.state.dataSource[index].address);
    Message.success('设置成功，默认地址为：' + global.localStorage.getItem(Constant.DefaultSelfAddress));
  }
  renderOperation = (value, index) => {
    const keyInfoObj = this.state.dataSource[index];
    if (keyInfoObj.bip32path == T(NonMnemonicGenerate)) {
      return (
        <view>
          <Button type="primary" onClick={this.exportPriKey.bind(this, index)}>
            {T('导出私钥')}
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.exportKeyStore.bind(this, index)}>
          {T('导出keystore')}
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.deleteItem.bind(this, index)}>
          {T('删除')}
          </Button>
          <p /><p />
          <Button type="primary" onClick={this.signTx.bind(this, index)}>
          {T('签名/验签')}
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.cryptoInfo.bind(this, index)}>
          {T('加密/解密')}
          </Button>
        </view>
      );
    } else {
      return (
        <view>
          <Button type="primary" onClick={this.exportPriKey.bind(this, index)}>
          {T('导出私钥')}
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.exportMnemonic.bind(this, index)}>
          {T('导出助记词')}
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.exportKeyStore.bind(this, index)}>
          {T('导出keystore')}
          </Button>
          <p /><p />
          <Button type="primary" onClick={this.deleteItem.bind(this, index)}>
          {T('删除')}
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.signTx.bind(this, index)}>
          {T('签名/验签')}
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.cryptoInfo.bind(this, index)}>
          {T('加密/解密')}
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.setDefaultAddr.bind(this, index)}>
          {T('设为默认地址')}
          </Button>
        </view>
      );
    }
  };

  changeDataSource = (index, valueKey, value) => {
    this.state.dataSource[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };
  checkHasDupWord = (mnemonicWords) => {
    const mnemonicWordList = mnemonicWords.split(' ');
    let obj = {};
    for (let i = 0; i < mnemonicWordList.length; i++) {
      const word = mnemonicWordList[i];
      if (Object.prototype.hasOwnProperty.call(obj, word)) {
        return true;
      }
      obj[word] = true;
    }
    return false;
  }
  addNewItem = () => {
    const keystoreInfo = utils.getDataFromFile(Constant.KeyStoreFile);
    if (keystoreInfo == null) {
      let entropy = ethers.utils.randomBytes(16);
      let mnemonicTemp = ethers.utils.HDNode.entropyToMnemonic(entropy);
      while (this.checkHasDupWord(mnemonicTemp)) {
        entropy = ethers.utils.randomBytes(16);
        mnemonicTemp = ethers.utils.HDNode.entropyToMnemonic(entropy);
      }
      this.setState({
        mnemonicVisible: true,
        mnemonicWords: mnemonicTemp,
      });
    } else {
      this.setState({
        method: ActionType.CreateNewAccount,
        pwdDialogVisible: true,
      });
    }
  }

  hasKeyStoreFile = () => {
    const keystoreInfo = utils.getDataFromFile(Constant.KeyStoreFile);
    return keystoreInfo != null;
  }

  getKeyStoreFile = () => {
    const keystoreInfo = utils.getDataFromFile(Constant.KeyStoreFile);
    return keystoreInfo != null ? JSON.parse(keystoreInfo) : null;
  }

  importPrikey = () => {
    if (!this.hasKeyStoreFile()) {
      Message.prompt(T('初始化钱包后才能使用此功能。'));
      return;
    }
    
    this.state.method = ActionType.ImportPrivateKey;
    this.setState({
      pwdDialogVisible: true,
    });
  }

  importKeystore = () => {
    if (!this.hasKeyStoreFile()) {
      Message.prompt(T('初始化钱包后才能使用此功能。'));
      return;
    }
    this.state.method = ActionType.ImportKeystore;
    this.setState({
      pwdDialogVisible: true,
    });
  }

  importMnemonic = () => {
    if (!this.hasKeyStoreFile()) {      
      this.setState({
        importMnemonicDialogVisible: true,
      });
    } else {
      Message.prompt(T('无需再次初始化钱包'));
    }
  }


  errMsg = (errInfo) => {
    this.setState({
      msgTitle: T('错误信息'),
      msgVisible: true,
      msgContent: errInfo,
    });
  }
  getMnemonicIndex = () => {
    const keystoreInfo = utils.getDataFromFile(Constant.KeyStoreFile);
    if (keystoreInfo == null) {
      return 0;
    } else {
      return keystoreInfo.nextIndex;
    }
  }
  initKeyStoreFile = (initKeyInfo) => {
    let nextIndex = 1;
    if (Object.prototype.hasOwnProperty.call(initKeyInfo, 'x-ethers')) {
      const pathElements = initKeyInfo['x-ethers'].path.split('/');
      nextIndex = parseInt(pathElements[pathElements.length - 1]) + 1;
    }
    
    const keyList = [ initKeyInfo ];
    const keystoreInfo = { 'keyList': keyList, 'nextIndex': nextIndex };
    utils.storeDataToFile(Constant.KeyStoreFile, keystoreInfo);
  }
  checkHasDupAccount = (keystoreInfo, newKeyInfo) => {
    for(let i = 0; i < keystoreInfo.keyList.length; i++) {
      if (keystoreInfo.keyList[i].address === newKeyInfo.address) {
        return i;
      }
    }
    return -1;
  }
  addAccountToKeystoreFile = (keyInfo, repalceOldOne) => {
    const keystoreInfo = utils.getDataFromFile(Constant.KeyStoreFile);
    if (keystoreInfo == null) {
      this.initKeyStoreFile(keyInfo);
    } else {
      const dupIndex = this.checkHasDupAccount(keystoreInfo, keyInfo);
      if (dupIndex > -1) {
        if (repalceOldOne === true) {
          keystoreInfo.keyList.splice(dupIndex, 1);
        } else {
          Message.error(T('不可重复添加密钥'));
          return false;
        }
      }
      keystoreInfo.keyList.push(keyInfo);
      keystoreInfo.nextIndex += 1;
      utils.storeDataToFile(Constant.KeyStoreFile, keystoreInfo);
    }
    return true;
  }
  encryptWallet = (wallet, password, toastInfo, repalceOldOne) => {
    wallet.encrypt(password, null).then((ksInfoStr) => {
      const ksInfoObj = JSON.parse(ksInfoStr);
      console.log(ksInfoObj);
      const publicKey = EthCrypto.publicKeyByPrivateKey(wallet.privateKey);
      ksInfoObj['publicKey'] = utils.getPublicKeyWithPrefix(publicKey);

      if (this.addAccountToKeystoreFile(ksInfoObj, repalceOldOne)) {
        const bip32path = Object.prototype.hasOwnProperty.call(ksInfoObj, 'x-ethers') ? ksInfoObj['x-ethers'].path : T(NonMnemonicGenerate);
        const displayKeyObj = {'bip32path': bip32path, 'address': ksInfoObj.address, 'publicKey': ksInfoObj.publicKey};
        this.state.dataSource.push(displayKeyObj);

        this.setState({ dataSource: this.state.dataSource, 
          pwdDialogVisible: false, reMnemonicVisible: false, newPwdDialogVisible: false,
          importKeyDialogVisible: false, importMnemonicDialogVisible: false, importKeystoreDialogVisible: false,
          password: ConfusePwd, mnemonicWords: ConfuseMnemonic });
        if (toastInfo !== '') {
          Message.success(toastInfo);
        }
      }
      
    }).catch(error => {
      Message.error(error.message || error); 
      console.log(error.message);
    });
  }
  generateAccount = () => {
    const index = this.getMnemonicIndex();
    const path = MnemonicPath + index;
    //const hdNode = ethers.utils.HDNode.fromMnemonic(this.state.mnemonicWords, null, this.state.password).derivePath(path);
    const wallet = new ethers.Wallet.fromMnemonic(this.state.mnemonicWords, path, null);
    this.encryptWallet(wallet, this.state.password, T('创建成功'));
  }
  processAction = (filterFunc, toastStr, succssFunc) => {
    const keystoreInfo = utils.getDataFromFile(Constant.KeyStoreFile);
    const fractalKSInfo = keystoreInfo.keyList.filter(filterFunc);
    const ethersKSInfo = fractalKSInfo[0];

    if (toastStr !== '') {
      Message.success(toastStr);
    }
    ethers.Wallet.fromEncryptedJson(JSON.stringify(ethersKSInfo), this.state.password)
                 .then(succssFunc)
                 .catch (resp => { 
                    Message.error(resp.message || resp); 
                    console.log(resp.message);
                  });
  }
  getIndexOfFirstMnemonicAccount = () => {
    const keystoreInfo = utils.getDataFromFile(Constant.KeyStoreFile);
    for (const index = 0;  index < keystoreInfo.keyList.length; index++) {
      if(Object.prototype.hasOwnProperty(keystoreInfo.keyList[index], 'x-ethers')) {
        return index;
      }
    }
    return -1;
  }
  /**
   * 1: 没有任何账户
   * 2: 有账户，同时也有用非助记词方式生成的账户
   */
  onPwdOK = () => {
    if(!utils.checkPassword(this.state.password)) {
      Message.error(T('密码格式无效！'));
      return;
    }
    if (this.state.method === ActionType.CreateFirstAccountByMnemonic) {
      Message.success(T('创建中...'));
      this.generateAccount();
    } else if (this.state.method === ActionType.CreateNewAccount) {
      this.processAction((item, index) => index === 0, T('创建中...'), wallet => {
        //console.log(wallet);
        this.state.mnemonicWords = wallet.mnemonic;
        this.generateAccount();
      });
    } else if (this.state.method === ActionType.ExportPrivateKey) {
      this.processAction(item => item.address === this.state.curData.address, T('导出中...'), wallet => {
        Message.hide();
        this.state.msgContent = wallet.privateKey;
        this.setState( {msgVisible: true, msgTitle: T('私钥信息'), pwdDialogVisible: false} );
      });
    } else if (this.state.method === ActionType.ExportMnemonic) {
      this.processAction(item => item.address === this.state.curData.address, T('导出中...'), wallet => {
        Message.hide();
        this.state.msgContent = wallet.mnemonic;
        this.setState( {msgVisible: true, msgTitle: T('助记词信息'), pwdDialogVisible: false} );
      });
    } else if (this.state.method === ActionType.ExportKeyStoreInfo) {      
      this.processAction(item => item.address === this.state.curData.address, T('导出中...'), wallet => {
        Message.hide();
        const keystoreInfo = utils.getDataFromFile(Constant.KeyStoreFile);
        const fractalKSInfo = keystoreInfo.keyList.filter(item => item.address === this.state.curData.address);
        const ethersKSInfo = fractalKSInfo[0];
        delete ethersKSInfo['x-ethers'];
        this.state.msgContent = JSON.stringify(ethersKSInfo);
        this.setState( {msgVisible: true, msgTitle: T('KeyStore信息'), pwdDialogVisible: false} );
      });
    } else if (this.state.method === ActionType.DeleteAccount) {
      this.processAction(item => item.address === this.state.curData.address, T('删除中...'), wallet => {
        Message.hide();        
        const address = this.state.curData.address;
        const keystoreInfoObj = utils.getDataFromFile(Constant.KeyStoreFile);
        keystoreInfoObj.keyList = keystoreInfoObj.keyList.filter(item => item.address !== address);
        if (keystoreInfoObj.keyList.length == 0) {
          utils.removeDataFromFile(Constant.KeyStoreFile);
        } else {
          utils.storeDataToFile(Constant.KeyStoreFile, keystoreInfoObj);
        }
        this.state.dataSource.splice(this.state.curDataIndex, 1);
        this.setState({ dataSource: this.state.dataSource, pwdDialogVisible: false });
      });
    } else if (this.state.method === ActionType.ImportKeystore) {
      this.processAction((item, index) => index === 0, T('密码验证中'), wallet => {
        Message.hide();
        this.setState({
          importKeystoreDialogVisible: true,
          pwdDialogVisible: false,
        });
      });
    } else if (this.state.method === ActionType.ImportPrivateKey) {
      this.processAction((item, index) => index === 0, T('密码验证中'), wallet => {
        Message.hide();
        this.setState({
          importKeyDialogVisible: true,
          pwdDialogVisible: false,
        });
      });
    } else if (this.state.method === ActionType.SignTxInfo) {
      this.processAction(item => item.address === this.state.curData.address, T('密码验证中'), wallet => {
        Message.hide();
        this.state.msgContent = wallet.privateKey;
        this.setState({
          signVisible: true,
          pwdDialogVisible: false,
        });
      });
    } else if (this.state.method === ActionType.CryptoInfo) {
      this.processAction(item => item.address === this.state.curData.address, T('密码验证中'), wallet => {
        Message.hide();
        this.state.msgContent = wallet.privateKey;
        this.setState({
          cryptoVisible: true,
          pwdDialogVisible: false,
        });
      });
    }
  };

  onClose = () => {
    this.setState({
      pwdDialogVisible: false,
    });
  };

  onMsgClose = () => {
    this.setState({
      msgVisible: false,
    });
  };

  onChangePwdOK = async () => {
    const { password, newPassword, newPasswordConfirm } = this.state;
    if (!utils.checkPassword(password) || !utils.checkPassword(newPassword) || !utils.checkPassword(newPasswordConfirm)) {
      Message.error(T(pwdPlaceholder));
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      Message.error(T('新密码不一致，请重新输入'));
      return;
    }
    this.processAction((item, index) => index === 0, T('原密码验证中...'), async wallet => {
      Message.success(T('原密码验证通过，开始修改密码...'));
      this.state.dataSource = [];
      const keystoreInfoObj = utils.getDataFromFile(Constant.KeyStoreFile);
      const keyList = keystoreInfoObj.keyList;
      const wallets = [];
      let count = 1;
      for (let keystoreInfo of keyList) {
        const wallet = await ethers.Wallet.fromEncryptedJson(JSON.stringify(keystoreInfo), password);
        wallets.push(wallet);
        Message.success(T('用原密码解密中:' + count++));
      }
      count = 1;
      const ksInfoObjs = [];
      for (let wallet of wallets) {
        const ksInfoStr = await wallet.encrypt(newPassword, null);
        const ksInfoObj = JSON.parse(ksInfoStr);
        const publicKey = EthCrypto.publicKeyByPrivateKey(wallet.privateKey);
        ksInfoObj['publicKey'] = utils.getPublicKeyWithPrefix(publicKey);
        ksInfoObjs.push(ksInfoObj);
        Message.success(T('用新密码加密中:' + count++));
      }

      Message.success(T('开始更新文件'));
      ksInfoObjs.map(ksInfoObj => {
        if (this.addAccountToKeystoreFile(ksInfoObj, true)) {
          const bip32path = Object.prototype.hasOwnProperty.call(ksInfoObj, 'x-ethers') ? ksInfoObj['x-ethers'].path : T(NonMnemonicGenerate);
          const displayKeyObj = {'bip32path': bip32path, 'address': ksInfoObj.address, 'publicKey': ksInfoObj.publicKey};
          this.state.dataSource.push(displayKeyObj);
  
          this.setState({ dataSource: this.state.dataSource, 
            pwdDialogVisible: false, reMnemonicVisible: false, newPwdDialogVisible: false,
            importKeyDialogVisible: false, importMnemonicDialogVisible: false, importKeystoreDialogVisible: false,
            password: ConfusePwd, mnemonicWords: ConfuseMnemonic });
        }
      });
      Message.success(T('密码更新结束'));
    });
  };

  onChangePwdClose = () => {
    this.setState({
      newPwdDialogVisible: false,
    });
  };

  onImportKeyOK = () => {
    const { privateKey, password } = this.state;
    if (!ethUtil.isValidPrivate(Buffer.from(utils.hex2Bytes(privateKey)))) {
      Message.error(T('无效私钥！'));
      return;
    }
    let wallet = new ethers.Wallet(privateKey);
    //const publicKey = '0x' + EthCrypto.publicKeyByPrivateKey(privateKey);
    Message.success(T('开始导入'));
    this.encryptWallet(wallet, password, T('导入成功'));
  };

  onImportKeyClose = () => {
    this.setState({
      importKeyDialogVisible: false,
    });
  };

  onImportMnemonicOK = () => {
    let { mnemonicWords, bip32path, password } = this.state;
    const mnemonicWordList = mnemonicWords.trim().split(' ');
    if (mnemonicWordList.length !== 12) {
      Message.error(T('请输入12个助记词，以空格隔开！'));
      return;
    }
    if (bip32path === '') {
      bip32path = MnemonicPath + '0';
    }
    if (bip32path.indexOf(MnemonicPath) !== 0) {
      Message.error(T('助记词路径必须以') + MnemonicPath + T('开头！'));
      return;
    }
    if(!utils.checkPassword(password)) {
      Message.error(T('密码必须由数字加字母组成，不少于8位'));
      return;
    }
    const wallet = new ethers.Wallet.fromMnemonic(mnemonicWords, bip32path, null);
    this.encryptWallet(wallet, password, T('创建成功'));
  }

  onImportMnemonicClose = () => {
    this.setState({
      importMnemonicDialogVisible: false,
    });
  }
  
  onImportKeystoreOK = () => {
    const { keystoreInfo, keystorePassword } = this.state;
    if (keystoreInfo === '' || keystorePassword === '') {
      Message.error(T('Keystore信息及其密码不能为空！'));
      return;
    }
    const successFunc = (wallet) => {
      this.encryptWallet(wallet, this.state.password, T('导入成功'));
    };
    Message.success(T('开始导入...'));
    const wallet = ethers.Wallet.fromEncryptedJson(keystoreInfo, keystorePassword)
                  .then(successFunc)
                  .catch (resp => { 
                      Message.error(resp.message || resp); 
                      console.log(resp.message);
                    });
  }

  onImportKeystoreClose = () => {
    this.setState({
      importKeystoreDialogVisible: false,
    });
  }

  handleKeystoreChange(v) {
    this.state.keystoreInfo = v;
  }

  handleKeystorePasswordChange(v) {
    this.state.keystorePassword = v;
  }

  handlePasswordChange(v) {
    this.state.password = v;
  }

  handleNewPasswordChange(v) {
    this.state.newPassword = v;
  }

  handleNewPasswordConfirmChange(v) {
    this.state.newPasswordConfirm = v;
  }

  handlePrivateKeyChange(v) {
    this.state.privateKey = v;
  }

  handleMnemonicChange(v) {
    this.state.mnemonicWords = v;
  }

  handleBip32PathChange(v) {
    this.state.bip32path = v;
  }

  onTxInfoChange(v) {
    this.state.txInfo = v;
  }

  onCryptoInfoChange(v) {
    this.state.cryptoInfo = v;
  }

  onCryptoResultChange(v) {
    this.setState({cryptoResult: v});
  }
  onSignResultChange(v) {
    this.setState({signResult: v});
  }

  onSignAddrChange(v) {
    this.state.signAddr = v;
  }

  onSignClose = () => {
    this.setState({signVisible: false});
  }

  onCryptoClose = () => {
    this.setState({cryptoVisible: false});
  }

  onChainIdClose = () => {
    this.setState({chainIdVisible: false});
  }

  onChangeChainId = (chainId) => {
    fractal.ft.setChainId(chainId);
    this.loadKeyInfo();
  }

  onTagChange = (word, checked) => {
    if (this.state.reMnemonicWords.indexOf(word) < 0) {
      this.state.reMnemonicWords += word + ' ';
    } else {
      this.state.reMnemonicWords = this.state.reMnemonicWords.replace(word + ' ', '');
    }
    this.setState({reMnemonicWords : this.state.reMnemonicWords});
  }

  getChaosWordList = (wordList) => {
    let chaosWordList = [];
    let length = wordList.length;
    while (length > 1) {
      const randomIndex = Math.floor(Math.random() * length);
      chaosWordList.push(wordList[randomIndex]);
      wordList = wordList.filter(item => item !== wordList[randomIndex]);
      length = wordList.length;
    }
    chaosWordList.push(wordList[0]);
    return chaosWordList;
  }
  onMnemonicOK = () => {
    const wordList = this.state.mnemonicWords.split(' ');
    const chaosWordList = this.getChaosWordList(wordList);
    this.state.mnemonicWordTagList = [];
    for (let i = 0; i < chaosWordList.length; i++) {
      this.state.mnemonicWordTagList.push(
        <SelectableTag type="primary" onChange={this.onTagChange.bind(this, chaosWordList[i])}>
          {chaosWordList[i]}
        </SelectableTag>
      );
      if ((i + 1) % 4 == 0) {
        this.state.mnemonicWordTagList.push(<br/>);
      }
    }
    this.state.reMnemonicWords = '';
    this.setState({
      mnemonicVisible: false,
      reMnemonicVisible: true,
    });
  }

  onMnemonicClose = () => {
    this.setState({
      mnemonicVisible: false,
    });
  }
  handleReMnemonicChange(v) {
    this.state.reMnemonic = v;
  }

  onReMnemonicOK = () => {
    if (this.state.reMnemonicWords.trim() === this.state.mnemonicWords.trim()) {
      this.state.method = ActionType.CreateFirstAccountByMnemonic;
      this.setState({
        pwdDialogVisible: true,
      });
    } else {
      Message.error(T('输入有误'));
    }
  }
  onBackToMnemonic = () => {
    this.setState({
      mnemonicVisible: true,
      reMnemonicVisible: false,
    });
  }

  onReMnemonicClose = () => {
    this.setState({
      reMnemonicVisible: false,
    });
  }
  render() {
    const footerOne = (
      <a onClick={this.onMnemonicOK} href="javascript:;">
        {T('下一步')}
      </a>
    );
    const footerTwo = (
      <div>
        <a onClick={this.onBackToMnemonic.bind(this)} href="javascript:;">
        {T('上一步')}
        </a>
        &nbsp;&nbsp;
        <a onClick={this.onReMnemonicOK.bind(this)} href="javascript:;">
        {T('下一步')}
        </a>
      </div>
    );
    const signFooter = (
      <div>
        <Button type="primary" onClick={this.signTxInfo.bind(this)} href="javascript:;">
        {T('获取签名')}
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" onClick={this.verifySignInfo.bind(this)} href="javascript:;">
        {T('验证签名')}
        </Button>
        &nbsp;&nbsp;
      </div>
    );
    const cryptoFooter = (
      <div>
        <Button type="primary" onClick={this.encryptoInfo.bind(this)} href="javascript:;">
        {T('加密')}
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" onClick={this.decryptoInfo.bind(this)} href="javascript:;">
        {T('解密')}
        </Button>
        &nbsp;&nbsp;
      </div>
    );
    return (
      <div className="editable-table">
        <IceContainer>
          <Table dataSource={this.state.dataSource} hasBorder={false}>
            <Table.Column width={40} title="ID" cell={this.renderOrder} />
            <Table.Column
              width={120}
              title={T("公钥")}
              dataIndex="publicKey"
              cell={this.renderPublicKey.bind(this)}
            />
            <Table.Column
              width={120}
              title={T("地址")}
              dataIndex="address"
              cell={this.renderAddress}
            />
            <Table.Column
              width={120}
              title={T("生成路径")}
              dataIndex="bip32path"
            />
            <Table.Column title="操作" width={300} cell={this.renderOperation.bind(this)} />
          </Table>
          <div onClick={this.addNewItem} style={styles.addNewItem}>
            + {T('初始化钱包/新增一对公私钥')}
          </div>
          <div onClick={this.importMnemonic} style={styles.addNewItem}>
            + {T('通过导入助记词初始化钱包')}
          </div>
          <div onClick={this.importPrikey} style={styles.addNewItem}>
            + {T('直接导入私钥')}
          </div>
          <div onClick={this.importKeystore} style={styles.addNewItem}>
            + {T('通过keystore导入私钥')}
          </div>
          <div onClick={this.modifyPwd} style={styles.addNewItem}>
            * {T('修改密码')}
          </div>
        </IceContainer>
        <Dialog
          visible={this.state.pwdDialogVisible}
          onOk={this.onPwdOK.bind(this)}
          onCancel={this.onClose}
          onClose={this.onClose}
          title={T("输入钱包密码")}
          footerAlign="center"
        >
          <Input hasClear autoFocus
            htmlType="password"
            onChange={this.handlePasswordChange.bind(this)}
            style={{ width: 400 }}
            addonBefore={T("密码")}
            placeholder={T(pwdPlaceholder)}
            size="medium"
            defaultValue=""
            maxLength={20}
            hasLimitHint
            onPressEnter={this.onPwdOK.bind(this)}
          />
        </Dialog>
        <Dialog
          visible={this.state.msgVisible}
          title={this.state.msgTitle != null ? this.state.msgTitle : T('通知')}
          footerActions={['ok']}
          footerAlign="center"
          closeable={true}
          onOk={this.onMsgClose}
          onCancel={this.onMsgClose}
          onClose={this.onMsgClose}
        >
          <Input.TextArea autoHeight
            readOnly
            value={this.state.msgContent}
          />
        </Dialog>
        <Dialog
          visible={this.state.newPwdDialogVisible}
          onOk={this.onChangePwdOK}
          onCancel={this.onChangePwdClose}
          onClose={this.onChangePwdClose}
          title={T("修改钱包密码")}
          footerAlign="center"
        >
          <Input hasClear
            htmlType="password"
            onChange={this.handlePasswordChange.bind(this)}
            style={{ width: 400 }}
            addonBefore={T("旧密码")}
            placeholder={T(pwdPlaceholder)}
            size="medium"
            defaultValue=""
            maxLength={20}
            hasLimitHint
            onPressEnter={this.onChangePwdOK}
          />
          <p />
          <p />
          <Input hasClear
            htmlType="password"
            onChange={this.handleNewPasswordChange.bind(this)}
            style={{ width: 400 }}
            addonBefore={T("新密码")}
            placeholder={T(pwdPlaceholder)}
            size="medium"
            defaultValue=""
            maxLength={20}
            hasLimitHint
            onPressEnter={this.onChangePwdOK}
          />
          <p />
          <p />
          <Input hasClear
            htmlType="password"
            onChange={this.handleNewPasswordConfirmChange.bind(this)}
            style={{ width: 400 }}
            addonBefore={T("新密码确认")}
            placeholder={T(pwdPlaceholder)}
            size="medium"
            defaultValue=""
            maxLength={20}
            hasLimitHint
            onPressEnter={this.onChangePwdOK}
          />
        </Dialog>
        <Dialog
          visible={this.state.importKeyDialogVisible}
          onOk={this.onImportKeyOK}
          onCancel={this.onImportKeyClose}
          onClose={this.onImportKeyClose}
          title={T("导入私钥")}
          footerAlign="center"
        >
          <Input hasClear
            onChange={this.handlePrivateKeyChange.bind(this)}
            style={{ width: 400 }}
            addonBefore={T("私钥")}
            placeholder={T("需包含0x前缀")}
            size="medium"
            defaultValue=""
            maxLength={66}
            hasLimitHint
            onPressEnter={this.onImportKeyOK}
          />
        </Dialog>
        <Dialog
          visible={this.state.importMnemonicDialogVisible}
          onOk={this.onImportMnemonicOK}
          onCancel={this.onImportMnemonicClose}
          onClose={this.onImportMnemonicClose}
          title={T("导入助记词")}
          footerAlign="center"
        >
          <Input.TextArea hasClear autoHeight
            onChange={this.handleMnemonicChange.bind(this)}
            style={{ width: 500 }}
            addonBefore={T("助记词")}
            placeholder={T("输入助记词，用空格隔开")}
            size="medium"
            defaultValue=''
            onPressEnter={this.onImportMnemonicOK}
          />
          <p />
          <p />
          <Input hasClear
            onChange={this.handleBip32PathChange.bind(this)}
            style={{ width: 500 }}
            addonBefore={T("助记词生成路径")}
            size="medium"
            defaultValue={MnemonicPath + '0'}
            hasLimitHint
            onPressEnter={this.onImportMnemonicOK}
          />
          <p />
          <p />
          <Input hasClear
            htmlType="password"
            onChange={this.handlePasswordChange.bind(this)}
            style={{ width: 500 }}
            addonBefore={T("密码")}
            placeholder={T("此密码将作为钱包密码，由数字加字母组成，不少于8位")}
            size="medium"
            defaultValue=""
            maxLength={20}
            hasLimitHint
            onPressEnter={this.onImportMnemonicOK}
          />
        </Dialog>
        <Dialog
          visible={this.state.importKeystoreDialogVisible}
          onOk={this.onImportKeystoreOK}
          onCancel={this.onImportKeystoreClose}
          onClose={this.onImportKeystoreClose}
          title={T("导入Keystore信息")}
          footerAlign="center"
        >
          <Input.TextArea hasClear autoHeight={{minRows: 3, maxRows: 5}}
            onChange={this.handleKeystoreChange.bind(this)}
            style={{ width: 500 }}
            placeholder={T("Keystore信息")}
            size="medium"
            defaultValue=''
            onPressEnter={this.onImportKeystoreOK}
          />
          <p />
          <p />
          <Input hasClear
            htmlType="password"
            onChange={this.handleKeystorePasswordChange.bind(this)}
            style={{ width: 500 }}
            addonBefore={T("密码")}
            placeholder={T("此密码为keystore绑定密码，非本地钱包密码")}
            size="medium"
            defaultValue=""
            maxLength={20}
            hasLimitHint
            onPressEnter={this.onImportKeystoreOK}
          />
          <p />
          {T("此Keystore信息导入后，将会由本地钱包重新加密成新的keystore保存，但私钥会保持一致")}
        </Dialog>
        <Dialog
          visible={this.state.mnemonicVisible}
          title={T("助记词")}
          footer={footerOne}
          footerAlign="right"
          closeable={true}
          onCancel={this.onMnemonicClose}
          onClose={this.onMnemonicClose}
        >
          <Input.TextArea autoHeight
            readOnly
            value={this.state.mnemonicWords}
          />
          <p />
          {T("此处请务必保存好助记词")}
        </Dialog>
        <Dialog
          visible={this.state.reMnemonicVisible}
          title={T("请输入上一步显示的助记词(顺序必须一致)")}
          footer={footerTwo}
          footerAlign="right"
          closeable={true}
          onCancel={this.onReMnemonicClose}
          onClose={this.onReMnemonicClose}
        >
          <Input.TextArea autoHeight={{minRows: 3, maxRows: 5}}
            readOnly
            style={{ width: 350 }}
            rows='4'
            value={this.state.reMnemonicWords}
          />
          <p />
          <TagGroup>{this.state.mnemonicWordTagList}</TagGroup>
        </Dialog>
        <Dialog
          visible={this.state.signVisible}
          title={T("签名/验签交易")}
          footer={signFooter}
          footerAlign="center"
          closeable={true}
          onCancel={this.onSignClose}
          onClose={this.onSignClose}
        >
          <Input.TextArea autoHeight={{minRows: 5, maxRows: 8}}
            placeholder={T("待签名信息")}
            style={{ width: 350 }}
            onChange={this.onTxInfoChange.bind(this)}
          />
          <p />
          <p />
          <Input hasClear
            style={{ width: 350 }}
            addonBefore={T("签名结果")}
            size="medium"
            value={this.state.signResult}
            onChange={this.onSignResultChange.bind(this)}
          />
          <p />
          <p />
          <Input hasClear
            style={{ width: 350 }}
            addonBefore={T("待比较地址")}
            placeholder={T("验证签名时可填写")}
            size="medium"
            onChange={this.onSignAddrChange.bind(this)}
          />
        </Dialog>
        <Dialog
          visible={this.state.cryptoVisible}
          title={T("加/解密信息")}
          footer={cryptoFooter}
          footerAlign="center"
          closeable={true}
          onCancel={this.onCryptoClose}
          onClose={this.onCryptoClose}
        >
          <Input.TextArea hasClear
            addonBefore={T("加/解密信息")}
            style={{ width: 350 }}
            autoHeight={{minRows: 5, maxRows: 8}}
            onChange={this.onCryptoInfoChange.bind(this)}
          />
          <p />
          <p />
          <Input.TextArea hasClear
            style={{ width: 350 }}
            addonBefore={T("加/解密结果")}
            size="medium"
            autoHeight={{minRows: 3, maxRows: 5}}
            value={this.state.cryptoResult}
            onChange={this.onCryptoResultChange.bind(this)}
          />
        </Dialog>
        <Dialog
          visible={this.state.chainIdVisible}
          title={T("选择ChainId")}
          footerAlign="center"
          closeable={true}
          onOk={this.onChainIdClose}
          onCancel={this.onChainIdClose}
          onClose={this.onChainIdClose}
        >
          <Select
            style={{ width: 400 }}
            placeholder={T("请选择ChainId")}
            onChange={this.onChangeChainId.bind(this)}
            dataSource={this.state.chainIds}
          />
        </Dialog>
      </div>
    );
  }
}

const styles = {
  addNewItem: {
    background: '#F5F5F5',
    height: 32,
    lineHeight: '32px',
    marginTop: 20,
    cursor: 'pointer',
    textAlign: 'center',
  },
};
