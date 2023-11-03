import nodemailer from 'nodemailer';

export default async function POST(req, res) {
  try{

  // const { email, message } = await req.json();
  console.log(process.env.MY_EMAIL);

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: "david.akintade1000@gmail.com",
    subject: `Order Confirmation`,
    text: "Hello world",
  };

    const sendMail = await transport.sendMail(mailOptions)
    if(sendMail){
      console.log("Email sent successfully")
      return res.status(200).json({ message: "Email Sent" })
    } else {
      console.log("Email not sent")
      return res.status(400).json({ message: "Email not sent" })
    }
    

  } catch(error) {
    return res.status(500).json({ error }, { status: 500 })
  }
 

}
