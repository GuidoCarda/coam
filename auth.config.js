import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

console.log(import.meta.env.GOOGLE_SECRET_ID)
export default defineConfig({
  providers: [
    Google({
    clientId: import.meta.env.GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.GOOGLE_SECRET_ID
  })],
  callbacks: {
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.sub,
			},
		}),
	},
})