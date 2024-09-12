export const ADMIN_ROLE="SUPER_ADMIN"
export const USER_ROLE='NORMAL USER'
export const INIT_PERMISSIONS=[
    {
        "_id": "66e066d91c09ab7f3867820f",
        "name": "Add comapny",
        "apiPath": "/api/v1/companies",
        "method": "POST",
        "module": "COMPANIES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:33:45.117Z",
        "updatedAt": "2024-09-10T15:33:45.117Z",
        "__v": 0
    },
    {
        "_id": "66e066fb1c09ab7f38678212",
        "name": "Get full comapnies by panigation",
        "apiPath": "/api/v1/companies",
        "method": "GET",
        "module": "COMPANIES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:34:19.395Z",
        "updatedAt": "2024-09-10T15:34:19.395Z",
        "__v": 0
    },
    {
        "_id": "66e0670e1c09ab7f38678215",
        "name": "Get infomation company",
        "apiPath": "/api/v1/companies/:id",
        "method": "GET",
        "module": "COMPANIES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:34:38.260Z",
        "updatedAt": "2024-09-10T15:34:38.260Z",
        "__v": 0
    },
    {
        "_id": "66e0672d1c09ab7f38678218",
        "name": "Update information company",
        "apiPath": "/api/v1/companies/:id",
        "method": "PATCH",
        "module": "COMPANIES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:35:09.586Z",
        "updatedAt": "2024-09-10T15:35:09.586Z",
        "__v": 0
    },
    {
        "_id": "66e067451c09ab7f3867821b",
        "name": "Delete a company",
        "apiPath": "/api/v1/companies/:id",
        "method": "DELETE",
        "module": "COMPANIES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:35:33.172Z",
        "updatedAt": "2024-09-10T15:35:33.172Z",
        "__v": 0
    },
    {
        "_id": "66e067be1c09ab7f3867821e",
        "name": "Login",
        "apiPath": "/api/v1/auth/login",
        "method": "POST",
        "module": "AUTH",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:37:34.120Z",
        "updatedAt": "2024-09-10T15:37:34.120Z",
        "__v": 0
    },
    {
        "_id": "66e067d01c09ab7f38678221",
        "name": "Register",
        "apiPath": "/api/v1/auth/register",
        "method": "POST",
        "module": "AUTH",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:37:52.365Z",
        "updatedAt": "2024-09-10T15:37:52.365Z",
        "__v": 0
    },
    {
        "_id": "66e067f41c09ab7f38678224",
        "name": "Register",
        "apiPath": "/api/v1/auth/account",
        "method": "GET",
        "module": "AUTH",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:38:28.892Z",
        "updatedAt": "2024-09-10T15:38:28.892Z",
        "__v": 0
    },
    {
        "_id": "66e068141c09ab7f38678227",
        "name": "Get a refresh_token",
        "apiPath": "/api/v1/auth/refresh",
        "method": "GET",
        "module": "AUTH",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:39:00.169Z",
        "updatedAt": "2024-09-10T15:39:00.169Z",
        "__v": 0
    },
    {
        "_id": "66e068301c09ab7f3867822a",
        "name": "Logout",
        "apiPath": "/api/v1/auth/logout",
        "method": "POST",
        "module": "AUTH",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:39:28.385Z",
        "updatedAt": "2024-09-10T15:39:28.385Z",
        "__v": 0
    },
    {
        "_id": "66e068811c09ab7f3867822d",
        "name": "Get information user by id",
        "apiPath": "/api/v1/users/:id",
        "method": "GET",
        "module": "USERS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:40:49.580Z",
        "updatedAt": "2024-09-10T15:40:49.580Z",
        "__v": 0
    },
    {
        "_id": "66e068971c09ab7f38678230",
        "name": "Get information all users by panigation",
        "apiPath": "/api/v1/users",
        "method": "GET",
        "module": "USERS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:41:11.328Z",
        "updatedAt": "2024-09-10T15:41:11.328Z",
        "__v": 0
    },
    {
        "_id": "66e068d01c09ab7f38678233",
        "name": "Add a new user",
        "apiPath": "/api/v1/users",
        "method": "POST",
        "module": "USERS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:42:08.359Z",
        "updatedAt": "2024-09-10T15:42:08.359Z",
        "__v": 0
    },
    {
        "_id": "66e068e81c09ab7f38678236",
        "name": "Upadte a user",
        "apiPath": "/api/v1/users/:id",
        "method": "PATCH",
        "module": "USERS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:42:32.997Z",
        "updatedAt": "2024-09-10T15:42:32.997Z",
        "__v": 0
    },
    {
        "_id": "66e069091c09ab7f38678239",
        "name": "Delete a user",
        "apiPath": "/api/v1/users/:id",
        "method": "DELETE",
        "module": "USERS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:43:05.425Z",
        "updatedAt": "2024-09-10T15:43:05.425Z",
        "__v": 0
    },
    {
        "_id": "66e069d31c09ab7f3867823c",
        "name": "get information a job",
        "apiPath": "/api/v1/jobs/:id",
        "method": "GET",
        "module": "JOBS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:46:27.712Z",
        "updatedAt": "2024-09-10T15:46:27.712Z",
        "__v": 0
    },
    {
        "_id": "66e069ea1c09ab7f3867823f",
        "name": "get all jobs by panigation",
        "apiPath": "/api/v1/jobs",
        "method": "GET",
        "module": "JOBS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:46:50.575Z",
        "updatedAt": "2024-09-10T15:46:50.575Z",
        "__v": 0
    },
    {
        "_id": "66e06a011c09ab7f38678242",
        "name": "update a job",
        "apiPath": "/api/v1/jobs/:id",
        "method": "PATCH",
        "module": "JOBS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:47:13.519Z",
        "updatedAt": "2024-09-10T15:47:13.519Z",
        "__v": 0
    },
    {
        "_id": "66e06a611c09ab7f38678245",
        "name": "Add a new job",
        "apiPath": "/api/v1/jobs",
        "method": "POST",
        "module": "JOBS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:48:49.850Z",
        "updatedAt": "2024-09-10T15:48:49.850Z",
        "__v": 0
    },
    {
        "_id": "66e06a781c09ab7f38678248",
        "name": "Delete a job",
        "apiPath": "/api/v1/jobs/:id",
        "method": "DELETE",
        "module": "JOBS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:49:12.914Z",
        "updatedAt": "2024-09-10T15:49:12.914Z",
        "__v": 0
    },
    {
        "_id": "66e06b0a1c09ab7f3867824b",
        "name": "Upload a file",
        "apiPath": "/api/v1/files/upload",
        "method": "POST",
        "module": "FILES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:51:38.966Z",
        "updatedAt": "2024-09-10T15:51:38.966Z",
        "__v": 0
    },
    {
        "_id": "66e06b341c09ab7f3867824e",
        "name": "Add a CV",
        "apiPath": "/api/v1/resumes",
        "method": "POST",
        "module": "RESUMES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:52:20.246Z",
        "updatedAt": "2024-09-10T15:52:20.246Z",
        "__v": 0
    },
    {
        "_id": "66e06b491c09ab7f38678251",
        "name": "Get information a CV",
        "apiPath": "/api/v1/resumes/:id",
        "method": "GET",
        "module": "RESUMES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:52:41.936Z",
        "updatedAt": "2024-09-10T15:52:41.936Z",
        "__v": 0
    },
    {
        "_id": "66e06b5b1c09ab7f38678254",
        "name": "Get all information CV",
        "apiPath": "/api/v1/resumes",
        "method": "GET",
        "module": "RESUMES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:52:59.941Z",
        "updatedAt": "2024-09-10T15:52:59.941Z",
        "__v": 0
    },
    {
        "_id": "66e06b7b1c09ab7f38678257",
        "name": "update a CV",
        "apiPath": "/api/v1/resumes/:id",
        "method": "PATCH",
        "module": "RESUMES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:53:31.938Z",
        "updatedAt": "2024-09-10T15:53:31.938Z",
        "__v": 0
    },
    {
        "_id": "66e06b891c09ab7f3867825a",
        "name": "delete a CV",
        "apiPath": "/api/v1/resumes/:id",
        "method": "DELETE",
        "module": "RESUMES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:53:45.609Z",
        "updatedAt": "2024-09-10T15:53:45.609Z",
        "__v": 0
    },
    {
        "_id": "66e06bc31c09ab7f3867825d",
        "name": "get all cv yourself",
        "apiPath": "/api/v1/resumes/by-user",
        "method": "POST",
        "module": "RESUMES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:54:43.448Z",
        "updatedAt": "2024-09-10T15:54:43.448Z",
        "__v": 0
    },
    {
        "_id": "66e06bfc1c09ab7f38678260",
        "name": "Add a permisison",
        "apiPath": "/api/v1/permissions",
        "method": "POST",
        "module": "PERMISSIONS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:55:40.916Z",
        "updatedAt": "2024-09-10T15:55:40.916Z",
        "__v": 0
    },
    {
        "_id": "66e06c171c09ab7f38678263",
        "name": "Get all  permisisons by panigation ",
        "apiPath": "/api/v1/permissions",
        "method": "GET",
        "module": "PERMISSIONS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:56:07.121Z",
        "updatedAt": "2024-09-10T15:56:07.121Z",
        "__v": 0
    },
    {
        "_id": "66e06c321c09ab7f38678266",
        "name": "Get a information permisison  ",
        "apiPath": "/api/v1/permissions/:id",
        "method": "GET",
        "module": "PERMISSIONS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:56:34.178Z",
        "updatedAt": "2024-09-10T15:56:34.178Z",
        "__v": 0
    },
    {
        "_id": "66e06c481c09ab7f38678269",
        "name": "Update a permisison  ",
        "apiPath": "/api/v1/permissions/:id",
        "method": "PATCH",
        "module": "PERMISSIONS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:56:56.955Z",
        "updatedAt": "2024-09-10T15:56:56.955Z",
        "__v": 0
    },
    {
        "_id": "66e06c541c09ab7f3867826c",
        "name": "Delete a permisison  ",
        "apiPath": "/api/v1/permissions/:id",
        "method": "DELETE",
        "module": "PERMISSIONS",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:57:08.606Z",
        "updatedAt": "2024-09-10T15:57:08.606Z",
        "__v": 0
    },
    {
        "_id": "66e06cb11c09ab7f3867826f",
        "name": "Add a role",
        "apiPath": "/api/v1/roles",
        "method": "POST",
        "module": "ROLES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:58:41.758Z",
        "updatedAt": "2024-09-10T15:58:41.758Z",
        "__v": 0
    },
    {
        "_id": "66e06cc71c09ab7f38678272",
        "name": "Get all roles by pagination",
        "apiPath": "/api/v1/roles",
        "method": "GET",
        "module": "ROLES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:59:03.754Z",
        "updatedAt": "2024-09-10T15:59:03.754Z",
        "__v": 0
    },
    {
        "_id": "66e06ce41c09ab7f38678275",
        "name": "Get a information role",
        "apiPath": "/api/v1/roles/:id",
        "method": "GET",
        "module": "ROLES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:59:32.767Z",
        "updatedAt": "2024-09-10T15:59:32.767Z",
        "__v": 0
    },
    {
        "_id": "66e06cfa1c09ab7f38678278",
        "name": "Update a information role",
        "apiPath": "/api/v1/roles/:id",
        "method": "PATCH",
        "module": "ROLES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T15:59:54.101Z",
        "updatedAt": "2024-09-10T15:59:54.101Z",
        "__v": 0
    },
    {
        "_id": "66e06d0d1c09ab7f3867827b",
        "name": "Delete a  role",
        "apiPath": "/api/v1/roles/:id",
        "method": "DELETE",
        "module": "ROLES",
        "deletedAt": null,
        "isDeleted": false,
        "createdBy": {
            "_id": "66e00225613cd83f6bce2096",
            "email": "admin@gmail.com"
        },
        "createdAt": "2024-09-10T16:00:13.700Z",
        "updatedAt": "2024-09-10T16:00:13.700Z",
        "__v": 0
    }
]