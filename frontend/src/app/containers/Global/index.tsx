import Header from '../../components/Header';

export default function HomePage({ children }: { children: JSX.Element }) {
  //  import redux global state here

  // Toast message here, depends on the globalState

  return (
    <>
      {children}
    </>
  )
}
