import React from 'react';
import { Button, Container, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import apiRequest from '../../../features/request';

const passwordErrorMessage = 'Password length should be from 4 to 20 characters long'
const schema = yup.object().shape({
  email: yup.string().email().required('Email field is required'),
  password: yup.string().min(4, passwordErrorMessage).max(20, passwordErrorMessage).required('Password field is required'),
}).required();

export default function Header() {
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
  
  const sendRequest = async (data: any) => {
    try {
      const result = await apiRequest(`/auth/login`, 'POST', {...data});
      
      console.log(["🚀 ~ file: index.tsx:33 ~ sendRequest ~ result:", result]);
    } catch (error) {
      console.error(["💥 ~ file: index.tsx:34 ~ sendRequest ~ error:", error]);
    }
  };

  return (
    <div className='pt-5'>
      <Container className='text-right'>
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
      </Container>
    </div>
  )
}
