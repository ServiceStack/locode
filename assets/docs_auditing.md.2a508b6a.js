import{_ as n,c as s,o as a,a as t}from"./app.3e6fe014.js";const g='{"title":"Auditable services","description":"","frontmatter":{},"headers":[{"level":3,"title":"Auditable services","slug":"auditable-services"}],"relativePath":"docs/auditing.md"}',p={},e=t(`<h3 id="auditable-services" tabindex="-1">Auditable services <a class="header-anchor" href="#auditable-services" aria-hidden="true">#</a></h3><p>A feature we can apply to the <code>Booking</code> example, is to add the ability to track operations on the API and keep basic audit information on the Booking table itself. This can be done by inheriting from <code>AuditBase</code>, attributing each service request DTO with a relevant <code>AutoApply</code> behavior and registering the <code>OrmLiteCrudEvents</code> with the application IoC container.</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigureAutoQuery</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IHostingStartup</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Configure</span><span class="token punctuation">(</span><span class="token class-name">IWebHostBuilder</span> builder<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> builder
        <span class="token punctuation">.</span><span class="token function">ConfigureServices</span><span class="token punctuation">(</span>services <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// Enable Audit History</span>
            services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddSingleton</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICrudEvents<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span>
                <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteCrudEvents</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDbConnectionFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">ConfigureAppHost</span><span class="token punctuation">(</span>appHost <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            appHost<span class="token punctuation">.</span>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AutoQueryFeature</span> <span class="token punctuation">{</span>
                MaxLimit <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">,</span>
                <span class="token comment">//IncludeTotal = true,</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            appHost<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICrudEvents<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">InitSchema</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>ICrudEvents</code> stores events in a separate table, so the use of <code>InitSchema</code> above is required to make sure that table exists.</p><p>The <code>AuditBase</code> is used by the database models we want to be tracked.</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Booking</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AuditBase</span></span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoIncrement</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">RoomType</span> RoomType <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> RoomNumber <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">DateTime</span> BookingStartDate <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">DateTime<span class="token punctuation">?</span></span> BookingEndDate <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">decimal</span></span> Cost <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Notes <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span><span class="token punctuation">?</span></span> Cancelled <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>This will add the additional database constraint that <code>CreatedDate</code> and <code>CreatedBy</code> are not null, requiring adjustments to any seed data.</p><p>The <a href="https://docs.servicestack.net/autoquery-crud#apply-generic-crud-behaviors" target="_blank" rel="noopener noreferrer">AutoApply</a> CRUD behaviors apply the additional data to the Booking table columns of <code>CreatedDate</code>,<code>CreatedBy</code>,<code>ModifiedDate</code>, etc.</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoApply</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Behavior<span class="token punctuation">.</span>AuditQuery<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryBookings</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryDb<span class="token punctuation">&lt;</span>Booking<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoApply</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Behavior<span class="token punctuation">.</span>AuditCreate<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CreateBooking</span>
    <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ICreateDb<span class="token punctuation">&lt;</span>Booking<span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">IReturn<span class="token punctuation">&lt;</span>IdResponse<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoApply</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Behavior<span class="token punctuation">.</span>AuditModify<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UpdateBooking</span>
    <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IPatchDb<span class="token punctuation">&lt;</span>Booking<span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">IReturn<span class="token punctuation">&lt;</span>IdResponse<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoApply</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Behavior<span class="token punctuation">.</span>AuditSoftDelete<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeleteBooking</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IDeleteDb<span class="token punctuation">&lt;</span>Booking<span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">IReturnVoid</span></span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div>`,9),o=[e];function c(u,l,k,i,r,d){return a(),s("div",null,o)}var m=n(p,[["render",c]]);export{g as __pageData,m as default};
