import type { APIRoute } from "astro";

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users } from '../../schemas/users'
import { db } from "../../db/db";

export const GET: APIRoute = async () => {


  return new Response(JSON.stringify("a"), { status: 200 })
}