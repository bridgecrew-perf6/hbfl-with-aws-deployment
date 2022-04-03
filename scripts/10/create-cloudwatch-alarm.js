// Imports
const {
  PutMetricAlarmCommand
} = require('@aws-sdk/client-cloudwatch')
const { sendCloudWatchCommand: sendCommand } = require('./helpers')

// Declare local variables
const alarmName = 'hamster-elb-alarm'
const topicArn = 'arn:aws:sns:us-east-1:705519027810:hamster-topic'
const tg = 'targetgroup/hamsterTG/0dd7f9abc38e52a7'
const lb = 'app/hamsterLB/7781338054461c74'

async function execute () {
  try {
    const response = await createCloudWatchAlarm(alarmName, topicArn, tg, lb)
    console.log(response)
  } catch (err) {
    console.error('Error creating CloudWatch alarm:', err)
  }
}

function createCloudWatchAlarm (alarmName, topicArn, tg, lb) {
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: 'LessThanThreshold',
    EvaluationPeriods: 1,
    MetricName: 'HealthyHostCount',
    Namespace: 'AWS/ApplicationELB',
    Period: 60,
    Threshold: 1,
    AlarmActions: [
      topicArn
    ],
    Dimensions: [
      {
        Name: 'TargetGroup',
        Value: tg
      }, {
        Name: 'LoadBalancer',
        Value: lb
      }
    ],
    Statistic: 'Average',
    TreatMissingData: 'breaching'
  }

  const command = new PutMetricAlarmCommand(params)

  return sendCommand(command)
}

execute()
