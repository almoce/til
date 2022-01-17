import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParseFrontmatter from 'remark-parse-frontmatter'
import remarkGemoji from 'remark-gemoji'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

import {rehype} from 'rehype'
import rehypePresetMinify from 'rehype-preset-minify'

import fs from 'fs/promises'


function getFileContent(filePath) {
  return fs.readFile(filePath, 'utf8')
}

export async function parseMarkDown(filePath) {
  const contentString = await getFileContent(filePath)
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkParseFrontmatter)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(contentString)
  // console.log(file.data.frontmatter);
  return {
    str: String(file),
    frontmatter: file.data.frontmatter
  }
}


export async function getTemplate(filePath) {
  const contentString = await getFileContent(filePath)
  const file = await rehype()
    .use(rehypePresetMinify)
    .process(contentString)
  return String(file)
}

export async function minify(str) {
  const file = await rehype()
    .use(rehypePresetMinify)
    .process(str)
  return String(file) 
}
export default {}