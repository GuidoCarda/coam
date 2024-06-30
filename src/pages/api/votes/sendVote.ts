import type { APIRoute } from "astro";
import type { Vote } from "../../../types/vote";
import { getSession } from "auth-astro/server";
import { db } from "../../../db/db";
import { Votes } from "../../../schemas/votes";
// import type Vote from "../../../components/predicciones/Vote.astro";

const res = (
  body: string,
  { status, statusText, headers }: { status?: number; statusText?: string; headers?: Headers }
) => new Response(body, { status, statusText, headers })


export const POST: APIRoute = async ({ request }) => {

  const session = await getSession(request)
  if(!session || session.user === null)
    return res("Unauthorized", {status: 401})

  const votes = await request.json() as Vote[]
  
  votes.forEach((vote : Vote) =>
    {
    vote.id_user = session.user?.id
    vote.team_winner_id = vote.score_home > vote.score_away ? Number(vote.team_home_id) :
                          vote.score_away > vote.score_home ? Number(vote.team_away_id) :
                          null
    }
  )
  try {
		await db.insert(Votes).values(votes)  
	} catch (error) {
		console.error(error)
		return res("Error inserting vote", { status: 500 })
	}

	return res("OK", { status: 200 })
}