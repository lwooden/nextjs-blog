// my utility functions for working with, fetching, and manipulating post data

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// modules for rendering markdown
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')
console.log(postsDirectory)


// get post data and sort it for the home page
export default function getSortedPostsData() {

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  console.log(fileNames)

  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    console.log('id => ', id)
    console.log('matter => ', matterResult.data)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// gets all posts IDs in the format that getStaticPath wants
export function getAllPostIds() {
    const filenames = fs.readdirSync(postsDirectory)

    return filenames.map(filename => {
        return {
            params: {
                id: filename.replace(/\.md$/,'')
            }
        }
    })
}


// gets data for a single post
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Switch function to be async to use remark function
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()
  
    // Combine the data with the id
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }