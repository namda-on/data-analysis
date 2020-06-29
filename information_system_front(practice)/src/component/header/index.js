import React, { useState } from "react";
import Modal from "../modal";
import { useCookies } from "react-cookie";

import * as S from "./styles";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const [LoginModal, setLoginModal] = useState(false);
  const [JoinModal, setJoinModal] = useState(false);

  const [LoginForm, setLoginForm] = useState({
    id: "",
    pw: "",
  });

  const [JoinForm, setJoinForm] = useState({
    id: "",
    pw: "",
    name: "",
    account: "",
    address: "",
  });

  console.log(cookies.login);
  const Join = async () => {
    if (
      !JoinForm.id ||
      !JoinForm.pw ||
      !JoinForm.name ||
      !JoinForm.account ||
      !JoinForm.address
    ) {
      alert("모든 정보를 입력해주세요");
      return;
    }
    const response = await fetch("http://localhost:4001/customer/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JoinForm),
    });
    console.log(JoinForm);

    if (response.ok) {
      alert("가입이 완료되었습니다.");
      window.location.reload();
      return;
    }
    const { error } = await response.json();
    console.log(error);
    alert("중복된 아이디 입니다.");
  };

  const login = async () => {
    if (!LoginForm.id || !LoginForm.pw) {
      alert("아이디와 패스워드를 입력하세요");
      return;
    }

    const response = await fetch("http://localhost:4001/customer/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LoginForm),
    });

    if (response.ok) {
      window.location.reload();
      return;
    }

    const { error } = await response.json();
    console.log(error);
    alert("아이디와 비밀번호를 확인해주세요.");
  };

  const logout = async () => {
    const response = await fetch("http://localhost:4001/customer/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      window.location.reload();
      return;
    }

    alert("로그아웃 되었습니다.");
  };

  const updateLoginInput = (val) => (e) => {
    setLoginForm({
      ...LoginForm,
      [`${val}`]: e.target.value,
    });
  };

  const updateJoinInput = (val) => (e) => {
    setJoinForm({
      ...JoinForm,
      [`${val}`]: e.target.value,
    });
  };

  const toggleModal = () => setLoginModal(!LoginModal);

  const toggleModal2 = () => setJoinModal(!JoinModal);

  return (
    <>
      <S.Header>
        <S.Title>
          <a href="/">스우시</a>
        </S.Title>
        <S.JoinButton onClick={toggleModal2}>회원가입</S.JoinButton>
        {!cookies.login ? (
          <S.LoginButton onClick={toggleModal}>로그인</S.LoginButton>
        ) : (
          <S.LoginButton onClick={logout}>로그아웃</S.LoginButton>
        )}
      </S.Header>
      <Modal show={LoginModal} toggleModal={toggleModal}>
        <S.LoginBox>
          <S.LoginTitle>로그인</S.LoginTitle>
          <S.LoginLabel>아이디</S.LoginLabel>
          <S.LoginInput onChange={updateLoginInput("id")} />
          <S.LoginLabel>비밀번호</S.LoginLabel>
          <S.LoginInput type="password" onChange={updateLoginInput("pw")} />
          <S.SubmitButton onClick={login}>로그인</S.SubmitButton>
        </S.LoginBox>
      </Modal>
      <Modal show={JoinModal} toggleModal={toggleModal2}>
        <S.JoinBox>
          <S.LoginTitle>회원가입</S.LoginTitle>
          <S.LoginLabel>아이디</S.LoginLabel>
          <S.LoginInput onChange={updateJoinInput("id")} />
          <S.LoginLabel>비밀번호</S.LoginLabel>
          <S.LoginInput type="password" onChange={updateJoinInput("pw")} />
          <S.LoginLabel>이름</S.LoginLabel>
          <S.LoginInput onChange={updateJoinInput("name")} />
          <S.LoginLabel>계좌번호</S.LoginLabel>
          <S.LoginInput onChange={updateJoinInput("account")} />
          <S.LoginLabel>주소</S.LoginLabel>
          <S.LoginInput onChange={updateJoinInput("address")} />
          <S.SubmitButton onClick={Join}>Join Us</S.SubmitButton>
        </S.JoinBox>
      </Modal>
    </>
  );
};

export default Header;
