pipeline {
    agent any

    environment {
        DOCKER_USER = "snesh111"
        IMAGE_TAG = "${BUILD_NUMBER}"
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
                kubectl set image deployment/frontend frontend=$DOCKER_USER/frontend:$IMAGE_TAG
                kubectl set image deployment/api-gateway api-gateway=$DOCKER_USER/api-gateway:$IMAGE_TAG
                kubectl set image deployment/product-service product-service=$DOCKER_USER/product-service:$IMAGE_TAG
                kubectl set image deployment/order-service order-service=$DOCKER_USER/order-service:$IMAGE_TAG
                kubectl set image deployment/queue-service queue-service=$DOCKER_USER/queue-service:$IMAGE_TAG
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                kubectl rollout status deployment/frontend
                kubectl rollout status deployment/api-gateway
                kubectl rollout status deployment/product-service
                kubectl rollout status deployment/order-service
                kubectl rollout status deployment/queue-service
                '''
            }
        }
    }
}
