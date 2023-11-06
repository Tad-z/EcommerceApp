import axios from "axios";
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

export async function getServerData(url) {
  if (typeof window !== "undefined") {
    let token = window.localStorage.getItem("token");
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await reqInstance.get(url);
    return data;
  }
}

export async function postServerData(url, payload) {
  if (typeof window !== "undefined") {
    let token = window.localStorage.getItem("token");
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await reqInstance.post(url, payload);
    return data;
  }
}
const reqInstance = axios.create();

// Add an interceptor to include the token in the headers for each request
reqInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    let token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default class ApiCall {
  static async getMethod(url) {
    const response = await axios.get(url);
    if (response.status) {
      return response.data;
    }

    return null;
  }

  static async postMethod(url, payload) {
    return axios.post(url, payload);
  }
}


const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: process.cwd() + '/pages/email_templates/',
    defaultLayout: false,
  },
  viewPath: process.cwd() + '/pages/email_templates/',
};

transport.use('compile', hbs(handlebarOptions));

export async function sendOrderConfirmationEmail(orderData) {
  const { fullname, phoneNumber, city, adress,  user, cartItems } = orderData;

  const mailOptions = {
    from: process.env.MY_EMAIL,
    template: 'order_confirmation',
    to: user.email, // Send the email to the user's email address
    subject: 'Order Confirmation',
    context: {
      name: user.username,
      orderItems: cartItems,
      fullname,
      phoneNumber,
      city,
      adress,
    },
  };

  try {
    const sendMail = await transport.sendMail(mailOptions);
    console.log('Order Confirmation Email sent successfully');
    return sendMail;
  } catch (error) {
    console.error('Error sending Order Confirmation Email:', error);
    throw error;
  }
}



