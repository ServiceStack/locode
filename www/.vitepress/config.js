let container = require('markdown-it-container')

let copy = ({cls,box,icon,txt}) => ({
    render(tokens, idx) {
        const token = tokens[idx]
        if (token.nesting === 1) {
            return `<div class="${cls} flex cursor-pointer mb-3" onclick="copy(this)">
            <div class="flex-grow ${box||'bg-gray-700'}">
                <div class="pl-4 py-1 pb-1.5 align-middle ${txt||'text-lg text-white'}">`
        } else {
            return `</div>
            </div>
            <div class="flex">
                <div class="${icon} text-white p-1.5 pb-0">
                    <svg class="copied w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <svg class="nocopy w-6 h-6" title="copy" fill='none' stroke='white' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'></path>
                    </svg>
                </div>
            </div>
        </div>\n`
        }
    }
})

export default {
    title: 'Locode',
    description: 'Config Desc',
    themeConfig: {
        repo: 'ServiceStack/docs',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        //lastUpdated: false,
        nav: [
            { link:"/docs/", text:"Docs" },
            { link:"https://api.locode.dev/modules/shared.html", text:"API Reference" },
            { link:'https://forums.servicestack.net', text:'Forums' },
        ],
        sidebar: {
            '/': [
                {
                    "text": "Introduction",
                    "children": [
                        {
                            "text": "Getting Started",
                            "link": "/docs/get-started"
                        },
                        {
                            "text": "Database First",
                            "link": "/docs/database-first"
                        },
                        {
                            "text": "Code-first",
                            "link": "/docs/code-first"
                        }
                    ]
                },
                {
                    "text": "C# Attributes",
                    "children": [
                        {
                            "text": "Overview",
                            "link": "/docs/declarative"
                        },
                        {
                            "text": "Appearance & Branding",
                            "link": "/docs/branding"
                        },
                        {
                            "text": "Format Functions",
                            "link": "/docs/formatters"
                        },
                    ]
                },
                {
                    "text": "Custom HTML/JS",
                    "children": [
                        {
                            "text": "Overview",
                            "link": "/docs/custom"
                        },
                    ]
                },
                {
                    "text": "Features",
                    "children": [
                        {
                            "text": "File Management",
                            "link": "/docs/files"
                        },
                        {
                            "text": "Auditing",
                            "link": "/docs/auditing"
                        },
                    ]
                }
            ],
        }
    },
    head: [
        ['script', { src: '/custom.js' }],
    ],
    markdown: {
        config: md => {
            md.use(container, 'nuget', copy({cls:'nuget-copy cp', icon:'bg-sky-500'}))
            md.use(container, 'sh', copy({cls:'sh-copy cp', box:'bg-gray-800', icon:'bg-green-600', txt:'whitespace-pre text-base text-gray-100'}))
        }
    }
}