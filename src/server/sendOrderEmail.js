import nodemailer from "nodemailer";

export default async function sendOrderEmail(order) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ajmainternational.neg@gmail.com",
      pass: "gelo msch dcat rpnp"
    }
  });

  const items = order.items
    .map(i => `${i.name} x${i.quantity}`)
    .join("\n");

  await transporter.sendMail({
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
  });

}