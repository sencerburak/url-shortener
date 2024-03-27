.
├── FILE_STRUCTURE.md
├── service
│   ├── .eslintrc
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── package.json
│   ├── src
│   │   ├── app.ts
│   │   ├── controllers
│   │   │   └── urlController.ts
│   │   ├── index.test.ts
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   ├── types
│   │   │   └── types.ts
│   │   └── utils
│   │       ├── dynamoDBClient.test.ts
│   │       ├── dynamoDBClient.ts
│   │       ├── urlUtils.test.ts
│   │       └── urlUtils.ts
│   ├── tsconfig.json
│   └── yarn.lock
├── terraform
│   ├── .terraform
│   │   └── providers
│   │       └── registry.terraform.io
│   │           └── hashicorp
│   │               ├── aws
│   │               │   └── 4.45.0
│   │               │       └── darwin_arm64
│   │               │           └── terraform-provider-aws_v4.45.0_x5
│   │               └── null
│   │                   └── 3.2.2
│   │                       └── darwin_arm64
│   │                           └── terraform-provider-null_v3.2.2_x5
│   ├── .terraform.lock.hcl
│   ├── locals.tf
│   ├── main.tf
│   ├── outputs.tf
│   ├── terraform.tfstate
│   ├── terraform.tfstate.backup
│   └── variables.tf
└── tsconfig.json

16 directories, 27 files
