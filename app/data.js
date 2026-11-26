// Japan in Numbers — all figures in this file.
// Every number carries its source and year. Figures marked "approx." are
// rounded estimates; the Methods page explains how each series was compiled.
// Sources used: Statistics Bureau of Japan, Ministry of Health, Labour and
// Welfare, Cabinet Office, Bank of Japan, IMF World Economic Outlook,
// World Bank, OECD. No figure is fetched from the network at run time.

export const SITE = {
  name: 'Japan in Numbers',
  tagline: 'Japan, counted. Population, economy, regions, health and education — every figure with its source and year.',
  updated: 'November 2026',
  coverage: 'National figures to 2024 unless noted'
};

// ---- Key indicators shown on the home page -------------------------------
export const KEY_INDICATORS = [
  { label: 'Population', value: '123.9m', change: '−0.6m vs 2023', source: 'Statistics Bureau of Japan, 2024 estimate', year: 2024 },
  { label: 'GDP (nominal)', value: '$4.03tn', change: '4th largest economy', source: 'IMF World Economic Outlook, 2024', year: 2024 },
  { label: 'GDP per capita', value: '$32,500', change: 'approx.', source: 'IMF World Economic Outlook, 2024', year: 2024 },
  { label: 'Life expectancy', value: '84.0 yrs', change: 'women 87.1, men 81.1', source: 'Ministry of Health, Labour and Welfare, 2023', year: 2023 },
  { label: 'Unemployment', value: '2.5%', change: 'seasonally adjusted', source: 'Statistics Bureau of Japan, 2024', year: 2024 },
  { label: 'Inflation (CPI)', value: '+2.7%', change: 'year on year', source: 'Statistics Bureau of Japan, 2024', year: 2024 },
  { label: 'Fertility rate', value: '1.15', change: 'births 720,988', source: 'Ministry of Health, Labour and Welfare, 2024', year: 2024 },
  { label: 'Prefectures', value: '47', change: '8 regions', source: 'Statistics Bureau of Japan', year: 2024 }
];

// ---- Population ----------------------------------------------------------
export const POPULATION_HISTORY = [
  // year, population in millions (census / estimate)
  { year: 1950, pop: 84.1 }, { year: 1960, pop: 94.3 }, { year: 1970, pop: 104.3 },
  { year: 1980, pop: 117.1 }, { year: 1990, pop: 123.6 }, { year: 2000, pop: 127.1 },
  { year: 2010, pop: 128.1 }, { year: 2015, pop: 127.1 }, { year: 2020, pop: 126.1 },
  { year: 2021, pop: 125.5 }, { year: 2022, pop: 124.9 }, { year: 2023, pop: 124.4 },
  { year: 2024, pop: 123.9 }
];
export const POPULATION_SOURCE = 'Statistics Bureau of Japan, Population Census and population estimates';

export const AGE_GROUPS_2024 = [
  // age band, men (millions), women (millions)
  { band: '0–9', men: 4.6, women: 4.4 },
  { band: '10–19', men: 5.4, women: 5.1 },
  { band: '20–29', men: 6.2, women: 5.9 },
  { band: '30–39', men: 6.7, women: 6.5 },
  { band: '40–49', men: 8.4, women: 8.2 },
  { band: '50–59', men: 7.9, women: 7.8 },
  { band: '60–69', men: 7.6, women: 7.9 },
  { band: '70–79', men: 8.0, women: 8.7 },
  { band: '80+', men: 4.3, women: 6.7 }
];
export const AGE_SOURCE = 'Statistics Bureau of Japan, population estimates 2024 (rounded to 0.1m)';

export const VITAL_STATS = [
  { year: 2019, births: 865, deaths: 1381, fertility: 1.36 },
  { year: 2020, births: 841, deaths: 1373, fertility: 1.33 },
  { year: 2021, births: 812, deaths: 1439, fertility: 1.30 },
  { year: 2022, births: 771, deaths: 1569, fertility: 1.26 },
  { year: 2023, births: 729, deaths: 1576, fertility: 1.20 },
  { year: 2024, births: 721, deaths: 1618, fertility: 1.15 }
];
export const VITAL_SOURCE = 'Ministry of Health, Labour and Welfare, Vital Statistics (births and deaths in thousands)';

// ---- Economy -------------------------------------------------------------
export const ECONOMY_YEARS = {
  2020: { gdp: 5.04, gdpPerCapita: 40040, cpi: 100.0, unemployment: 2.8, exports: 641, imports: 635, debtToGdp: 259 },
  2021: { gdp: 5.00, gdpPerCapita: 39870, cpi: 99.8, unemployment: 2.8, exports: 756, imports: 769, debtToGdp: 255 },
  2022: { gdp: 4.26, gdpPerCapita: 34100, cpi: 102.3, unemployment: 2.6, exports: 746, imports: 897, debtToGdp: 255 },
  2023: { gdp: 4.21, gdpPerCapita: 33900, cpi: 105.6, unemployment: 2.6, exports: 717, imports: 787, debtToGdp: 252 },
  2024: { gdp: 4.03, gdpPerCapita: 32500, cpi: 108.5, unemployment: 2.5, exports: 717, imports: 755, debtToGdp: 251 }
};
export const ECONOMY_SOURCE = 'IMF World Economic Outlook (GDP, $tn, per capita $), Statistics Bureau of Japan (CPI index 2020=100, unemployment), Ministry of Finance (trade, $bn), IMF (gross government debt, % of GDP)';

export const GDP_HISTORY = [
  { year: 2000, gdp: 4.97 }, { year: 2005, gdp: 4.83 }, { year: 2010, gdp: 5.70 },
  { year: 2015, gdp: 4.44 }, { year: 2020, gdp: 5.04 }, { year: 2021, gdp: 5.00 },
  { year: 2022, gdp: 4.26 }, { year: 2023, gdp: 4.21 }, { year: 2024, gdp: 4.03 }
];

export const TRADE_PARTNERS = [
  { partner: 'United States', exports: 20.0, imports: 10.2 },
  { partner: 'China', exports: 17.6, imports: 22.3 },
  { partner: 'South Korea', exports: 7.0, imports: 4.3 },
  { partner: 'Taiwan', exports: 6.4, imports: 3.6 },
  { partner: 'Australia', exports: 2.5, imports: 7.8 },
  { partner: 'Germany', exports: 2.9, imports: 3.0 }
];
export const TRADE_SOURCE = 'Ministry of Finance, trade statistics 2024 (share of total, %)';

// ---- Prefectures ---------------------------------------------------------
// population in millions (2024 estimate, approx.), area in km².
export const PREFECTURES = [
  { name: 'Hokkaido', capital: 'Sapporo', region: 'Hokkaido', pop: 5.14, area: 83424 },
  { name: 'Aomori', capital: 'Aomori', region: 'Tohoku', pop: 1.20, area: 9646 },
  { name: 'Iwate', capital: 'Morioka', region: 'Tohoku', pop: 1.16, area: 15275 },
  { name: 'Miyagi', capital: 'Sendai', region: 'Tohoku', pop: 2.26, area: 7282 },
  { name: 'Akita', capital: 'Akita', region: 'Tohoku', pop: 0.90, area: 11638 },
  { name: 'Yamagata', capital: 'Yamagata', region: 'Tohoku', pop: 1.03, area: 9323 },
  { name: 'Fukushima', capital: 'Fukushima', region: 'Tohoku', pop: 1.77, area: 13784 },
  { name: 'Ibaraki', capital: 'Mito', region: 'Kanto', pop: 2.83, area: 6097 },
  { name: 'Tochigi', capital: 'Utsunomiya', region: 'Kanto', pop: 1.90, area: 6408 },
  { name: 'Gunma', capital: 'Maebashi', region: 'Kanto', pop: 1.91, area: 6362 },
  { name: 'Saitama', capital: 'Saitama', region: 'Kanto', pop: 7.34, area: 3798 },
  { name: 'Chiba', capital: 'Chiba', region: 'Kanto', pop: 6.29, area: 5158 },
  { name: 'Tokyo', capital: 'Tokyo', region: 'Kanto', pop: 14.18, area: 2194 },
  { name: 'Kanagawa', capital: 'Yokohama', region: 'Kanto', pop: 9.24, area: 2416 },
  { name: 'Niigata', capital: 'Niigata', region: 'Chubu', pop: 2.11, area: 12584 },
  { name: 'Toyama', capital: 'Toyama', region: 'Chubu', pop: 1.00, area: 4248 },
  { name: 'Ishikawa', capital: 'Kanazawa', region: 'Chubu', pop: 1.10, area: 4186 },
  { name: 'Fukui', capital: 'Fukui', region: 'Chubu', pop: 0.74, area: 4191 },
  { name: 'Yamanashi', capital: 'Kofu', region: 'Chubu', pop: 0.79, area: 4465 },
  { name: 'Nagano', capital: 'Nagano', region: 'Chubu', pop: 2.00, area: 13562 },
  { name: 'Gifu', capital: 'Gifu', region: 'Chubu', pop: 1.93, area: 10621 },
  { name: 'Shizuoka', capital: 'Shizuoka', region: 'Chubu', pop: 3.53, area: 7777 },
  { name: 'Aichi', capital: 'Nagoya', region: 'Chubu', pop: 7.48, area: 5173 },
  { name: 'Mie', capital: 'Tsu', region: 'Chubu', pop: 1.73, area: 5775 },
  { name: 'Shiga', capital: 'Otsu', region: 'Kansai', pop: 1.41, area: 4017 },
  { name: 'Kyoto', capital: 'Kyoto', region: 'Kansai', pop: 2.54, area: 4612 },
  { name: 'Osaka', capital: 'Osaka', region: 'Kansai', pop: 8.78, area: 1905 },
  { name: 'Hyogo', capital: 'Kobe', region: 'Kansai', pop: 5.36, area: 8401 },
  { name: 'Nara', capital: 'Nara', region: 'Kansai', pop: 1.30, area: 3691 },
  { name: 'Wakayama', capital: 'Wakayama', region: 'Kansai', pop: 0.89, area: 4726 },
  { name: 'Tottori', capital: 'Tottori', region: 'Chugoku', pop: 0.54, area: 3507 },
  { name: 'Shimane', capital: 'Matsue', region: 'Chugoku', pop: 0.65, area: 6708 },
  { name: 'Okayama', capital: 'Okayama', region: 'Chugoku', pop: 1.85, area: 7115 },
  { name: 'Hiroshima', capital: 'Hiroshima', region: 'Chugoku', pop: 2.74, area: 8479 },
  { name: 'Yamaguchi', capital: 'Yamaguchi', region: 'Chugoku', pop: 1.28, area: 6112 },
  { name: 'Tokushima', capital: 'Tokushima', region: 'Shikoku', pop: 0.69, area: 4147 },
  { name: 'Kagawa', capital: 'Takamatsu', region: 'Shikoku', pop: 0.92, area: 1877 },
  { name: 'Ehime', capital: 'Matsuyama', region: 'Shikoku', pop: 1.29, area: 5676 },
  { name: 'Kochi', capital: 'Kochi', region: 'Shikoku', pop: 0.67, area: 7104 },
  { name: 'Fukuoka', capital: 'Fukuoka', region: 'Kyushu', pop: 5.10, area: 4986 },
  { name: 'Saga', capital: 'Saga', region: 'Kyushu', pop: 0.79, area: 2441 },
  { name: 'Nagasaki', capital: 'Nagasaki', region: 'Kyushu', pop: 1.26, area: 4130 },
  { name: 'Kumamoto', capital: 'Kumamoto', region: 'Kyushu', pop: 1.71, area: 7409 },
  { name: 'Oita', capital: 'Oita', region: 'Kyushu', pop: 1.09, area: 6341 },
  { name: 'Miyazaki', capital: 'Miyazaki', region: 'Kyushu', pop: 1.04, area: 7735 },
  { name: 'Kagoshima', capital: 'Kagoshima', region: 'Kyushu', pop: 1.55, area: 9187 },
  { name: 'Okinawa', capital: 'Naha', region: 'Kyushu', pop: 1.47, area: 2281 }
];
export const PREFECTURE_SOURCE = 'Statistics Bureau of Japan, population estimates 2024 (approx.) and Geospatial Information Authority area figures';

// ---- Health and education ------------------------------------------------
export const HEALTH = [
  { label: 'Life expectancy at birth', value: '84.0 years', detail: 'Women 87.1, men 81.1', source: 'Ministry of Health, Labour and Welfare, 2023' },
  { label: 'Healthy life expectancy', value: '74.1 years', detail: 'Approx., women 75.5, men 72.6', source: 'Ministry of Health, Labour and Welfare, 2022' },
  { label: 'Physicians', value: '2.6 per 1,000 people', detail: 'Approx. 340,000 physicians', source: 'OECD Health Statistics, 2022' },
  { label: 'Hospital beds', value: '12.6 per 1,000 people', detail: 'Among the highest in the OECD', source: 'OECD Health Statistics, 2022' },
  { label: 'Health spending', value: '11.0% of GDP', detail: 'Public share about 84%', source: 'OECD Health Statistics, 2023' },
  { label: 'Infant mortality', value: '1.8 per 1,000 live births', detail: 'Among the lowest in the world', source: 'World Bank, 2023' }
];

export const EDUCATION = [
  { label: 'Tertiary attainment, age 25–34', value: '65%', detail: 'Share with a tertiary qualification', source: 'OECD Education at a Glance, 2024' },
  { label: 'PISA mathematics score', value: '536', detail: 'OECD average 472', source: 'OECD PISA, 2022' },
  { label: 'PISA reading score', value: '516', detail: 'OECD average 476', source: 'OECD PISA, 2022' },
  { label: 'PISA science score', value: '547', detail: 'OECD average 485', source: 'OECD PISA, 2022' },
  { label: 'Education spending', value: '3.9% of GDP', detail: 'Public spending on education', source: 'OECD Education at a Glance, 2023' },
  { label: 'Upper secondary graduation', value: '96%', detail: 'Approx.', source: 'OECD Education at a Glance, 2023' }
];

export const LIFE_EXPECTANCY_HISTORY = [
  { year: 1960, women: 70.2, men: 65.3 }, { year: 1970, women: 75.9, men: 69.3 },
  { year: 1980, women: 78.8, men: 73.4 }, { year: 1990, women: 81.9, men: 75.9 },
  { year: 2000, women: 84.6, men: 77.7 }, { year: 2010, women: 86.3, men: 79.6 },
  { year: 2020, women: 87.7, men: 81.6 }, { year: 2023, women: 87.1, men: 81.1 }
];

// ---- Latest releases -----------------------------------------------------
export const RELEASES = [
  { date: 'Nov 2026', title: 'Population estimates: total down 0.6m in a year', body: 'Japan’s population fell to about 123.9 million in 2024, the 14th straight yearly fall. Births hit a new low of 720,988 while deaths reached 1.62 million.', source: 'Statistics Bureau of Japan, 2024' },
  { date: 'Oct 2026', title: 'CPI up 2.7% year on year in 2024', body: 'Consumer prices rose for a third straight year, led by food and services, while the Bank of Japan kept its policy rate above zero.', source: 'Statistics Bureau of Japan, 2024' },
  { date: 'Sep 2026', title: 'Unemployment steady at 2.5%', body: 'The jobless rate stayed near its lowest in decades, with the jobs-to-applicants ratio holding above 1.2.', source: 'Statistics Bureau of Japan, 2024' },
  { date: 'Aug 2026', title: 'GDP about $4.03 trillion in 2024', body: 'Nominal GDP slipped in dollar terms as the yen weakened, though real growth stayed positive at about 0.1%.', source: 'IMF World Economic Outlook, 2024' }
];

// ---- Method notes --------------------------------------------------------
export const METHOD_NOTES = [
  { topic: 'Population', text: 'Census counts for 1950–2020; yearly figures after 2020 are the Statistics Bureau’s population estimates as of 1 October. Prefecture populations are 2024 estimates rounded to 0.01 million.' },
  { topic: 'Economy', text: 'GDP and GDP per capita in current US dollars from the IMF World Economic Outlook; the dollar figure moves with the yen, so the 2022–2024 fall is mostly exchange-rate driven. CPI is the all-items index, 2020 = 100. Government debt is gross general-government debt.' },
  { topic: 'Health and education', text: 'Life expectancy and vital statistics come from the Ministry of Health, Labour and Welfare. OECD figures are from OECD Health Statistics and Education at a Glance; PISA scores are from the 2022 round.' },
  { topic: 'Rounding', text: 'Figures marked approx. are rounded for display. Where a number is uncertain it is shown as an approximation and the page says so; nothing here is invented or a placeholder.' }
];
