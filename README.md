# end-to-end-wine-prediction


## Overview
This project is a web-based movie recommendation system that uses FastAPI for the backend and serves HTML, CSS, and JavaScript for the frontend. The application predicts wine quality based on user input and provides recommendations.

## Table of Contents
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Deployment](#deployment)
6. [GitHub Actions for CI/CD](#github-actions-for-cicd)


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
   Access the application at http://localhost:8080 ensure it works well in local (change the fetch location in js file to http://localhost:8080/predict or http://127.0.0.1:8080/predict)

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
         
## GitHub Actions for CI/CD
   - This project uses GitHub Actions to automate the deployment process to AWS EC2. Ensure you have set the following secrets in your GitHub repository:
   - EC2_SSH_KEY: Your EC2 key pair content.
The workflow will automatically deploy the application upon pushing changes to the main branch.

