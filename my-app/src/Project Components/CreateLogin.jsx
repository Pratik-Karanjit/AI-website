import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import { setLoginInfo } from '../utils/loginInfo';
import Swal from 'sweetalert2';


const CreateLogin = () => {
  let navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required.'),
  password: Yup.string().required('Password is required.'),
});

const onSubmit = async (values, { setSubmitting, setFieldError }) => {
  try {
    const response = await axios.post('http://localhost:8000/users/login', values);
    const token = response.data.token;
    // console.log("Response data:", response.data);
    const email = response.data.email;
    // console.log(token)
    // console.log("&&&&&&&&&&&&&&&&&", email)
    setLoginInfo({ token, email });
    navigate('/');
  } catch (error) {
    console.log('Unable to submit:', error);
    setLoginError(true);
    setFieldError('password', 'Incorrect email or password.');
  } finally {
    setSubmitting(false);
  }
};

const handleDeleteAlert = () => {
  Swal.fire({
    title: 'Login Error',
    text: 'Incorrect email or password.',
    icon: 'error',
    confirmButtonText: 'OK',
  });
};


  return (
    <div>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>Application<br />Login Page</h2>
          <p>Login from here to access.</p>
          <button className="navigate-home" onClick={() => navigate('/')}><h4>Back to Home Page.</h4></button>
        </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div className="form-group">
                  <label>Email</label>
                  <Field type="text" name="email" className="form-control" placeholder="Email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <Field type="password" name="password" className="form-control" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-black">Login</button>
              </Form>
            </Formik>
      {loginError && handleDeleteAlert()}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLogin;
