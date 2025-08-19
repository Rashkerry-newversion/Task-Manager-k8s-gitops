variable "region" {
  type    = string
  default = "us-east-1"
}

variable "cluster_name" {
  type    = string
  default = "everyday-devops-eks"
}

variable "cluster_version" {
  type    = string
  default = "1.29"
}

variable "node_instance_types" {
  type    = list(string)
  default = ["t3.small"]
}
variable "desired_size" {
  type    = number
  default = 2
}

variable "min_size" {
  type    = number
  default = 1
}

variable "max_size" {
  type    = number
  default = 3
}

# Optional toggles (not used today but handy later)
variable "install_flux" {
  type    = bool
  default = false
}

variable "install_argocd" {
  type    = bool
  default = false
}
