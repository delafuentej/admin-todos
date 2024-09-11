# Development
Steps to launch the app under development: 

1. Build up the DB
```
docker compose up -d
```
2. Rename the ***.env.template*** file to ***.env***
3. Replace environment variables

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
