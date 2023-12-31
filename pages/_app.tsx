import '@/styles/globals.css'
import '@/styles/form.css'
import type { AppProps } from 'next/app'
import { ReactDOM } from 'react';

export default function MyApp({Component, pageProps}) {
  return <Component {...pageProps}/>
  }
