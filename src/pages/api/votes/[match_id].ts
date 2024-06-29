import type { APIRoute } from "astro";
import type { Vote } from "../../../types/vote";

const res = (
  body: string,
  { status, statusText, headers }: { status?: number; statusText?: string; headers?: Headers }
) => new Response(body, { status, statusText, headers })


export const POST: APIRoute = async ({ params, request }) => {

  const match_id = params.match_id
  const body = await request.json()

  const response = {
    name: body.name,
    match_id
  }
  // console.log(response)

  return res(JSON.stringify(response), { status: 200 })
}