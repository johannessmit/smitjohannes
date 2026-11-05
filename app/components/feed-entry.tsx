import type { Entry } from "~/content/entries";
import { MATERIAL_LABELS, splitDate, type Tone } from "~/content/feed";

type Props = {
  entry: Entry;
  tone: Tone;
  /** Alternates full entries between hanging left and right. */
  side: "left" | "right";
};

export function FeedEntry({ entry, tone, side }: Props) {
  const { day, month, year } = splitDate(entry.date);
  return (
    <article
      className="entry"
      data-size={entry.size}
      data-material={entry.material}
      data-tone={tone}
      data-side={side}
    >
      <h2 className="entry__title">{entry.title}</h2>
      <p className="entry__summary">{entry.summary}</p>
      <p className="entry__facts">
        <span className="entry__material">
          {MATERIAL_LABELS[entry.material]}
        </span>
        <time className="entry__date" dateTime={entry.date}>
          <span className="entry__day">{day}</span>{" "}
          <span className="entry__month">{month}</span>{" "}
          <span className="entry__year">{year}</span>
        </time>
      </p>
    </article>
  );
}
