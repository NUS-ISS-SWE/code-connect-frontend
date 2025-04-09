pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "maxin0525/codeconnect-frontend"
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        GIT_CREDENTIALS_ID = 'github-pat'
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'feature/sprint4/maxin/CDCNT-39-CICD', description: 'Frontend branch to build')
        string(name: 'DEPLOY_PORT', defaultValue: '3100', description: 'Local port to expose for deployment')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}",
                    credentialsId: "${GIT_CREDENTIALS_ID}",
                    url: 'https://github.com/NUS-ISS-SWE/code-connect-frontend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Static Security Scan (SAST)') {
            steps {
                script {
                    echo '🔍 Running ESLint security scan...'
                    sh """#!/bin/bash
                        npm install --save-dev eslint eslint-plugin-security
                        npx eslint . --ext .js,.ts --plugin security || true
                    """

                    echo '🔍 Running Semgrep scan...'
                    sh """#!/bin/bash
                        curl -sL https://semgrep.dev/install.sh | bash
                        semgrep scan --config p/javascript || true
                    """

                    echo '🕵️‍♂️ Running Trivy secret/config scan...'
                    sh """#!/bin/bash
                        curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -
                        ./trivy fs --scanners secret --exit-code 0 --quiet .
                    """
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """#!/bin/bash
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
        stage('Deploy to Dev') {
            steps {
                script {
                    echo "🚀 Deploying frontend container to http://localhost:${params.DEPLOY_PORT}..."

                    sh """#!/bin/bash
                        docker stop codeconnect-frontend || true
                        docker rm codeconnect-frontend || true

                        docker run -d --name codeconnect-frontend -p ${params.DEPLOY_PORT}:3000 ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Frontend Docker image built and pushed!'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}
