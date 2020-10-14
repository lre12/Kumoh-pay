import { action } from 'mobx';
import {createContext} from "react";
import { post } from 'axios';

class Store{
  static instance = null;

  static getInstance () {
    if (!Store.instance) 
      this.instance = new Store();
    return Store.instance;
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
export default Store = Store.getInstance()