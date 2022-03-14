// Imports
const {
  CreateLaunchTemplateCommand
} = require('@aws-sdk/client-ec2')

const helpers = require('./helpers')

const ltName = 'hamsterLT'
const roleName = 'hamsterLTRole'
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

async function execute () {
  try {
    const profileArn = await helpers.createIamRole(roleName)
    const response = await createLaunchTemplate(ltName, profileArn)
    console.log('Created launch template with:', response)
  } catch (err) {
    console.error('Failed to create launch template with:', err)
  }
}

async function createLaunchTemplate (ltName, profileArn) {
  const params = {
    LaunchTemplateName: ltName,
    LaunchTemplateData: {
      IamInstanceProfile: {
        Arn: profileArn
      },
      ImageId: 'ami-0d8e3873323ca4978',
      InstanceType: 't2.micro',
      KeyName: keyName,
      SecurityGroups: [ sgName ],
      UserData: 'IyEvYmluL2Jhc2gKY3VybCAtLXNpbGVudCAtLWxvY2F0aW9uIGh0dHBzOi8vcnBtLm5vZGVzb3VyY2UuY29tL3NldHVwXzE2LnggfCBzdWRvIGJhc2ggLQpzdWRvIHl1bSBpbnN0YWxsIC15IG5vZGVqcwpzdWRvIHl1bSBpbnN0YWxsIC15IGdpdApjZCBob21lL2VjMi11c2VyCmdpdCBjbG9uZSBodHRwczovL2dpdGh1Yi5jb20vcnlhbm11cmFrYW1pL2hiZmwuZ2l0CmNkIGhiZmwKbnBtIGkKbnBtIHJ1biBzdGFydA=='
    }
  }

  const command = new CreateLaunchTemplateCommand(params)

  return helpers.sendCommand(command)
}

execute()