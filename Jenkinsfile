pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "maxin0525/codeconnect-frontend"
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        GIT_CREDENTIALS_ID = 'github-pat'
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'feature/sprint4/maxin/CDCNT-39-CICD', description: 'Frontend branch to build')
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

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
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
            echo '✅ Frontend Docker image built and pushed!'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}
