import Head from 'next/head'
import Link from 'next/link'
import Layout, {siteTitle} from '../components/Layout'
import utilStyles from '../components/utils.module.css'
import getSortedPostsData from '../lib/posts'
import Date from '../components/Date'

// pass the result from getStaticProps as a prop into the Home component
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to Low's Blog, powered by Next.js!</p>
      </section>
      <section>
      <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
            {title}
            </Link>
              <br />
              {id}
              <br />
              <Date dateString={date} />
            </li>
          ))}
        </ul>

      </section>
    </Layout>
  )
}

/** 
call this function to get all the data I need before rendering my component
getStaticProps() ONLY runs on the server side!
it is not apart of the bundle that gets shipped to the browser
in the case I need pure client-side rendering (like I currently do using just React) I can use the useSWR hook
**/
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
