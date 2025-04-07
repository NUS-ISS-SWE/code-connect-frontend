pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "maxin0525/codeconnect-frontend"
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'feature/sprint4/maxin/CDCNT-39-CICD', credentialsId: 'github-pat', url: 'https://github.com/NUS-ISS-SWE/code-connect-frontend.git'
            }
        }

        stage('Install & Build Frontend') {
            steps {
                sh '''
                    npm install --legacy-peer-deps
                    npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t ${DOCKER_IMAGE}:latest .
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Frontend built and pushed successfully!"
        }
        failure {
            echo "❌ Build failed."
        }
    }
}
