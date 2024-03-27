#outputs.tf

output "dynamodb_table_name" {
  value = aws_dynamodb_table.url_mappings.name
}

output "aws_region" {
  value = var.region
}

output "app_url" {
  value = aws_alb.application_load_balancer.dns_name
}
