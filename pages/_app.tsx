import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/layout';
import { NextUIProvider } from '@nextui-org/react';
// import SignIn from '../components/signin/signin';
import SignIn from '../pages/signin';

const pb = new PocketBase('http://127.0.0.1:8090');

function MyApp({ Component, pageProps }: AppProps) {
   const [pocketbase, setPocketbase] = useState<PocketBase | undefined>(undefined);
   const [isValid, setIsValid] = useState(false);

   useEffect(() => {
      pb.authStore.loadFromCookie(document.cookie);
      // setPocketbase(pb);
      setIsValid(pb.authStore.isValid);
   });

   return (
      <NextUIProvider>
         {(isValid) ?
            <Layout>
               {/* <Component pb={pocketbase} {...pageProps} /> */}
               <Component {...pageProps} />
            </Layout>
            :
            <SignIn />
         }
      </NextUIProvider>
   );   
}

export default MyApp;
