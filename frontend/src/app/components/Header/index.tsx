import React from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { loginRequest, logout, selectGlobalState } from '../../containers/Global/globalSlice';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import styles from './styles.module.scss'

const passwordErrorMessage = 'Must be 4-20 characters long'
const schema = yup.object().shape({
  email: yup.string().email().required('Email field is required'),
  password: yup.string().min(4, passwordErrorMessage).max(20, passwordErrorMessage).required('Password field is required'),
}).required();

export interface ILoginPayload {
  email: string;
  password: string;
}

function Header() {
  const dispatch = useAppDispatch();
  const { userEmail } = useAppSelector(selectGlobalState);
  const navigate = useNavigate();
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

  React.useEffect(() => {
    if (!userEmail) {
      navigate('/', {
        replace: true,
      });
    }
  }, [userEmail, navigate]);

  return (
    <div className={`${styles.wrap} pt-5`}>
      <Container>
        <Grid container  className={`flex justify-between ${styles.wrap_btn}`}>
          <Grid item xs={12} md={6} className='md:text-left'>
            <Button type="button" variant='outlined'>
              <Link to='/'><HomeIcon /> Home</Link>
            </Button>
          </Grid>
          <Grid item xs={12} md={6}  className='md:text-right'>
          {
            !!userEmail ? (
              <div>
                <span>{userEmail}</span>
                <Button type="button"><Link to="/share">Share a movie</Link></Button>
                <Button type="button" onClick={() => dispatch(logout())}>Logout</Button>
              </div>
            ) :
            (
                <form className="flex justify-center" onSubmit={handleSubmit(sendRequest)}>
                  <span className={`${styles.input} inline-block capitalize`}>
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
                          className={`${styles.mui_input}`}
                          InputLabelProps={{ shrink: true }}
                          FormHelperTextProps={{ className: styles.form_helper}}
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
                          className={`${styles.mui_input}`}
                          InputLabelProps={{ shrink: true }}
                          FormHelperTextProps={{ className: styles.form_helper}}
                        />
                      )}
                    />
                  </span>
                  <span className={`ml-2 inline-block ${styles.wrap_btn}`}>
                    <Button variant='contained' color='primary' type="submit" data-testid="button">Login/Register</Button>
                  </span>
                </form>
            )
          }
          </Grid>
        </Grid>
      <Divider className={styles.divider} />
      </Container>
    </div>
  )
};

export default React.memo(Header);

