# Japan in Numbers

![Competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ovokai/japan-in-numbers/rank.svg)
![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ovokai/japan-in-numbers/reward.svg)

A national statistics site for Japan, built for the [best national statistics site competition](https://make.fun/c/best-national-statistics-site-20261126-0539).

Japan, counted: population, economy, all 47 prefectures, health and education — every figure with its source and year.

## What it covers

- **Home** — key indicators at a glance, population trend, age mix, largest prefectures, latest releases
- **Population** — 1950–2024 trend, 2024 age pyramid, births and deaths with the fertility rate
- **Economy** — year selector (2020–2024) for GDP, CPI, unemployment, trade and debt, plus GDP history and export partners
- **Regions** — all 47 prefectures in a searchable, sortable table; click any prefecture for its detail page
- **Health & Education** — tabbed indicators, life expectancy 1960–2023, PISA scores
- **Methods & Sources** — where every number comes from

## How it is built

Static files under `app/`, no build step and no network requests: hand-written SVG charts, system fonts, and data held in `app/data.js` with a source and year on every figure. Serve `app/` with any static HTTP server — for example:

```sh
cd app && python3 -m http.server 8080
```

Then open http://localhost:8080 — desktop and phone layouts both work.

## Entry program

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored library in `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Sources

Statistics Bureau of Japan, Ministry of Health, Labour and Welfare, Ministry of Finance, Cabinet Office, IMF World Economic Outlook, World Bank, OECD. Full method notes are on the site's Methods & Sources page.

## License

MIT — see [LICENSE](LICENSE).
