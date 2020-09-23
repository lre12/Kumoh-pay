import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { post } from 'axios';


const Join = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userName, setUserName] = useState('');
    const [isJoinSuccess, setJoinSuccess] = useState(false);
    const createUserApi = async ()=> {
        const url = '/app/auth/new';
        let res;
       await post(url,{
          id : userId,
          pwd : userPw,
          name : userName,
        }).then(function (response) {
          res = response;
          console.log(response);
        })
        return res;
      }
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUserApi({
                user_id: userId,
                user_pw: userPw,
                user_name: userName
            });
            console.log(response.data.result);
            if (response.data.result === 'ok') {
                setJoinSuccess(true);
            }
        } catch (err) {
            console.error('login error', err);
            alert('회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.')
        }
    };
    return (
        <div>
            {!isJoinSuccess && (
                <>
                    <h2>Join</h2>
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
                        <input
                            type="text"
                            name="user_name"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="name"
                        />
                        <button
                            type="submit"
                        >
                            제출
</button>
                    </form>
                </>
            )}
            {isJoinSuccess && (
                <div>
                    <p>회원가입을 축하합니다!</p>
                    <Link to="/login">로그인</Link>
                </div>
            )}
        </div>
    );
};
export default Join;
