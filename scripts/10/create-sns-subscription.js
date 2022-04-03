// Imports
const {
  SubscribeCommand
} = require('@aws-sdk/client-sns')
const { sendSNSCommand: sendCommand } = require('./helpers')

// Declare local variables
const type = 'sms'
const endpoint = '639156481999'
const topicArn = 'arn:aws:sns:us-east-1:705519027810:hamster-topic'

async function execute () {
  try {
    const response = await createSubscription(type, topicArn, endpoint)
    console.log(response)
  } catch (err) {
    console.error('Error subscribing to topic:', err)
  }
}

function createSubscription (type, topicArn, endpoint) {
  const params = {
    Protocol: type,
    TopicArn: topicArn,
    Endpoint: endpoint
  }

  const command = new SubscribeCommand(params)
  return sendCommand(command)
}

execute()
