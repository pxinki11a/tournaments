import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getTournamentsByUser } from '@/lib/actions/tournaments.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from "@clerk/nextjs/server"
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const tournamentsPage = Number(searchParams?.tournamentsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage})

  const orderedTournaments = orders?.data.map((order: IOrder) => order.tournament) || [];
  const organizedTournaments = await getTournamentsByUser({ userId, page: tournamentsPage })

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Мои участия</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#tournaments">
              Explore More Tournaments
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={orderedTournaments}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting Tournaments to explore!"
          collectionType="My_Requests"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Tournaments Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/tournaments/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={organizedTournaments?.data}
          emptyTitle="No tournaments have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Tournaments_Organized"
          limit={3}
          page={tournamentsPage}
          urlParamName="tournamentsPage"
          totalPages={organizedTournaments?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage