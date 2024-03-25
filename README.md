# Vite Travel

This project was built using Node v20.9.0 and [pnpm](https://pnpm.io/).

```bash
## go to project's folder
cd playing-with-vite

## install dependencies
pnpm i

## start project in development mode
pnpm run dev
```

## Development Log

**March, 23 2024**
Start of the jorney! Decided to use Vite + React + TypeScript for the stack because it's been a while since I've worked outside the Next.js ecossystem. Installed eslint, Prettier, Vitest and React Testing Library.

Went with shadcn for components because of the aforementioned experience in the Next.js ecossystem, but that might change.


**March, 24 2024**
Decided for Neubrutalism for the design. It's a trend I'm really into in the last months because it stands out from the sea of Vercel/Apple-like futuristic approaches (I love purple and deep blue, but I'm done with those background gradients).

Finished the day with a code that works to save reservations, not necessarily the best code. Added the validation to prevent overbooking and some nice extras, like not allowing the user to select a date before today.


**March, 25 2024**
Worked for two hours max with interruptions from my job.

I've decided to treat the page as a logged user, where they can have as many reservations as possible. In order to enable them to edit/cancel a reservation, the path choosen will be to open a modal where they can select which reservation they want to edit/cancel.

When testing, I've noticed that the reservation modal was using `today` and `today + 5` as default dates even if the property had reservations. Changed the form values to take the existing reservations into consideration when setting a default value for the date range.