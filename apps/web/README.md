# planria/web

Planria is created to extinguish bureaucracy when it comes to managing feature flags via leveraging
**feature flags as code**, **remote configuration as code**, and **experimentation as code**.

>
> **Your feature flags. Fast. Instant. On the edge 🚀**
>

![Planria Feature Flag Toggling Page](../../docs/screenshots/Arc%20Browser/Screenshot%202024-09-18%20Light%20Mode%20-%20Feature%20Flags%20Toggle%20Management.png)

## Development 🕹️

If you'd like to engineer new things or just fix a bug, you might want to see your changes in action
by running the local environment and _blah blah blah_. So here's the basic step by step that you need
to follow to up the development environment.

**Step 1:** Copy the `.env.example` at the workspace root and paste it in a new `.env` file.

```dotenv
# Database
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5678/postgres"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_***************************
CLERK_SECRET_KEY=sk_**********************
CLERK_SIGN_IN_URL="/sign-in"
CLERK_SIGN_UP_URL="/sign-up"

# Stripe
STRIPE_SECRET_KEY=sk_*********************
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_********************
STRIPE_WEBHOOK_SECRET=whsec_12345
```

**Step 2:** You must have a Postgres database in your local machine. If you'd like,
we've left a [Docker Compose](../../infra/docker/docker-compose.yaml) configuration
preset so you can just run `pnpm run docker:up` to up the database.

**Step 3:** Create a project in [Clerk](https://clerk.com/docs) and copy your publishable key
and secret key to the environment variables.

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

**Step 4:** Run `pnpm run dev` at the workspace root.
