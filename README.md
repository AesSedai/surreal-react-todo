# Description
This is a barebones basic TODO react app utilizing surrealdb in-memory. 

# Running
```
$ cd client
$ npm install
$ cd ../
$ docker-compose up
```
Then the web page should be available on http://127.0.0.1:3000

# Points of Interest
There are a couple of utility items to make using surrealdb easier in react.
First is the `DbProvider` from `client/src/context/dbContext.tsx` which roughly handles the initial database connection and sign-in.
Second is the `useQuery` hook from `client/src/hooks/useQuery.ts`. 
This hook must be used within the `DbProvider` context. It provides the surrealdb `query` function, which means that it can be used for any query type. Other more specific helper hooks (eg, `select` and `update`) may be developed in the future.

The `useQuery` hooks allows variables to be used in queries, allows immediate or deferred query execution, and provides a separate `execute` callback for manually running (or re-running) the query.
