# WDC AWS Deployment Demo

This project demonstrates the deployment of a Next.js application on AWS EC2 using a modern production-like infrastructure setup including Nginx Reverse Proxy, PM2 Process Manager, and GitHub CI/CD automation.

The goal of this task was to showcase practical deployment knowledge, server configuration, and automated deployment pipelines.

This implementation covers the complete lifecycle from application development to server setup, deployment, and CI/CD automation.

---

## Deployment Architecture

```
User Browser
│
▼
Nginx (Port 80)
│
Reverse Proxy
│
▼
Next.js App (Port 3000)
│
▼
PM2 Process Manager
│
▼
AWS EC2 Instance
```

---

## Tech Stack

- **Next.js** – Fullstack React Framework
- **AWS EC2** – Cloud Compute Server
- **Nginx** – Reverse Proxy Server
- **PM2** – Node.js Process Manager
- **GitHub Actions** – CI/CD Pipeline
- **Ubuntu Server** – Linux Environment

---

## AWS EC2 Setup

An EC2 instance (t3.micro) was launched in the Asia Pacific (Mumbai) region.

Steps performed:

1. Created EC2 Instance
2. Configured Security Group
3. Allowed required ports:
   - **22 (SSH)**
   - **80 (HTTP)**
   - **3000 (Next.js)**

### EC2 Instance Details

```
Instance Type: t3.micro
OS: Ubuntu
Public IP: <YOUR_PUBLIC_IP>
Region: ap-south-1
```

### Screenshot

Add EC2 Instance Screenshot Here

---

## Next.js Application Setup

A basic Next.js application was created to demonstrate deployment.

### Project Initialization

```bash
npx create-next-app wdc-aws-nextjs-deployment
```

### Start Development Server

```bash
npm run dev
```

Application runs on:

```
http://localhost:3000
```

### Screenshot

Add Next.js Running Screenshot

---

## PM2 Process Manager Setup

PM2 is used to keep the application running in the background and restart automatically if it crashes.

### Install PM2

```bash
npm install -g pm2
```

### Start Next.js App with PM2

```bash
pm2 start npm --name "nextjs-app" -- start
```

### Verify Running Process

```bash
pm2 list
```

### Save PM2 Process

```bash
pm2 save
```

### Screenshot

Add PM2 Running Screenshot

---

## Nginx Reverse Proxy Setup

Nginx is used to serve the application on port 80 and forward traffic to the Next.js server running on port 3000.

### Install Nginx

```bash
sudo apt update
sudo apt install nginx
```

### Verify Installation

```bash
nginx -v
```

### Nginx Configuration

File: `/etc/nginx/sites-available/nextjs-app`

```nginx
server {
    listen 80;
    server_name YOUR_PUBLIC_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/nextjs-app /etc/nginx/sites-enabled/
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

### Screenshot

Add Nginx Configuration Screenshot

---

## CI/CD Pipeline (GitHub Actions)

A GitHub Actions workflow was implemented to automatically deploy the application to EC2 whenever new code is pushed to the main branch.

### Workflow Location

```
.github/workflows/deploy.yml
```

### Workflow Logic

1. Trigger on push to main
2. Connect to EC2 via SSH
3. Pull latest code
4. Install dependencies
5. Restart application using PM2

### CI/CD Workflow

```yaml
name: Deploy Next.js App to AWS EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to EC2
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}

          script: |
            cd /home/ubuntu/WDC_awsTask6
            git pull origin main
            npm install
            npx pm2 restart nextjs-app
```

---

## GitHub Secrets Configuration

Sensitive credentials were stored securely using GitHub Secrets.

Secrets used:

- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`

This prevents exposing sensitive information in the repository.

---

## CI/CD Deployment Success

After pushing code to GitHub:

1. GitHub Actions pipeline triggered automatically
2. SSH connection established to EC2
3. Code pulled from repository
4. Dependencies installed
5. PM2 restarted application

### Screenshot

Add GitHub Actions Success Screenshot

---

## Final Application Access

After deployment, the application is accessible through:

```
http://<EC2_PUBLIC_IP>
```

Nginx handles incoming traffic and forwards requests to the Next.js server.

### Screenshot

Add Final Deployed Website Screenshot

---

## Features Implemented

- Next.js Application Deployment
- AWS EC2 Server Setup
- Nginx Reverse Proxy Configuration
- PM2 Process Management
- GitHub CI/CD Deployment Pipeline
- Secure Secrets Management

---

## Key Learning Outcomes

- Practical AWS EC2 server deployment
- Linux server management
- Nginx reverse proxy configuration
- Process management with PM2
- Automated deployment using GitHub Actions
- Secure environment configuration using GitHub Secrets

---

## Author

**Ayush Yadav**  
B.Tech CSE, NIT Patna

---

## License

This project is created for WDC Induction Task – Deployment Strategy Assignment.
