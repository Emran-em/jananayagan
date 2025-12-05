pipeline {
    agent any

    environment {
        GIT_REPO     = "https://github.com/sugimx/jananayagan.git"
        GIT_BRANCH   = "main"
        DEPLOY_USER  = "deploy"
        DEPLOY_HOST  = "13.126.91.50"                   // Replace with your server IP
        APP_PATH     = "/home/deploy/apps/jananayagan"
        RELEASES_DIR = "/home/deploy/apps/jananayagan/releases"
        PM2_NAME     = "frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Fetching latest code from ${GIT_BRANCH} branch"
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies & Build') {
            steps {
                echo "Installing dependencies and creating production build"
                sh """
                    rm -rf node_modules
                    npm install
                    npm run build
                """
            }
        }

        stage('Prepare Release Package') {
            steps {
                echo "Packaging build for deployment"
                sh """
                    RELEASE_NAME=release-\$(date +%d%m-%H%M)
                    mkdir -p \${RELEASE_NAME}
                    cp -R .next package.json package-lock.json public \${RELEASE_NAME}/
                    tar -czf \${RELEASE_NAME}.tar.gz \${RELEASE_NAME}
                    echo \$RELEASE_NAME > release-name.txt
                """
                stash includes: '*.tar.gz,release-name.txt', name: 'artifact'
            }
        }

        stage('Upload to Server') {
            steps {
                echo "Uploading release to production server"
                unstash 'artifact'
                sh """
                    RELEASE_NAME=\$(cat release-name.txt)
                    scp \${RELEASE_NAME}.tar.gz \${DEPLOY_USER}@\${DEPLOY_HOST}:\${RELEASES_DIR}/
                    ssh \${DEPLOY_USER}@\${DEPLOY_HOST} "cd \${RELEASES_DIR} && tar -xzf \${RELEASE_NAME}.tar.gz && rm -f \${RELEASE_NAME}.tar.gz"
                """
            }
        }

        stage('Activate Release & Restart Service') {
            steps {
                echo "Switching symlink to new release and restarting PM2"
                sh """
                    RELEASE_NAME=\$(cat release-name.txt)
                    ssh \${DEPLOY_USER}@\${DEPLOY_HOST} "
                        cd \${APP_PATH} &&
                        rm -f current &&
                        ln -s releases/\${RELEASE_NAME} current &&
                        pm2 delete all || true &&
                        cd current &&
                        pm2 start npm --name \${PM2_NAME} -- start &&
                        pm2 save
                    "
                """
            }
        }
    }

    post {
        success {
            echo "Deployment completed successfully."
        }
        failure {
            echo "Deployment failed. Check Jenkins logs."
        }
    }
}
