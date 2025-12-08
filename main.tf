terraform {
  required_version = ">= 1.3.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"  # Mumbai
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-24.04-amd64-server-*"]
  }
}

resource "aws_security_group" "tvk_sg" {
  name        = "tvk-monitoring-sg"
  description = "Security group for monitoring server"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Prometheus"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "tvk-monitoring-sg"
  }
}

resource "aws_instance" "tvk_monitor" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "c7i-flex.large"
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.tvk_sg.id]

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  tags = {
    Name = "tvk-monitoring"
    Env  = "dev"
  }
}



variable "key_name" {
  description = "EC2 Key Pair Name"
  type        = string
}




output "instance_public_ip" {
  value = aws_instance.tvk_monitor.public_ip
}

output "instance_id" {
  value = aws_instance.tvk_monitor.id
}



