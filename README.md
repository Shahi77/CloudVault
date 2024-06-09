# Cloud Vault

A webapp which lets users upload their files on cloud without any hassle and they can search for files using the name that they set while uploading

## Run Locally

### Clone the project

```bash
git clone https://github.com/Shahi77/CloudVault.git
```

### Go to the project directory

```bash
cd CloudVault
```

### Install dependencies in client

```bash
cd client && npm install
```

### Install dependencies in Server

```bash
cd server && npm install
```

### Spin up the Server on PORT 8000

```bash
cd server && npm start
```

### Run the client

```bash
cd client && npm start
```

## Environment Variables

Change `.env.example` file to `.env` and add the following required variables:

`PORT=8000`

`CORS_ORIGIN='*'`

`MONGODB_URL=''`

`ACCESS_TOKEN_SECRET=''`

`REFRESH_TOKEN_SECRET=''`

`ACCESS_TOKEN_EXPIRY='1d'`

`REFRESH_TOKEN_EXPIRY='30d'`

`CLOUDINARY_API_SECRET = ''`

`CLOUDINARY_API_KEY = ''`

`CLOUDINARY_CLOUD_NAME = ''`

## API Reference

```http
POST /api/v1/user/signup
```

| Parameter  | Type     | Description                                  |
| :--------- | :------- | :------------------------------------------- |
| `email`    | `String` | Email of the user passed in request body     |
| `fullName` | `String` | Full Name of the user passed in request body |
| `password` | `String` | Password of the user passed in request body  |

```http
POST /api/v1/user/login
```

| Parameter  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `email`    | `String` | Email of the user passed in request body    |
| `password` | `String` | Password of the user passed in request body |
