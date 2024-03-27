#variables.tf

variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "app_name" {
  description = "Application Name"
  type        = string
  default     = "url-shortener"
}

variable "dynamodb_billing_mode" {
  description = "Billing mode of the DynamoDB table"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "dynamodb_hash_key" {
  description = "The hash key of the DynamoDB table"
  type        = string
  default     = "shortUrl"
}

variable "dynamodb_attributes" {
  description = "List of DynamoDB table attributes"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "shortUrl"
      type = "S"
    },
    {
      name = "originalUrl"
      type = "S"
    },
    {
      name = "lastAccessed"
      type = "N"
    }
  ]
}

variable "dynamodb_gsi" {
  description = "Global Secondary Indexes for the DynamoDB table"
  type = list(object({
    name            = string
    hash_key        = string
    projection_type = string
  }))
  default = [
    {
      name            = "OriginalUrlIndex"
      hash_key        = "originalUrl"
      projection_type = "ALL"
    },
    {
      name            = "LastAccessedIndex"
      hash_key        = "lastAccessed"
      projection_type = "ALL"
    }
  ]
}

variable "dynamodb_ttl_attribute_name" {
  description = "The attribute name for the TTL"
  type        = string
  default     = "ttl"
}

variable "cloudwatch_log_retention" {
  description = "CloudWatch Log Retention in days"
  type        = number
  default     = 7
}

variable "ecs_task_container_port" {
  description = "The port the container listens on"
  type        = number
  default     = 3000
}

variable "ecs_task_memory" {
  description = "The amount of memory used by the task"
  type        = number
  default     = 512
}

variable "ecs_task_cpu" {
  description = "The amount of CPU used by the task"
  type        = number
  default     = 256
}

variable "security_group_ingress_ports" {
  description = "The range of ports for the ingress security group"
  type        = map(number)
  default = {
    from_port = 80
    to_port   = 80
  }
}
