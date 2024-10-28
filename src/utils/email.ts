import nodemailer from "nodemailer";
let transporter: any;
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';

const renderTemplate = async (templateName: string, context: any) => {
    const filePath = path.join('src/template', `${templateName}.ejs`);
    console.log(filePath)
    const template = await fs.promises.readFile(filePath, 'utf-8');
    return ejs.render(template, context);
};

const sendEmail = async (to: [String], subject: string, template: any, context: any) => {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "bctvipin881@gmail.com",
            pass: "ulzedfzjqwimwssa"
        }
    })




    const html = await renderTemplate('assign_password', { name: 'John Doe', });


    const mailOptions = {
        from: 'bctvipin881@gmail.com',
        to,
        subject,
        html,
    }


    // Send email options using the transporter
    transporter.sendMail(mailOptions, function (err: any, info: any) {
        if (err) {
            console.log('Error: ', err)
        } else {
            console.log('Message sent successfully!')
        }
    })
    transporter.sendMail(mailOptions, function (err: any, info: any) {
        if (err) {
            console.log('Error: ', err)
        } else {
            console.log('Message sent successfully!')
        }
    })

}

export {
    sendEmail
}
