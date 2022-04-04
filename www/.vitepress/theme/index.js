import DefaultTheme from 'vitepress/theme'

import './custom.css'

import Layout from './Layout.vue'

export default {
    ...DefaultTheme,
    Layout: Layout,
    site: {
        title: 'Site Title'
    },
    enhanceApp({ app, router, siteData }) {
        console.log(siteData)
        // register global components
        app.component('MyGlobalComponent' /* ... */)
    }
}
