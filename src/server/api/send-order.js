import sendOrderEmail from "../sendOrderEmail";
export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {

    await sendOrderEmail(req.body);

    res.status(200).json({ success: true });

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: "Email failed" });

  }

}