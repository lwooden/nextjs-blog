import '../styles/global.css' // global styles can ONLY be imported HERE

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
  }