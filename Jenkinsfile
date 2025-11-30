pipeline {
    agent any

    environment {
        SSH_USER    = "deploy"
        SSH_HOST    = "13.126.91.50"
        DEPLOY_PATH = "/home/deploy/apps/jananayagan"
        PM2_NAME    = "jananayagan-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh "npm ci"
            }
        }

        stage('Build') {
            steps {
                sh "npm run build"
            }
        }

        stage('Package') {
            steps {
                sh """
                    rm -rf artifact
                    mkdir -p artifact
                    cp -R .next artifact/
                    cp -R public artifact/
                    cp package.json artifact/
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    scp -r artifact ${SSH_USER}@${SSH_HOST}:${DEPLOY_PATH}/build

                    ssh ${SSH_USER}@${SSH_HOST} '
                        cd ${DEPLOY_PATH};
                        rm -rf previous || true;
                        mv current previous || true;
                        mv build current;

                        cd current;
                        pm2 restart ${PM2_NAME} || pm2 start npm --name ${PM2_NAME} -- start;
                    '
                """
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
