This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Notify Email Setup

The Notify Me form sends email through a custom SMTP connection using Node.js built-ins. Configure these environment variables in `.env.local` or in your hosting provider:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=support@example.com.[country]
SMTP_PASS=your-mailbox-password
SMTP_FROM=support@example.com.[country]
SMTP_SECURE=true
SMTP_HELO_NAME=example.com.[country]
NOTIFY_SUPPORT_EMAIL=support@example.com.[country]
```

### Generating the Gmail App Password

The `SMTP_PASS` value above must be a Google App Password, not the regular mailbox password. Gmail blocks normal password authentication for SMTP.

1. Make sure 2-Step Verification is enabled on the Google account:
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Under "How you sign in to Google," turn on **2-Step Verification**

2. Generate the app password:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Under **App name**, enter something descriptive.
   - Click **Create**
   - Copy the 16-character password shown (e.g. `abcd efgh ijkl mnop`)

3. Paste that value into `SMTP_PASS` in `.env.local` or your hosting provider's environment variables.

**Note:** The password is shown only once. If lost, delete the old app password from the App Passwords page and generate a new one.

If "App Passwords" doesn't appear as an option, 2-Step Verification likely isn't fully enabled yet, or (for Google Workspace accounts) an admin has disabled app passwords at the domain level under **Admin Console → Security → Authentication → 2-step verification**.

