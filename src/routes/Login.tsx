import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled.div`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 5rem;
`;

const Input = styled.input`
  width: 20rem;
  height: 1.5rem;
  margin: 1rem 0;
  background-color: #4e4e4e;
  border: none;
  border-bottom: 0.1rem solid white;
  outline: none;
  color: white;
  font-size: 1rem;
`;

const AccountBtn = styled.button`
  margin-top: 2rem;
  width: 10rem;
  height: 2.5rem;
  border-radius: 2rem;
  border: none;
  outline: none;
  a {
    color: black;
  }
`;

const Loginbtn = styled.button`
  margin-top: 2rem;
  width: 10rem;
  height: 2.5rem;
  border-radius: 2rem;
  border: none;
  outline: none;
  a {
    color: black;
  }
`;

const AlertText = styled.p`
  color: #ff2f2f;
  font-size: 0.9rem;
  margin: 0.4rem 0;
`;

interface ILoginData {
  email: string;
  password: string;
}

interface ITestData {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  ast_name: string;
}

function Login() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ILoginData>();

  const [isLogin, setIsLogin] = useState(false);

  //   "email": "george.bluth@reqres.in",
  //   "first_name": "George",

  const onFormSubmit = async (data: ILoginData) => {
    axios
      .post(`https://reqres.in/api/users`, {
        email: data.email,
        first_name: data.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.email === undefined) {
          console.log("============= 없는 계정");
        } else if (
          res.data.email === true &&
          res.data.first_name === undefined
        ) {
          console.log("========== 비번이 틀린듯");
        } else if (
          res.data.email === data.email &&
          res.data.first_name === data.password
        ) {
          console.log("=========== 로그인 성공");
        }
      });
  };

  // useEffect(() => {
  //   axios
  //     .get("https://reqres.in/api/users")
  //     .then((res) => console.log(res))
  //     .catch();
  // }, []);

  // const email = watch("email");

  // const [users, setUsers] = useState<ITestData[]>([]);

  // const usersEmails = users.map((a) => {
  //   return a.email;
  // });

  // console.log(usersEmails, email);

  return (
    <Background>
      <LoginForm onSubmit={handleSubmit(onFormSubmit)}>
        <LoginTitle>로그인</LoginTitle>
        <Input
          placeholder="이메일"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          {...register("password", {
            required: true,
          })}
        />
        {(errors.password || errors.email) && (
          <AlertText>이메일 혹은 비밀번호를 확인해주세요</AlertText>
        )}
        {/*DB의 로그인 정보와 같으면 홈으로 이동 그렇지 않으면 에러 렌더링*/}
        <Loginbtn>로그인</Loginbtn>
        {/*로그인 시 에러가 발생하면 경고창을 띄울 예정*/}
      </LoginForm>
      <AccountBtn>
        <Link to="/account">회원가입</Link>
      </AccountBtn>
    </Background>
  );
}

export default Login;
