import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LoadingBox from '../../components/LoadingBox';
import { ReactNode } from 'react';
import { useAppSelector } from '../../hooks';
import { selectGlobalState } from './globalSlice';
import * as socketIOClient from "socket.io-client";
import { Socket } from 'socket.io-client';


export default function GlobalWrap({ children }: {children: ReactNode}) {
  const { userEmail, globalLoading } = useAppSelector(selectGlobalState);

  const socketRef = React.useRef<Socket | undefined>();

  React.useEffect(() => {
    if (userEmail) {
      socketRef.current = socketIOClient.connect(`${window.location.origin}`, {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN_KEY')}`
        }
      });

      socketRef.current.on('newSharing', (data) => {
        console.log(["🚀 ~ file: index.tsx:26 ~ React.useEffect ~ data:", data]);
      })
    }
    
  }, [userEmail]);

  return (
    <>
      {globalLoading && (<LoadingBox />)}
      {children}
      <ToastContainer/>
    </>
  )
}
