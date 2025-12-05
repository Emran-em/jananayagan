pipeline {
    agent any

    environment {
        SSH_USER     = "deploy"
        SSH_HOST     = "13.126.91.50"
        APP_PATH     = "/home/deploy/apps/jananayagan"
        RELEASES_DIR = "/home/deploy/apps/jananayagan/releases"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/main"]],
                    userRemoteConfigs: [[url: "https://github.com/Emran-em/jananayagan.git"]]
                ])
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
                sh '''
                    npm run build
                '''
            }
        }

        stage('Prepare Artifact') {
            steps {
                sh '''
                    rm -rf build
                    mkdir build
                    cp -r .next package.json public node_modules build/
                    cd build
                    zip -r app.zip .
                '''
            }
        }

        stage('Upload to Server') {
            steps {
                sh '''
                    scp -o StrictHostKeyChecking=no build/app.zip ${SSH_USER}@${SSH_HOST}:${RELEASES_DIR}/
                '''
            }
        }

        stage('Deploy & Restart') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} '
                    cd ${RELEASES_DIR}
                    RELEASE=release-$(date +%d%m-%H%M)
                    mkdir $RELEASE
                    unzip app.zip -d $RELEASE
                    rm -f app.zip
                    rm -f ${APP_PATH}/current
                    ln -s ${RELEASES_DIR}/$RELEASE ${APP_PATH}/current

                    pm2 stop frontend || true
                    cd ${APP_PATH}/current
                    pm2 start "npm start" --name frontend
                    pm2 save
                '
                """
            }
        }
    }

    post {
        failure {
            echo "Deployment failed."
        }
        success {
            echo "Deployment successful!"
        }
    }
}
