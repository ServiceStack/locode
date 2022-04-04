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
            { link:"https://docs.locode.dev", text:"Docs" },
            { link:"https://docs.locode.dev/api/modules/shared.html", text:"API Reference" },
            { link:'https://forums.servicestack.net', text:'Forums' },
        ],
        sidebar: {
            '/autoquery': [
                {
                    "text": "AutoQuery",
                    "children": [
                        {
                            "text": "Overview",
                            "link": "/autoquery"
                        },
                        {
                            "text": "AutoQuery RDBMS",
                            "link": "/autoquery-rdbms"
                        }
                    ]
                }
            ],
            '/': [
                {
                    "text": "Overview",
                    "children": [
                        {
                            "text": "Why ServiceStack",
                            "link": "/why-servicestack"
                        },
                        {
                            "text": "Architecture Overview",
                            "link": "/architecture-overview"
                        },
                        {
                            "text": "Servicify existing Systems",
                            "link": "/servicify"
                        },
                        {
                            "text": "Explore ServiceStack",
                            "link": "/explore-servicestack"
                        }
                    ]
                },
            ],
        }
    },
    head: [
        ['script', { src: '/custom.js' }],
    ],
}