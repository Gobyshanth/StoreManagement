const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gobyg034@gmail.com", // உங்கள் Gmail முகவரி
    pass: "nshv bbun phos sdgq",
  },
});

// Email Sending Endpoint
app.post("/send-email", async (req, res) => {
  const { username, phoneNumber, address, pieces, paymentMethod, cardDetails } = req.body;

  const mailOptions = {
    from: "gobyg034@gmail.com", // Your Gmail address
    to: "gobyshanth@iykons.com", // Recipient email
    subject: "PIXGEO New Order Details",
    text: `
      Username: ${username}
      Phone Number: ${phoneNumber}
      Address: ${address}
      Number of Pieces: ${pieces}
      Payment Method: ${paymentMethod}
      Product Details:
        - Title: ${cardDetails.title}
        - Description: ${cardDetails.description}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

let ratings = {}; // In-memory storage for ratings (replace with a database in production)

// Get all ratings
app.get('/api/ratings', (req, res) => {
  res.json(ratings);
});

// Submit a new rating
app.post('/api/ratings', (req, res) => {
  const { productId, rating } = req.body;
  if (!ratings[productId]) {
    ratings[productId] = { allRatings: [], userRating: null };
  }
  ratings[productId].allRatings.push(rating); // Store the rating
  ratings[productId].userRating = rating; // Store the user's rating
  res.status(201).json({ message: 'Rating submitted successfully' });
});

// Helper function to calculate average rating
function calculateAverageRating(productId) {
  const productRatings = ratings[productId]?.allRatings || [];
  const total = productRatings.reduce((sum, r) => sum + r, 0);
  return productRatings.length ? (total / productRatings.length).toFixed(1) : 0;
}

// Start the Server
app.listen(5000, () => console.log("Server running on port 5000"));
