pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "maxin0525/codeconnect-frontend"
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        GIT_CREDENTIALS_ID = 'github-pat'
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Frontend branch to build')
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

        // stage('Run Tests') {
        //     steps {
        //         echo '🧪 Run frontend unit tests (e.g., Vitest/Jest)'
        //         sh 'npm ci && npm run test -- --coverage'
        //         junit 'coverage/junit.xml'
        //         publishHTML([reportDir: 'coverage', reportFiles: 'index.html', reportName: 'Frontend Coverage'])
        //     }
        // }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
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
                    sh """
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
