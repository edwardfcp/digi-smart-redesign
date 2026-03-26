import { useLocation } from "wouter";
import { findPageByPath } from "@/data/siteInventory";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

function cleanTitle(t: string) {
  return (t || "").replace(/^\s+|\s+$/g, "");
}

export default function LegacyPage() {
  const [location] = useLocation();
  const pathname = location.split("?")[0] || "/";

  // Normalize: wordpress often uses trailing slashes
  const normalized = pathname !== "/" && !pathname.endsWith("/") ? `${pathname}/` : pathname;

  const page = findPageByPath(normalized) || findPageByPath(pathname);

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold">Page not found</h1>
          <p className="mt-2 text-muted-foreground">No matching legacy page for: <code>{pathname}</code></p>
        </Card>
      </div>
    );
  }

  const allImages = (page.images || []).filter((i) => i.local);

  // Heuristic: prefer real photography/product imagery over logos/icons.
  const imageCandidates = allImages.filter((i) => {
    const local = String(i.local || "").toLowerCase();
    const src = String(i.src || "").toLowerCase();
    const alt = String(i.alt || "").toLowerCase();
    if (!local) return false;

    // filter out obvious branding assets
    if (local.includes("logo") || src.includes("logo") || alt.includes("logo")) return false;
    if (local.includes("icon") || src.includes("icon")) return false;
    if (src.includes("digismart_logo")) return false;

    // filter out wordmark-like assets (we often see DIGISMART/letters as large images)
    if (alt.includes("digismart")) return false;
    if (src.includes("digismart")) return false;

    return true;
  });

  const preferJpg = (arr: typeof allImages) =>
    arr.filter((i) => String(i.local || "").toLowerCase().match(/\.(jpg|jpeg)$/));

  // Fallback: if there are no JPGs (common on some pages like holograms),
  // use the first non-logo candidate image (often PNG renders/headers).
  const heroBg = preferJpg(imageCandidates)[0] || imageCandidates[0] || allImages[0];
  const featureImg =
    preferJpg(imageCandidates)[1] ||
    preferJpg(imageCandidates)[0] ||
    imageCandidates[0] ||
    heroBg;

  const chunks = (page.text || "").split(" • ").map((s) => s.trim()).filter(Boolean);
  const intro = chunks[0] || "";

  // Prefer structured bullets captured from HTML <li> when available.
  const bullets = (page.bullets && page.bullets.length
    ? page.bullets
    : chunks.slice(1)
  ).slice(0, 10);

  const isSeriesPage = /serie|series/i.test(page.title || "") || /serie|series/i.test(page.slug || "");
  const isCategoryPage = [
    "/outdoor-category/",
    "/indoor-category/",
    "/mesh-clear-category/",
    "/hospitality-home-category/",
    "/street-furniture/",
    "/holograms-3d/",
  ].includes(page.path);

  const cleanText = (() => {
    const raw = page.text || "";
    // Remove common nav/menu noise that appears in the extracted text.
    const cleaned = raw
      .replace(
        /Outdoor\s+VENT\s+Serie[\s\S]*?BECOME A DEALER\s+Select Page\s*/i,
        "",
      )
      .replace(/CONTACT US[\s\S]*$/i, "")
      .trim();
    return cleaned;
  })();

  const introShort = (() => {
    const t = intro || cleanText;
    // Take first 280 chars as a clean intro snippet.
    return (t || "").slice(0, 280);
  })();

  const bulletsFiltered = (() => {
    if (!bullets?.length) return [] as string[];
    // For category pages, keep more descriptive bullets (avoid just short series labels).
    if (isCategoryPage) {
      return bullets.filter((b) => b.length > 20 && b.includes(" ")).slice(0, 10);
    }
    return bullets;
  })();

  const subcategoryLinks = (() => {
    if (!isCategoryPage) return [] as string[];
    const deny = new Set([
      "/",
      "/contact/",
      "/become-a-dealer/",
      "/outdoor-category/",
      "/indoor-category/",
      "/mesh-clear-category/",
      "/hospitality-home-category/",
      "/street-furniture/",
      "/holograms-3d/",
    ]);

    const candidates = (page.links || [])
      .map((l) => {
        try {
          return new URL(l.href).pathname;
        } catch {
          return "";
        }
      })
      .filter(Boolean)
      .map((p) => (p !== "/" && !p.endsWith("/") ? `${p}/` : p))
      .filter((p) => !deny.has(p))
      .filter((p) => !p.startsWith("/wp-"))
      .filter((p) => !p.startsWith("/tag/"))
      // Prefer likely subcategory/series pages
      .filter((p) =>
        /(series|serie)\/?$/i.test(p) ||
        /\/(outdoor|indoor|mesh|hospitality)\-/i.test(p) ||
        /\/(street|holograms)/i.test(p),
      );

    const uniq: string[] = [];
    for (const p of candidates) {
      if (!uniq.includes(p)) uniq.push(p);
    }
    return uniq.slice(0, 6);
  })();

  return (
    <div className="min-h-[80vh]">
      {/* HERO */}
      <section className="relative pt-28 pb-14 overflow-hidden border-b border-white/5">
        {heroBg?.local ? (
          <div className="absolute inset-0">
            <img
              src={`/site-assets/${heroBg.local}`}
              alt=""
              className="h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        )}

        <div className="relative container mx-auto px-4">
          <p className="text-xs text-muted-foreground">digi-smart.com → contenido real (mapeado)</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            {cleanTitle(page.title || page.slug)}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <a className="underline" href={page.url} target="_blank" rel="noreferrer">
              Ver fuente
            </a>
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="container mx-auto px-4 py-12">
        <div
          className={
            isSeriesPage || isCategoryPage
              ? "grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
              : "max-w-4xl"
          }
        >
          {(isSeriesPage || isCategoryPage) && featureImg?.local ? (
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-card">
              {/* For categories: emulate original with a simple carousel-like strip */}
              {isCategoryPage ? (
                <div className="p-4">
                  <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory">
                    {[
                      ...preferJpg(imageCandidates),
                      ...imageCandidates.filter(
                        (i) => !String(i.local || "").toLowerCase().match(/\.(jpg|jpeg)$/),
                      ),
                    ]
                      .slice(0, 6)
                      .map((img, idx) => (
                        <div
                          key={idx}
                          className="min-w-[85%] snap-start overflow-hidden rounded-2xl border border-white/10 bg-background"
                        >
                          <img
                            src={`/site-assets/${img.local}`}
                            alt={img.alt || ""}
                            className="aspect-[4/3] w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <img
                  src={`/site-assets/${featureImg.local}`}
                  alt={featureImg.alt || ""}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
          ) : null}

          <div>
            <div className="rounded-2xl border border-white/10 bg-card p-6 shadow-sm">
              {introShort ? (
                <p className="text-muted-foreground leading-relaxed text-base">{introShort}</p>
              ) : null}

              {bulletsFiltered.length ? (
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {bulletsFiltered.map((b, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {page.links?.length ? (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-white">Related links</h2>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {page.links.slice(0, 10).map((l, idx) => (
                    <a
                      key={idx}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
                      href={new URL(l.href).pathname}
                    >
                      <div className="text-sm font-medium text-white">{l.text || l.href}</div>
                      <div className="mt-1 text-xs text-muted-foreground truncate">{new URL(l.href).pathname}</div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Specs (table/charts as images) */}
        {(() => {
          const specImgs = allImages.filter((i) => {
            const src = String(i.src || "").toLowerCase();
            const local = String(i.local || "").toLowerCase();
            return src.includes("chart") || local.includes("chart") || src.includes("table") || local.includes("table");
          });

          if (!specImgs.length) return null;

          return (
            <div className="mt-12">
              <h2 className="text-lg font-semibold text-white">Specs</h2>
              <div className="mt-4 space-y-4">
                {specImgs.slice(0, 3).map((img, idx) => (
                  <div key={idx} className="overflow-hidden rounded-2xl border border-white/10 bg-card">
                    <img
                      src={`/site-assets/${img.local}`}
                      alt={img.alt || ""}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Subcategories (grid 3x2) */}
        {isCategoryPage && subcategoryLinks.length ? (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-white">Subcategories</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategoryLinks.map((p, idx) => {
                const sub = findPageByPath(p);
                const title = (sub?.title || p).replace(/\s+-\s+DigiSmart/i, "");
                const imgs = (sub?.images || []).filter((i) => i.local);
                const img = imgs.find((i) => {
                  const src = String(i.src || "").toLowerCase();
                  const alt = String(i.alt || "").toLowerCase();
                  if (src.includes("logo") || alt.includes("logo")) return false;
                  if (src.includes("digismart")) return false;
                  return true;
                }) || imgs[0];

                return (
                  <Link
                    key={idx}
                    href={p}
                    className="group rounded-2xl border border-white/10 bg-card overflow-hidden hover:bg-white/[0.03] transition-colors"
                  >
                    {img?.local ? (
                      <img
                        src={`/site-assets/${img.local}`}
                        alt={img.alt || ""}
                        className="h-36 w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-36 w-full bg-white/[0.03]" />
                    )}
                    <div className="p-4">
                      <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                        {title}
                      </div>
                      {sub?.url ? (
                        <div className="mt-1 text-xs text-muted-foreground truncate">{p}</div>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* IMAGE STRIP (optional) */}
        {allImages.length > 1 ? (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-white">Gallery</h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {allImages.slice(0, 8).map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-xl border border-white/10 bg-card">
                  <img
                    src={`/site-assets/${img.local}`}
                    alt={img.alt || ""}
                    className="h-32 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
