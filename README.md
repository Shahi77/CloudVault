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

Test API Endpoints: [Postman Collection](https://www.postman.com/altimetry-saganist-53324669/workspace/github/collection/17929702-302bbd1f-732e-4e6c-9356-435188f655c1?action=share&creator=17929702&active-environment=17929702-658cced1-cde0-411b-91a3-22e346d64490)

```http
POST /api/v1/user/signup
```

| Parameter  | Type     | Description                                  |
| :--------- | :------- | :------------------------------------------- |
| `email`    | `String` | Email of the user passed in request body     |
| `fullName` | `String` | Full Name of the user passed in request body |
| `password` | `String` | Password of the user passed in request body  |

```javascript
Content-Type: application/json
{
    "data": {
        "id": "666d46172c06acee55d5febb",
        "fullName": "Test User 4",
        "email": "test4@test.com"
    },
    "message": "User registered successfully"
}
```

```http
POST /api/v1/user/login
```

| Parameter  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `email`    | `String` | Email of the user passed in request body    |
| `password` | `String` | Password of the user passed in request body |

```javascript
Content-Type: application/json
{
    "data": {
        "id": "66654815ec3cd03bd3954958",
        "fullName": "Test User 1",
        "email": "test1@test.com"
    },
    "message": "Logged in successfully"
}
```

```http
POST /api/v1/files/upload
```

| Parameter      | Type     | Description                         |
| :------------- | :------- | :---------------------------------- |
| `fileName`     | `String` | Name of the file to be stored in DB |
| `uploadedFile` | `File`   | File to be uploaded                 |

```javascript
Content-Type: application/json
{
    "data": {
        "name": "Luffy Gear 5 Pfp ",
        "fileUrl": "http://res.cloudinary.com/anujthakur513/image/upload/v1718430778/cloud-vault/files/lmsbnfmx2tq8fpv3qbnj.jpg",
        "fileId": "lmsbnfmx2tq8fpv3qbnj"
    },
    "message": "file uploaded successfully"
}
```

```http
DELETE /api/v1/files/delete/:fileId
```

| Parameter | Type            | Description                                   |
| :-------- | :-------------- | :-------------------------------------------- |
| `fileId`  | `Request Param` | ID of the file which is to be deleted from DB |

```javascript
Content-Type: application/json
{
    "data": {
        "fileId": "uysoey9wih4tc6aampup"
    },
    "message": "File deleted successfully"
}
```

```http
GET /api/v1/files
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| na        | na   | na          |

```javascript
Content-Type: application/json
{
    "data": {
        "files": [
            {
                "_id": "666d2c3a6b61a48df0b3c78e",
                "name": "Luffy Gear 5 Pfp ",
                "fileId": "lmsbnfmx2tq8fpv3qbnj",
                "fileUrl": "http://res.cloudinary.com/anujthakur513/image/upload/v1718430778/cloud-vault/files/lmsbnfmx2tq8fpv3qbnj.jpg",
                "owner": "66654815ec3cd03bd3954958",
                "createdAt": "2024-06-15T05:52:58.421Z",
                "__v": 0
            }
        ]
    },
    "message": "files fetched successfully"
}
```
