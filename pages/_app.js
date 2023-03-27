import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps: { session, ...pageProps} }) {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    }

    const end = () => {
      setLoading(false);
    }

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    }

  }, [])

  return <SessionProvider session={session}>
    {loading && <Loading />}
    <Component {...pageProps} />
    <ToastContainer />
  </SessionProvider>
}

function Loading () {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 loading-main flex justify-center items-center">
      <div className='lds-dual-ring' />
    </div>
  );
}