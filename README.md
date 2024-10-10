# end-to-end-wine-prediction


## Overview
This project is a wine quality prediction system that uses FastAPI for the backend and serves HTML, CSS, and JavaScript for the frontend. The application predicts wine quality based on user input and provides wine quality is good or bad.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Deployment](#deployment)
5. [GitHub Actions for CI/CD](#github-actions-for-cicd)


## Technologies Used
- **FastAPI**: Web framework for building APIs.
- **HTML/CSS/JavaScript**: Frontend technologies for user interface.
- **Scikit-learn**: Machine learning library used for predictions.
- **GitHub Actions**: CI/CD for automated deployment.
- **AWS EC2**: Cloud hosting for the application.

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2.Set up a virtual environment and install dependencies:
  ```bash
    python -m venv env
    source env/bin/activate
    pip install -r requirements.txt.
```


## Usage
**Start the FastAPI application**:
 ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8080
```
   Access the application at http://localhost:8080. Ensure it works well locally (update the fetch location in the JavaScript file to http://localhost:8080/predict or http://127.0.0.1:8080/predict).
   
## Deployment
   - Step 1: Create an AWS EC2 Instance
      - Log in to the AWS Management Console.
      - Navigate to EC2 and launch a new instance (choose the Free Tier).
      - Configure security group settings to allow inbound traffic on port 8080.
      - Save your EC2 key pair (e.g., your-ec2-key.pem).
        
   - Step 2: Connect to Your EC2 Instance
      - Store your EC2 key pair in GitHub secrets:
      - Go to your GitHub repository settings.
      - Under "Secrets and variables", add a new secret named EC2_SSH_KEY with the content of your your-ec2-key.pem.
         Then connect to your EC2 instance using:
           ```bash
                 ssh -i "your-ec2-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
           ```
      - Step 3: Clone the Repository on EC2
         - Run the following commands on your EC2 instance:
            ```bash
               sudo apt update
               sudo apt install python3-pip python3-venv git
               git clone https://github.com/your-username/your-repository.git
               cd your-repository
             ```
            
      - Step 4: Start the FastAPI Application
         ```bash
            python -m venv env
            source env/bin/activate
            pip install -r requirements.txt
            uvicorn app.main:app --host 0.0.0.0 --port 8080
         ```

     - Update JavaScript Fetch Line
        - Ensure that the fetch request in your JavaScript file points to your EC2 instance's public IP:
          ```bash
             fetch("http://YOUR_EC2_PUBLIC_IP:8080/predict", {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify(data),
               })
          ```
          Replace YOUR_EC2_PUBLIC_IP with the actual public IP of your EC2 instance.
      - Stopping the Running Process on Port 8080
           1. Check for Running Processes on Port 8080
                 SSH into your EC2 instance and check which process is using port 8080:
              ```bash
              ssh -i "/path/to/your/local/directory/ec2-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
               ```
              Once logged in, run:
              ```bash
              sudo lsof -i :8080 #This command will list any processes using port 8080.
              
              COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
              uvicorn  3789 ubuntu    3u  IPv4 1234567      0t0  TCP *:8080 (LISTEN)
               ```
           2. Stop the Process Using Port 8080
               ```bash
              sudo kill -9 <PID>
               ```
               Replace <PID> with the actual process ID you found.

         
## GitHub Actions for CI/CD
   - This project uses GitHub Actions to automate the deployment process to AWS EC2. Ensure you have set the following secrets in your GitHub repository:
   - EC2_SSH_KEY: Your EC2 key pair content.
The workflow will automatically deploy the application upon pushing changes to the main branch.

