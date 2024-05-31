import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection'
import { getTournamentById, getRelatedTournamentsByCategory } from '@/lib/actions/tournaments.actions'
import { getUserById } from '@/lib/actions/user.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';



const TournamentDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const tournament = await getTournamentById(id);

  const relatedTournaments = await getRelatedTournamentsByCategory({
    categoryId: tournament.category._id,
    tournamentId: tournament._id,
    page: searchParams.page as string,
  })

  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image 
          src={tournament.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className='h2-bold'>{tournament.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {tournament.isFree ? 'Бесплатно' : `${tournament.price}₽`}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {tournament.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 p-bold-20 px-5 py-2 rounded-full bg-neutral-200">
                Создан: {tournament.organizer.username}
                <span className="text-primary-500">{tournament.organizer.firstName} {tournament.organizer.lastName}</span>
              </p>
            </div>
          </div>

          <CheckoutButton tournament={tournament} />

          <div className="flex flex-col gap-5">
            <div className='flex gap-2 md:gap-3'>
              <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  {formatDateTime(tournament.startDateTime).dateOnly} - {' '}
                  {formatDateTime(tournament.startDateTime).timeOnly} {'ㅤㅤㅤ'}
                </p>
                <p>
                  {formatDateTime(tournament.endDateTime).dateOnly} - {' '}
                  {formatDateTime(tournament.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
              <p className="p-medium-16 lg:p-regular-20">{tournament.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">Информация о турнире:</p>
            <p className="p-medium-16 lg:p-regular-18">{tournament.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{tournament.url}</p>
          </div>
        </div>
      </div>
    </section>

    {/* EVENTS with the same category */}
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Похожие турниры</h2>

      <Collection 
          data={relatedTournaments?.data}
          emptyTitle="Турниры не найдены"
          emptyStateSubtext="Вы можете создать свой турнир"
          collectionType="All_Tournaments"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedTournaments?.totalPages}
        />
    </section>
    </>
  )
}

export default TournamentDetails