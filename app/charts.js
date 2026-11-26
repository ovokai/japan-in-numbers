// Japan in Numbers — hand-written SVG chart helpers.
// Every function returns an SVG string; no library is used. Charts scale to
// the width of their container through viewBox.

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const ticks = [];
  for (let v = Math.ceil(min / size) * size; v <= max + size * 0.001; v += size) {
    ticks.push(Math.round(v * 100) / 100);
  }
  return ticks;
}

// Line chart. series: [{label, color, points: [{x, y}]}]. x values are years.
export function lineChart(series, opts) {
  const o = Object.assign({ width: 640, height: 300, yLabel: '', xLabel: '', formatY: (v) => String(v) }, opts || {});
  const padL = 52, padR = 16, padT = 14, padB = 30;
  const w = o.width - padL - padR, h = o.height - padT - padB;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  series.forEach((s) => s.points.forEach((p) => {
    minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
  }));
  const yPad = (maxY - minY || 1) * 0.08;
  minY -= yPad; maxY += yPad;
  const X = (x) => padL + ((x - minX) / (maxX - minX || 1)) * w;
  const Y = (y) => padT + (1 - (y - minY) / (maxY - minY)) * h;
  const ticks = niceTicks(minY, maxY, 4);
  let out = '<svg viewBox="0 0 ' + o.width + ' ' + o.height + '" role="img" aria-label="' + esc(o.yLabel || 'Line chart') + '">';
  ticks.forEach((t) => {
    out += '<line x1="' + padL + '" y1="' + Y(t).toFixed(1) + '" x2="' + (padL + w) + '" y2="' + Y(t).toFixed(1) + '" stroke="#e2e8f0" stroke-width="1"/>';
    out += '<text x="' + (padL - 8) + '" y="' + (Y(t) + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#64748b">' + esc(o.formatY(t)) + '</text>';
  });
  series.forEach((s) => {
    const pts = s.points.map((p) => X(p.x).toFixed(1) + ',' + Y(p.y).toFixed(1)).join(' ');
    out += '<polyline points="' + pts + '" fill="none" stroke="' + s.color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
    s.points.forEach((p) => {
      out += '<circle cx="' + X(p.x).toFixed(1) + '" cy="' + Y(p.y).toFixed(1) + '" r="3.2" fill="#fff" stroke="' + s.color + '" stroke-width="2"/>';
    });
  });
  // X labels: draw only labels that cannot overlap. Estimate each label's
  // pixel width from its text, keep a running right edge, and always keep
  // the last point's label (dropping the previous one if it would collide).
  const labelW = (s) => String(s).length * 6.6 + 4;
  const pts = series[0].points;
  const keep = [];
  let lastRight = -Infinity;
  pts.forEach((p, i) => {
    const halfW = labelW(p.x) / 2;
    if (X(p.x) - halfW >= lastRight) {
      keep.push(i);
      lastRight = X(p.x) + halfW;
    }
  });
  const lastIdx = pts.length - 1;
  if (keep[keep.length - 1] !== lastIdx) {
    if (keep.length && X(pts[keep[keep.length - 1]].x) + labelW(pts[keep[keep.length - 1]].x) / 2 > X(pts[lastIdx].x) - labelW(pts[lastIdx].x) / 2) {
      keep.pop();
    }
    keep.push(lastIdx);
  }
  keep.forEach((i) => {
    const p = pts[i];
    out += '<text x="' + X(p.x).toFixed(1) + '" y="' + (o.height - 8) + '" text-anchor="middle" font-size="11" fill="#64748b">' + p.x + '</text>';
  });
  if (series.length > 1) {
    let lx = padL;
    series.forEach((s) => {
      out += '<rect x="' + lx + '" y="2" width="12" height="4" rx="2" fill="' + s.color + '"/>';
      out += '<text x="' + (lx + 17) + '" y="8" font-size="11" fill="#334155">' + esc(s.label) + '</text>';
      lx += 17 + s.label.length * 6.6 + 26;
    });
  }
  out += '</svg>';
  return out;
}

// Vertical bar chart. items: [{label, value, color?}]
export function barChart(items, opts) {
  const o = Object.assign({ width: 640, height: 320, formatY: (v) => String(v), barColor: '#1d4ed8' }, opts || {});
  const padL = 52, padR = 12, padT = 14, padB = 34;
  const w = o.width - padL - padR, h = o.height - padT - padB;
  const maxV = Math.max.apply(null, items.map((d) => d.value)) || 1;
  const ticks = niceTicks(0, maxV, 4);
  const slot = w / items.length;
  const bw = Math.min(46, slot * 0.62);
  let out = '<svg viewBox="0 0 ' + o.width + ' ' + o.height + '" role="img" aria-label="Bar chart">';
  ticks.forEach((t) => {
    const y = padT + (1 - t / (ticks[ticks.length - 1] || 1)) * h;
    out += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (padL + w) + '" y2="' + y.toFixed(1) + '" stroke="#e2e8f0" stroke-width="1"/>';
    out += '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#64748b">' + esc(o.formatY(t)) + '</text>';
  });
  items.forEach((d, i) => {
    const bh = (d.value / (ticks[ticks.length - 1] || 1)) * h;
    const x = padL + i * slot + (slot - bw) / 2;
    const y = padT + h - bh;
    out += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3" fill="' + (d.color || o.barColor) + '"/>';
    out += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (y - 5).toFixed(1) + '" text-anchor="middle" font-size="11" fill="#334155">' + esc(o.formatY(d.value)) + '</text>';
    out += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (o.height - 10) + '" text-anchor="middle" font-size="11" fill="#64748b">' + esc(d.label) + '</text>';
  });
  out += '</svg>';
  return out;
}

// Population pyramid. rows: [{band, men, women}] in millions.
export function pyramid(rows, opts) {
  const o = Object.assign({ width: 640, height: 360 }, opts || {});
  const padL = 76, padR = 70, padT = 26, padB = 26;
  const w = o.width - padL - padR, h = o.height - padT - padB;
  const maxV = Math.max.apply(null, rows.map((r) => Math.max(r.men, r.women))) || 1;
  const half = w / 2, mid = padL + half;
  const rowH = h / rows.length;
  let out = '<svg viewBox="0 0 ' + o.width + ' ' + o.height + '" role="img" aria-label="Population pyramid">';
  out += '<text x="' + (mid - half / 2).toFixed(0) + '" y="14" text-anchor="middle" font-size="11" fill="#64748b">Men</text>';
  out += '<text x="' + (mid + half / 2).toFixed(0) + '" y="14" text-anchor="middle" font-size="11" fill="#64748b">Women</text>';
  rows.forEach((r, i) => {
    const y = padT + i * rowH + 2;
    const bh = rowH - 4;
    const mw = (r.men / maxV) * half;
    const ww = (r.women / maxV) * half;
    out += '<rect x="' + (mid - mw).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + mw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="2" fill="#1d4ed8"/>';
    out += '<rect x="' + mid.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + ww.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="2" fill="#be123c"/>';
    // Age-band label in a dedicated column at the left, clear of the bars:
    // it ends at padL - 32, while the leftmost men's value label starts
    // around padL - 23, so the two can never meet.
    out += '<text x="' + (padL - 32) + '" y="' + (y + bh / 2 + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#334155">' + esc(r.band) + '</text>';
    out += '<text x="' + (mid - mw - 5).toFixed(1) + '" y="' + (y + bh / 2 + 4).toFixed(1) + '" text-anchor="end" font-size="10" fill="#64748b">' + r.men.toFixed(1) + '</text>';
    out += '<text x="' + (mid + ww + 5).toFixed(1) + '" y="' + (y + bh / 2 + 4).toFixed(1) + '" font-size="10" fill="#64748b">' + r.women.toFixed(1) + '</text>';
  });
  out += '<text x="' + (o.width / 2) + '" y="' + (o.height - 6) + '" text-anchor="middle" font-size="11" fill="#64748b">Millions of people, 2024</text>';
  out += '</svg>';
  return out;
}

// Donut chart. parts: [{label, value, color}]
export function donut(parts, opts) {
  const o = Object.assign({ width: 300, height: 300 }, opts || {});
  const cx = o.width / 2, cy = o.height / 2, r = 96, inner = 62;
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  let a0 = -Math.PI / 2;
  let out = '<svg viewBox="0 0 ' + o.width + ' ' + o.height + '" role="img" aria-label="Donut chart">';
  parts.forEach((p) => {
    const a1 = a0 + (p.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    out += '<path d="M ' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L ' + xi1.toFixed(1) + ' ' + yi1.toFixed(1) + ' A ' + inner + ' ' + inner + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ' ' + yi0.toFixed(1) + ' Z" fill="' + p.color + '"/>';
    a0 = a1;
  });
  out += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="26" font-weight="700" fill="#0f172a">' + esc(o.center || '') + '</text>';
  out += '<text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" font-size="11" fill="#64748b">' + esc(o.centerLabel || '') + '</text>';
  out += '</svg>';
  return out;
}
