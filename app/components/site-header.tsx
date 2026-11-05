import { Link } from "react-router";
import { MATERIALS, type Material } from "~/content/entries";
import { MATERIAL_LABELS } from "~/content/feed";

export function SiteHeader({ active }: { active: Material | null }) {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__name">
        Johannes Spijkerman
      </Link>
      <nav aria-label="Filter the feed by material" className="filters">
        <Link
          to="/"
          className="filters__link"
          data-material="all"
          aria-current={active === null ? "page" : undefined}
        >
          All
        </Link>
        {MATERIALS.map((m) => (
          <Link
            key={m}
            to={`/?material=${m}`}
            className="filters__link"
            data-material={m}
            aria-current={active === m ? "page" : undefined}
          >
            {MATERIAL_LABELS[m]}
          </Link>
        ))}
      </nav>
    </header>
  );
}
