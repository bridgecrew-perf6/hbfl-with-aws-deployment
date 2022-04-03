const {
  SNSClient,
  PublishCommand
} = require('@aws-sdk/client-sns')

const client = new SNSClient({ region: process.env.AWS_REGION })
const topicArn = 'arn:aws:sns:us-east-1:705519027810:hamster-topic'

function publish (msg) {
  const params = {
    TopicArn : topicArn,
    Message: msg
  }

  const command = new PublishCommand(params)

  return client.send(command)
}

module.exports = { publish }
