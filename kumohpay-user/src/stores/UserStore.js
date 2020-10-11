import { action } from 'mobx';
import {createContext} from "react";
import { post } from 'axios';

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
  sendMail = async (userMail)=> {
    const url = '/app/auth/mail';
    let res;
   await post(url,{
      mail : userMail,
    }).then(function (response) {
      res = response;
      console.log(response);
    })
    return res;
  }
}
export default  UserStore = UserStore.getInstance()