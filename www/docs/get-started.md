---
title: Getting started with Locode
---

# Getting started with Locode

ServiceStack Locode App is built into ServiceStack application and provides a user-friendly interface to manage data
using AutoQuery services. It supports 4 major RDBMS providers including PostgreSQL, MS SQL, MySQL and SQLite. AutoQuery
services can be generated directly from your database schema or use Plain Old C# Objects (POCOs) and infer CRUD
behaviour as well as be extended and customized using C# attributes.

<div class="max-w-3xl mt-6 mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
<a href="/docs/database-first" class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-2xl leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  Database-first
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M39 9.75v6.429c0 2.07-6.716 3.75-15 3.75c-8.284 0-15-1.68-15-3.75V9.75C9 7.679 15.716 6 24 6c8.284 0 15 1.679 15 3.75ZM9.621 19.714c1.844 1.55 7.584 2.679 14.379 2.679s12.535-1.13 14.379-2.679c.404.34.621.7.621 1.072v6.428c0 2.071-6.716 3.75-15 3.75c-8.284 0-15-1.679-15-3.75v-6.428c0-.373.217-.732.621-1.072ZM24 33.68c-6.795 0-12.535-1.13-14.379-2.679c-.404.34-.621.7-.621 1.071V38.5c0 2.071 6.716 3.75 15 3.75c8.284 0 15-1.679 15-3.75v-6.429c0-.372-.217-.731-.621-1.071c-1.844 1.549-7.584 2.679-14.379 2.679Zm8.333 3.654a1.167 1.167 0 1 1-2.333 0a1.167 1.167 0 0 1 2.333 0Zm3.5 0a1.167 1.167 0 1 0 0-2.333a1.167 1.167 0 0 0 0 2.333Z" clip-rule="evenodd"/></svg>
</a>
<a href="/docs/code-first" class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-2xl leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  Code-first
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.646 7.646a.5.5 0 1 1 .708.708L5.707 10l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 10L8.646 8.354a.5.5 0 1 1 .708-.708z"/></svg>
</a>
</div>
