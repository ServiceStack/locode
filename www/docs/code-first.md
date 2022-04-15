---
title: Code-first Locode
---

Code-first AutoQuery services which drive Locode include both the database model and the related request and response Data Transform Objects (DTOs).
These two classes can have additional attributes and AppHost configuration to extend the Locode App visuals and behavior.


## Bookings MVP

A simple example of using Locode for a back office bookings system would be a single table that a staff member populates.

### Create your project

To start off, we will create a project from the basic `web` template using the ServiceStack website. The link below will 
create a new project with the name "BookingsLocode".

<div class="flex">
<a href="https://account.servicestack.net/archive/NetCoreTemplates/web?Name=BookingsLocode" class="text-xl hover:no-underline">
    <div class="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600">
        <div class="text-center font-extrabold flex items-center justify-center mb-2">
            <div class="text-4xl text-blue-600 my-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M4 10.4V4a1 1 0 0 1 1-1h5V1h4v2h5a1 1 0 0 1 1 1v6.4l1.086.326a1 1 0 0 1 .682 1.2l-1.516 6.068A4.992 4.992 0 0 1 16 16a4.992 4.992 0 0 1-4 2a4.992 4.992 0 0 1-4-2a4.992 4.992 0 0 1-4.252 1.994l-1.516-6.068a1 1 0 0 1 .682-1.2L4 10.4zm2-.6L12 8l2.754.826l1.809.543L18 9.8V5H6v4.8zM4 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 12 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 20 20h2v2h-2a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 12 22a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 4 22H2v-2h2z"/>
                </svg>
            </div>
        </div>
        <span class="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">BookingsLocode.zip</span>
        <div class="count mt-1 text-gray-400 text-sm"></div>
    </div>
</a>
</div>

The `web` template for a ServiceStack application will provide the basic solution structure
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

### Mix in a database and AutoQuery

We can use the dotnet `x` tool to `mix` in specific database support and AutoQuery quickly using the command run from the project directory.

:::sh
x mix sqlite autoquery
:::

::: tip
Replace `sqlite` with `postgres`, `sqlserver`, or `mysql` or other RDBMS providers
:::

This command will create two files, `Configure.Db.cs` and `Configure.AutoQuery.cs` and install required NuGet dependencies into the AppHost (BookingsLocode in the link above) project.

### Bookings table

With our application setup to use SQLite and AutoQuery, we need to define our `Booking` table where our data will be stored.

```csharp
public class Booking
{
    [AutoIncrement]
    public int Id { get; set; }
    public string Name { get; set; }
    public RoomType RoomType { get; set; }
    public int RoomNumber { get; set; }
    public DateTime BookingStartDate { get; set; }
    public DateTime? BookingEndDate { get; set; }
    public decimal Cost { get; set; }
    public string Notes { get; set; }
    public bool? Cancelled { get; set; }
}

public enum RoomType
{
    Single,
    Double,
    Queen,
    Twin,
    Suite,
}
```

With our table schema defined in code, we can then use OrmLite to create the table for us if it doesn't already exist.
In the created `Configure.Db.cs` file where our SQLite connect is defined, we can replace the example commented out code 
to create the `Booking` table.


```csharp
public class ConfigureDb : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            services.AddSingleton<IDbConnectionFactory>(new OrmLiteConnectionFactory(
                context.Configuration.GetConnectionString("DefaultConnection")
                ?? ":memory:",
                SqliteDialect.Provider));
        })
        // Create non-existing Table and add Seed Data Example
        .ConfigureAppHost(appHost => {
            using var db = appHost.Resolve<IDbConnectionFactory>().Open();
            if (db.CreateTableIfNotExists<Booking>())
            {
                // Seed data
                db.Insert(new Booking {
                    Name = "Test",
                    Cost = 123,
                    RoomNumber = 321,
                    RoomType = RoomType.Queen,
                    Notes = "Testing more",
                    BookingStartDate = new DateTime(2022, 1, 1),
                    BookingEndDate = new DateTime(2022, 1, 5)
                });
            }
        });
}
```

This initialized our database ready for use, but we still don't have any AutoQuery services defined.
AutoQuery needs to have the request and response DTOs to create AutoQuery services.

```csharp
public class QueryBookings : QueryDb<Booking>
{
    public int[] Ids { get; set; }
}

public class CreateBooking
    : ICreateDb<Booking>, IReturn<IdResponse>
{
    public string Name { get; set; }
    public RoomType RoomType { get; set; }
    public int RoomNumber { get; set; }
    public DateTime BookingStartDate { get; set; }
    public DateTime? BookingEndDate { get; set; }
    public decimal Cost { get; set; }
    public string Notes { get; set; }
}

public class UpdateBooking
    : IPatchDb<Booking>, IReturn<IdResponse>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public RoomType? RoomType { get; set; }
    public int? RoomNumber { get; set; }
    public DateTime? BookingStartDate { get; set; }
    public DateTime? BookingEndDate { get; set; }
    public decimal? Cost { get; set; }
    public bool? Cancelled { get; set; }
    public string Notes { get; set; }
}

public class DeleteBooking : IDeleteDb<Booking>, IReturnVoid
{
    public int Id { get; set; }
}
```

Locode now has enough information to generate the Booking service forms.

![](../public/assets/img/docs/code-first-bookings-mvp.png)

Clicking on our `Booking` services on the left-hand menu utilizes the `QueryBooking` AutoQuery service, we can see the test seed data that was populated.

![](../public/assets/img/docs/code-first-bookings-mvp-2.png)

Using the `New Booking` button gives us a metadata driven form derived from the properties of the `CreateBooking` Request DTO.

![](../public/assets/img/docs/code-first-bookings-mvp-3.png)

This form is also available for editing existing bookings using the Edit button in the first column. This functionality is enabled since the application has an `IPatch<Booking>` defined.

![](../public/assets/img/docs/code-first-bookings-mvp-4.png)

## Customizing Locode App

Locode has a number of attributes that can be used to add additional metadata to your services and data model.
This additional metadata in used by the Locode App to enhance the UI and provide additional functionality.



