import { ArrowForwardIos } from "@mui/icons-material";
import React, { useState } from "react";
import "./Login.css";
import { auth, provider } from "../firebase";

// 2.38 까지 들음
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    auth.signInWithPopup(provider).catch((e) => alert(e.message));
    console.log(auth);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
      })
      .catch((e) => alert(e.message));
    setEmail("");
    setPassword("");
  };
  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          console.log(auth);
        }
      })
      .catch((e) => alert(e.message));
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-logo">
          <img src="./images/login.png" alt="" />
        </div>
        <div className="login-desc">
          <p>로그로그로그인</p>
          <h3>리액트 연습 로그인 페이지</h3>
        </div>
        <div className="login-auth">
          <div className="login-authOptions">
            <div className="login-authOption">
              <img
                className="login-googleAuth"
                src="./images/google.png"
                alt=""
              />
              <p onClick={signIn}>구글 아이디로 로그인</p>
            </div>
            <div className="login-authOption">
              <img
                className="login-googleAuth"
                src="./images/facebook.png"
                alt=""
              />
              <p>페이스북 아이디로 로그인</p>
            </div>
            <div className="login-authDesc">
              <p>
                <span className="text-blue-600 cursor-pointer">
                  이메일로 회원가입
                </span>
                시 본사의{" "}
                <p>
                  <span className="text-blue-600 cursor-pointer">
                    개인정보정책
                  </span>
                </p>
                과{" "}
                <span className="text-blue-600 cursor-pointer">
                  서비스 제공 정책
                </span>
                에 동의하는 것으로 간주합니다
              </p>
            </div>
          </div>
          <div className="login-emailPass">
            <div className="login-label">
              <h4>로그인</h4>
            </div>
            <div className="login-inputFields">
              <div className="login-inputField">
                <input
                  type="text"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login-inputField">
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-forgButt">
                <small>비밀번호 찾기</small>
                <button type="submit" onClick={handleLogin}>
                  로그인
                </button>
              </div>
              <button className="login-btn" onClick={handleRegister}>
                회원가입
              </button>
            </div>
          </div>
        </div>
        <div className="login-lang">
          <p>언어 설정</p>
          <ArrowForwardIos fontSize="small" />
        </div>
        <div className="login-footer">
          <p>About</p>
          <p>오시는길</p>
          <p>비지니스문의</p>
          <p>근성과끈기</p>
          <p>만드는중</p>
          <p>&copy; 쿼라 클론코딩</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
