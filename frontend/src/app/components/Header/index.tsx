import React from 'react';
import { Button, Container, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { loginRequest, logout, selectGlobalState } from '../../containers/Global/globalSlice';
import { Link } from 'react-router-dom';
import { redirect } from "react-router-dom";


const passwordErrorMessage = 'Password length should be from 4 to 20 characters long'
const schema = yup.object().shape({
  email: yup.string().email().required('Email field is required'),
  password: yup.string().min(4, passwordErrorMessage).max(20, passwordErrorMessage).required('Password field is required'),
}).required();

export interface ILoginPayload {
  email: string;
  password: string;
}

export default function Header() {
  const dispatch = useAppDispatch();
  const { userEmail } = useAppSelector(selectGlobalState);

  const { handleSubmit,
    control,
    formState: { errors },
    clearErrors
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues:{
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  
  const sendRequest = async (data: ILoginPayload) => {
    try {
      dispatch(loginRequest(data));
    } catch (error) {
      console.error(["💥 ~ file: index.tsx:34 ~ sendRequest ~ error:", error]);
    }
  };

  const isLoggedIn = localStorage.getItem('ACCESS_TOKEN_KEY');

  React.useEffect(() => {
    if (!!userEmail) {
      redirect('/');
    }
  }, [userEmail]);

  return (
    <div className='pt-5'>
      <Container className='text-right'>
        {
          !!isLoggedIn ? (
            <>
              <span>{userEmail}</span>
              <Button type="button"><Link to="/share">Share a movie</Link></Button>
              <Button type="button" onClick={() => dispatch(logout())}>Logout</Button>
            </>
          ) :
          (
            <form onSubmit={handleSubmit(sendRequest)}>
              <span className='inline-block capitalize'>
                <Controller
                  control={control}
                  name="email"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <TextField
                      data-testid="email"
                      onChange={onChange}
                      onFocus={() => clearErrors(name)}
                      error={!!errors.email?.message}
                      label="Email"
                      placeholder='Email'
                      value={value}
                      helperText={error?.message}
                    />
                  )}
                />
              </span>
              <span className='inline-block capitalize ml-2'>
                <Controller
                  control={control}
                  name="password"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <TextField
                      data-testid="password"
                      onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        // clearErrors(name);
                        onChange(event)
                      }}
                      onFocus={() => clearErrors(name)}
                      error={!!errors.password?.message}
                      label="Password"
                      placeholder='Password'
                      value={value}
                      type='password'
                      helperText={error?.message}
                    />
                  )}
                />
              </span>
              <span className="ml-2">
                <Button type="submit" data-testid="button">Login/Register</Button>
              </span>
            </form>
          )
        }
      </Container>
    </div>
  )
}
