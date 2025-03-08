pipeline {
    agent any

    environment {
        NODE_VERSION = "22.14.0"  // Define the required Node.js version
        NPM_VERSION = "11.1.0"
        DEPLOY_USER = 'deployuser'
        DEPLOY_SERVER = '20.120.97.51'       
        DEPLOY_DIR = "/var/www/expense-track-frontend-app"
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // Install Node.js & npm (Only if using a Linux agent)
                    sh '''
                    echo "Installing Node.js version ${NODE_VERSION}..."
                    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
                    sudo apt install -y nodejs
                    npm install -g npm@${NPM_VERSION}
                    node -v
                    npm -v
                    '''
                }
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/alijarai12/Expenses-Trackering-Frontend.git'
            }
        }


        stage('Dummy Stage 2') {
            steps {
                echo 'Another dummy stage to confirm pipeline execution.'
            }
        }
        
        
        stage('Install Dependencies') {
            steps {
                sh '''
                echo "Removing node_modules and package-lock.json..."
                rm -rf node_modules package-lock.json
                
                echo "Installing dependencies..."
                npm install
                '''
            }
        }

        stage('Build Project') {
            steps {
                sh '''
                echo "Building project..."
                npm run build
                '''
            }
        }

        stage('Deploy to Production') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                    # Deploy build files using rsync
                    echo "Deploying build files to production server..."
                    rsync -avz --delete -e "ssh -i $SSH_KEY" ./dist/ ${DEPLOY_USER}@${DEPLOY_SERVER}:${DEPLOY_DIR}

                    # Restart Nginx on production server
                    echo "Restarting Nginx on production server..."
                    ssh -i $SSH_KEY ${DEPLOY_USER}@${DEPLOY_SERVER} "sudo systemctl restart nginx"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build successful!'
        }
        failure {
            echo '❌ Build failed. Check the logs for errors.'
        }
    }
}
