pipeline {
    agent any

    environment {
        DOCKER_USER = "snesh111"
        IMAGE_TAG = "v1"
    }

    stages {

        stage('Build Images') {
            steps {
                sh '''
                docker build -t $DOCKER_USER/frontend:$IMAGE_TAG ./frontend
                docker build -t $DOCKER_USER/api-gateway:$IMAGE_TAG ./backend/api-gateway
                docker build -t $DOCKER_USER/product-service:$IMAGE_TAG ./backend/product-service
                docker build -t $DOCKER_USER/order-service:$IMAGE_TAG ./backend/order-service
                docker build -t $DOCKER_USER/queue-service:$IMAGE_TAG ./backend/queue-service
                '''
            }
        }