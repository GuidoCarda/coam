import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

export default defineConfig({
	providers: [
		Google({
			clientId: import.meta.env.AUTH_GOOGLE_ID,
			clientSecret: import.meta.env.AUTH_GOOGLE_SECRET
		})],
	secret: import.meta.env.AUTH_SECRET,
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