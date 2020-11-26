import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'

// In Next.js, a page is a React Component exported from a file in the pages directory.
// Pages are associated with a route based on their file name

// available on /posts/first-post
export default function FirstPost() {
    return (
       <Layout>
        <Head>
          <title>First Title</title>
        </Head>
        <h1>First Post!</h1>
        <h2>
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </h2>
      </Layout>
    );

}