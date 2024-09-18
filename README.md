# Development
Steps to launch the app under development: 

1. Build up the DB
```
docker compose up -d
```
2. Create a copy of the  ***.env.template*** file, and rename it to ***.env***
3. Replace environment variables.
4. Execute the command ``` npm install```.
5. Execute the command ``` npm run dev```.
6. Execute the following prisma commands:
```
npx prisma migrate dev
npx prisma generate
```

7. Execute SEED [to create local DB(localhost:3000/api/seed)].

## Default User:
__user:__'test1@gmail.com
__password:__Qwe123

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
