output "cluster_name" {
  value = module.eks.cluster_name
}

output "region" {
  value = var.region
}

output "update_kubeconfig" {
  value = "aws eks update-kubeconfig --region ${var.region} --name ${module.eks.cluster_name}"
  description = "Run this after apply to connect kubectl."
}
