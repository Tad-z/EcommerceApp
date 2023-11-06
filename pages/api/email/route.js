import { sendOrderConfirmationEmail } from "../helper";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const orderData = req.body; 
      await sendOrderConfirmationEmail(orderData);
      res.status(200).json({ message: 'Order placed and email sent.' });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).end();
  }
}
