# next-email

This project contains a React component along with its corresponding Next.js Route Handler for making an API call to the email service.

The service used in this project is [Email.js](https://www.emailjs.com/). For this to work, you must enable "Allow EmailJS API for non-browser applications." and "Use Private Key (recommended)" on Account > Security > API Settings. The private key will appear in Account > General > API Keys.

These should be placed in a .env.local file, along with the email service id and the email template id, as demonstrated in the [.env.local.demo](/.env.local.demo) file.

All of the component's utilities are in the `app/_components/ContactUs` folder and `app/api/route.ts` file. You need create this api route in your own project for the component to work, since it is called in the `sendEmail` function on the `ContactUs.tsx` component file.

This project uses the Axios library for sending messages to the EmailJS API, and Tailwind for styles.

## ✨ Features

- ### 🛡️ Security

The Next.js Route Handlers guarantee client browsers won't get access to your email API authentication keys. 

- ### ✍️ Contact form

![image](https://github.com/brunomariz/next-email/assets/48870924/e16c375f-357c-4dcd-a82a-13e207f8d113)

- ### ✅ Thank you message

![image](https://github.com/brunomariz/next-email/assets/48870924/dbc16c8d-567b-4643-bef8-ef04a91a3a61)

- ### 🕐 Loading indicator

![image](https://github.com/brunomariz/next-email/assets/48870924/a6c04b41-f4b6-4061-9741-6c998ae93b84)

- ### ⏱️ Limit number of emails by period of time

![image](https://github.com/brunomariz/next-email/assets/48870924/f3fe416d-1969-40fc-ac9c-bbcfe7e93a91)

- ### ⛔ Error message (on API error)

![image](https://github.com/brunomariz/next-email/assets/48870924/8b4c898b-ca5e-49ec-9365-b960191efd3b)

- ### 📫 Email sent according to template

Add extra variables easily, such as the business name with `extra_variables` hiddend form input

![Untitled](https://github.com/brunomariz/next-email/assets/48870924/9677826d-91cb-4b31-b956-d9e0b4282866)

# Running the demo locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
