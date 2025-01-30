import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../../../styles/components/SignupForm.css"; 
import { signUp } from '../../../services/operations/authAPI';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userName, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not matched");
      return;
    }

    const signupData = {
      ...formData,
    };

    // dispatch(setSignupData(finalData))
    dispatch(signUp(userName,email,password,confirmPassword,navigate))

    // reset
    setFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="signup-form">
      <form onSubmit={submitHandler}>
        <label>
          <p className="label-text">
            User Name <sup className="required">*</sup>
          </p>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            placeholder="Enter User Name"
            onChange={changeHandler}
            className="input-field"
          />
        </label>

        {/* email */}
        <label>
          <p className="label-text">
            Email Address<sup className="required">*</sup>
          </p>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email address"
            onChange={changeHandler}
            className="input-field"
          />
        </label>

        {/* password and confirm password */}
        <div className="password-fields">
          <label className="password-label">
            <p className="label-text">
              Create Password<sup className="required">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={changeHandler}
              className="input-field" id='input'
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="eye-icon"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="password-label">
            <p className="label-text">
              Confirm Password<sup className="required">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={changeHandler}
              className="input-field" id='input'
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="eye-icon"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        {/* Create Button */}
        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
