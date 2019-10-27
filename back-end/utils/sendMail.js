import nodemailer from 'nodemailer';

const sendMailto = async (to, subject, indication, link) => {
    //const transporter = nodemailer.createTransport(process.env.SMTPS_URI);

    let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                    user: 'willfln34@gmail.com',
                    pass: 'matcha1234'
    }
});
    
    
    // nodemailer.createTestAccount((err, account) => {
    //     // create reusable transporter object using the default SMTP transport
    //     let transporter = nodemailer.createTransport({
    //         host: account.smtp.host,
    //         port: account.smtp.port,
    //         secure: account.smtp.secure,
    //         auth: {
    //             user: account.user,
    //             pass: account.pass
    //         }
    //     });
        let mailOptions = {
            from: '"Matcha ⚡️" <no-reply@matcha.com>',
            to,
            subject,
            html: `<table width="100%" border="0" cellspacing="0" cellpadding="0">
        				<tbody>
                            <tr>
            					<td style="text-align:center">
            						<h1>${subject}</h1>
            						<p>${indication}</p>
                                    <p>${link}</p>
                                </td>
            				</tr>
                        </tbody>
                    <table>`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
};

module.exports = sendMailto;
