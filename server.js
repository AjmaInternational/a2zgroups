import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-order", async (req, res) => {
  const order = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ajmainternational.neg@gmail.com",
      pass: "gelo msch dcat rpnp" // replace with your Gmail App password
    }
  });

  const items = order.items.map(i => `${i.name} x${i.quantity}`).join("\n");

  const mailOptions = {
    from: "ajmainternational.neg@gmail.com",
    to: "ajmainternational.neg@gmail.com",
    subject: "New Order Received - A2ZGROUPS",
    text: `
New Order Received

Customer: ${order.customer.firstName} ${order.customer.lastName}
Email: ${order.customer.email}
Phone: ${order.customer.phone}

Address:
${order.customer.address}, ${order.customer.city}, ${order.customer.postcode}

Items:
${items}

Total: £${order.total}
`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));