import { serve } from "https://deno.land/std/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {

    const order = await req.json();
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
  from: "onboarding@resend.dev",
  to: ["ajmainternational.neg@gmail.com"],
  subject: "New Order Received",
  html: `
<h2>New Order Received</h2>

<h3>Customer Details</h3>

<p><b>Name:</b> ${order.customer.firstName} ${order.customer.lastName}</p>
<p><b>Email:</b> ${order.customer.email}</p>
<p><b>Phone:</b> ${order.customer.phone}</p>

<p><b>Address:</b> ${order.customer.address}</p>
<p><b>City:</b> ${order.customer.city}</p>
<p><b>Postcode:</b> ${order.customer.postcode}</p>

<hr>

<h3>Order Items</h3>

<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
<tr>
<th>Product</th>
<th>Qty</th>
<th>Price</th>
</tr>

${order.items.map(item => `
<tr>
<td>${item.name}</td>
<td>${item.quantity}</td>
<td>£${(item.price * item.quantity).toFixed(2)}</td>
</tr>
`).join("")}

</table>

<br>

<h3>Total: £${order.total}</h3>

<hr>

<p>Order placed from A2ZGroups website.</p>
`
})
    });

    const data = await resendResponse.json();
    console.log("RESEND RESPONSE:", data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (err) {

    console.error("FUNCTION ERROR:", err);

    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  }

});