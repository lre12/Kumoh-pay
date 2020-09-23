import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { post } from 'axios';

const Login = ({ setHasCookie }) => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const loginApi = async ()=> {
    const url = '/app/auth/login';
    let res;
   await post(url,{
      id : userId,
      pwd : userPw,
    }).then(function (response) {
      res = response;
      console.log(response);
    })
    return res;
  }
  
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !userPw) {
      return;
    }
    try {
      const response = await loginApi();
      console.log(response);
      if (response.data.result === 'ok') {
        setHasCookie(true);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      alert('로그인에 실패했습니다.');
      setUserId('');
      setUserPw('');
      console.error('login error', err);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="user_id"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="id"
        />
        <input
          type="password"
          name="user_pw"
          value={userPw}
          onChange={e => setUserPw(e.target.value)}
          placeholder="pw"
        />
        <button
          type="submit"
        >
          Login
</button>
      </form>
      <Link
        to="/join"
      >
        회원가입
</Link>
    </div>
  );
};
export default Login;