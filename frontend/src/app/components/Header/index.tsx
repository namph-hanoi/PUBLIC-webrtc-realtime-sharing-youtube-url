import React from 'react';
import { Checkbox, Container, TextField } from '@mui/material';

import 'tailwindcss/tailwind.css'
import { Controller, useForm } from 'react-hook-form';


export default function Header() {
  const { handleSubmit, control } = useForm({
    defaultValues:{
      email: '',
      password: '',
    }
  });
  

  return (
    <div className='pt-5'>
      <Container className='text-right'>
        <form onSubmit={handleSubmit(data => console.log(data))}>
          <span className='inline-block'>
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <TextField
                  onChange={(event) => {
                    // Todo: delete in the next commit
                    event.target.value = event.target.value += '0'
                    onChange(event)
                  }}
                  error={!!error}
                  label="Email"
                  placeholder='Email'
                  value={value}
                />
              )}
            />
          </span>
          <span className='inline-block ml-2'>
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <TextField
                  onChange={onChange}
                  error={!!error}
                  label="Password"
                  placeholder='Password'
                  value={value}
                  type='password'
                />
              )}
            />
          </span>
        </form>
      </Container>
    </div>
  )
}
