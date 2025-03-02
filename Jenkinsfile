pipeline {
    agent any

    environment {
        NODE_VERSION = "22.14.0"  // Define the required Node.js version
        NPM_VERSION = "11.1.0"
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // Install Node.js & npm (Only if using a Linux agent)
                    sh '''
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
                git branch: 'main', url: 'https://github.com/your-repo/your-react-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                rm -rf node_modules package-lock.json
                npm install
                '''
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
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
