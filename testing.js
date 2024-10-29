(async () => {
    const nodemailer = require("nodemailer");
    const hbs = (await import("nodemailer-express-handlebars")).default;
    // import path from "path";


    // Configure transporter with GMAIL credentials

    // Configure Handlebars plugin in Nodemailer

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "bctvipin881@gmail.com",
            pass: "ulzedfzjqwimwssa"
        }
    })

    const hbsOptions = {
        viewEngine: {
            partialsDir: 'src/template',
            layoutsDir: 'src/template',
            defaultLayout: 'baseMessage'
        },
        viewPath: 'src/template'
    }

    transporter.use('compile', hbs(hbsOptions))

    function sendEmail(to, subject, template, context) {

        //Configure email options like from, to, subject, message, attachments, template...
        const mailOptions = {
            from: 'bctvipin881@gmail.com',
            to,
            subject,
            template,
            context
        }



        // Send email options using the transporter
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error: ', err)
            } else {
                console.log('Message sent successfully!')
            }
        })
    }

    // Calling the function
    sendEmail(['vipinv0647@gmail.com'], 'Dynamic Email Template with Handlebars', 'welcomeMessage', { accessCode: '123456' })
})()