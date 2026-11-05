import { FeedEntry } from "~/components/feed-entry";
import { SiteHeader } from "~/components/site-header";
import { entries } from "~/content/entries";
import { assignTones, parseMaterial, selectEntries } from "~/content/feed";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Johannes Spijkerman" },
    {
      name: "description",
      content: "Hardware, software and design, in one feed, newest first.",
    },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  const material = parseMaterial(
    new URL(request.url).searchParams.get("material"),
  );
  return { material, entries: selectEntries(entries, material) };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { material, entries: feed } = loaderData;
  const tones = assignTones(feed);

  return (
    <>
      <SiteHeader active={material} />
      <main>
        <section className="intro">
          <h1 className="intro__title">
            I make hardware, software and design.
          </h1>
          <p className="intro__text">
            One feed, newest first. Projects and posts sit together. The colour
            tells you what each one is made of.
          </p>
        </section>
        <div className="feed">
          {feed.map((entry, i) => (
            <FeedEntry
              key={entry.slug}
              entry={entry}
              tone={tones[i] ?? "field"}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </main>
      <footer className="site-footer">
        <p>Johannes Spijkerman</p>
        <p>Sample content. Real entries come later.</p>
      </footer>
    </>
  );
}
