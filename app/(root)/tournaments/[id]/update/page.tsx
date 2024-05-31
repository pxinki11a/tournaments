import TournamentForm from "@/components/shared/TournamentForm"
import { getTournamentById } from "@/lib/actions/tournaments.actions"
import { auth  } from "@clerk/nextjs/server";

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateTournament = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth ();

  const userId = sessionClaims?.userId as string;
  const tournament = await getTournamentById(id)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Редактировать турнир</h3>
      </section>

      <div className="wrapper my-8">
        <TournamentForm 
          type="Update" 
          tournament={tournament} 
          tournamentId={tournament._id} 
          userId={userId} 
        />
      </div>
    </>
  )
}

export default UpdateTournament