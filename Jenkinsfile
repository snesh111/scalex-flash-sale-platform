pipeline {
    agent any

    environment {
        DOCKER_USER = "snesh111"
        IMAGE_TAG = "v1"
    }

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/YOUR_USERNAME/ScaleX.git'
            }
        }

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

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin

                    docker push $DOCKER_USER/frontend:$IMAGE_TAG
                    docker push $DOCKER_USER/api-gateway:$IMAGE_TAG
                    docker push $DOCKER_USER/product-service:$IMAGE_TAG
                    docker push $DOCKER_USER/order-service:$IMAGE_TAG
                    docker push $DOCKER_USER/queue-service:$IMAGE_TAG
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                kubectl apply -f kubernetes/
                kubectl rollout restart deployment frontend
                kubectl rollout restart deployment api-gateway
                kubectl rollout restart deployment product-service
                kubectl rollout restart deployment order-service
                kubectl rollout restart deployment queue-service
                '''
            }
        }
    }
}