import React, { useState, useEffect } from "react";
import IconInput from "../../components/iconInput/IconInput";
import userIcon from "../../assets/icons/user.png";
import passwordIcon from "../../assets/icons/password-lock.jpg";
import SimpleButton from "../../components/simpleButton/SimpleButton";

import { HttpService } from "../../utils/axiosRequest";
import { validateUsername, validatePassword } from "../../utils/validations";
import "./login.styles.scss";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  // useEffect(()=>{
  //   if(window.location.href !=="")
  // },[])
  return (
    <div className="form--container">
      <form>
        <div className="form--container__rows full-row form--container__rows--title">
          <span className="form--container__rows--title--text">
            Login to continue...
          </span>
        </div>
        <div className="form--container__rows full-row">
          <IconInput
            iconSrc={userIcon}
            label="Username"
            name="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
              setUsernameValidation(validateUsername(e.target.value));
            }}
          />
        </div>
        <div className="form--container__rows full-row">
          <IconInput
            iconSrc={passwordIcon}
            label="Password"
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              setPasswordValidation(validatePassword(e.target.value));
            }}
            type="password"
          />
        </div>
        <SimpleButton
          style={{
            position: "absolute",
            bottom: "-22px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onClick={() => {
            if (usernameValidation && passwordValidation)
              HttpService.post("/auth/login", { username, password })
                .then((response: any) => {
                  if (response.data) {
                    const res = response.data;
                    if (!res.hasError) {
                      toast.success(res.message);
                      localStorage.setItem("authToken", res.payload?.token);
                      window.location.replace("/categories");
                    }
                  }
                })
                .catch((err: any) => {
                  if (err.response && err.response.data) {
                    const res = err.response.data;
                    if (res.hasError) {
                      toast.error(res.message);
                    }
                  }
                });
          }}
          text="login"
          disabled={!usernameValidation || !passwordValidation}
        />
      </form>
    </div>
  );
};

export default Login;
