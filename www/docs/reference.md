## API Reference

Type definitions for functionality available in ServiceStack UI's

### Library Reference

| Namespace | Description |
| --- | --- |
| [shared](https://api.locode.dev/modules/shared.html)     | Type Definitions for all Types and shared functionality used in all UI's |
| [client](https://api.locode.dev/modules/client.html)     | Type Definitions for the [@servicestack/client](https://github.com/ServiceStack/servicestack-client) library |

### UIs

| UI | Description |
| --- | --- |
| [locode](https://api.locode.dev/modules/locode.html)     | Global App and Type instances available in [Locode Apps](https://locode.dev) |
| [explorer](https://api.locode.dev/modules/explorer.html) | Global App and Type instances available in [API Explorer](https://docs.servicestack.net/api-explorer) |
| [admin](https://api.locode.dev/modules/admin.html)       | Global App and Type instances available in ServiceStack's [Admin UI](https://docs.servicestack.net/admin-ui) |

## Getting Started

When customizing any ServiceStack UI App you can enable static typing and intelli-sense by installing this `@servicestack/ui` package
(containing their TypeScript `.d.ts` definitions) in your host project, then use the standard [ES6 import syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to import any built-in functionality you want to reference.

### TypeScript Definitions only used during development

Referencing types are only used to enable static analysis benefits during development and have no impact on runtime execution where they're removed in order for your code to run as-is inside the browser.

::: tip
To satisfy the source transforms, each **import** statement should be on a **single line** and should contain **no preceding white space**.
:::

### Install

```bash
$ npm install @servicestack/ui
```

### Update

Update your local Type definitions to the latest version with:

```bash
$ npm install @servicestack/ui@latest
```

## Example Usages

Examples of customizing local API Explorer and Locode Apps with static analysis & intelli-sense support enabled.

### Custom Locode Form UIs

To override Locode's built-in Form UI add custom [PetiteVue](https://github.com/vuejs/petite-vue) HTML components ti your Host Project **/wwwroot**
at `/modules/locode/custom.html` using the the naming conventions below:

|  Component Name | Description |
|  --- | --- |
|  `New{Table}` | Custom Create Form UI |
| `Edit{Table}` | Custom Update Form UI |

For example, checkout custom components in [/modules/locode/custom.html](https://github.com/NetCoreApps/Chinook/blob/main/Chinook/wwwroot/modules/locode/custom.html) used to render Chinook's [custom Create Album form](https://chinook.locode.dev/locode/QueryAlbums?new=true)
with static analysis enabled by importing types from `@servicestack/ui` package using standard, e.g:

```html
<script>
import { CreateComponentArgs, EditComponentArgs, CrudApisState, map, inputClass } from "@servicestack/ui"
import { App, Forms } from "@servicestack/ui/locode"

App.components({
    /** @param {CreateComponentArgs} args */
    NewAlbums({ store, routes, settings, state, save, done }) {
        return {
            $template: '#new-album-template',
            store, routes, settings,
            /** @type {State} */
            get state() { return state && state() },
            get apiState() { return map(this.state, x => x.apiCreate) },
            get model() { return map(this.apiState, x => x.model) || {} },
            inputClass(prop,cls) { return inputClass(this.apiState.fieldError(prop),cls) },

            done,
            submit() {
                this.apiState.apiForm(Forms.formData(this.$refs.form, this.apiState.op))
                    .then(r => {
                        if (r.api.succeeded) {
                            save()
                            done()
                        }
                    })
            }
        }
    }
})
</script>
<template id="new-album-template">
    <!-- Component UI... -->
</template>
```

## Custom Locode Home Page

Each built-in ServiceStack UI component can be overridden by creating a local file in your **wwwroot** folder with the same path of the built-in
[/ServiceStack/modules](https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack/src/ServiceStack/modules) component you want to replace.

E.g. Here's Chinook's custom home page in [/modules/locode/components/Welcome.html](https://github.com/NetCoreApps/Chinook/blob/main/Chinook/wwwroot/modules/locode/components/Welcome.html) that's used to render [Chinook's App Home page](https://chinook.locode.dev/locode):

```html
<script>
import { App, client } from "@servicestack/ui/locode"
import { QueryInvoices } from "dtos"

App.components({
    Welcome() {
        return {
            $template: '#welcome-template',
            lastOrders: [],
            mounted() {
                client.api(new QueryInvoices({ orderBy:'-InvoiceId', 
                    take:5, 
                    fields:'InvoiceId,CustomerId,InvoiceDate,Total,BillingCountry,BillingCity' 
                }), { jsconfig: 'edv' })
                    .then(api => {
                        if (api.succeeded) {
                            this.lastOrders = api.response.results
                        }
                    })
            }
        }
    }
})
</script>
<template id="welcome-template">
    <div class="pl-4" @vue:mounted="mounted">
        <h1 class="text-3xl">
            Welcome to Chinook Locode
        </h1>
        <div v-if="lastOrders.length" class="mt-8">
            <h3 class="text-xl mb-4">Here are your last {{lastOrders.length}} orders:</h3>
            <div class="max-w-screen-md" v-scope="PreviewObject({ val:() => lastOrders })"></div>
        </div>
    </div>
</template>
```

Which also makes use of the [TypeScript DTOs](https://docs.servicestack.net/typescript-add-servicestack-reference) of its ServiceStack APIs, generated by running:

```bash
$ npm run dtos
```
