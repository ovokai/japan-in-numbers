// Japan in Numbers — router and page rendering.
// Hash routes: #/ home, #/population, #/economy, #/regions,
// #/regions/<prefecture> detail, #/health-education, #/methods.
// All controls on these pages work: year switcher, table sorting, search
// filter, tabs and the detail links.

import {
  SITE, KEY_INDICATORS, POPULATION_HISTORY, POPULATION_SOURCE, AGE_GROUPS_2024,
  AGE_SOURCE, VITAL_STATS, VITAL_SOURCE, ECONOMY_YEARS, ECONOMY_SOURCE,
  GDP_HISTORY, TRADE_PARTNERS, TRADE_SOURCE, PREFECTURES, PREFECTURE_SOURCE,
  HEALTH, EDUCATION, LIFE_EXPECTANCY_HISTORY, RELEASES, METHOD_NOTES
} from './data.js';
import { lineChart, barChart, pyramid, donut } from './charts.js';

const app = document.getElementById('app');
const navLinks = Array.from(document.querySelectorAll('[data-route]'));

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function fmt(n, d) { return Number(n).toFixed(d === undefined ? 1 : d); }
function sourceLine(text) { return '<p class="src">Source: ' + esc(text) + '</p>'; }
function pageHead(kicker, title, intro) {
  return '<header class="page-head"><p class="kicker">' + esc(kicker) + '</p><h1>' + esc(title) + '</h1><p class="lede">' + esc(intro) + '</p></header>';
}
function statCard(item) {
  return '<article class="card stat"><p class="stat-label">' + esc(item.label) + '</p>' +
    '<p class="stat-value">' + esc(item.value) + '</p>' +
    '<p class="stat-note">' + esc(item.change) + '</p>' +
    '<p class="stat-src">' + esc(item.source) + '</p></article>';
}
function panel(title, inner, source) {
  return '<section class="panel"><h2>' + esc(title) + '</h2>' + inner + (source ? sourceLine(source) : '') + '</section>';
}
function setActive(route) {
  navLinks.forEach((a) => {
    const r = a.getAttribute('data-route');
    a.classList.toggle('active', r === route || (route.indexOf('/regions/') === 0 && r === '/regions'));
  });
}

// ---- Home ----------------------------------------------------------------
function renderHome() {
  const pop = lineChart(
    [{ label: 'Population (millions)', color: '#1d4ed8', points: POPULATION_HISTORY.map((d) => ({ x: d.year, y: d.pop })) }],
    { yLabel: 'Population, millions', formatY: (v) => fmt(v, 0) + 'm' }
  );
  const top5 = PREFECTURES.slice().sort((a, b) => b.pop - a.pop).slice(0, 5);
  const donutHtml = donut(
    [
      { label: '0–14', value: 13.9, color: '#1d4ed8' },
      { label: '15–64', value: 73.7, color: '#38bdf8' },
      { label: '65+', value: 36.3, color: '#be123c' }
    ],
    { center: '29.3%', centerLabel: 'aged 65+' }
  );
  const releases = RELEASES.map((r) =>
    '<article class="release"><p class="release-date">' + esc(r.date) + '</p><h3>' + esc(r.title) + '</h3><p>' + esc(r.body) + '</p>' + sourceLine(r.source) + '</article>'
  ).join('');
  app.innerHTML =
    '<section class="hero"><p class="kicker">National statistics · Japan</p>' +
    '<h1>Japan in Numbers</h1><p class="lede">' + esc(SITE.tagline) + '</p>' +
    '<p class="hero-meta">Coverage: ' + esc(SITE.coverage) + ' · Updated ' + esc(SITE.updated) + '</p></section>' +
    '<section class="grid stats">' + KEY_INDICATORS.map(statCard).join('') + '</section>' +
    '<div class="grid two">' +
    panel('Population: peak to decline', pop, POPULATION_SOURCE) +
    '<section class="panel"><h2>Who lives here</h2><div class="donut-wrap">' + donutHtml +
    '<ul class="legend"><li><span class="sw" style="background:#1d4ed8"></span>Age 0–14 · 13.9m (11.2%)</li>' +
    '<li><span class="sw" style="background:#38bdf8"></span>Age 15–64 · 73.7m (59.5%)</li>' +
    '<li><span class="sw" style="background:#be123c"></span>Age 65+ · 36.3m (29.3%)</li></ul></div>' +
    sourceLine(AGE_SOURCE) + '</section></div>' +
    '<section class="panel"><h2>Largest prefectures</h2>' +
    barChart(top5.map((p) => ({ label: p.name, value: p.pop })), { formatY: (v) => fmt(v, 1) + 'm' }) +
    '<p class="panel-link"><a href="#/regions">See all 47 prefectures →</a></p>' + sourceLine(PREFECTURE_SOURCE) + '</section>' +
    '<section><h2 class="section-title">Latest releases</h2><div class="grid two">' + releases + '</div></section>' +
    '<p class="panel-link">Every figure above names its source and year. <a href="#/methods">How the numbers were compiled →</a></p>';
}

// ---- Population ----------------------------------------------------------
function renderPopulation() {
  const trend = lineChart(
    [{ label: 'Population (millions)', color: '#1d4ed8', points: POPULATION_HISTORY.map((d) => ({ x: d.year, y: d.pop })) }],
    { yLabel: 'Population, millions', formatY: (v) => fmt(v, 0) + 'm' }
  );
  const vital = lineChart(
    [
      { label: 'Births (thousands)', color: '#1d4ed8', points: VITAL_STATS.map((d) => ({ x: d.year, y: d.births })) },
      { label: 'Deaths (thousands)', color: '#be123c', points: VITAL_STATS.map((d) => ({ x: d.year, y: d.deaths })) }
    ],
    { yLabel: 'Thousands per year', formatY: (v) => fmt(v, 0) }
  );
  const rows = VITAL_STATS.slice().reverse().map((d) =>
    '<tr><td>' + d.year + '</td><td>' + d.births.toLocaleString('en-US') + '</td><td>' + d.deaths.toLocaleString('en-US') + '</td><td>' + fmt(d.fertility, 2) + '</td></tr>'
  ).join('');
  app.innerHTML = pageHead('Population', 'A shrinking, ageing country',
    'Japan’s population peaked at 128.1 million in 2008 and has fallen every year since. One in three residents is now 65 or older.') +
    '<div class="grid two">' +
    panel('Population 1950–2024', trend, POPULATION_SOURCE) +
    panel('Age pyramid, 2024', pyramid(AGE_GROUPS_2024), AGE_SOURCE) +
    '</div>' +
    panel('Births and deaths, 2019–2024', vital, VITAL_SOURCE) +
    '<section class="panel"><h2>Vital statistics table</h2><table class="data"><thead><tr><th>Year</th><th>Births (thousands)</th><th>Deaths (thousands)</th><th>Total fertility rate</th></tr></thead><tbody>' + rows + '</tbody></table>' + sourceLine(VITAL_SOURCE) + '</section>' +
    '<section class="panel"><h2>What it means</h2><p>Deaths have outnumbered births since 2007, and the gap keeps widening: in 2024 there were about 897,000 more deaths than births. The fertility rate of 1.15 is the lowest on record. The working-age share (15–64) is 59.5% and still falling, which is why labour shortages and pension costs dominate policy debate.</p></section>';
}

// ---- Economy -------------------------------------------------------------
let econYear = 2024;
function econCards() {
  const y = ECONOMY_YEARS[econYear];
  const cards = [
    { label: 'GDP (nominal)', value: '$' + fmt(y.gdp, 2) + 'tn', change: 'IMF, ' + econYear, source: 'IMF World Economic Outlook' },
    { label: 'GDP per capita', value: '$' + y.gdpPerCapita.toLocaleString('en-US'), change: 'Current US dollars', source: 'IMF World Economic Outlook' },
    { label: 'CPI index (2020 = 100)', value: fmt(y.cpi, 1), change: 'All items', source: 'Statistics Bureau of Japan' },
    { label: 'Unemployment', value: fmt(y.unemployment, 1) + '%', change: 'Seasonally adjusted', source: 'Statistics Bureau of Japan' },
    { label: 'Exports', value: '$' + y.exports + 'bn', change: 'Goods', source: 'Ministry of Finance' },
    { label: 'Imports', value: '$' + y.imports + 'bn', change: 'Goods', source: 'Ministry of Finance' },
    { label: 'Government debt', value: y.debtToGdp + '% of GDP', change: 'Gross general government', source: 'IMF World Economic Outlook' },
    { label: 'Trade balance', value: (y.exports - y.imports >= 0 ? '+' : '−') + '$' + Math.abs(y.exports - y.imports) + 'bn', change: 'Exports minus imports', source: 'Ministry of Finance' }
  ];
  return '<div class="grid stats">' + cards.map(statCard).join('') + '</div>';
}
function renderEconomy() {
  const years = Object.keys(ECONOMY_YEARS).sort();
  const buttons = years.map((y) =>
    '<button type="button" class="year-btn' + (Number(y) === econYear ? ' active' : '') + '" data-year="' + y + '">' + y + '</button>'
  ).join('');
  const gdp = lineChart(
    [{ label: 'GDP ($ trillion)', color: '#1d4ed8', points: GDP_HISTORY.map((d) => ({ x: d.year, y: d.gdp })) }],
    { yLabel: 'Nominal GDP, $ trillion', formatY: (v) => '$' + fmt(v, 1) + 'tn' }
  );
  const trade = barChart(
    TRADE_PARTNERS.map((t) => ({ label: t.partner, value: t.exports })),
    { formatY: (v) => fmt(v, 0) + '%' }
  );
  app.innerHTML = pageHead('Economy', 'The world’s fourth-largest economy',
    'Japan’s nominal GDP was about $4.03 trillion in 2024. Pick a year to see the headline figures; the dollar value moves with the yen, so read it beside the real-economy indicators.') +
    '<section class="panel"><h2>Year selector</h2><div class="year-row" role="group" aria-label="Choose a year">' + buttons + '</div><div id="econ-cards">' + econCards() + '</div>' + sourceLine(ECONOMY_SOURCE) + '</section>' +
    '<div class="grid two">' +
    panel('Nominal GDP, 2000–2024', gdp, 'IMF World Economic Outlook') +
    panel('Exports by partner, 2024 (% of total)', trade, TRADE_SOURCE) +
    '</div>' +
    '<section class="panel"><h2>Reading the numbers</h2><p>Japan fell behind Germany in nominal GDP in 2023, largely because the yen weakened against the dollar — in yen terms the economy kept growing. Unemployment has stayed between 2.5% and 2.8% since 2020, and inflation returned after decades of near-zero prices: the CPI rose from 100.0 in 2020 to 108.5 in 2024.</p></section>';
  app.querySelectorAll('.year-btn').forEach((b) => {
    b.addEventListener('click', () => {
      econYear = Number(b.getAttribute('data-year'));
      renderEconomy();
    });
  });
}

// ---- Regions -------------------------------------------------------------
let regionQuery = '', regionSort = 'pop', regionDir = -1;
function regionRows() {
  const q = regionQuery.trim().toLowerCase();
  let list = PREFECTURES.filter((p) =>
    !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) || p.region.toLowerCase().includes(q)
  );
  const key = regionSort;
  list = list.slice().sort((a, b) => {
    const av = key === 'name' ? a.name : key === 'capital' ? a.capital : key === 'region' ? a.region : key === 'area' ? a.area : key === 'density' ? a.pop * 1000000 / a.area : a.pop;
    const bv = key === 'name' ? b.name : key === 'capital' ? b.capital : key === 'region' ? b.region : key === 'area' ? b.area : key === 'density' ? b.pop * 1000000 / b.area : b.pop;
    if (typeof av === 'string') return av.localeCompare(bv) * regionDir;
    return (av - bv) * regionDir;
  });
  return list.map((p) => {
    const density = Math.round(p.pop * 1000000 / p.area);
    return '<tr><td><a href="#/regions/' + encodeURIComponent(p.name.toLowerCase()) + '">' + esc(p.name) + '</a></td><td>' + esc(p.capital) + '</td><td>' + esc(p.region) + '</td><td class="num">' + fmt(p.pop, 2) + '</td><td class="num">' + p.area.toLocaleString('en-US') + '</td><td class="num">' + density.toLocaleString('en-US') + '</td></tr>';
  }).join('');
}
function renderRegions() {
  const top10 = PREFECTURES.slice().sort((a, b) => b.pop - a.pop).slice(0, 10);
  const chart = barChart(top10.map((p) => ({ label: p.name, value: p.pop })), { formatY: (v) => fmt(v, 1) + 'm' });
  const sortBtn = (key, label) => '<button type="button" class="sort-btn' + (regionSort === key ? ' active' : '') + '" data-sort="' + key + '">' + label + (regionSort === key ? (regionDir === -1 ? ' ↓' : ' ↑') : '') + '</button>';
  app.innerHTML = pageHead('Regions', 'All 47 prefectures',
    'Search, sort and open any prefecture. Tokyo holds about 14.2 million people — more than the ten smallest prefectures combined.') +
    panel('Population of the ten largest prefectures', chart, PREFECTURE_SOURCE) +
    '<section class="panel"><h2>Prefecture table</h2>' +
    '<div class="controls"><input id="region-search" type="search" placeholder="Search by prefecture, capital or region…" value="' + esc(regionQuery) + '" aria-label="Search prefectures">' +
    '<div class="sort-row">' + sortBtn('pop', 'Population') + sortBtn('name', 'Name') + sortBtn('area', 'Area') + sortBtn('density', 'Density') + sortBtn('region', 'Region') + '</div></div>' +
    '<p class="result-count" id="region-count"></p>' +
    '<div class="table-wrap"><table class="data"><thead><tr><th>Prefecture</th><th>Capital</th><th>Region</th><th>Population (m)</th><th>Area (km²)</th><th>Density (/km²)</th></tr></thead><tbody id="region-body">' + regionRows() + '</tbody></table></div>' +
    sourceLine(PREFECTURE_SOURCE + ' — density is population divided by area.') + '</section>';
  const body = document.getElementById('region-body');
  const count = document.getElementById('region-count');
  const refresh = () => {
    body.innerHTML = regionRows();
    const n = body.querySelectorAll('tr').length;
    count.textContent = n + ' of 47 prefectures shown';
  };
  refresh();
  document.getElementById('region-search').addEventListener('input', (e) => {
    regionQuery = e.target.value;
    refresh();
  });
  app.querySelectorAll('.sort-btn').forEach((b) => {
    b.addEventListener('click', () => {
      const k = b.getAttribute('data-sort');
      if (regionSort === k) regionDir = -regionDir; else { regionSort = k; regionDir = k === 'name' ? 1 : -1; }
      renderRegions();
      const input = document.getElementById('region-search');
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
  });
}
function renderPrefecture(slug) {
  const p = PREFECTURES.find((x) => x.name.toLowerCase() === slug.toLowerCase());
  if (!p) { renderRegions(); return; }
  const density = Math.round(p.pop * 1000000 / p.area);
  const rank = PREFECTURES.slice().sort((a, b) => b.pop - a.pop).findIndex((x) => x.name === p.name) + 1;
  const share = (p.pop / 123.9 * 100).toFixed(1);
  const regionPeers = PREFECTURES.filter((x) => x.region === p.region).sort((a, b) => b.pop - a.pop);
  const peerChart = barChart(regionPeers.map((x) => ({ label: x.name, value: x.pop, color: x.name === p.name ? '#be123c' : '#1d4ed8' })), { formatY: (v) => fmt(v, 1) + 'm' });
  app.innerHTML = pageHead('Prefecture · ' + p.region + ' region', p.name + ' Prefecture',
    'Capital ' + p.capital + ' · population about ' + fmt(p.pop, 2) + ' million · ranked #' + rank + ' of 47 by population.') +
    '<section class="grid stats">' +
    statCard({ label: 'Population', value: fmt(p.pop, 2) + 'm', change: share + '% of Japan', source: PREFECTURE_SOURCE }) +
    statCard({ label: 'Capital', value: p.capital, change: 'Prefectural capital', source: 'Prefectural government' }) +
    statCard({ label: 'Area', value: p.area.toLocaleString('en-US') + ' km²', change: 'Land area', source: 'Geospatial Information Authority' }) +
    statCard({ label: 'Density', value: density.toLocaleString('en-US') + ' /km²', change: 'People per square kilometre', source: 'Calculated from population and area' }) +
    '</section>' +
    panel('Population in the ' + p.region + ' region', peerChart, PREFECTURE_SOURCE) +
    '<p class="panel-link"><a href="#/regions">← Back to all 47 prefectures</a></p>';
}

// ---- Health and education -----------------------------------------------
let heTab = 'health';
function renderHealthEducation() {
  const life = lineChart(
    [
      { label: 'Women', color: '#be123c', points: LIFE_EXPECTANCY_HISTORY.map((d) => ({ x: d.year, y: d.women })) },
      { label: 'Men', color: '#1d4ed8', points: LIFE_EXPECTANCY_HISTORY.map((d) => ({ x: d.year, y: d.men })) }
    ],
    { yLabel: 'Life expectancy, years', formatY: (v) => fmt(v, 0) }
  );
  const cards = (heTab === 'health' ? HEALTH : EDUCATION).map((h) =>
    '<article class="card stat"><p class="stat-label">' + esc(h.label) + '</p><p class="stat-value">' + esc(h.value) + '</p><p class="stat-note">' + esc(h.detail) + '</p><p class="stat-src">' + esc(h.source) + '</p></article>'
  ).join('');
  const tabBtn = (key, label) => '<button type="button" class="tab-btn' + (heTab === key ? ' active' : '') + '" data-tab="' + key + '">' + label + '</button>';
  app.innerHTML = pageHead('Health & education', 'Long lives, strong schools',
    'Japan has the world’s longest life expectancy and some of the highest PISA scores. Switch tabs to compare health and education.') +
    '<div class="tabs" role="tablist">' + tabBtn('health', 'Health') + tabBtn('education', 'Education') + '</div>' +
    '<section class="grid stats">' + cards + '</section>' +
    panel('Life expectancy at birth, 1960–2023', life, 'Ministry of Health, Labour and Welfare');
  app.querySelectorAll('.tab-btn').forEach((b) => {
    b.addEventListener('click', () => { heTab = b.getAttribute('data-tab'); renderHealthEducation(); });
  });
}

// ---- Methods -------------------------------------------------------------
function renderMethods() {
  const notes = METHOD_NOTES.map((n) =>
    '<article class="panel"><h2>' + esc(n.topic) + '</h2><p>' + esc(n.text) + '</p></article>'
  ).join('');
  app.innerHTML = pageHead('Methods & sources', 'Where every number comes from',
    'Each figure on this site names its source and year on the page where it appears. This page collects the method behind each section.') +
    '<div class="grid two">' + notes + '</div>' +
    '<section class="panel"><h2>Source list</h2><ul class="source-list">' +
    '<li>Statistics Bureau of Japan — Population Census, population estimates, Consumer Price Index, Labour Force Survey</li>' +
    '<li>Ministry of Health, Labour and Welfare — Vital Statistics, life tables</li>' +
    '<li>Cabinet Office and Ministry of Finance — national accounts, trade statistics</li>' +
    '<li>IMF World Economic Outlook — GDP, GDP per capita, government debt</li>' +
    '<li>World Bank — infant mortality and development indicators</li>' +
    '<li>OECD — Health Statistics, Education at a Glance, PISA 2022</li>' +
    '<li>Geospatial Information Authority of Japan — prefecture areas</li></ul></section>' +
    '<section class="panel"><h2>About this site</h2><p>Japan in Numbers is an original, independent statistics site built for the make.fun best national statistics site competition. It is not affiliated with the Statistics Bureau of Japan or any government body. All charts are drawn by hand in SVG; the site loads no network resources and works offline from its own files.</p></section>';
}

// ---- Router --------------------------------------------------------------
function route() {
  const hash = window.location.hash || '#/';
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const top = parts[0] || '';
  window.scrollTo(0, 0);
  if (top === '') { setActive('/'); renderHome(); }
  else if (top === 'population') { setActive('/population'); renderPopulation(); }
  else if (top === 'economy') { setActive('/economy'); renderEconomy(); }
  else if (top === 'regions' && parts[1]) { setActive('/regions'); renderPrefecture(decodeURIComponent(parts[1])); }
  else if (top === 'regions') { setActive('/regions'); renderRegions(); }
  else if (top === 'health-education') { setActive('/health-education'); renderHealthEducation(); }
  else if (top === 'methods') { setActive('/methods'); renderMethods(); }
  else { setActive('/'); renderHome(); }
}

window.addEventListener('hashchange', route);
route();
