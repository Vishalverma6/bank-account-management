import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../../../styles/components/LoginForm.css"; 
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(login(email,password, navigate))

    // reset form
    setFormData({
      email: "",
      password: "",
    });
  };

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="login-form">
      <form onSubmit={submitHandler}>
        {/* Email */}
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

        {/* Password */}
        <label className="password-label">
          <p className="label-text">
            Password<sup className="required">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Enter password"
            onChange={changeHandler}
            className="input-field"
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

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
