pipeline {
    agent any

    environment {
        SSH_USER    = "deploy"
        SSH_HOST    = "13.126.91.50"
        APP_DIR     = "/home/deploy/apps/jananayagan"
        APP_NAME    = "jananayagan-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sugimx/jananayagan.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'rm -rf node_modules .next'
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Build Next.js') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Prepare Artifact') {
            steps {
                sh '''
                rm -rf build
                mkdir build
                cp -r .next package.json public .env.production build/
                cd build && zip -r app.zip .
                '''
            }
        }

        stage('Deploy to Server') {
            steps {
                sh '''
                scp -o StrictHostKeyChecking=no build/app.zip ${SSH_USER}@${SSH_HOST}:${APP_DIR}/
                ssh ${SSH_USER}@${SSH_HOST} "cd ${APP_DIR} && rm -rf current && mkdir current && unzip app.zip -d current"
                '''
            }
        }

        stage('Restart PM2') {
            steps {
                sh '''
                ssh ${SSH_USER}@${SSH_HOST} "
                    pm2 stop ${APP_NAME} || true &&
                    pm2 delete ${APP_NAME} || true &&
                    cd ${APP_DIR}/current &&
                    pm2 start 'npm run start' --name ${APP_NAME} &&
                    pm2 save
                "
                '''
            }
        }
    }

    post {
        failure {
            echo "Deployment failed"
        }
        success {
            echo "Deployment successful"
        }
    }
}
