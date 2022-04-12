import{_ as n,c as s,o as a,a as t}from"./app.3e6fe014.js";const g='{"title":"Managed Files Uploads","description":"","frontmatter":{},"headers":[{"level":3,"title":"Managed Files Uploads","slug":"managed-files-uploads"}],"relativePath":"docs/files.md"}',p={},e=t(`<h3 id="managed-files-uploads" tabindex="-1">Managed Files Uploads <a class="header-anchor" href="#managed-files-uploads" aria-hidden="true">#</a></h3><p>A high level feature that integrates with Locode is the <code>FileUploadFeature</code> plugin which is combined with <code>VirtualFileSource</code>. This enables a way to associate a file path that can be stored in your custom tables which is mapped to a <code>VirtualFileSource</code>, which means the uploaded files don&#39;t live in the database itself taking up a lot of room, the database only stores the reference.</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> wwwrootVfs <span class="token operator">=</span> <span class="token generic-method"><span class="token function">GetVirtualFileSource</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>FileSystemVirtualFiles<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">FilesUploadFeature</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UploadLocation</span><span class="token punctuation">(</span><span class="token string">&quot;employees&quot;</span><span class="token punctuation">,</span> wwwrootVfs<span class="token punctuation">,</span> <span class="token named-parameter punctuation">allowExtensions</span><span class="token punctuation">:</span> FileExt<span class="token punctuation">.</span>WebImages<span class="token punctuation">,</span>
        <span class="token named-parameter punctuation">writeAccessRole</span><span class="token punctuation">:</span> RoleNames<span class="token punctuation">.</span>AllowAnon<span class="token punctuation">,</span>
        <span class="token named-parameter punctuation">resolvePath</span><span class="token punctuation">:</span> ctx <span class="token operator">=&gt;</span> <span class="token interpolation-string"><span class="token string">$&quot;/profiles/employees/</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">ctx<span class="token punctuation">.</span>Dto<span class="token punctuation">.</span><span class="token function">GetId</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">.</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">ctx<span class="token punctuation">.</span>FileExtension</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The <code>UploadLocation</code> is a named mapping which is then referenced on the data model column which stores the <em>path</em> only. This reference is made using the <code>UploadTo</code> attribute specifying the matching name, eg &quot;employees&quot;.</p><p>The <code>TypeFilter</code> also fires for request and response DTO types, and we can find matching request DTO types from the desired model name using <code>IsCrudCreateOrUpdate(&quot;Employee&quot;)</code>. This is a dynamic way of applying attributes to our database model <code>Employee</code> and related <code>CreateEmployee</code>/<code>UpdateEmployee</code> which can be more clearly represented in a code-first way using the following 3 classes.</p><div class="language-csharp"><pre><code><span class="token comment">// Generated database model</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Format</span><span class="token attribute-arguments"><span class="token punctuation">(</span>FormatMethods<span class="token punctuation">.</span>IconRounded<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> PhotoPath <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span><span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>

<span class="token comment">// Generated Request DTO for create</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CreateEmployee</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ICreateDb<span class="token punctuation">&lt;</span>Employee<span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">IReturn<span class="token punctuation">&lt;</span>IdResponse<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Input</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Type<span class="token operator">=</span>Input<span class="token punctuation">.</span>Types<span class="token punctuation">.</span>File<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">UploadTo</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;employees&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> PhotoPath <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span><span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Generated Request DTO for create</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UpdateEmployee</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IPatchDb<span class="token punctuation">&lt;</span>Employee<span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">IReturn<span class="token punctuation">&lt;</span>IdResponse<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Input</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Type<span class="token operator">=</span>Input<span class="token punctuation">.</span>Types<span class="token punctuation">.</span>File<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">UploadTo</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;employees&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> PhotoPath <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span><span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>This is done dynamically using the following code found in the <code>Northwind</code> Locode demo.</p><div class="language-csharp"><pre><code>\`\`\`<span class="token class-name">csharp</span>
TypeFilter <span class="token operator">=</span> <span class="token punctuation">(</span>type<span class="token punctuation">,</span> req<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span>Name <span class="token operator">==</span> <span class="token string">&quot;Employee&quot;</span> <span class="token operator">||</span> type<span class="token punctuation">.</span><span class="token function">IsCrudCreateOrUpdate</span><span class="token punctuation">(</span><span class="token string">&quot;Employee&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">IsCrud</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            type<span class="token punctuation">.</span><span class="token function">Property</span><span class="token punctuation">(</span><span class="token string">&quot;PhotoPath&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">AddAttribute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">InputAttribute</span> <span class="token punctuation">{</span> Type <span class="token operator">=</span> Input<span class="token punctuation">.</span>Types<span class="token punctuation">.</span>File <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">AddAttribute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">UploadToAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;employees&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Our sample Northwind database does store <code>Photo</code> as a blobbed data. For the demo, we are removing <code>Photo</code> column from the generated type and repurposing the <code>PhotoPath</code> to reference files matching the <code>Id</code> of the employee in a registered <code>FileSystemVirtualFiles</code> virtual file source.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If files are stored in the database, to use the <code>FilesUploadFeature</code> they would need to be migrated out to a supported storage</p></div><div class="language-csharp"><pre><code>TypeFilter <span class="token operator">=</span> <span class="token punctuation">(</span>type<span class="token punctuation">,</span> req<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span>Name <span class="token operator">==</span> <span class="token string">&quot;Employee&quot;</span> <span class="token operator">||</span> type<span class="token punctuation">.</span><span class="token function">IsCrudCreateOrUpdate</span><span class="token punctuation">(</span><span class="token string">&quot;Employee&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        type<span class="token punctuation">.</span>Properties<span class="token punctuation">.</span><span class="token function">RemoveAll</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Name <span class="token operator">==</span> <span class="token string">&quot;Photo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div>`,11),o=[e];function c(l,u,i,k,r,d){return a(),s("div",null,o)}var h=n(p,[["render",c]]);export{g as __pageData,h as default};
