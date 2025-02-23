// app/success/page.js
import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import SuccessContent from './SuccessContent'; // Importez le composant client

// Fonction pour récupérer les données de session Stripe
async function getSessionData(session_id) {
    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent'],
    });

    // Extraire uniquement les données nécessaires
    return {
        status: session.status,
        customerEmail: session.customer_details?.email,
    };
}

// Page principale (côté serveur)
export default async function SuccessPage({ searchParams }) {
    const { session_id } = searchParams;

    try {
        const sessionData = await getSessionData(session_id);

        if (sessionData.status === 'open') {
            return redirect('/');
        }

        if (sessionData.status === 'complete') {
            // Passez uniquement les données nécessaires au composant client
            return <SuccessContent customerEmail={sessionData.customerEmail} />;
        }
    } catch (error) {
        console.error('Error:', error);
        return redirect('/');
    }
}