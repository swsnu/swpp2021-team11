pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        echo 'Hello!'
        sh 'docker run -v ${PWD}/frontend/soolae:/app --rm --name hw3 node:14.17.6 /bin/bash -c \'cd /app && yarn install && yarn test\''
        cobertura(classCoverageTargets: 'CoberturaPublisher', coberturaReportFile: 'coverage/cobertura-coverage.xml')
      }
    }

  }
}