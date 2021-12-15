import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { MoralisProvider } from 'react-moralis'
import styles from '../styles/Home.module.css'
import { contract as contractAddress } from '../contractAddress';
import MetamaskLogin from "../components/MetamaskLogin/MetamaskLogin";
import FeatureToggle from '../abis/FeatureToggle.json';
import Moralis from "moralis";
const APP_ID = process.env.NEXT_PUBLIC_APP_ID ?? '';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? '';

const Home: NextPage = () => {
  return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <div className={styles.container}>
      <Head>
        <title>Web3 Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            demo page!
        </h1>
        <h1 className={styles.title}>
          <MetamaskLogin/>

        </h1>
        contract deployed to: {contractAddress}



      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
      </MoralisProvider>
  )
}
const App = () => {
  // return(
  //     <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
  //       <MyApp Component={Home} pageProps={null} router={}/>
  //     </MoralisProvider>
  // )
}
export default Home;
