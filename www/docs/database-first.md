---
title: Locode - Database-first
---

# Database-first
If you have an existing database with data that needs to be managed directly, a Create, Read, Update, Delete (CRUD) application,
you can configure your ServiceStack application to use AutoQuery Generated Services. This will use your database schema
to generate a working Locode app that can be extended and customized.

## Northwind example
We have an example of this in the [Northwind demo](https://northwind.locode.dev) which provides a way to manage 
all the data in the Northwind database with some customizations to improve usability, all in **~120 lines of C#**.

## Create your project

<div class="flex">
<a href="https://account.servicestack.net/archive/NetCoreTemplates/web?Name=MyLocodeApp" class="text-xl hover:no-underline">
    <div class="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600">
        <div class="text-center font-extrabold flex items-center justify-center mb-2">
            <div class="text-4xl text-blue-600 my-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M4 10.4V4a1 1 0 0 1 1-1h5V1h4v2h5a1 1 0 0 1 1 1v6.4l1.086.326a1 1 0 0 1 .682 1.2l-1.516 6.068A4.992 4.992 0 0 1 16 16a4.992 4.992 0 0 1-4 2a4.992 4.992 0 0 1-4-2a4.992 4.992 0 0 1-4.252 1.994l-1.516-6.068a1 1 0 0 1 .682-1.2L4 10.4zm2-.6L12 8l2.754.826l1.809.543L18 9.8V5H6v4.8zM4 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 12 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 20 20h2v2h-2a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 12 22a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 4 22H2v-2h2z"/>
                </svg>
            </div>
        </div>
        <span class="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">MyLocodeApp.zip</span>
        <div class="count mt-1 text-gray-400 text-sm"></div>
    </div>
</a>
</div>

Starting with the basic `web` template for a ServiceStack application will provide the basic solution structure 
with a sample Hello World service. This can be done using the [ServiceStack website](https://servicestack.net) under 
[Get Started](https://servicestack.net/start).

Alternatively, templates can be created using the dotnet CLI tool `x`. The dotnet `x` tool can be installed 
using the following command:

:::sh
dotnet tool install --global x
:::

Once installed, a new `web` template can be created using:

:::sh
x new web MyProjectName
:::

## Configuring database connection

Once you have the new web project open, you will need to configure the following.

- Database type (PostgreSQL, SQL Server, MySQL, or SQLite)
- Database connection string
- AutoQuery Generated Services

We can use the dotnet `x` tool to `mix` in specific database support and AutoQuery quickly using the command run from the project directory.

:::sh
x mix sqlite autoquery
:::

::: tip
Replace `sqlite` with `postgres`, `sqlserver`, or `mysql` or other RDBMS providers
:::

This command will create two files, `Configure.Db.cs` and `Configure.AutoQuery.cs` and install required NuGet dependencies into the AppHost (MyLocodeApp in the link above) project.



### Configure.Db.cs

Below we have an example using `sqlite` of the configuration to add an `IDbConnectionFactory` dependency into IoC created by this command.

```csharp
public class ConfigureDb : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            services.AddSingleton<IDbConnectionFactory>(new OrmLiteConnectionFactory(
                context.Configuration.GetConnectionString("DefaultConnection")
                ?? ":memory:",
                SqliteDialect.Provider));
        });
}
```

The example above is using an in-`:memory:` SQLite database, but we want to use a pre-existing database the connection string will need to be updated.
To use the Northwind sample database, we can download and copy it into the AppHost project with the `Configure.Db.cs` file and replace the 
`:memory:` connection string with the file name `northwind.sqlite`. Another easy way to download `northwind.sqlite` is by using the `x` tool with the following 
command run from the AppHost directory.

:::sh
x mix northwind.sqlite
:::

Now our application can communicate with the Northwind sample database, we will need to configure AutoQuery to use AutoGen to generate our CRUD services from our database schema.

### Configure.AutoQuery.cs

With the database connection configured, next you will need to configure AutoQuery to scan your database schema and generate the required CRUD services.
This feature is known as `AutoGen` and can be enabled by instantiating the `GenerateCrudServices` option on the `AutoQueryFeature` plugin with the `AutoRegister` flag set to `true`.

```csharp
public class ConfigureAutoQuery : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureAppHost(appHost => {
            appHost.Plugins.Add(new AutoQueryFeature {
                MaxLimit = 1000,
                
                // Add this line, Configures Generated CRUD services with defaults
                GenerateCrudServices = new GenerateCrudServices()
                {
                    AutoRegister = true
                }
            });
        });
}
```

The `AutoQueryFeature` plugin will automatically use your registered `IDbConnectionFactory` to communicate with your database and generate services 
for the `public` schema. Running the application after these changes, we will have a `Query`, `Create`, `Update` and `Delete` services ready to use for each table.

![](../public/assets/img/docs/database-first-northwind-default.png)

### Multiple Schemas

By default, `GenerateCrudServices` with `AutoRegister` will create services for each table in the `public` schema.
If you want to enable services for tables in other schemas, you can use the `CreateServices` option. For example, if
you have a schema by the name of `dbo` and `public`, you would use the following options.

```csharp
appHost.Plugins.Add(new AutoQueryFeature {
    MaxLimit = 1000,
    //IncludeTotal = true,
    GenerateCrudServices = new GenerateCrudServices()
    {
        // Configure which schemas should be used, `public` is the default.
        CreateServices = new List<CreateCrudServices>
        {
            new CreateCrudServices(),
            new CreateCrudServices { Schema = "dbo" }
        }
    }
});
```

### Multiple database connections

If you are using [Named connections](https://docs.servicestack.net/autoquery-rdbms#named-connection) with [OrmLite](https://docs.servicestack.net/ormlite), you can also specify these connections in the `CreateServices` list.
Named connection registration can be done using the `IDbConnectionFactory` and `RegisterConnection` method.

```csharp
// SqlServer with a named "Reporting" PostgreSQL connection as a part of the same `dbFactory`
var dbFactory = new OrmLiteConnectionFactory(connString, SqlServer2012Dialect.Provider);
container.Register<IDbConnectionFactory>(dbFactory);

dbFactory.RegisterConnection("Reporting", pgConnString, PostgreSqlDialect.Provider);
```

The string name provided to `RegisterConnection` must match that provided to the `NamedConnection` property on `CreateCrudServices`.

```csharp
appHost.Plugins.Add(new AutoQueryFeature {
    MaxLimit = 1000,
    //IncludeTotal = true,
    GenerateCrudServices = new GenerateCrudServices()
    {
        // Configure multiple databases, `public` is the default schema.
        CreateServices = new List<CreateCrudServices>
        {
            new CreateCrudServices(),
            new CreateCrudServices { NamedConnection = "Reporting" }
        }
    }
});
```

### Multiple Schemas with Named Connections

These options can be combined so that specific schemas on named connections can also be used.

```csharp
appHost.Plugins.Add(new AutoQueryFeature {
    MaxLimit = 1000,
    //IncludeTotal = true,
    GenerateCrudServices = new GenerateCrudServices()
    {
        // Configure multiple databases, `public` is the default schema.
        CreateServices = new List<CreateCrudServices>
        {
            new CreateCrudServices { NamedConnection = "Reporting" },
            new CreateCrudServices { NamedConnection = "Finance", Schema = "trading" }
        }
    }
});
```

## Customizing Locode App

Locode includes a [declarative dev model](/docs/declarative) where attributes can be used to add additional metadata 
to your services and data model that can be used to enlist additional functionality and enhance the Locode App's UI.

### Dynamically adding attributes

The use of C# attributes to configure your AutoQuery service metadata is optimal for code-first DTOs & Data Models 
but when starting with a Database First dev model, the Types are generated and only exist at runtime which typically 
would prohibit them from being annotated with C# attributes, however
[AutoQuery AutoGen's](https://docs.servicestack.net/autoquery-autogen) `ServiceFilter` and `TypeFilter` lets you
dynamically apply attributes to its generated types at startup.

### Exporting to code-first Types

In addition to enabling access to the same rich declarative functionality ServiceStack
[makes available via attributes](/docs/declarative), 
it also annotates the code-generated types which are retained when moving from database-first to code-first dev model by
[exporting to code-first types](https://docs.servicestack.net/autoquery-autogen#export-code-first-dtos) with:

:::sh
`x csharp https://localhost:5001 -path /crud/all/csharp`
:::

### Annotated Example of Northwind's Customizations

Annotating the Database First code-gen types can be done via the `ServiceFilter` and `TypeFilter` properties on 
`GenerateCrudServices` instructions when registering the `AutoQueryFeature`.

The `ServiceFilter` is called for every Service Operation whilst the `TypesFilter` is called for every code-gen Type 
including Request & Response DTOs. 

To help illustrate some customizations available we've annotated the customizations made to the Northwind Sample SQLite Database
that was used to create the custom [northwind.locode.dev](https://northwind.locode.dev) Locode App:

[![](../public/assets/img/northwind/screenshot.png)](https://northwind.locode.dev/locode/QueryEmployees)

```csharp
Plugins.Add(new AutoQueryFeature {
    MaxLimit = 100,
    GenerateCrudServices = new GenerateCrudServices {
        AutoRegister = true,
        ServiceFilter = (op, req) => {
            // Annotate all Auto generated Request DTOs with [Tag("Northwind")] attribute
            op.Request.AddAttributeIfNotExists(new TagAttribute("Northwind"));
        },
        TypeFilter = (type, req) =>
        {
            // Configure to use Icon for this Type
            if (Icons.TryGetValue(type.Name, out var icon))
                type.AddAttribute(new IconAttribute { Svg = Svg.Create(icon) });

            // Is Employee Data Model or any AutoQuery Employee Request DTO
            if (type.Name == "Employee" || type.IsCrudCreateOrUpdate("Employee"))
            {
                // Remove unused `Photo` column
                type.Properties.RemoveAll(x => x.Name == "Photo");
                
                // Reorder columns from db-schema to the order we want them to appear in the UI
                type.ReorderProperty("PhotoPath", before: "Title")
                    .AddAttribute(new FormatAttribute(FormatMethods.IconRounded));
                type.ReorderProperty("ReportsTo", after: "Title");
                                
                if (type.IsCrud()) // Is AutoQuery Employee Request DTO
                {
                    // Configure to use File Input & upload to 'employees' Managed File Upload location 
                    type.Property("PhotoPath")
                        .AddAttribute(new InputAttribute { Type = Input.Types.File })
                        .AddAttribute(new UploadToAttribute("employees"));
                    
                    // Use TextArea control for larger text inputs
                    type.Property("Notes")
                        .AddAttribute(new InputAttribute { Type = Input.Types.Textarea });
                }
                else if (type.Name == "Employee") // Employee Data Model
                {
                    // Configure Employee FK Relation, utilizing UX-friendly LastName & Employee Lookup   
                    type.Property("ReportsTo").AddAttribute(
                        new RefAttribute { Model = "Employee", RefId = "Id", RefLabel = "LastName" });
                    
                    // Format to use `tel:` link allowing Phone call to be initiated from UI
                    type.Property("HomePhone").AddAttribute(new FormatAttribute(FormatMethods.LinkPhone));
                }
            }
            else if (type.Name == "Order")
            {
                // Customize all Date Columns to use UX-friendly Date Format 
                type.Properties.Where(x => x.Name.EndsWith("Date")).Each(p =>
                    p.AddAttribute(new IntlDateTime(DateStyle.Medium)));
                
                // Format number as USD Currency using JavaScript's Intl.NumberFormat
                type.Property("Freight").AddAttribute(new IntlNumber { Currency = NumberCurrency.USD });
                
                // Configure Shipper FK Relation, utilizing UX-friendly CompanyName & Shipper Lookup   
                type.Property("ShipVia").AddAttribute(
                    new RefAttribute { Model = "Shipper", RefId = "Id", RefLabel = "CompanyName" });
            }
            else if (type.Name == "OrderDetail")
            {
                // Format number as USD Currency using JavaScript's Intl.NumberFormat
                type.Property("UnitPrice").AddAttribute(new IntlNumber { Currency = NumberCurrency.USD });
                // Format as % using JavaScript's Intl.NumberFormat
                type.Property("Discount").AddAttribute(new IntlNumber(NumberStyle.Percent));
            }
            else if (type.Name == "EmployeeTerritory")
            {
                // Configure Territory FK Relation & Lookup, utilizing UX-friendly TerritoryDescription
                type.Property("TerritoryId").AddAttribute(new RefAttribute {
                    Model = "Territory", RefId = "Id", RefLabel = "TerritoryDescription" });
            }
            else if (type.Name is "Customer" or "Supplier" or "Shipper")
            {
                // Format to use `tel:` link allowing Phone call to be initiated from UI
                type.Property("Phone").AddAttribute(new FormatAttribute(FormatMethods.LinkPhone));
                type.Property("Fax")?.AddAttribute(new FormatAttribute(FormatMethods.LinkPhone));
            }
        },
    },
});
```

### Code-gen Customization Helpers

A number of UX-Friendly extension methods are available to reduce effort for applying common customizations to
`MetadataType` and `MetadataPropertyType` blueprints used in code generating .NET Types:

| Type Methods              | Description                                                             |
|---------------------------|-------------------------------------------------------------------------|
| AddAttribute()            | Add Attribute to Type                                                   |
| AddAttributeIfNotExists() | Add Attribute to Type if not already exists                             |
| Property()                | Resolve Property from Type                                              |
| ReorderProperty()         | Reorder where the DB Column appears in Type (changes API & UI ordering) |
| EachProperty()            | Apply custom lambda to each matching property                           |
| RemoveProperty()          | Omit properties from inclusion in code-gen type                         |

| Property Methods          | Description                                                             |
|---------------------------|-------------------------------------------------------------------------|
| AddAttribute()            | Add Attribute to Property                                               |
| AddAttributeIfNotExists() | Add Attribute to Property if not already exists                         |

### Format search results

The [Declarative Attributes docs](/docs/declarative) contains a more complete reference of built-in customizations,
but we'll cover a few the Northwind Locode App uses to illustrate some potential enhancements available.  

An effortless way to add a lot of value to DB Apps is to mark up the raw data stored in RDBMS tables into a UX-friendly
view, an example of this in Northwind is using `FormatMethods.LinkPhone` on the `Phone` and `Fax` properties for 
the `Customer`, `Supplier`, and `Shipper` tables: 

```csharp
if (type.Name is "Customer" or "Supplier" or "Shipper")
{
    type.Property("Phone").AddAttribute(new FormatAttribute(FormatMethods.LinkPhone));
    type.Property("Fax")?.AddAttribute(new FormatAttribute(FormatMethods.LinkPhone));
}
```

To format the phone numbers in `tel:` HTML links enabling 1-click to call, directly from the search results page:

<a href="https://northwind.locode.dev/locode/QueryCustomers" class="hover:no-underline">
<ul class="my-8 grid gap-4 sm:grid-cols-2">
    <li class="rounded-lg m-0 col-span-1 flex flex-col text-center items-center bg-white shadow divide-y divide-gray-200">
        <div class="flex-1 flex flex-col px-4 mt-4">
            <div class="mt-4 p-0 text-xl font-medium text-gray-500">Default</div>
            <div class="rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src="/assets/img/docs/database-first-northwind-format-1.png" alt="">
            </div>
        </div>
    </li>
    <li class="rounded-lg m-0 col-span-1 flex flex-col text-center items-center bg-white shadow divide-y divide-gray-200">
        <div class="flex-1 flex flex-col px-4 mt-4">
            <div class="mt-4 p-0 text-xl font-medium text-gray-500">FormatMethods.LinkPhone</div>
            <div class="rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src="/assets/img/docs/database-first-northwind-format-2.png" alt="">
            </div>
        </div>
    </li>
</ul>
</a>

A complete list of built-in functions can be found in the [Format Functions docs](/docs/formatters), another example used in 
Northwind is `FormatMethods.IconRounded` on `PhotoPath`:

```csharp
if (type.Name == "Employee" || type.IsCrudCreateOrUpdate("Employee"))
{
    type.ReorderProperty("PhotoPath", before: "Title")
        .AddAttribute(new FormatAttribute(FormatMethods.IconRounded));
}
```

To apply the `iconRounded` JavaScript function to render a preview of the Employee profile directly in the search results:

<a href="https://northwind.locode.dev/locode/QueryEmployees" class="hover:no-underline">
<ul class="grid gap-4 sm:grid-cols-2">
    <li class="rounded-lg m-0 col-span-1 flex flex-col text-center items-center bg-white shadow divide-y divide-gray-200">
        <div class="flex-1 flex flex-col px-4 mt-4">
            <div class="mt-4 p-0 text-xl font-medium text-gray-500">Default</div>
            <div class="rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src="/assets/img/docs/database-first-northwind-format-icon-1.png" alt="">
            </div>
        </div>
    </li>
    <li class="rounded-lg m-0 col-span-1 flex flex-col text-center items-center bg-white shadow divide-y divide-gray-200">
        <div class="flex-1 flex flex-col px-4 mt-4">
            <div class="mt-4 p-0 text-xl font-medium text-gray-500">FormatMethods.IconRounded</div>
            <div class="rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src="/assets/img/docs/database-first-northwind-format-icon-2.png" alt="">
            </div>
        </div>
    </li>
</ul>
</a>

`ReorderProperty` is used to change ordering of Table columns which changes the order they're displayed in APIs and UIs. 

::: tip
The original images in Northwind were migrated to reference external images using the following SQL:

```sql
update Employee set PhotoPath = "/profiles/employees/" || Employee.Id || ".jpg"
```

Where its uploads are now managed by the configured `FilesUploadFeature` and built-in File Input UI controls.
:::

### ECMAScript Internationalization APIs

ECMAScript's rich `Intl.NumberFormat`, `Intl.DateTimeFormat` and `Intl.RelativeTimeFormat` APIs are also available from the 
typed [[Intl*] Attributes](/docs/formatters.html#intl-attributes) which `OrderDetail` makes use of to format `UnitPrice`
in **USD Currency** and `Discount` in a **% percentage** format:

```csharp
if (type.Name == "OrderDetail")
{
    type.Property("UnitPrice").AddAttribute(new IntlNumber { Currency = NumberCurrency.USD });
    type.Property("Discount").AddAttribute(new IntlNumber(NumberStyle.Percent));
}
```

This can give a much more contextual view of the data in the returning from our services.

<a href="https://northwind.locode.dev/locode/QueryOrderDetails" class="hover:no-underline">
<ul class="grid gap-4 sm:grid-cols-2">
    <li class="rounded-lg m-0 col-span-1 flex flex-col text-center items-center bg-white shadow divide-y divide-gray-200">
        <div class="flex-1 flex flex-col px-4 mt-4">
            <div class="mt-4 p-0 text-xl font-medium text-gray-500">Default</div>
            <div class="rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src="/assets/img/docs/database-first-northwind-intl-1.png" alt="">
            </div>
        </div>
    </li>
    <li class="rounded-lg m-0 col-span-1 flex flex-col text-center items-center bg-white shadow divide-y divide-gray-200">
        <div class="flex-1 flex flex-col px-4 mt-4">
            <div class="mt-4 p-0 text-xl font-medium text-gray-500">IntlNumber</div>
            <div class="rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src="/assets/img/docs/database-first-northwind-intl-2.png" alt="">
            </div>
        </div>
    </li>
</ul>
</a>

For more customization options, see the [Declarative Attributes docs](/docs/declarative). 