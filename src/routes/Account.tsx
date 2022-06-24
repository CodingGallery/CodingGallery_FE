import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import axios from "axios";

const Background = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AccountTitle = styled.div`
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
  &::placeholder {
    color: #ecebeb;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 15rem;
  margin-top: 2rem;
`;

const Btn = styled.button`
  margin-top: 2rem;
  width: 10rem;
  height: 2.5rem;
  border-radius: 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  a {
    color: black;
  }
`;

const AlertText = styled.p`
  color: #ff2f2f;
  font-size: 0.9rem;
  margin: 0.4rem 0;
`;

const UploadText = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 2rem 0;
  text-align: center;
`;
const ReUploadText = styled.div`
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  margin: 1.5rem 0;
  text-align: center;
`;

const UploadImgBtn = styled.button`
  width: 8rem;
  height: 8rem;
  background-color: #ffffffb9;
  border-radius: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
`;
const UploadImgInput = styled.input`
  display: none;
`;

const PreviewImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 1rem;
`;

// interface ILoginData {
//   email: string;
//   password: string;
//   comfirmPassword: string;
//   name: string;

// }

function Account() {
  /*useRef를 input에 사용시 Type은 MutableRefObject를 사용*/
  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  // useRef로 password 변수 생성 후 watch를 사용하여 password의 값을 넣어줌
  const password = useRef();
  password.current = watch("password");

  // ImageRendering useState
  const [preview, setPreview] = useState<string | null>();

  const onFileHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileInputRef.current.click();
  };
  const onFileChange = (event: any) => {
    // input 파일을 압축 해준다.
    actionImgCompress(event.target.files[0]);
  };

  // imgCompression 라이브러리를 사용하여 Compress 변수 생성
  const actionImgCompress = async (fileSrc: any) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      // 압축 결과
      const compressedFile = await imageCompression(fileSrc, options);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const onFormSubmit = async (data: any) => {
    axios
      .post(`https://reqres.in/api/users`, {
        email: data.email,
        password: data.password,
        name: data.name,
        profileImg: preview,
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
    console.log(data);
  };

  return (
    <Background>
      <AccountForm onSubmit={handleSubmit(onFormSubmit)}>
        <AccountTitle>회원가입</AccountTitle>
        <Input
          placeholder="이메일"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <AlertText>이메일은 필수 항목입니다.</AlertText>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <AlertText>올바른 이메일을 작성해주세요.</AlertText>
        )}
        <Input
          placeholder="비밀번호"
          type="password"
          {...register("password", {
            required: true,
            maxLength: 15,
            minLength: 8,
          })}
        />
        {errors.password &&
          (errors.password.type === "maxLength" ||
            errors.password.type === "minLength") && (
            <AlertText>비밀번호는 최소 8 ~ 최대 16자입니다.</AlertText>
          )}
        {errors.password && errors.password.type === "required" && (
          <AlertText>비밀번호는 필수 항목입니다.</AlertText>
        )}
        <Input
          placeholder="비밀번호 확인"
          type="password"
          {...register("confirmPassword", {
            required: true,
            maxLength: 15,
            minLength: 8,
            // validate로 password 값을 가져옴
            validate: (value) => value === password.current,
          })}
        />
        {errors.confirmPassword &&
          (errors.confirmPassword.type === "maxLength" ||
            errors.confirmPassword.type === "minLength") && (
            <AlertText>비밀번호는 최소 8 ~ 최대 16자입니다.</AlertText>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "required" && (
            <AlertText>비밀번호는 필수 항목입니다.</AlertText>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "validate" && (
            <AlertText>비밀번호가 다릅니다.</AlertText>
          )}
        <Input
          placeholder="이름"
          type="text"
          {...register("name", {
            required: true,
            minLength: 2,
            maxLength: 5,
          })}
        />
        {errors.name &&
          (errors.name.type === "maxLength" ||
            errors.name.type === "minLength") && (
            <AlertText>이름은 최소 2 ~ 최대 5자입니다.</AlertText>
          )}
        {errors.name && errors.name.type === "required" && (
          <AlertText>이름은 필수 항목입니다.</AlertText>
        )}
        <UploadText>프로필 사진 업로드</UploadText>
        <ReUploadText>재업로드를 원하시면 한번 더 클릭하세요.</ReUploadText>
        {preview ? (
          // 이미지를 변경 하고 싶을 때 다시 클릭하면 null 값으로 변경
          <PreviewImg src={preview} onClick={() => setPreview(null)} />
        ) : (
          <UploadImgBtn onClick={onFileHandler}>파일 업로드</UploadImgBtn>
        )}
        <UploadImgInput
          type="file"
          accept="image/*"
          {...(register("profileImg"), {})}
          ref={fileInputRef}
          onChange={onFileChange}
        />
        <BtnBox>
          <Btn type="submit">회원가입 완료</Btn>
        </BtnBox>
      </AccountForm>
    </Background>
  );
}

export default Account;
