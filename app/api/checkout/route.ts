import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const { missionId, prixTotal, titre } = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Mission : ${titre}`,
            description: 'Audit fournisseur via EyeDropper',
          },
          unit_amount: prixTotal * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?paiement=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?paiement=cancel`,
    metadata: {
      missionId,
    },
  })

  return NextResponse.json({ url: session.url })
}