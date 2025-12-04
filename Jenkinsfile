pipeline {
    agent any

    environment {
        GIT_REPO     = "https://github.com/sugimx/jananayagan.git"
        GIT_BRANCH   = "main"
        DEPLOY_USER  = "deploy"
        DEPLOY_HOST  = "13.126.91.50"
        APP_PATH     = "/home/deploy/apps/jananayagan"
        RELEASES_DIR = "/home/deploy/apps/jananayagan/releases"
        PM2_NAME     = "frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Checking out repository"
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Install & Build') {
            steps {
                sh """
                    rm -rf node_modules
                    npm install
                    npm run build
                """
            }
        }

        stage('Prepare Release') {
            steps {
                echo "Preparing release package"
                withCredentials([file(credentialsId: 'PROD_ENV', variable: 'PROD_ENV_FILE')]) {
                    sh """
                        RELEASE_NAME=release-\$(date +%d%m-%H%M)
                        mkdir -p \${RELEASE_NAME}

                        cp -R .next package.json package-lock.json public \${RELEASE_NAME}/
                        cp \$PROD_ENV_FILE \${RELEASE_NAME}/.env.production

                        tar -czf \${RELEASE_NAME}.tar.gz \${RELEASE_NAME}
                        echo \${RELEASE_NAME} > release.txt
                    """
                }
                stash includes: '*.tar.gz,release.txt', name: 'artifact'
            }
        }

        stage('Upload to Server') {
            steps {
                unstash 'artifact'
                sh """
                    RELEASE_NAME=\$(cat release.txt)
                    scp \${RELEASE_NAME}.tar.gz ${DEPLOY_USER}@${DEPLOY_HOST}:${RELEASES_DIR}/
                    ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${RELEASES_DIR} && tar -xzf \${RELEASE_NAME}.tar.gz"
                """
            }
        }

        stage('Activate Release & Restart') {
            steps {
                sh """
                    RELEASE_NAME=\$(cat release.txt)
                    ssh ${DEPLOY_USER}@${DEPLOY_HOST} "
                        cd ${APP_PATH}/releases/\${RELEASE_NAME} &&
                        npm install --omit=dev &&
                        cd ${APP_PATH} &&
                        rm -f current &&
                        ln -s releases/\${RELEASE_NAME} current &&
                        pm2 delete ${PM2_NAME} || true &&
                        cd current &&
                        pm2 start npm --name ${PM2_NAME} -- start &&
                        pm2 save
                    "
                """
            }
        }
    }

    post {
        success { echo "Deployment completed successfully" }
        failure { echo "Deployment failed" }
    }
}
