[![Netlify Status](https://api.netlify.com/api/v1/badges/c68a6c01-a567-4ad4-a1fc-837f1534c3d4/deploy-status)](https://app.netlify.com/sites/paula-plays-with-vite/deploys)

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
This is the start of the journey! I decided to use Vite + React + TypeScript for the stack because it's been a while since I've worked outside the Next.js ecosystem. I installed ESLint, Prettier, Vitest, and the React Testing Library.

I went with shadcn for components because of the abovementioned experience in the Next.js ecosystem, but that might change.


**March, 24 2024**
I decided on Neubrutalism for the design. It's a trend I've been into in the last months because it stands out from the sea of Vercel/Apple-like futuristic approaches (I love purple and deep blue, but I'm done with those background gradients).

I finished the day with a code that works to save reservations. Still, it was not necessarily the best code—I added the validation to prevent overbooking and some nice extras, like not allowing the user to select a date before today.


**March, 25 2024**
I worked for two hours max with interruptions from my job.

I've decided to treat the page as a logged-in user, where they can have as many reservations as possible. To enable the user to edit/cancel a reservation, the path chosen will open a modal where they can select which reservation they want to edit/cancel.

When testing, I noticed that the reservation modal used `today` and `today + 5` as default dates, even if the property had reservations. I changed the form values to consider the existing reservations when setting a default value for the date range.


**March, 28 2024**
I have had to go to the office the past three days, and the commute time has taken a toll on developing this project. Today, I got home early and had a little over two hours of focus time.

First thing: I've changed the store model. I've decided to use an array of objects containing `property.id`, the selected date range, and a `reservationId` created with `uuid`. It would be strange not to have an ID for each booking in real life, so yeah. That made the state management and everything else much more straightforward!

Because tomorrow is Easter Day, I will add some e2e testing and leave component testing (with React Testing Library) for the future.