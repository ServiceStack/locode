# Customize declaratively with Attributes

A significant amount of customization of Locode Apps, ServiceStack APIs and OrmLite Data Models can be achieved declaratively
through C# Attributes which is used extensively by Locode App Demos to achieve its customized behavior by annotating its
C# API **DTOs** with the rich functionality available in ServiceStack's Attributes:

### Talent Blazor - [talent.locode.dev](https://talent.locode.dev)

 - [Talent.cs](https://github.com/NetCoreApps/TalentBlazor/blob/main/TalentBlazor.ServiceModel/Talent.cs)

### Chinook - [chinook.locode.dev](https://chinook.locode.dev)

 - [Types/Models.cs](https://github.com/NetCoreApps/Chinook/blob/main/Chinook.ServiceModel/Types/Models.cs)
 - [Media.cs](https://github.com/NetCoreApps/Chinook/blob/main/Chinook.ServiceModel/Media.cs)
 - [Store.cs](https://github.com/NetCoreApps/Chinook/blob/main/Chinook.ServiceModel/Store.cs)

### Northwind Auto - [northwind.locode.dev](https://northwind.locode.dev)

 - [Configure.AppHost.cs](https://github.com/NetCoreApps/NorthwindAuto/blob/master/Configure.AppHost.cs)

When you've started with a [Database First](/docs/database-first) development model the Types are generated and only
exist at runtime which typically would prohibit them from being annotated with C# attributes, however
[AutoQuery AutoGen's](https://docs.servicestack.net/autoquery-autogen) `ServiceFilter` and `TypeFilter` lets you
customize

```csharp
Plugins.Add(new AutoQueryFeature {
    GenerateCrudServices = new GenerateCrudServices {
        AutoRegister = true,
        ServiceFilter = (op, req) => {
            // Annotate all Auto generated Request DTOs with [Tag("Northwind")] attribute
            op.Request.AddAttributeIfNotExists(new TagAttribute("Northwind"));
        },
        TypeFilter = (type, req) =>
        {
            if (Icons.TryGetValue(type.Name, out var icon))
                type.AddAttribute(new IconAttribute { Svg = Svg.Create(icon) });

            if (type.IsCrudCreateOrUpdate("Employee"))
            {
                type.Properties.RemoveAll(x => x.Name == "Photo");
                type.ReorderProperty("PhotoPath", before: "Title")
                    .AddAttribute(new FormatAttribute(FormatMethods.IconRounded));
                type.ReorderProperty("ReportsTo", after: "Title");
                if (type.IsCrud())
                {
                    type.Property("PhotoPath")
                        .AddAttribute(new InputAttribute { Type = Input.Types.File })
                        .AddAttribute(new UploadToAttribute("employees"));
                    type.Property("Notes")
                        .AddAttribute(new InputAttribute { Type = Input.Types.Textarea });
                }
            }
            else if (type.Name == "Order")
            {
                type.Properties.Where(x => x.Name.EndsWith("Date")).Each(p =>
                    p.AddAttribute(new IntlDateTime(DateStyle.Medium)));
                type.Property("Freight").AddAttribute(new IntlNumber { Currency = NumberCurrency.USD });
                type.Property("ShipVia").AddAttribute(
                    new RefAttribute { Model = "Shipper", RefId = "Id", RefLabel = "CompanyName" });
            }
            else if (type.Name is "Customer" or "Supplier" or "Shipper")
            {
                type.Property("Phone").AddAttribute(new FormatAttribute(FormatMethods.LinkPhone));
                type.Property("Fax")?.AddAttribute(new FormatAttribute(FormatMethods.LinkPhone));
            }
        },
    },
});
```

## Customize Schema with OrmLite Attributes

## Auth & Validation Rules

## Annotate APIs

## AutoQuery Behaviour

## Formatters

## Custom Input Controls

## Lookup References

## File Uploads
