#locals.tf

locals {
  ecr_repository_name        = "${var.app_name}-repo"
  ecs_cluster_name           = "${var.app_name}-cluster"
  dynamodb_table_name        = "${var.app_name}-mappings-table"
  cloudwatch_log_group_name  = "${var.app_name}-log-group"
  ecs_task_definition_family = "${var.app_name}-task"
  ecs_task_container_name    = "${var.app_name}-container"
  ecs_service_name           = "${var.app_name}-service"
  load_balancer_name         = "${var.app_name}-load-balancer"
  dynamodb_tags = {
    Name = "${var.app_name}-mappings-table"
  }
}
