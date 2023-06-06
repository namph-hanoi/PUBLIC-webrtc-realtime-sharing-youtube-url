import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LoadingBox from '../../components/LoadingBox';
import { ReactNode } from 'react';
import { useAppSelector } from '../../hooks';
import { selectGlobalState } from './globalSlice';

export default function GlobalWrap({ children }: {children: ReactNode}) {
  const { globalLoading } = useAppSelector(selectGlobalState);

  return (
    <>
      {globalLoading && (<LoadingBox />)}
      {children}
      <ToastContainer/>
    </>
  )
}
