import nodemailer from 'nodemailer';
import path from 'path'
import hbs from 'nodemailer-express-handlebars';

export default async function POST(req, res) {
  try{
  const { email, message } = await req.body;
  console.log(email);
  console.log(process.env.MY_EMAIL);

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const handlebarOptions = {
    viewEngine: {
        partialsDir: process.cwd() + "/pages/email_templates/",
        defaultLayout: false,
    },
    viewPath: process.cwd() + "/pages/email_templates/",
};

transport.use('compile', hbs(handlebarOptions))

  const mailOptions = {
    from: process.env.MY_EMAIL,
    template: "order_confirmation",
    to: "david.akintade1000@gmail.com",
    subject: `Order Confirmation`,
    context: {
      name: "tade",
      company: 'emax'
    },
  };

    const sendMail = await transport.sendMail(mailOptions)
    if(sendMail){
      console.log("Email sent successfully")
      return res.status(200).json({ message: "Email Sent" })
    } else {
      console.log("Email not sent")
      return res.status(400).json({ message: "Email not sent" })
    }

    // await new Promise((resolve, reject) => {
    //   // send mail
    //   transporter.sendMail(mailOptions, (err, response) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve(response);
    //     }
    //   });
    // });
    // no try catch
    

  } catch(error) {
    console.log(error)
    return res.status(500).json({ error }, { status: 500 })
  }
 

}
