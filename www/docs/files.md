
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

The `TypeFilter` also fires for request and response DTO types, and we can find matching request DTO types from the
desired model name using `IsCrudCreateOrUpdate("Employee")`. This is a dynamic way of applying attributes to our
database model `Employee` and related `CreateEmployee`/`UpdateEmployee` which can be more clearly represented in
a code-first way using the following 3 classes.

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

Our sample Northwind database does store `Photo` as a blobbed data. For the demo, we are removing `Photo` column from
the generated type and repurposing the `PhotoPath` to reference files matching the `Id` of the employee in a registered
`FileSystemVirtualFiles` virtual file source.

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
