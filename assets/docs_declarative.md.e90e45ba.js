import{_ as t,c as e,o as a,a as r}from"./app.ef23f79a.js";const b='{"title":"Declarative Dev Model using Attributes","description":"","frontmatter":{},"headers":[{"level":3,"title":"Talent Blazor - talent.locode.dev - download.zip","slug":"talent-blazor-talent-locode-dev-download-zip"},{"level":3,"title":"Chinook - chinook.locode.dev - download.zip","slug":"chinook-chinook-locode-dev-download-zip"},{"level":3,"title":"Northwind Auto - northwind.locode.dev - download.zip","slug":"northwind-auto-northwind-locode-dev-download-zip"},{"level":2,"title":"Overview","slug":"overview"},{"level":2,"title":"Data Model Attributes","slug":"data-model-attributes"},{"level":3,"title":"Table Data Model Attributes","slug":"table-data-model-attributes"},{"level":3,"title":"Column Property Attributes","slug":"column-property-attributes"},{"level":2,"title":"API Attributes","slug":"api-attributes"},{"level":3,"title":"Custom Serialization","slug":"custom-serialization"},{"level":3,"title":"Generic API Behavior","slug":"generic-api-behavior"},{"level":3,"title":"AutoQuery Attributes","slug":"autoquery-attributes"},{"level":3,"title":"AutoQuery CRUD Attributes","slug":"autoquery-crud-attributes"},{"level":3,"title":"Type Validation Attributes","slug":"type-validation-attributes"},{"level":3,"title":"Property Validation Attributes","slug":"property-validation-attributes"},{"level":3,"title":"Authentication Restrictions","slug":"authentication-restrictions"},{"level":2,"title":"UI & Metadata Attributes","slug":"ui-metadata-attributes"},{"level":3,"title":"Annotate APIs","slug":"annotate-apis"},{"level":3,"title":"Customize UI","slug":"customize-ui"},{"level":3,"title":"Result Formatters","slug":"result-formatters"},{"level":3,"title":"Custom Fields and Input Controls","slug":"custom-fields-and-input-controls"}],"relativePath":"docs/declarative.md"}',o={},d=r('<h1 id="declarative-dev-model-using-attributes" tabindex="-1">Declarative Dev Model using Attributes <a class="header-anchor" href="#declarative-dev-model-using-attributes" aria-hidden="true">#</a></h1><p>A significant amount of behavior, functionality and customization of APIs and DTOs can be achieved declaratively through C# Attributes which is used extensively by Locode App Demos to achieve its customized behavior by annotating its C# API Types and Data Models with the extensive functionality available in ServiceStack&#39;s Attributes.</p><p>A great way to get a quick overview of what annotated DTOs looks like in practice is to browse the DTOs of Locode&#39;s Demos where you&#39;ll be able to see &amp; test the cause &amp; effect of different attributes against their Live Demos or by downloading and running a locally modified copy.</p><h3 id="talent-blazor-talent-locode-dev-download-zip" tabindex="-1">Talent Blazor - <a href="https://talent.locode.dev" target="_blank" rel="noopener noreferrer">talent.locode.dev</a> - <a href="https://github.com/NetCoreApps/TalentBlazor/archive/refs/heads/main.zip" target="_blank" rel="noopener noreferrer">download.zip</a> <a class="header-anchor" href="#talent-blazor-talent-locode-dev-download-zip" aria-hidden="true">#</a></h3><ul><li><a href="https://github.com/NetCoreApps/TalentBlazor/blob/main/TalentBlazor.ServiceModel/Talent.cs" target="_blank" rel="noopener noreferrer">Talent.cs</a></li></ul><p>Talent Blazor is a good resource showing how to make use of <a href="https://docs.servicestack.net/autoquery-audit-log" target="_blank" rel="noopener noreferrer">Audit CRUD Events</a> where every change is captured in an Executable Crud Audit Event Log and <a href="https://docs.servicestack.net/autoquery-crud#apply-generic-crud-behaviors" target="_blank" rel="noopener noreferrer">AutoApply Behaviors</a> to change the behavior of Delete APIs to implement &quot;Soft Deletes&quot;.</p><h3 id="chinook-chinook-locode-dev-download-zip" tabindex="-1">Chinook - <a href="https://chinook.locode.dev" target="_blank" rel="noopener noreferrer">chinook.locode.dev</a> - <a href="https://github.com/NetCoreApps/Chinook/archive/refs/heads/main.zip" target="_blank" rel="noopener noreferrer">download.zip</a> <a class="header-anchor" href="#chinook-chinook-locode-dev-download-zip" aria-hidden="true">#</a></h3><ul><li><a href="https://github.com/NetCoreApps/Chinook/blob/main/Chinook.ServiceModel/Types/Models.cs" target="_blank" rel="noopener noreferrer">Types/Models.cs</a></li><li><a href="https://github.com/NetCoreApps/Chinook/blob/main/Chinook.ServiceModel/Media.cs" target="_blank" rel="noopener noreferrer">Media.cs</a></li><li><a href="https://github.com/NetCoreApps/Chinook/blob/main/Chinook.ServiceModel/Store.cs" target="_blank" rel="noopener noreferrer">Store.cs</a></li></ul><p>Chinook is a good simple Code-First example that&#39;s primarily focused on creating a customized UI in Locode.</p><h3 id="northwind-auto-northwind-locode-dev-download-zip" tabindex="-1">Northwind Auto - <a href="https://northwind.locode.dev" target="_blank" rel="noopener noreferrer">northwind.locode.dev</a> - <a href="https://github.com/NetCoreApps/NorthwindAuto/archive/refs/heads/master.zip" target="_blank" rel="noopener noreferrer">download.zip</a> <a class="header-anchor" href="#northwind-auto-northwind-locode-dev-download-zip" aria-hidden="true">#</a></h3><ul><li><a href="https://github.com/NetCoreApps/NorthwindAuto/blob/master/Configure.AppHost.cs" target="_blank" rel="noopener noreferrer">Configure.AppHost.cs</a></li></ul><p>Whilst Northwind is a <a href="/docs/database-first.html">Database-First</a> example, it still has access to the same attributes but are instead <a href="/docs/database-first.html#modifying-dynamic-types-at-runtime">dynamically added at runtime</a>.</p><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>Annotating APIs and Data Models is the primary way of enlisting existing functionality in ServiceStack where most of the functionality can be broadly grouped into customizing how Data Models map to RDBMS tables and make use of RDBMS features, customizing API behavior and annotating &amp; documenting APIs to customize their appearance in UIs.</p><h2 id="data-model-attributes" tabindex="-1">Data Model Attributes <a class="header-anchor" href="#data-model-attributes" aria-hidden="true">#</a></h2><p>These Data Model attributes can be used to utilize RDBMS features &amp; customize how Types are mapped to RDBMS Tables.</p><h3 id="table-data-model-attributes" tabindex="-1">Table Data Model Attributes <a class="header-anchor" href="#table-data-model-attributes" aria-hidden="true">#</a></h3><p>These OrmLite attributes can be used to customize how C# Types configure &amp; map to RDBMS Tables.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[Alias]</code></td><td>Map C# Type Name to an alternative RDBMS Table</td></tr><tr><td><code>[PostCreateTable]</code></td><td>Run Custom SQL immediately after RDBMS table is created</td></tr><tr><td><code>[PostDropTable]</code></td><td>Run Custom SQL immediately after RDBMS table is dropped</td></tr><tr><td><code>[PreCreateTable]</code></td><td>Run Custom SQL immediately before RDBMS table is created</td></tr><tr><td><code>[PostDropTable]</code></td><td>Run Custom SQL immediately before RDBMS table is dropped</td></tr><tr><td><code>[Schema]</code></td><td>Define which RDBMS Schema Data Model belongs to</td></tr><tr><td><code>[UniqueConstraint]</code></td><td>Define a unique multi column RDBMS column constraint</td></tr></tbody></table><h3 id="column-property-attributes" tabindex="-1">Column Property Attributes <a class="header-anchor" href="#column-property-attributes" aria-hidden="true">#</a></h3><p>These OrmLite attributes are used to customize how C# Properties configure &amp; map to RDBMS Columns.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[Alias]</code></td><td>Map C# Property Name to an alternative RDBMS Column name</td></tr><tr><td><code>[AutoId]</code></td><td>Auto populate Property with a unique RDBMS generated UUID if supported otherwise with a new C# GUID</td></tr><tr><td><code>[AutoIncrement]</code></td><td>Auto populate Primary Key Property with an RDBMS generated Auto Incrementing Integer</td></tr><tr><td><code>[BelongTo]</code></td><td>Populate property from ambiguous column name in the specified joined table type</td></tr><tr><td><code>[CheckConstraint]</code></td><td>Create an Composite RDBMS Index and optional Unique constraint</td></tr><tr><td><code>[Compute]</code></td><td>Define that a Property maps to a computed RDBMS column</td></tr><tr><td><code>[Computed]</code></td><td>Ignore calculated C# Property from being persisted in RDBMS Table</td></tr><tr><td><code>[CustomField]</code></td><td>Create RDBMS using Custom SQL Data Type</td></tr><tr><td><code>[CustomSelect]</code></td><td>Populate property with Custom SELECT expression</td></tr><tr><td><code>[CustomInsert]</code></td><td>Populate INSERT parameter with Custom SQL expression</td></tr><tr><td><code>[CustomUpdate]</code></td><td>Populate UPDATE parameter with Custom SQL expression</td></tr><tr><td><code>[DecimalLength]</code></td><td>Create RDBMS Column with specified decimal scale &amp; precision</td></tr><tr><td><code>[Default]</code></td><td>Create RDBMS Column definition with specified default value</td></tr><tr><td><code>[EnumAsChar]</code></td><td>Save Enum value as single char in RDBMS column</td></tr><tr><td><code>[EnumAsInt]</code></td><td>Save Enum integer value in RDBMS column</td></tr><tr><td><code>[ForeignKey]</code></td><td>Define an RDBMS Foreign Key Relationship</td></tr><tr><td><code>[Ignore]</code></td><td>Ignore property from consideration as an RDBMS column</td></tr><tr><td><code>[IgnoreOnUpdate]</code></td><td>Ignore this property in UPDATE statements</td></tr><tr><td><code>[IgnoreOnInsert]</code></td><td>Ignore this property in INSERT statements</td></tr><tr><td><code>[Index]</code></td><td>Create an RDBMS Column Index</td></tr><tr><td><code>[PrimaryKey]</code></td><td>Treat this property is the Primary Key of the table</td></tr><tr><td><code>[Reference]</code></td><td>Define this property as containing a foreign POCO Complex Type Reference</td></tr><tr><td><code>[ReferenceField]</code></td><td>Populate with a field from a foreign table in AutoQuery and Load* APIs</td></tr><tr><td><code>[References]</code></td><td>Document a reference to an external Type, used to create simple Foreign Key references</td></tr><tr><td><code>[Required]</code></td><td>Create NOT NULL Column Definitions in RDBMS Create Table statements</td></tr><tr><td><code>[ReturnOnInsert]</code></td><td>Indicate property should be included in returning/output clause of SQL INSERT Statements</td></tr><tr><td><code>[RowVersion]</code></td><td>Treat property as an automatically incremented RDBMS Row Version</td></tr><tr><td><code>[StringLength]</code></td><td>Define the RDBMS Column Definition variable character length</td></tr><tr><td><code>[Unique]</code></td><td>Define a unique RDBMS column constraint</td></tr></tbody></table><p>In addition to these generic Data Model attributes that work with any <a href="https://docs.servicestack.net/ormlite/installation" target="_blank" rel="noopener noreferrer">supported RDBMS</a>, there are also <a href="https://docs.servicestack.net/ormlite/postgres-features" target="_blank" rel="noopener noreferrer">PostgreSQL-specific</a> and <a href="https://docs.servicestack.net/ormlite/sql-server-features" target="_blank" rel="noopener noreferrer">SQL Server specific</a> attributes to unlock their respective RDBMS-specific features.</p><h2 id="api-attributes" tabindex="-1">API Attributes <a class="header-anchor" href="#api-attributes" aria-hidden="true">#</a></h2><p>Use the Attributes to customize the functionality, behavior &amp; accessibility of your APIs, and they&#39;re available endpoints.</p><h3 id="custom-serialization" tabindex="-1">Custom Serialization <a class="header-anchor" href="#custom-serialization" aria-hidden="true">#</a></h3><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[DataContract]</code></td><td>Define Type as DTO Type and change serialization to opt-in <code>[DataMember]</code> properties</td></tr><tr><td><code>[DataMember]</code></td><td>Include property in Serialization and optionally change serializable Name and Order</td></tr><tr><td><code>[Flags]</code></td><td>Serialize an Enum&#39;s integer value instead</td></tr><tr><td><code>[IgnoreDataMember]</code></td><td>Ignore property from serialization</td></tr></tbody></table><h3 id="generic-api-behavior" tabindex="-1">Generic API Behavior <a class="header-anchor" href="#generic-api-behavior" aria-hidden="true">#</a></h3><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[Exclude]</code></td><td>Instruct which APIs should be excluded from metadata &amp; specified endpoints</td></tr><tr><td><code>[Route]</code></td><td>Make this API available on the specified user-defined route</td></tr><tr><td><code>[Restrict]</code></td><td>Restrict the accessibility of a service and its visibility in Metadata services</td></tr><tr><td><code>[UploadTo]</code></td><td>Specify which File Upload location should be used to manage these file uploads</td></tr></tbody></table><p>More information on usage of these attributes can be found in <a href="https://docs.servicestack.net/routing" target="_blank" rel="noopener noreferrer">Routing </a> Docs, <a href="https://docs.servicestack.net/auth-restricting-services" target="_blank" rel="noopener noreferrer">Restricting Services</a> and <a href="/docs/files.html">Managed File Uploads</a> Docs.</p><h3 id="autoquery-attributes" tabindex="-1">AutoQuery Attributes <a class="header-anchor" href="#autoquery-attributes" aria-hidden="true">#</a></h3><p>These attributes can be used to customize the querying behavior of <a href="https://docs.servicestack.net/autoquery-rdbms" target="_blank" rel="noopener noreferrer">AutoQuery APIs</a>.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[QueryDb]</code></td><td>Change the default querying behaviour of AutoQuery filter properties</td></tr><tr><td><code>[QueryDbField]</code></td><td>Define field to use a custom AutoQuery filter</td></tr></tbody></table><h3 id="autoquery-crud-attributes" tabindex="-1">AutoQuery CRUD Attributes <a class="header-anchor" href="#autoquery-crud-attributes" aria-hidden="true">#</a></h3><p>Use these attributes to customize the behavior of <a href="https://docs.servicestack.net/autoquery-crud" target="_blank" rel="noopener noreferrer">AutoQuery CRUD APIs</a>.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[AutoApply]</code></td><td>Apply built-in composite generic behavior</td></tr><tr><td><code>[AutoPopulate]</code></td><td>Populate data models with generic user &amp; system info</td></tr><tr><td><code>[AutoFilter]</code></td><td>Apply additional pre-configured filters to AutoQuery APIs</td></tr><tr><td><code>[AutoMap]</code></td><td>Map System Input properties to Data Model fields</td></tr><tr><td><code>[AutoDefault]</code></td><td>Specify to fallback default values when not provided</td></tr><tr><td><code>[AutoIgnore]</code></td><td>Ignore mapping Request DTO property to Data Model</td></tr><tr><td><code>[AutoPopulate]</code></td><td>Populate data models with generic user &amp; system info</td></tr><tr><td><code>[AutoUpdate]</code></td><td>Change the update behavior to only update non-default values</td></tr></tbody></table><h3 id="type-validation-attributes" tabindex="-1">Type Validation Attributes <a class="header-anchor" href="#type-validation-attributes" aria-hidden="true">#</a></h3><p>As AutoQuery APIs typically don&#39;t have a Service implementation, the recommended way to protect access to them is to use the declarative <a href="https://docs.servicestack.net/declarative-validation#type-validators" target="_blank" rel="noopener noreferrer">Type Validators</a> below as they&#39;re decoupled from any implementation and can be safely annotated on Request DTOs without requiring any implementation dependencies.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[ValidateRequest]</code></td><td>Validate Type against a custom Validator expression</td></tr><tr><td><code>[ValidateIsAuthenticated]</code></td><td>Protect access to this API to Authenticated Users only</td></tr><tr><td><code>[ValidateIsAdmin]</code></td><td>Protect access to this API to Admin Users only</td></tr><tr><td><code>[ValidateHasPermission]</code></td><td>Protect access to this API to only Users assigned with ALL Permissions</td></tr><tr><td><code>[ValidateHasRole]</code></td><td>Protect access to this API to only Users assigned with ALL Roles</td></tr></tbody></table><h3 id="property-validation-attributes" tabindex="-1">Property Validation Attributes <a class="header-anchor" href="#property-validation-attributes" aria-hidden="true">#</a></h3><p>The <a href="https://docs.servicestack.net/declarative-validation#type-validators" target="_blank" rel="noopener noreferrer">Declarative Validation</a> attributes enable an alternative way of defining <a href="https://docs.servicestack.net/validation" target="_blank" rel="noopener noreferrer">Fluent Validation rules</a> on properties.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[Validate]</code></td><td>Validate property against custom Validator expression</td></tr><tr><td><code>[ValidateCreditCard]</code></td><td>Validate property against Fluent Validation CreditCardValidator</td></tr><tr><td><code>[ValidateEmail]</code></td><td>Validate property against Fluent&#39;s AspNetCoreCompatibleEmailValidator</td></tr><tr><td><code>[ValidateEmpty]</code></td><td>Validate property against Fluent Validation EmptyValidator</td></tr><tr><td><code>[ValidateEqual]</code></td><td>Validate property against Fluent Validation EqualValidator</td></tr><tr><td><code>[ValidateExactLength]</code></td><td>Validate property against Fluent Validation ExactLengthValidator</td></tr><tr><td><code>[ValidateExclusiveBetween]</code></td><td>Validate property against Fluent Validation ExclusiveBetweenValidator</td></tr><tr><td><code>[ValidateGreaterThan]</code></td><td>Validate property against Fluent Validation GreaterThanValidator</td></tr><tr><td><code>[ValidateGreaterThanOrEqual]</code></td><td>Validate property against Fluent Validation GreaterThanOrEqualValidator</td></tr><tr><td><code>[ValidateInclusiveBetween]</code></td><td>Validate property against Fluent Validation InclusiveBetweenValidator</td></tr><tr><td><code>[ValidateLength]</code></td><td>Validate property against Fluent Validation LengthValidator</td></tr><tr><td><code>[ValidateLessThan]</code></td><td>Validate property against Fluent Validation LessThanValidator</td></tr><tr><td><code>[ValidateLessThanOrEqual]</code></td><td>Validate property against Fluent Validation LessThanOrEqualValidator</td></tr><tr><td><code>[ValidateMaximumLength]</code></td><td>Validate property against Fluent Validation MaximumLengthValidator</td></tr><tr><td><code>[ValidateMinimumLength]</code></td><td>Validate property against Fluent Validation MinimumLengthValidator</td></tr><tr><td><code>[ValidateNotEmpty]</code></td><td>Validate property against Fluent Validation NotEmptyValidator</td></tr><tr><td><code>[ValidateNotEqual]</code></td><td>Validate property against Fluent Validation NotEqualValidator</td></tr><tr><td><code>[ValidateNotNull]</code></td><td>Validate property against Fluent Validation NotNullValidator</td></tr><tr><td><code>[ValidateNull]</code></td><td>Validate property against Fluent Validation NullValidator</td></tr><tr><td><code>[ValidateRegularExpression]</code></td><td>Validate property against Fluent Validation RegularExpressionValidator</td></tr><tr><td><code>[ValidateScalePrecision]</code></td><td>Validate property against Fluent Validation ScalePrecisionValidator</td></tr></tbody></table><h3 id="authentication-restrictions" tabindex="-1">Authentication Restrictions <a class="header-anchor" href="#authentication-restrictions" aria-hidden="true">#</a></h3><p>These <a href="https://docs.servicestack.net/filter-attributes" target="_blank" rel="noopener noreferrer">Request Filter Attributes</a> applied to Service Implementation classes apply to all Service method implementations contained within them.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[Authenticate]</code></td><td>Protect access to this API to Authenticated Users only</td></tr><tr><td><code>[RequiredClaim]</code></td><td>Protect access to this API to only Authenticated Users with specified Claim</td></tr><tr><td><code>[RequiredPermission]</code></td><td>Protect access to this API to only Authenticated Users assigned with ALL Permissions</td></tr><tr><td><code>[RequiredRole]</code></td><td>Protect access to this API to only Authenticated Users assigned with ALL Roles</td></tr><tr><td><code>[RequiresAnyPermission]</code></td><td>Protect access to this API to Authenticated Users assigned with ANY Permissions</td></tr><tr><td><code>[RequiresAnyRole]</code></td><td>Protect access to this API to Authenticated Users assigned with ANY Roles</td></tr></tbody></table><p>Refer to <a href="https://docs.servicestack.net/authentication-and-authorization#the-authenticate-attribute" target="_blank" rel="noopener noreferrer">Authentication Attribute docs</a> for more info.</p><h2 id="ui-metadata-attributes" tabindex="-1">UI &amp; Metadata Attributes <a class="header-anchor" href="#ui-metadata-attributes" aria-hidden="true">#</a></h2><p>These attributes can be used to document and annotate APIs which will customize how they&#39;re documented and appear in Metadata services, <a href="https://docs.servicestack.net/add-servicestack-reference" target="_blank" rel="noopener noreferrer">Add ServiceStack Reference</a> generated DTOs and metadata driven, capability-based Auto UIs like <a href="https://docs.servicestack.net/api-explorer" target="_blank" rel="noopener noreferrer">API Explorer</a>, <a href="https://locode.dev" target="_blank" rel="noopener noreferrer">Locode</a> and <a href="https://docs.servicestack.net/openapi" target="_blank" rel="noopener noreferrer">Swagger UI</a>.</p><h3 id="annotate-apis" tabindex="-1">Annotate APIs <a class="header-anchor" href="#annotate-apis" aria-hidden="true">#</a></h3><p>Whilst they can change how they appear and are accessed by external clients, it&#39;s important to note that they do not have any impact on the behavior &amp; functionality of back-end APIs, i.e. your preferred <a href="https://docs.servicestack.net/validation" target="_blank" rel="noopener noreferrer">validation method</a> is still required in order to enforce validation.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[Api]</code></td><td>Document a short description for an API Type</td></tr><tr><td><code>[ApiMember]</code></td><td>Document a short description for an API Property</td></tr><tr><td><code>[ApiResponse]</code></td><td>Document potential API Responses this API could return</td></tr><tr><td><code>[ApiAllowableValues]</code></td><td>Document the allowable values for an API Property</td></tr><tr><td><code>[Description]</code></td><td>Annotate any Type, Property or Enum with a textual description</td></tr><tr><td><code>[ExcludeMetadata]</code></td><td>Exclude API from all Metadata Services</td></tr><tr><td><code>[Id]</code></td><td>Uniquely identify C# Types and properties with a unique integer in gRPC Services</td></tr><tr><td><code>[Meta]</code></td><td>Decorate any type or property with custom metadata</td></tr><tr><td><code>[Meta]</code></td><td>Decorate any type or property with custom metadata</td></tr><tr><td><code>[Range]</code></td><td>Document the allowable min and max range for this property</td></tr><tr><td><code>[Required]</code></td><td>Document that this is a required property</td></tr><tr><td><code>[Notes]</code></td><td>Document a longer form description about a Type</td></tr></tbody></table><h3 id="customize-ui" tabindex="-1">Customize UI <a class="header-anchor" href="#customize-ui" aria-hidden="true">#</a></h3><p>These UI attributes can be used to customize Auto UI Form fields and how search results are rendered.</p><h3 id="result-formatters" tabindex="-1">Result Formatters <a class="header-anchor" href="#result-formatters" aria-hidden="true">#</a></h3><p>Refer to the <a href="/docs/formatters.html">Formatters docs</a> for more info on how to use formatters to customize search results.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[Intl]</code></td><td>Configure result field to use JavaScript&#39;s Intl formatter</td></tr><tr><td><code>[IntlNumber]</code></td><td>Configure result field to use JavaScript&#39;s Intl.NumberFormat formatter</td></tr><tr><td><code>[IntlDateTime]</code></td><td>Configure result field to use JavaScript&#39;s Intl.DateTimeFormat formatter</td></tr><tr><td><code>[IntlRelativeTime]</code></td><td>Configure result field to use JavaScript&#39;s Intl.RelativeTimeFormat formatter</td></tr><tr><td><code>[Ref]</code></td><td>Configure Lookup fields to use UI References to external Data Models</td></tr></tbody></table><h3 id="custom-fields-and-input-controls" tabindex="-1">Custom Fields and Input Controls <a class="header-anchor" href="#custom-fields-and-input-controls" aria-hidden="true">#</a></h3><p>These attributes can be used to customize how fields and HTML Input controls in Auto UIs like <a href="https://locode.dev" target="_blank" rel="noopener noreferrer">Locode</a> and <a href="https://docs.servicestack.net/api-explorer" target="_blank" rel="noopener noreferrer">API Explorer</a>.</p><table><thead><tr><th>Attribute</th><th>Description</th></tr></thead><tbody><tr><td><code>[Input]</code></td><td>Customize the HTML Input control for a Property in Auto Form UIs</td></tr><tr><td><code>[Field]</code></td><td>Customize a Form Field and HTML Input for a Type&#39;s Property</td></tr></tbody></table>',59),i=[d];function n(s,l,c,u,h,p){return a(),e("div",null,i)}var f=t(o,[["render",n]]);export{b as __pageData,f as default};
