import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import UserStore from '../stores/UserStore'


const Join = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userName, setUserName] = useState('');
    const [isJoinSuccess, setJoinSuccess] = useState(false);
    const userStore = useContext(UserStore.context)
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userStore.createUserApi(userId,userPw,userName);
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
