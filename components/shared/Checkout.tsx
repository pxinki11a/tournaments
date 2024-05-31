import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';

import { ITournaments } from '@/lib/database/models/tournaments.model';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ tournament, userId }: { tournament: ITournaments, userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Заявка подана! Вы получите сообщение на свою почту!');
    }

    if (query.get('canceled')) {
      console.log('Заявка отклонена!');
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      tournamentTitle: tournament.title,
      tournamentId: tournament._id,
      price: tournament.price,
      isFree: tournament.isFree,
      buyerId: userId
    }

    await checkoutOrder(order);
  }

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {tournament.isFree ? 'Участвовать' : 'Участвовать в платном турнире'}
      </Button>
    </form>
  )
}

export default Checkout