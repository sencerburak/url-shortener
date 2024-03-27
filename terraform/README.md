# URL Shortener Service Infrastructure Guide

Welcome to the infrastructure documentation for the URL Shortener Service. This guide provides a comprehensive overview of the architecture, components, and deployment steps required to set up and manage the infrastructure on AWS using Terraform. Our infrastructure is designed for reliability, scalability, and security, ensuring that the URL Shortener Service runs efficiently and effectively.

## Overview

The URL Shortener Service infrastructure is built on AWS, leveraging managed services for high availability and performance. The architecture is designed to be scalable, with the ability to handle high volumes of traffic and data. Key components include Amazon Elastic Container Service (ECS) for container orchestration, DynamoDB for fast and flexible NoSQL data storage, CloudWatch for monitoring and logs management, and an Application Load Balancer (ALB) for efficient traffic distribution.

## Prerequisites

Before you begin the deployment process, please ensure you have the following tools and accounts set up:

- AWS Account with appropriate permissions.
- AWS CLI, configured with access credentials.
- Terraform.
- Docker, for building and pushing the Docker image.

## Infrastructure Components

- **Amazon ECR (Elastic Container Registry)**: Stores the Docker images used by the ECS service.
- **Amazon ECS (Elastic Container Service)**: Manages the deployment, scaling, and management of containerized applications.
- **Amazon DynamoDB**: Provides a scalable and low-latency NoSQL database for storing URL mappings.
- **Amazon CloudWatch**: Offers monitoring and observability services for application and infrastructure health.
- **Application Load Balancer (ALB)**: Distributes incoming application traffic across ECS tasks, improving availability and scalability.

## Deployment Steps

1. **Initialize Terraform**:
   Navigate to the `terraform` directory. Run `terraform init` to prepare your directory for Terraform operations.

2. **Review the Plan**:
   Execute `terraform plan` to review the proposed infrastructure changes. Ensure that all components are correctly configured.

3. **Apply Configuration**:
   Deploy your infrastructure with `terraform apply`. Confirm the deployment by responding with `yes` when prompted.

4. **Docker Image Deployment**:
   The Docker image is built and pushed to Amazon ECR as part of the Terraform deployment process, using the `null_resource` hook for seamless integration. This is not ideal in production systems. For a more robust setup, this should be handled by a CI/CD pipeline. However for development purposes, this approach is acceptable.

5. **Access the Service**:
    Once the deployment is complete, you can access the service through the ALB DNS name or IP address. The service should be up and running, ready to shorten URLs and redirect users.
    The public URL will be displayed as an output after the deployment is successful.

## Configuration Details

- `variables.tf`: Defines essential variables for customizing the Terraform deployment.
- `locals.tf`: Contains local definitions for reuse and simplicity in the Terraform configuration.
- `main.tf`: The core Terraform configuration file, outlining the creation and configuration of all AWS resources.
- `outputs.tf`: Specifies output variables, providing essential information upon the successful deployment of the infrastructure.

## Security and Networking

The deployment is configured to use AWS's default VPC and subnets, ensuring simplicity and ease of setup. Security groups are defined for both the ALB and ECS services, with ingress and egress rules tailored for secure access and communication.

## Cleanup

To dismantle the infrastructure and delete all resources, run `terraform destroy`. This command should be used with caution, as it will permanently remove all specified AWS resources.

## Contributing

Contributions to the infrastructure setup are welcome. Please adhere to the project's contribution guidelines, ensuring that all changes are thoroughly tested and documented.

## License

MIT License

Copyright (c) 2024 [Sencer Burak Okumus]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

For support or questions regarding the infrastructure setup, please open an issue in the project's repository.
