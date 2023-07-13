
# Coding Platform API

Coding platform API where participants can solve questions for the problems provided, run the questions using the Sphere Engine, and the admin can add, edit or delete the questions.

## Screenshots

https://docs.google.com/document/d/1tKh0vFV0CmtM0vaWYk6mHCSTMTsfWn45jtt1LaNR6JU/edit?usp=sharing

## Tech Stack

TypeScript, Node, Express, Prisma, MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/hiteshwadhwani/CodingPlatformAPI.git
```

Go to the project directory

```bash
  cd CodingPlatformAPI
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```




## API Reference

### USER

#### Login
```http
  GET /user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email |
| `password` | `string` | **Required**. Password |


#### SignUp
```http
  GET /user/signup
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** Name |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password |


#### problem Submission
```http
  GET /user/submission
```

#### -------- Bearer Token Required----------


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `problemId` | `string` | **Required**. problem id |
| `source` | `string` | **Required**. source code  |
| `compilerId` | `string` | **Required**. compiler id |
| `compilerVersionId` | `string` | **Required**. compiler version identifier |
| `tests` | `string` | **Required**. comma separated list of test case numbers to be executed against submission |


### ADMIN

#### Login

```http
  GET /admin/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email |
| `password` | `string` | **Required**. Password |

#### Signup

```http
  GET /admin/signup
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** Name |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password |


#### Add problem

```http
  GET /admin/problem/${id}
```

#### -------- Bearer Token Required----------


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Problem id |
| `name`      | `string` | problem name |
| `body`      | `string` |  problem description |
| `typeId`      | `string` |  problem type enum: 0 - binary1 - minimize 2 - maximize 4 - percentage |
| `masterjudgeId`      | `string` | **Required**. 	master judge id |
| `interactive`      | `string` | interactive problem flag |


#### Update problem

```http
  GET /admin/problem/${id}
```

#### -------- Bearer Token Required----------


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Problem id |
| `name`      | `string` | **Required**. problem name |
| `body`      | `string` |  problem description |
| `typeId`      | `string` |  problem type enum: 0 - binary1 - minimize 2 - maximize 4 - percentage |
| `masterjudgeId`      | `string` | **Required**. 	master judge id |
| `interactive`      | `string` | interactive problem flag |



#### Delete problem

```http
  GET /admin/problem/${id}
```

#### -------- Bearer Token Required----------


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Problem id |


#### Add tese cases

```http
  GET /admin/add-test-case/${id}
```

#### -------- Bearer Token Required----------


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Problem id |
| `input`      | `string` |  input data |
| `output`      | `string` |  output data |
| `timeLimit`      | `string` |  time limit [seconds] |
| `judgeId`      | `string` | **Required**. judge id |
| `active`      | `string` | whether test case should be active |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`
`ACCESS_TOKEN_SECRET_KEY`
`SPHERE_ENGINE_PROBLEMS_ENDPOINT`
`SPHERE_ENGINE_PROBLEMS_TOKEN`

