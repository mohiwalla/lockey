import { Elysia, t } from "elysia"
import { fromTypes, openapi } from "@elysiajs/openapi"

const PORT = process.env.PORT || 3000

const app = new Elysia()

app.use(
	openapi({
		scalar: {
			layout: "classic",
			references: fromTypes("app.ts"),
		},
	})
)

app.get("/", { test: "hello" as const })

app.post(
	"/json",
	({ body, status }) => {
		status(403, {
			message: "Forbidden",
		})

		return body
	},
	{
		body: t.Object({
			hello: t.String(),
		}),
	}
)

app.listen(PORT)

console.log(`API server started at ${app.server?.hostname}:${app.server?.port}`)
