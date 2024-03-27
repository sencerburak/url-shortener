# URL Shortener Service

The URL Shortener Service provides an efficient, scalable way to shorten URLs and redirect users to the original URLs using a concise code. Built with TypeScript, Node.js, Express, and DynamoDB, this service is designed for high availability and low latency.

## Architecture Overview

The service architecture leverages the following key components:

- **Express.js**: A minimal and flexible Node.js web application framework providing a robust set of features for web and mobile applications.
- **TypeScript**: A superset of JavaScript that compiles to clean JavaScript output, providing typing capabilities for better code stability and developer experience.
- **AWS DynamoDB**: A fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **Docker**: Used for containerizing the application, ensuring consistent environments for development, testing, and production.
- **Terraform**: Infrastructure as Code (IaC) tool used to automate the deployment, configuration, and management of the AWS infrastructure.

The service operates within a Docker container hosted on AWS ECS (Elastic Container Service), interacting with a DynamoDB table for persisting URL mappings. Requests to shorten URLs are processed by Express routes, which generate a unique identifier for each URL. This identifier, along with the original URL, is stored in DynamoDB. When a user accesses a shortened URL, the service queries DynamoDB to retrieve and redirect to the original URL.

### High-Level Workflow

1. **URL Shortening**: Users submit URLs through a RESTful API endpoint. The service generates a unique short identifier and stores the mapping in DynamoDB.
2. **Redirection**: When a shortened URL is accessed, the service looks up the identifier in DynamoDB and redirects the user to the original URL.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- yarn
- Docker
- AWS CLI (configured with necessary permissions)
- Terraform

### Local Development

1. **Clone the Repository**

```bash
git clone <repository-url>
cd path/to/service
```

2. **Install Dependencies**

```bash
yarn install
```  

3. **Set Environment Variables**

Create a `.env` file in the root directory with the following variables:

```plaintext
AWS_REGION=eu-west-1
DYNAMODB_TABLE_NAME=url-shortener-mappings-table
PORT=3000
```

4. **Start the Service**

```bash
yarn start
```

5. **Access the Service**

Open `http://localhost:3000` in your browser to access the service.

## Dockerization

The service can be run within a Docker container for consistency and portability. To build and run the Docker image, use the following commands:

1. **Build the Docker Image**

```bash
docker build -t url-shortener-service .
```

2. **Run the Docker Container**

```bash
docker run -p 3000:3000 url-shortener-service
```

The service will be accessible at `http://localhost:3000`.

## API Endpoints

The service exposes the following API endpoints:

- **POST /shorten**: Shortens a URL and returns the shortened URL.
  - Request Body: `{ "url": "https://example.com" }`
  - Response: `{ "shortUrl": "http://localhost:3000/abc123" }`
- **GET /:shortUrl**: Redirects to the original URL associated with the provided code.

### Example Usage

1. **Shorten a URL**

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url": "www.example.com"}' \
  localhost:3000/shorten
```

2. **Access the Shortened URL**

Open the shortened URL in a browser to be redirected to the original URL.

### Testing

Run the Jest test suite with:

```bash
yarn test
```

### Linting

Lint the codebase using ESLint:

```bash
yarn lint
```

### Deployment

The service can be deployed to AWS ECS using the provided Terraform configuration. Refer to the [Terraform README](../terraform/README.md) for detailed deployment instructions.

## Project Structure

The project structure is as follows:

- `src/`: Contains the source code for the service.
  - `app.ts`: Initializes the Express application and routes.
  - `controllers/`: Contains route handlers for different endpoints.
  - `index.ts`: Entry point for the application.
  - `routes.ts`: Defines the API routes.
  - `types/`: Contains TypeScript type definitions.
  - `utils/`: Utility functions for interacting with DynamoDB.
  - `dynamoDBClient.test.ts`: Tests for the DynamoDB client utility.
  - `urlUtils.test.ts`: Tests for the URL utility functions.
  - `index.test.ts`: Tests for the main application logic.


## Contributing

Contributions to the service are welcome. Please adhere to the project's contribution guidelines, ensuring that all changes are thoroughly tested and documented.

## License

MIT License

Copyright (c) 2024 [Sencer Burak Okumus]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

For support or questions regarding the infrastructure setup, please open an issue in the project's repository.
