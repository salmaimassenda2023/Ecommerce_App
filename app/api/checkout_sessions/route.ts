import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';

export async function POST(req) {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');

        // Récupérer les données du corps de la requête
        const body = await req.json();
        const cartItems = body.cartItems; // Supposons que `cartItems` est un tableau d'articles
        console.log('🛒 Données reçues:', cartItems); // Vérifie le contenu du panier

        // Créer les line_items dynamiquement
        const line_items = cartItems.map((item) => {
            // Récupérer l'image depuis Sanity (ou un autre CMS)
            const img = item.image[0].asset._ref;
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/369v1pkr/production/').replace('-webp', '.webp');

            return {
                price_data: {
                    currency: 'usd', // Devise
                    product_data: {
                        name: item.name, // Nom du produit
                        images: [newImage], // Image du produit
                    },
                    unit_amount: item.price * 100, // Prix en cents
                },
                adjustable_quantity: {
                    enabled: true, // Permettre à l'utilisateur d'ajuster la quantité
                    minimum: 1, // Quantité minimale
                },
                quantity: item.quantity, // Quantité du produit
            };
        });
        console.log('Stripe Object:', stripe);
        // Créer la session de paiement Stripe
        const session = await stripe.checkout.sessions.create({
            submit_type: 'pay', // Type de soumission
            mode: 'payment', // Mode de paiement
            payment_method_types: ['card'], // Méthodes de paiement acceptées
            billing_address_collection: 'auto', // Collecte automatique de l'adresse de facturation
            shipping_options: [
                { shipping_rate: 'shr_1QvgOfGMvHZk4oqlCznRPH5q' }, // Option d'expédition (remplacez par votre ID)
            ],
            line_items: line_items, // Articles du panier
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`, // URL de succès
            cancel_url: `${origin}/?canceled=true`, // URL d'annulation
        });

        // Rediriger l'utilisateur vers l'URL de paiement Stripe
        return NextResponse.json({ url: session.url });
    } catch (err) {
        // Gérer les erreurs
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}