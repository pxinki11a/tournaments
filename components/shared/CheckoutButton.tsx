"use client"

import { ITournaments } from '@/lib/database/models/tournaments.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'

const CheckoutButton = ({ tournament }: { tournament: ITournaments }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasTournamentFinished = new Date(tournament.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasTournamentFinished ? (
        <p className="p-2 text-red-400">Турнир уже закончен.</p>
      ): (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">
                Get Tickets
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout tournament={tournament} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckoutButton