const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1KttWnKDvXXGYi3i3EFfJwLv" },
          { shipping_rate: "shr_1KttXrKDvXXGYi3i6FQSjgvQ" },
        ],
        line_items: req.body.map((item: any) => {
          /* const img = item.image[0];
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/gdnjcpnr/production/"
            )
            .replace("-webp", ".webp"); */
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.name,
                /* images: [newImage], */
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
