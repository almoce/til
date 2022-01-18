import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import {existsSync, mkdirSync} from 'fs'
import child_process from 'child_process'
import {parseMarkDown, getTemplate, minify} from './parse.js'
import crypto from 'crypto'

const ROOT_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DOC_FOLDER = path.join(ROOT_PATH, 'docs')
const TEMPLATE_FOLDER = path.join(ROOT_PATH, 'src/template')
const BUILD_FOLDER = path.join(ROOT_PATH, 'build/docs')
const RECORD_FILE = path.join(ROOT_PATH, 'record.json')


child_process.exec(`ls ${DOC_FOLDER}`, async (err, stdout, stderr) => {
    const docTemplate = await getTemplate(`${TEMPLATE_FOLDER}/doc.html`)
    const fileList = stdout.trim().split('\n')
    const fileHistroy = fileList.map(i => {
         return new Promise(resolve => {
            const filePath = path.join(DOC_FOLDER, i)
            child_process.exec(`git log origin/main --follow --format=%aD "${filePath}"`, (err, stdout, stderr) => resolve(stdout.trim().split('\n')))
        })
    })
    const fileRecord = await getRecord()
    await checkBuildFolder()
    const indexList = []
    Promise.all(fileHistroy).then(async res => {
        for(let idx in res) {
            const fileName = fileList[idx]
            const title = fileName.replace('.md', '')
            const filepath = path.join(DOC_FOLDER, fileName)
            const history = res[idx]
            const createTime = history[history.length - 1]
            const modifyTime = history[0]

            const hashKey = crypto.createHash('md5').update(String(fileName)).digest('hex')
            const hashValue = crypto.createHash('md5').update(String(modifyTime)).digest('hex')
            const fileObject = {
                name: title,
                key: hashKey,
                createTime: createTime,
                modifyTime: modifyTime,
                tags: [],
            }
            if (fileRecord[hashKey] === hashValue) {
                console.log('file has no update');
            } else {
                fileRecord[hashKey] = hashValue
                let template = docTemplate
                const data = await parseMarkDown(filepath)
                if (data.frontmatter && data.frontmatter.tags) {
                    fileObject.tags = data.frontmatter.tags
                }
                template = template.replace('{{title}}', title)
                template = template.replace('{{content}}', data.str)
                generateHtml(template, `${BUILD_FOLDER}/${hashKey}.html`)    
            }
            indexList.push(fileObject)
        }
        saveRecord(JSON.stringify(fileRecord))
        generateIndexHtml(indexList)
    })
})

async function getRecord() {
    if (existsSync(RECORD_FILE)) {
        const content = await fs.readFile(RECORD_FILE, 'utf8')
        return JSON.parse(content)
    } else {
         await new Promise(r => child_process.exec(`rm -rf ${BUILD_FOLDER}`, r))
        return {}
    }
}

function saveRecord(str) {
    // fs.writeFile(RECORD_FILE, str)
}


async function generateHtml(str, filePath) {
    str = await minify(str)
    fs.writeFile(filePath, str)
}

async function generateIndexHtml(data) {
    const str = ''
    data.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    let ul = ''
    data.forEach(i => {
        let tags = ''
        if (i.tags && i.tags.length) {
            tags = i.tags.map(i => `<span class="tag">${i}</span>`).join('')
        }
        ul += `<li>
            <div>
                <div><a href="/docs/${i.key}.html">${i.name}</a></div>
                <div class="time">${new Date(i.createTime).toLocaleString()}</div>
            </div>
            <div>
                <div class="tags">${tags}</div>
            </div>
        </li>`
    })
    ul = `<ul>${ul}</ul>`

    let html = await getTemplate(`${TEMPLATE_FOLDER}/index.html`)
    html = html.replace('{{content}}', ul)
    generateHtml(html, path.resolve(BUILD_FOLDER, '../index.html'))
}

function getTitle(str) {
    const start = str.indexOf('<h1>') + 4
    const end  = str.indexOf('</h1>')
    return str.slice(start, end)
}

function checkBuildFolder() {
    return new Promise(resolve => {
        if (!existsSync(BUILD_FOLDER)) {
            mkdirSync(BUILD_FOLDER, {recursive: true})
        }
        resolve()
    })

}