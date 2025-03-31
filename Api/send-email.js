// api/send-email.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { formData } = req.body;
      
      // இங்கே உங்கள் email அனுப்பும் backend logic இருக்கும்
      try {
        // உதாரணமாக: Email சேவையை பயன்படுத்தி மின்னஞ்சல் அனுப்புவது
        console.log('Sending email with data:', formData);
        
        // வெற்றிகரமாக பதில் அளிக்க
        return res.status(200).json({ message: 'Order placed successfully!' });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to send order details' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  