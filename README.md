## Introduction
Prisma Postgres is a fully managed PostgreSQL database that scales to zero and integrates smoothly with both Prisma ORM and Prisma Studio.     
In this guide, you will learn how to set up a new TypeScript project from scratch, connect it to Prisma Postgres using Prisma ORM,     
and generate a Prisma Client for easy, type-safe access to your database.   
Free tools are Prisma ORM, Migrate and Studio (simple db client - visualizer).  
Prisma Data Platform - is Claude based (setup db on claude servers - so paid).   

## Prerequisites:
* Node v20.19+
* Typescript (preferably at least)

## Installation
```
npm init -y
npm install typescript tsx @types/node --save-dev
npx tsc --init
```

Installing required dependencies:
```
npm install prisma @types/node @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

Here's what each package does:

    prisma - The Prisma CLI for running commands like prisma init, prisma migrate, and prisma generate
    @prisma/client - The Prisma Client library for querying your database
    @prisma/adapter-pg - The node-postgres driver adapter that connects Prisma Client to your database
    pg - The node-postgres database driver
    @types/pg - TypeScript type definitions for node-postgres
    dotenv - Loads environment variables from your .env file


## Prisma commands
```
npx prisma
```
Available commands:   

                init   Set up Prisma for your app
                 dev   Start a local Prisma Postgres server for development
            generate   Generate artifacts (e.g. Prisma Client)
                  db   Manage your database schema and lifecycle
             migrate   Migrate your database
              studio   Browse your data with Prisma Studio
            validate   Validate your Prisma schema
              format   Format your Prisma schema
             version   Displays Prisma version info
               debug   Displays Prisma debug info
                 mcp   Starts an MCP server to use with AI development tools


E.g. in order to migrate defined schema run the following command:
```
npx prisma migrate dev --name init
```
To generate client:
```
npx prisma generate
```
This will create data under `./generated/prisma`: `internal`, `models` and generate .ts files like `client.ts`
where client is defined and can be imported into business logic code.  

## Simple queries
Read query is similar to mongo:  
```typescript
 // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
```

## Visualization
Prisma comes with simple db client - Prisma Studio that allows to view data, explore table schema and relations graph.
Run command:
```
npx prisma studio --config ./prisma.config.ts
```

It will open tab on port `51212`