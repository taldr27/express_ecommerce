### Simple ecommerce API with authentication, products management and sales creation. Developed using express, Prisma and AWS to store images.

#### Installed libraries:
```bash
npm init -y
npm install express
npm install -D @types/express
npm install -D typescript
npm install -D ts-node-dev
npm install cors
npm install -D @types/cors
npm install multer
npm install -D @types/multer
npm install @aws-sdk/client-s3
npm install @aws-sdk/s3-request-presigner
```
#### .env example:
```bash
DATABASE_URL="" postgres
SECRET_KEY="" To generate the encryptation for auth.
AWS_REGION=""
AWS_ACCESS_KEY=""
AWS_SECRET_ACCESS_KEY=""
```
