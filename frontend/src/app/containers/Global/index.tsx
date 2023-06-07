import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBox from '../../components/LoadingBox';
import { ReactNode } from 'react';
import { useAppSelector } from '../../hooks';
import { selectGlobalState } from './globalSlice';
import * as socketIOClient from "socket.io-client";
import { Socket } from 'socket.io-client';

interface INewNotification {
  owner: {
    email: string,
  },
  title: string,
}

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

      socketRef.current.on('newSharing', (data: INewNotification) => {
        const { owner, title } = data
        toast.info(
          <div>
            <b>{owner.email}</b> has just shared a new video: <b>{title}</b>
          </div>
        )
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
