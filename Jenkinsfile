pipeline {
    agent any

    environment {
        SSH_USER = "deploy"
        SSH_HOST = "13.126.91.50"
        APP_DIR  = "/home/deploy/apps/jananayagan"
        APP_NAME = "jananayagan-frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sugimx/jananayagan.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    rm -rf node_modules .next
                    npm install --legacy-peer-deps
                '''
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

                    # Create env file required by Next.js during runtime
                    cat <<EOF > .env.production
NEXT_PUBLIC_DOMAIN_URL=https://api.tvkcup2026.com/api
NEXT_PUBLIC_API_BASE_URL=https://api.tvkcup2026.com/api
AUTH_SECRET=<@TISAUTHSECRET@>
NEXT_PUBLIC_GOOGLE_CLIENT_ID=443405172001-sn5207gfe8nned820k77fe3265imthj3.apps.googleusercontent.com
EOF

                    cp -r .next package.json public .env.production build/
                    cd build && zip -r app.zip .
                '''
            }
        }

        stage('Upload to Server') {
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
        success {
            echo "Deployment successful."
        }
        failure {
            echo "Deployment failed."
        }
    }
}
