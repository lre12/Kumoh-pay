import { action, observable } from 'mobx';
import {createContext} from "react";
import { post, get } from 'axios';

class UserStore{

  static instance = null;
  static getInstance () {
    if (!UserStore.instance) 
      this.instance = new UserStore();
    return UserStore.instance;
  }
  constructor(){
    this.context = createContext(this)
  }
  
  @action 
  loginApi = async (userId, userPw) => {
    const url = '/app/auth/login';
    let res;
    await post(url, {
      id: userId,
      pwd: userPw,
    }).then(function (response) {
      res = response;
      console.log(response);
    })
    return res;
  }

  @action
  getInfoApi = (signal) => {
    return new Promise((resolve, reject) => {
      console.log("signal");
      console.log(signal.aborted);
      fetch('/app/info', {
        signal: signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => resolve(res.json()))
        .catch(err => reject(err));
    });
  };

  @action
  changeInfoApi = async (id, pwd)=>{
    const url = '/app/info/update';
        let res;
       await post(url,{
          id : id,
          pwd : pwd
        }).then(function (response) {
          res = response;
          console.log(response);
        })
        return res;
  }

  @action
  createUserApi = async (userId,userPw,userName,authNumber)=> {
    const url = '/app/auth/new';
    let res;
   await post(url,{
      id : userId,
      pwd : userPw,
      name : userName,
      ranNum : authNumber,
    }).then(function (response) {
      res = response;
      console.log(response);
    })
    return res;
  }

  @action
  sendMail = async (userMail, userId)=> {
    const url = '/app/auth/mail';
    let res;
   await post(url,{
      mail : userMail,
      id : userId,
    }).then(function (response) {
      res = response;
      console.log(response);
    })
    return res;
  }

  @action
  walletEnroll =  async (userID)=>{
    const url = '/wallet/users'
    let res;
    console.log(userID)
    await post(url,{
      "username" : userID,
      "orgName" : "Org1",
    }).then(function (response) {
      res = response;
      console.log(res.data.token);
    })
    return res;
  }

  @action
  walletLogin= async (userID)=>{
    const url = '/wallet/users/login'
    let res;
    await post(url,{
      username : userID,
      orgName : "Org1",
    }).then(function (response) {
      res = response;
      console.log(response);
    })
    return res;
  }

  @action
  walletPost = async (fcn, args) => {
    const url = '/wallet/channels/:mychannel/chaincodes/:kit_pay'
    let res;
    await post(url,{
      peers : ["peer0.org1.example.com", "peer0.org2.example.com"],
      fcn : fcn,
      args : args,
      transient : 'transient',
    }).then(function (response) {
      res = response;
      console.log(response.data.token);
    })
    return res;
  }

  @action
  walletGet = async (fcn, args) => {
    const url = '/wallet/channels/mychannel/chaincodes/kit_pay'
    let res;
    await get(url,{
      params: { 
        peers : ["peer0.org1.example.com", "peer0.org2.example.com"],
        fcn : fcn,
        args : args ,
      }
    }).then(function (response) {
      res = response;
      console.log(response);
    })
    return res;
  }
}
export default  UserStore = UserStore.getInstance()