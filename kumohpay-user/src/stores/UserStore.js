import { observable, action } from 'mobx';
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
}
export default  UserStore = UserStore.getInstance()