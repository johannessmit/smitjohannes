import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Johannes Spijkerman" }];
}

export default function Home() {
  return (
    <main>
      <h1>Johannes Spijkerman</h1>
    </main>
  );
}
