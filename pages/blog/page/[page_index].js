import Layout from '@/components/Layout'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Post from '@/components/Post'
import Pagination from '@/components/Pagination'
import sortByDate from '@/utils/index'
// import { getStaticPaths } from '../[slug]'
import { POSTS_PER_PAGE } from 'config'

export default function BlogPage({ posts, numPages, currentPage }) {
  // posts.map((post) => console.log(post.date))
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post
            key={index}
            post={post}
          ></Post>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
      />
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  let paths = []

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    })
  }
  // console.log(paths)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1)
  // console.log(path)
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
      // date: Date.parse(frontmatter.date),
    }
  })

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts
    .sort(sortByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)
  // posts.sort(sortByDate).map((post) => console.log(post.date))
  return {
    props: { posts: orderedPosts, numPages, currentPage: page },
  }
}
