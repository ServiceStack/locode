---
title: Locode - Database-first
---


# Database-first
If you have an existing database with data that needs to be managed directly, a Create, Read, Update, Delete (CRUD) application,
you can configure your ServiceStack application to use AutoQuery Generated Services. This will use your database schema
to generate a working Locode app that can be extended and customized.


## Northwind example
We have an example of this in the [Northwind demo](https://northwind.locode.dev) which provides a way to manage 
all the data in the Northwind database with some customizations to improve usability, all with ~120 lines of C#.

## Create your project

<a href="https://account.servicestack.net/archive/NetCoreTemplates/web?Name=MyLocodeApp" class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-2xl leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  MyLocodeApp
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.646 7.646a.5.5 0 1 1 .708.708L5.707 10l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 10L8.646 8.354a.5.5 0 1 1 .708-.708z"/></svg>
</a>

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

Locode has a number of attributes that can be used to add additional metadata to your services and data model.
This additional metadata in used by the Locode App to enhance the UI and provide additional functionality.

### Branding

The logo at the top left can be changed by configuring the `UiFeature` plugin from your AppHost using `ConfigurePlugin&lt;UiFeature&gt;`.

```csharp
ConfigurePlugin<UiFeature>(feature => 
    feature.Info.BrandIcon = new ImageInfo { Uri = "/logo.svg", Cls = "w-8 h-8 mr-1" });
```

`Uri` is the path of your own logo from the `wwwroot` folder and the `Cls` value is the CSS classes applied to the same element.

<ul role="list" class="m-4 grid grid-cols-2 gap-x-4 gap-y-8 xl:gap-x-8">
  <li class="relative">
    <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
      <img src="/assets/img/docs/database-first-northwind-branding1.png" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
    </div>
    <p class="block text-sm font-medium text-gray-500 pointer-events-none">Default</p>
  </li>
  <li class="relative">
    <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
      <img src="/assets/img/docs/database-first-northwind-branding2.png" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
    </div>
    <p class="block text-sm font-medium text-gray-500 pointer-events-none">Custom branding</p>
  </li>
</ul>

### Adding attributes at runtime

The use of C# attributes to configure your AutoQuery service metadata works well for declared classes but can also be applied dynamically at startup for generated services.
Locode uses a number of attributes on your data model type (related to each table in your database), and API request Data Transfer Object (DTO).

The `ServiceFilter` and `TypeFilter` properties on `GenerateCrudServices` are `Action`s you can override run at startup.
The `ServiceFilter` is called with every Service Operation when generating metadata for your services.
Here we can add attributes to the generated request DTOs using the `AddAttributes` or `AddAttributeIfNotExists` method.

### Grouping your services with `Tag`

To group the Northwind services under the same `Tag` name for the left menu in Locode, we can use the `Tag` attribute.

```csharp
GenerateCrudServices = new GenerateCrudServices {
    AutoRegister = true,
    ServiceFilter = (op, req) => {
        // Annotate all Auto generated Request DTOs with [Tag("Northwind")] attribute
        op.Request.AddAttributeIfNotExists(new TagAttribute("Northwind"));
    },
```

Instead of `Tables` we can now see our `Northwind` tag in the Locode app UI.

<ul role="list" class="m-4 grid grid-cols-2 gap-x-4 gap-y-8 xl:gap-x-8">
  <li class="relative">
    <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
      <img src="/assets/img/docs/database-first-northwind-branding2.png" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
    </div>
    <p class="block text-sm font-medium text-gray-500 pointer-events-none">Default "Tables"</p>
  </li>
  <li class="relative">
    <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
      <img src="/assets/img/docs/database-first-northwind-tags.png" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
    </div>
    <p class="block text-sm font-medium text-gray-500 pointer-events-none">Custom Tag</p>
  </li>
</ul>

As more non-unique `Tag` names are added, additional drop down menus will be created to group your services together.

### Custom table `Icon`

On database model classes, the `Icon` attribute can be used with a `Uri` or `Svg` to style the table in the left menu and when 
lookup data is displayed. For example, if we use the `TypeFilter` to access the data model types, we can apply the `Icon` attribute dynamically
to `Order` it will impact the tables that reference `Order`.

```csharp
TypeFilter = (type, req) =>
{
    if (Icons.TryGetValue(type.Name, out var icon))
        type.AddAttribute(new IconAttribute { Svg = Svg.Create(icon) });
    ...
}

public static Dictionary<string, string> Icons { get; } = new()
{
    ["Order"] =
        "<path fill='currentColor' ...",
};
```

<ul role="list" class="m-4 grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-8 xl:gap-x-8">
  <li class="relative">
    <div class="group block w-full aspect-w-13 aspect-h-6 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
      <img src="/assets/img/docs/database-first-northwind-icons-default.png" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
    </div>
    <p class="block text-sm font-medium text-gray-500 pointer-events-none">Default Icon</p>
  </li>
  <li class="relative">
    <div class="group block w-full aspect-w-13 aspect-h-6  rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
      <img src="/assets/img/docs/database-first-northwind-icons-custom.png" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
    </div>
    <p class="block text-sm font-medium text-gray-500 pointer-events-none">Custom Icon</p>
  </li>
</ul>

### Managed Files Uploads

A high level feature that integrates with Locode is the `FileUploadFeature` plugin which is combined with `VirtualFileSource`.
This enables a way to associate a file path that can be stored in your custom tables which is mapped to a `VirtualFileSource`,
which means the uploaded files don't live in the database itself taking up a lot of room, the database only stores the reference.

```csharp
var wwwrootVfs = GetVirtualFileSource<FileSystemVirtualFiles>();
Plugins.Add(new FilesUploadFeature(
    new UploadLocation("employees", wwwrootVfs, allowExtensions: FileExt.WebImages,
        writeAccessRole: RoleNames.AllowAnon,
        resolvePath: ctx => $"/profiles/employees/{ctx.Dto.GetId()}.{ctx.FileExtension}")));
```

The `UploadLocation` is a named mapping which is then referenced on the data model column which stores the *path* only.
This reference is made using the `UploadTo` attribute specifying the matching name, eg "employees".

The `TypeFilter` also fires for request and response DTO types, and we can find matching request DTO types from the desired model name 
using `IsCrudCreateOrUpdate("Employee")`. This is a dynamic way of applying attributes to our database model `Employee` and related `CreateEmployee`/`UpdateEmployee` 
which can be more clearly represented in a code-first way using the following 3 classes. 

```csharp
// Generated database model
public class Employee
{
    ...
    [Format(FormatMethods.IconRounded)]
    public string PhotoPath { get;set; }
    ...
}

// Generated Request DTO for create
public class CreateEmployee : ICreateDb<Employee>, IReturn<IdResponse>
{
    ...
    [Input(Type=Input.Types.File)]
    [UploadTo("employees")]
    public string PhotoPath { get;set; }
}

// Generated Request DTO for create
public class UpdateEmployee : IPatchDb<Employee>, IReturn<IdResponse>
{
    ...
    [Input(Type=Input.Types.File)]
    [UploadTo("employees")]
    public string PhotoPath { get;set; }
}
```

This is done dynamically using the following code found in the `Northwind` Locode demo.

```csharp
```csharp
TypeFilter = (type, req) =>
{
    ...
    if (type.Name == "Employee" || type.IsCrudCreateOrUpdate("Employee"))
    {
        ...
        if (type.IsCrud())
        {
            type.Property("PhotoPath")
                .AddAttribute(new InputAttribute { Type = Input.Types.File })
                .AddAttribute(new UploadToAttribute("employees"));
        }
    }
    ...
}
```

Our sample Northwind database does store `Photo` as a blobbed data. For the demo, we are removing `Photo` column from the generated type 
and repurposing the `PhotoPath` to reference files matching the `Id` of the employee in a registered `FileSystemVirtualFiles` virtual file source.

::: tip
If files are stored in the database, to use the `FilesUploadFeature` they would need to be migrated out to a supported storage
:::

```csharp
TypeFilter = (type, req) =>
{
    ...
    if (type.Name == "Employee" || type.IsCrudCreateOrUpdate("Employee"))
    {
        type.Properties.RemoveAll(x => x.Name == "Photo");
        ...
    }
    ...
}
```
