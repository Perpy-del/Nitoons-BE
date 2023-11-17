import sgMail = require('@sendgrid/mail')
import fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import { config } from '../config/index'

sgMail.setApiKey(config.sendgridApiKey)

export interface ISendMail {
  to: string
  from: string
  subject: string
  text: string
  template: string
  payload: {}
}

const sendMail = async (props: ISendMail) => {
  try {
    const templateSource = fs.readFileSync(
      path.join(__dirname, props.template),
      'utf-8',
    )
    const loginPinTemplate = handlebars.compile(templateSource)

    const mailTemplate = {
      to: props.to,
      from: props.from,
      subject: props.subject,
      text: props.text,
      html: loginPinTemplate(props.payload),
    }

    await sgMail.send(mailTemplate)
  } catch (err) {
    console.log(err)

    if (err.response) {
      console.log(err.response.body)
    }
  }
}

// sendMail(
//     to: 'recipient@example.com',
//     from: 'sender@example.com',
//     subject: 'Your Subject',
//     text: 'Your plain text content',
//     html: '<p>Your HTML content</p>',
// );

export default sendMail
