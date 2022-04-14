### Auditable services

A feature we can apply to the `Booking` example, is to add the ability to track operations on the API and keep basic audit information on the Booking table itself.
This can be done by inheriting from `AuditBase`, attributing each service Request DTO with a relevant `AutoApply` behavior and registering the `OrmLiteCrudEvents` with
the application IoC container.

```csharp
public class ConfigureAutoQuery : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services => {
            // Enable Audit History
            services.AddSingleton<ICrudEvents>(c =>
                new OrmLiteCrudEvents(c.Resolve<IDbConnectionFactory>()));
        })
        .ConfigureAppHost(appHost => {
            appHost.Plugins.Add(new AutoQueryFeature {
                MaxLimit = 1000,
                //IncludeTotal = true,
            });
            
            appHost.Resolve<ICrudEvents>().InitSchema();
        });
}
```

`ICrudEvents` stores events in a separate table, so the use of `InitSchema` above is required to make sure that table exists.

The `AuditBase` is used by the database models we want to be tracked.

```csharp
public class Booking : AuditBase
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
```

This will add the additional database constraint that `CreatedDate` and `CreatedBy` are not null, requiring adjustments to any seed data.

The [AutoApply](https://docs.servicestack.net/autoquery-crud#apply-generic-crud-behaviors) CRUD behaviors apply the additional data to the Booking table columns of
`CreatedDate`,`CreatedBy`,`ModifiedDate`, etc.

```csharp
[AutoApply(Behavior.AuditQuery)]
public class QueryBookings : QueryDb<Booking>
{
    ...
}

[AutoApply(Behavior.AuditCreate)]
public class CreateBooking
    : ICreateDb<Booking>, IReturn<IdResponse>
{
    ...
}

[AutoApply(Behavior.AuditModify)]
public class UpdateBooking
    : IPatchDb<Booking>, IReturn<IdResponse>
{
    ...
}

[AutoApply(Behavior.AuditSoftDelete)]
public class DeleteBooking : IDeleteDb<Booking>, IReturnVoid
{
    ...
}
```


