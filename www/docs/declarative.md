# Declarative Dev Model using Attributes

A significant amount of behavior, functionality and customization of APIs and DTOs can be achieved declaratively
through C# Attributes which is used extensively by Locode App Demos to achieve its customized behavior by annotating its
C# API Types and Data Models with the extensive functionality available in ServiceStack's Attributes.

A great way to get a quick overview of what annotated DTOs looks like in practice is to browse the DTOs of Locode's
Demos where you'll be able to see & test the cause & effect of different attributes against their Live Demos or
by downloading and running a locally modified copy. 

### Talent Blazor - [talent.locode.dev](https://talent.locode.dev) - [download.zip](https://github.com/NetCoreApps/TalentBlazor/archive/refs/heads/main.zip)

 - [Talent.cs](https://github.com/NetCoreApps/TalentBlazor/blob/main/TalentBlazor.ServiceModel/Talent.cs)

Talent Blazor is a good resource showing how to make use of [Audit CRUD Events](https://docs.servicestack.net/autoquery-audit-log)
where every change is captured in an Executable Crud Audit Event Log and
[AutoApply Behaviors](https://docs.servicestack.net/autoquery-crud#apply-generic-crud-behaviors) to change the behavior of
Delete APIs to implement "Soft Deletes".

### Chinook - [chinook.locode.dev](https://chinook.locode.dev) - [download.zip](https://github.com/NetCoreApps/Chinook/archive/refs/heads/main.zip)

 - [Types/Models.cs](https://github.com/NetCoreApps/Chinook/blob/main/Chinook.ServiceModel/Types/Models.cs)
 - [Media.cs](https://github.com/NetCoreApps/Chinook/blob/main/Chinook.ServiceModel/Media.cs)
 - [Store.cs](https://github.com/NetCoreApps/Chinook/blob/main/Chinook.ServiceModel/Store.cs)

Chinook is a good simple Code-First example that's primarily focused on creating a customized UI in Locode. 

### Northwind Auto - [northwind.locode.dev](https://northwind.locode.dev) - [download.zip](https://github.com/NetCoreApps/NorthwindAuto/archive/refs/heads/master.zip)

 - [Configure.AppHost.cs](https://github.com/NetCoreApps/NorthwindAuto/blob/master/Configure.AppHost.cs)

Whilst Northwind is a [Database-First](/docs/database-first) example, it still has access to the same attributes but are 
instead [dynamically added at runtime](/docs/database-first#modifying-dynamic-types-at-runtime).

## Overview

Annotating APIs and Data Models is the primary way of enlisting existing functionality in ServiceStack where most of the
functionality can be broadly used grouped into major 3 areas:

 - **Data Model Attributes** - For utilizing RDBMS features & customizing how Data Models are mapped to RDBMS Tables
 - **API Attributes** - For customizing the functionality, behavior & accessibility of your APIs
 - **Metadata & UI Attributes** - For documenting APIs metadata and changing their UI & Appearance in UIs 

Locode Apps, ServiceStack APIs and OrmLite Data Models

## Data Model Attributes

### OrmLite Type Attributes

These attributes are used to customize how C# Types configure & map to RDBMS Tables

| Attribute             | Description                                              |
|-----------------------|----------------------------------------------------------|
| `[Alias]`             | Map C# Type Name to an alternative RDBMS Table           |
| `[PostCreateTable]`   | Run Custom SQL immediately after RDBMS table is created  |
| `[PostDropTable]`     | Run Custom SQL immediately after RDBMS table is dropped  |
| `[PreCreateTable]`    | Run Custom SQL immediately before RDBMS table is created |
| `[PostDropTable]`     | Run Custom SQL immediately before RDBMS table is dropped |
| `[Schema]`            | Define which RDBMS Schema Data Model belongs to          |
| `[UniqueConstraint]`  | Define a unique multi column RDBMS column constraint     |

### OrmLite Property Attributes

These attributes are used to customize how C# Properties configure & map to RDBMS Columns

| Attribute           | Description                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| `[Alias]`           | Map C# Property Name to an alternative RDBMS Column name                                            |
| `[AutoId]`          | Auto populate Property with a unique RDBMS generated UUID if supported otherwise with a new C# GUID |
| `[AutoIncrement]`   | Auto populate Primary Key Property with an RDBMS generated Auto Incrementing Integer                |
| `[BelongTo]`        | Populate property from ambiguous column name in the specified joined table type                     |
| `[CheckConstraint]` | Create an Composite RDBMS Index and optional Unique constraint                                      |
| `[Compute]`         | Define that a Property maps to a computed RDBMS column                                              |
| `[Computed]`        | Ignore calculated C# Property from being persisted in RDBMS Table                                   |
| `[CustomField]`     | Create RDBMS using Custom SQL Data Type                                                             |
| `[CustomSelect]`    | Populate property with Custom SELECT expression                                                     |
| `[CustomInsert]`    | Populate INSERT parameter with Custom SQL expression                                                |
| `[CustomUpdate]`    | Populate UPDATE parameter with Custom SQL expression                                                |
| `[DecimalLength]`   | Create RDBMS Column with specified decimal scale & precision                                        |
| `[Default]`         | Create RDBMS Column definition with specified default value                                         |
| `[EnumAsChar]`      | Save Enum value as single char in RDBMS column                                                      |
| `[EnumAsInt]`       | Save Enum integer value in RDBMS column                                                             |
| `[ForeignKey]`      | Define an RDBMS Foreign Key Relationship                                                            |
| `[Ignore]`          | Ignore property from consideration as an RDBMS column                                               |
| `[IgnoreOnUpdate]`  | Ignore this property in UPDATE statements                                                           |
| `[IgnoreOnInsert]`  | Ignore this property in INSERT statements                                                           |
| `[Index]`           | Create an RDBMS Column Index                                                                        |
| `[PrimaryKey]`      | Treat this property is the Primary Key of the table                                                 |
| `[Reference]`       | Define this property as containing a foreign POCO Complex Type Reference                            |
| `[ReferenceField]`  | Populate with a field from a foreign table in AutoQuery and Load* APIs                              |
| `[References]`      | Document a reference to an external Type, used to create simple Foreign Key references              |
| `[Required]`        | Create NOT NULL Column Definitions in RDBMS Create Table statements                                 |
| `[ReturnOnInsert]`  | Indicate property should be included in returning/output clause of SQL INSERT Statements            |
| `[RowVersion]`      | Treat property as an automatically incremented RDBMS Row Version                                    |
| `[StringLength]`    | Define the RDBMS Column Definition variable character length                                        |
| `[Unique]`          | Define a unique RDBMS column constraint                                                             |

In addition to these generic Data Model attributes that work with any [supported RDBMS](https://docs.servicestack.net/ormlite/installation),
there are also [PostgreSQL-specific](https://docs.servicestack.net/ormlite/postgres-features) and 
[SQL Server specific](https://docs.servicestack.net/ormlite/sql-server-features) attributes to unlock their RDBMS-specific features. 

## API Attributes

### Custom Serialization

| Attribute            | Description                                                                          |
|----------------------|--------------------------------------------------------------------------------------|
| `[DataContract]`     | Define Type as DTO Type and change serialization to opt-in `[DataMember]` properties |
| `[DataMember]`       | Include property in Serialization and optionally change serializable Name and Order  |
| `[Flags]`            | Serialize an Enum's integer value instead                                            |
| `[IgnoreDataMember]` | Ignore property from serialization                                                   |

### API Behavior

| Attribute           | Description                                                            |
|---------------------|------------------------------------------------------------------------|
| `[Exclude]`         | Mark types that are to be excluded from metadata & specified endpoints |
| `[ExcludeMetadata]` | Exclude API from all Metadata Services                                 |
| `[Route]`           | Make this API available on the specified user-defined route            |
| `[Restrict]`        | Make this API available on the specified user-defined route            |

### AutoQuery Attributes

| Attribute        | Description                                                  |
|------------------|--------------------------------------------------------------|
| `[AutoApply]`    | Apply built-in composite generic behavior                    |
| `[AutoPopulate]` | Populate data models with generic user & system info         |
| `[AutoFilter]`   | Apply additional pre-configured filters to AutoQuery APIs    |
| `[AutoMap]`      | Map System Input properties to Data Model fields             |
| `[AutoDefault]`  | Specify to fallback default values when not provided         |
| `[AutoIgnore]`   | Ignore mapping Request DTO property to Data Model            |
| `[AutoPopulate]` | Populate data models with generic user & system info         |
| `[AutoUpdate]`   | Change the update behavior to only update non-default values |
| `[QueryDb]`      | Change the default querying behaviour of filter properties   |
| `[QueryDbField]` | Define to use a custom AutoQuery filter                      |

### Validation Attributes

### Authentication Restrictions

These [Request Filter Attributes](https://docs.servicestack.net/filter-attributes) applied to Service Implementation classes
apply to all Service method implementations defined within them.

| Attribute                 | Description                                                                          |
|---------------------------|--------------------------------------------------------------------------------------|
| `[Authenticate]`          | Protect access to this API to Authenticated Users only                               |
| `[RequiredClaim]`         | Protect access to this API to only Authenticated Users with specified Claim          |
| `[RequiredPermission]`    | Protect access to this API to only Authenticated Users assigned with ALL Permissions |
| `[RequiredRole]`          | Protect access to this API to only Authenticated Users assigned with ALL Roles       |
| `[RequiresAnyPermission]` | Protect access to this API to Authenticated Users assigned with ANY Permissions      |
| `[RequiresAnyRole]`       | Protect access to this API to Authenticated Users assigned with ANY Roles            |

### File Uploads

---

## UI Attributes

### Annotate APIs

| Attribute              | Description                                                                      |
|------------------------|----------------------------------------------------------------------------------|
| `[Api]`                | Document a short description for an API Type                                     |
| `[ApiMember]`          | Document a short description for an API Property                                 |
| `[ApiResponse]`        | Document potential API Responses this API could return                           |
| `[ApiAllowableValues]` | Document the allowable values for an API Property                                |
| `[Description]`        | Annotate any Type, Property or Enum with a textual description                   |
| `[Id]`                 | Uniquely identify C# Types and properties with a unique integer in gRPC Services |
| `[Meta]`               | Decorate any type or property with custom metadata                               |
| `[Meta]`               | Decorate any type or property with custom metadata                               |
| `[Range]`              | Document the allowable min and max range for this property                       |
| `[Notes]`              | Document a longer form description about a Type                                  |


### Formatters

### Custom Input Controls

### Lookup UI References

| Attribute            | Description                                                                  |
|----------------------|------------------------------------------------------------------------------|
| `[Input]`            | Customize the HTML Input control for a Property in Auto Form UIs             |
| `[Intl]`             | Configure result field to use JavaScript's Intl formatter                    |
| `[IntlNumber]`       | Configure result field to use JavaScript's Intl.NumberFormat formatter       |
| `[IntlDateTime]`     | Configure result field to use JavaScript's Intl.DateTimeFormat formatter     |
| `[IntlRelativeTime]` | Configure result field to use JavaScript's Intl.RelativeTimeFormat formatter |
| `[Field]`            | Customize a Form Field and HTML Input for a Type's Property                  |
| `[Ref]`              | Define UI References to external Data Models                                 |

