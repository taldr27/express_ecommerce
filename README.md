## Simple E-commerce API

Simple e-commerce API with authentication, product management, and sales creation features. It is developed using Express.js, Prisma, and AWS for image storage.

### Features
- User authentication
- Product management
- Sales creation
- Image storage using AWS S3

### Installed Libraries
- Express: Web framework for Node.js.
- Typescript: TypeScript language support.
- ts-node-dev: Development server with TypeScript support.
- CORS: Middleware for enabling Cross-Origin Resource Sharing.
- Multer: Middleware for handling multipart/form-data (file uploads).
- AWS SDK: AWS SDK for JavaScript to interact with AWS services.

#### Dependencies:
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

### Configuration
Create a .env file in the root of your project with the following configuration:

```bash
DATABASE_URL="" postgres
SECRET_KEY="" To generate the encryptation for auth.
AWS_REGION=""
AWS_ACCESS_KEY=""
AWS_SECRET_ACCESS_KEY=""
```
