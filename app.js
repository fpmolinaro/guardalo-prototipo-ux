/* Guardalo: prototipo navegable. Todo el estado vive en memoria; no hay backend. */
const APP_NAME = 'Guardalo';

const BOX = {
  S: { vol: 0.036, dims: '40 × 30 × 30 cm', uso: 'Libros, papeles, objetos chicos' },
  M: { vol: 0.08, dims: '50 × 40 × 40 cm', uso: 'Ropa, vajilla, uso general' },
  L: { vol: 0.15, dims: '60 × 50 × 50 cm', uso: 'Ropa de cama, cosas voluminosas' },
};
const OBJ = {
  valija: { n: 'Valija grande', eq: 1, max: 0.8, icon: 'ti-luggage' },
  silla: { n: 'Silla', eq: 2, max: 1.0, icon: 'ti-armchair' },
  colchon: { n: 'Colchón de 1 plaza', eq: 3, max: 1.9, icon: 'ti-bed' },
  bici: { n: 'Bicicleta', eq: 4, max: 1.8, icon: 'ti-bike' },
};
const KIT = { S: 1500, M: 2000, L: 2800 };
const ZONA = { S: [180, 240, 320], M: [300, 390, 520], L: [450, 580, 760], valija: [400, 560, 750], silla: [800, 1050, 1400], colchon: [1100, 1500, 2100], bici: [1500, 1950, 2600] };
const OPERADORES = [
  { id: 'chico', n: 'Utilitario chico', d: 'Hasta 1,5 m³ · sin ayudante', flete: 20000, max: 1.5 },
  { id: 'grande', n: 'Utilitario grande', d: 'Hasta 4 m³ · con un ayudante', flete: 31000, max: 4 },
  { id: 'mudanza', n: 'Camión con dos ayudantes', d: 'Hasta 12 m³', flete: 52000, max: 12 },
];
const SPACES = [
  { id: 1, name: 'Baulera en Palermo', tipo: 'Baulera', barrio: 'Palermo', dims: [2, 1.5, 2], usado: 0, x: 38, y: 40,
    prices: { S: 250, M: 400, L: 600, valija: 550, silla: 1000, colchon: 1500, bici: 2000 }, acepta: ['valija', 'silla', 'colchon', 'bici'],
    modo: 'inmediata', min: 7, max: null, hin: 'Lun a sáb · 9 a 19 h', hout: 'Lun a sáb · 9 a 19 h', recep: 'Dentro del espacio',
    disc: [{ t: 'dias', dias: 28, pct: 15 }, { t: 'combo', dias: 28, cajas: 6, pct: 20 }], rating: 4.9, rev: 23, anf: 'Laura', corta: 'Moderada', larga: 'Firme', noReemb: true,
    seg: 'Edificio con portería y cámaras' },
  { id: 2, name: 'Cochera en Colegiales', tipo: 'Cochera', barrio: 'Colegiales', dims: [2.4, 2.5, 4.5], usado: 14, x: 22, y: 22,
    prices: { S: 200, M: 330, L: 480, valija: 480, silla: 900, colchon: 1300, bici: 1600 }, acepta: ['valija', 'silla', 'bici'],
    modo: 'aprobacion', min: 30, max: null, hin: 'Todos los días · 8 a 21 h', hout: 'Todos los días · 8 a 21 h', recep: 'En la puerta del inmueble',
    disc: [{ t: 'cajas', cajas: 10, pct: 10 }], rating: 4.7, rev: 11, anf: 'Martín', corta: 'Firme', larga: 'Estricta', seg: 'Portón eléctrico' },
  { id: 3, name: 'Placard en Belgrano', tipo: 'Placard', barrio: 'Belgrano', dims: [1.2, 1, 0.6], usado: 0, x: 62, y: 16,
    prices: { S: 190, M: 310, L: 470, valija: 450, silla: 0, colchon: 0, bici: 0 }, acepta: ['valija'],
    modo: 'inmediata', min: 3, max: 90, hin: 'Lun a vie · 18 a 21 h', hout: 'Lun a vie · 18 a 21 h', recep: 'Dentro del espacio',
    disc: [], rating: 4.8, rev: 6, anf: 'Sofía', corta: 'Flexible', larga: 'Firme', seg: 'Departamento con encargado' },
  { id: 4, name: 'Habitación en Villa Crespo', tipo: 'Habitación', barrio: 'Villa Crespo', dims: [2.5, 3, 3], usado: 6, x: 70, y: 64,
    prices: { S: 280, M: 450, L: 680, valija: 620, silla: 1150, colchon: 1700, bici: 2200 }, acepta: ['valija', 'silla', 'colchon', 'bici'],
    modo: 'inmediata', min: 1, max: 60, hin: 'Sáb y dom · 10 a 14 h', hout: 'Sáb y dom · 10 a 14 h', recep: 'Dentro del espacio',
    disc: [{ t: 'dias', dias: 7, pct: 5 }], rating: 4.6, rev: 15, anf: 'Diego', corta: 'Limitada', larga: 'Firme', noReemb: true, seg: 'Casa con alarma' },
  { id: 5, name: 'Baulera en Núñez', tipo: 'Baulera', barrio: 'Núñez', dims: [1, 1, 0.9], usado: 0.2, x: 50, y: 82,
    prices: { S: 210, M: 350, L: 520, valija: 500, silla: 0, colchon: 0, bici: 0 }, acepta: ['valija'],
    modo: 'aprobacion', min: 14, max: null, hin: 'Lun a vie · 10 a 18 h', hout: 'Lun a vie · 10 a 18 h', recep: 'En la puerta del inmueble',
    disc: [], rating: 5.0, rev: 3, anf: 'Ana', corta: 'Estricta', larga: 'Estricta', seg: 'Cochera cubierta con llave' },
];

const S = {
  role: 'cliente', screen: 'C-01', hist: [], next: null,
  inv: { S: 0, M: 4, L: 2, valija: 0, silla: 0, colchon: 0, bici: 1 }, otro: '', valor: 500000,
  desde: '2026-11-20', hasta: '2026-12-20', sinFecha: false, zona: 'Palermo',
  sel: 1, verified: false, docs: { frente: false, dorso: false, selfie: false },
  logistica: 'propia', operador: null, envioFecha: '2026-11-20', envioHora: '10 a 12 h',
  kits: { S: 0, M: 0, L: 0 }, comprobante: 'B', noReemb: false, retiroOp: null, conv: 'Federico', reserva: null, chatIn: '',
  chat: [
    { me: true, t: 'Hola Laura, ¿la baulera tiene luz? Quiero guardar una bici.' },
    { me: false, t: 'Hola, sí, tiene luz y entra perfecto una bici colgada en la pared.' },
  ],
  rating: 0, hostRating: 0,
  host: { tipo: 'Baulera', dir: 'Av. Córdoba 4500, Palermo', alto: 2, ancho: 1.5, prof: 2, fotos: 2,
    dias: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], hin: '9 a 19 h', hout: '9 a 19 h', min: 7, max: '', recep: 'dentro',
    prices: { S: 250, M: 400, L: 600, valija: 550, silla: 1000, colchon: 1500, bici: 2000 },
    disc: [{ t: 'dias', dias: 28, cajas: 6, pct: 15 }, { t: 'combo', dias: 28, cajas: 6, pct: 20 }],
    modo: 'inmediata', corta: 'Moderada', larga: 'Firme', noReemb: true, acepta: { valija: true, silla: true, colchon: true, bici: true },
    prohibidos: ['Perecederos', 'Inflamables', 'Animales'], published: false, solicitud: 'pendiente', envioOk: false,
    checkin: { qr: false, fotos: 0, talles: false }, checkout: { qr: false, fotos: 0 }, etapa: 'in' },
};

/* ---------- utilidades ---------- */
const $ = (s) => document.querySelector(s);
const money = (n) => '$' + Math.round(n).toLocaleString('es-AR');
const num = (n, d = 2) => Number(n).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: d });
const days = () => S.sinFecha ? 30 : Math.max(1, Math.round((new Date(S.hasta) - new Date(S.desde)) / 864e5));
const fecha = (iso) => new Date(iso + 'T12:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
const cajas = () => S.inv.S + S.inv.M + S.inv.L;
const objs = () => Object.keys(OBJ).filter((k) => S.inv[k] > 0);
const volumen = () => S.inv.S * BOX.S.vol + S.inv.M * BOX.M.vol + S.inv.L * BOX.L.vol + objs().reduce((a, k) => a + S.inv[k] * OBJ[k].eq * BOX.L.vol, 0);
const resumen = () => { const o = objs().reduce((a, k) => a + S.inv[k], 0); return `${cajas()} caja${cajas() === 1 ? '' : 's'} y ${o} objeto${o === 1 ? '' : 's'} · ocupa como ${num(volumen() / BOX.L.vol, 1)} cajas L`; };
const space = (id = S.sel) => SPACES.find((s) => s.id === id);
const libre = (sp) => sp.dims[0] * sp.dims[1] * sp.dims[2] - sp.usado;
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function compat(sp) {
  const d = days();
  if (volumen() > libre(sp)) return 'No entra todo';
  const grande = Math.max(...sp.dims);
  for (const k of objs()) {
    if (!sp.acepta.includes(k)) return 'No acepta ' + OBJ[k].n.toLowerCase();
    if (OBJ[k].max > grande) return 'Tu ' + OBJ[k].n.toLowerCase() + ' no entra por medida';
  }
  if (d < sp.min) return 'Estadía mínima ' + sp.min + ' días';
  if (sp.max && (S.sinFecha || d > sp.max)) return 'Estadía máxima ' + sp.max + ' días';
  return '';
}
function bestDisc(sp) {
  const d = days(), c = cajas();
  let best = null;
  for (const r of sp.disc) {
    const ok = (r.t === 'dias' && d >= r.dias) || (r.t === 'cajas' && c >= r.cajas) || (r.t === 'combo' && d >= r.dias && c >= r.cajas);
    if (ok && (!best || r.pct > best.pct)) best = r;
  }
  return best;
}
const discLabel = (r) => r.t === 'dias' ? `${r.dias} días o más` : r.t === 'cajas' ? `${r.cajas} cajas o más` : `${r.dias} días y ${r.cajas} cajas`;
function quote(sp = space()) {
  const d = days();
  const items = [];
  ['S', 'M', 'L'].forEach((k) => S.inv[k] && items.push({ n: `${S.inv[k]} caja${S.inv[k] > 1 ? 's' : ''} ${k}`, c: `${S.inv[k]} × ${money(sp.prices[k])} × ${d} días`, v: S.inv[k] * sp.prices[k] * d }));
  objs().forEach((k) => items.push({ n: `${S.inv[k]} ${OBJ[k].n.toLowerCase()}`, c: `${S.inv[k]} × ${money(sp.prices[k])} × ${d} días`, v: S.inv[k] * sp.prices[k] * d }));
  const bruto = items.reduce((a, i) => a + i.v, 0);
  const disc = bestDisc(sp);
  const desc = disc ? bruto * disc.pct / 100 : 0;
  const nr = S.noReemb && sp.noReemb ? (bruto - desc) * 0.1 : 0;
  const alquiler = bruto - desc - nr;
  const op = S.logistica === 'transporte' && S.operador ? OPERADORES.find((o) => o.id === S.operador) : null;
  const flete = op ? op.flete : 0;
  const seguro = op ? S.valor * 0.015 : 0;
  const envio = flete + seguro;
  const cargo = (alquiler + envio) * 0.03;
  const kits = ['S', 'M', 'L'].reduce((a, k) => a + S.kits[k] * KIT[k], 0);
  const total = alquiler + envio + cargo + kits;
  return { items, bruto, disc, desc, nr, alquiler, flete, seguro, envio, cargo, kits, total, comision: alquiler * 0.12 };
}

/* ---------- piezas visuales ---------- */
function boxSVG(k, s = 1) {
  const w = { S: 26, M: 34, L: 42 }[k] * s, h = { S: 20, M: 28, L: 34 }[k] * s;
  return `<svg width="${w + 8}" height="${h + 8}" viewBox="0 0 ${w + 8} ${h + 8}" aria-hidden="true"><path d="M2 8 L8 2 L${w + 6} 2 L${w + 6} ${h} L${w} ${h + 6} L2 ${h + 6} Z" fill="#B98446"/><rect x="2" y="8" width="${w - 2}" height="${h - 2}" fill="#D5A66B"/><path d="M2 8 L8 2 L${w + 6} 2 L${w} 8 Z" fill="#E2BA86"/><rect x="${(w - 2) / 2 - 2}" y="8" width="6" height="${h - 2}" fill="#2A54D6" opacity=".85"/></svg>`;
}
function objIcon(k) { return `<span style="display:inline-grid;place-items:center;width:42px;height:34px;border-radius:6px;background:#D5A66B;color:#5E3D14;font-size:22px"><i class="ti ${OBJ[k].icon}" aria-hidden="true"></i></span>`; }
function pile() {
  let out = '';
  ['L', 'M', 'S'].forEach((k) => { for (let i = 0; i < Math.min(S.inv[k], 8); i++) out += boxSVG(k, 0.9); });
  objs().forEach((k) => { for (let i = 0; i < Math.min(S.inv[k], 3); i++) out += objIcon(k); });
  return out || '<span class="empty">Sumá cajas u objetos para ver tu pila.</span>';
}
function topbar(title, back = true) {
  return `<div class="top">${back ? '<button class="back" data-act="back" aria-label="Volver"><i class="ti ti-arrow-left"></i></button>' : ''}<h2>${title}</h2></div>`;
}
const stepper = (key, val, label) => `<div class="stepper"><button data-act="dec" data-arg="${key}" aria-label="Quitar ${label}"><i class="ti ti-minus"></i></button><output aria-live="polite">${val}</output><button data-act="inc" data-arg="${key}" aria-label="Agregar ${label}"><i class="ti ti-plus"></i></button></div>`;
const opt = (on, act, arg, label) => `<button class="opt" aria-pressed="${on}" data-act="${act}" data-arg="${arg}">${label}</button>`;
const toggle = (on, act, label) => `<button class="toggle" role="switch" aria-checked="${on}" data-act="${act}" aria-label="${label}"></button>`;
function qr(seed = 7) {
  let r = seed, out = '';
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const finder = (x, y) => [[0, 0], [14, 0], [0, 14]].some(([a, b]) => x >= a && x < a + 7 && y >= b && y < b + 7 && (x === a || x === a + 6 || y === b || y === b + 6 || (x >= a + 2 && x <= a + 4 && y >= b + 2 && y <= b + 4)));
  const inFinder = (x, y) => [[0, 0], [14, 0], [0, 14]].some(([a, b]) => x >= a && x < a + 7 && y >= b && y < b + 7);
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) out += (inFinder(x, y) ? finder(x, y) : rnd() > 0.52) ? '<i></i>' : '<b></b>';
  return `<div class="qr" role="img" aria-label="Código QR de la reserva">${out}</div>`;
}
function maskText(t) {
  return esc(t)
    .replace(/https?:\/\/\S+|www\.\S+|\b\S+\.(com|ar|net|org)\S*/gi, '<span class="mask">enlace oculto</span>')
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '<span class="mask">mail oculto</span>')
    .replace(/\b\d{22}\b/g, '<span class="mask">CBU oculto</span>')
    .replace(/\balias\s*:?\s*[\w.]+/gi, '<span class="mask">alias oculto</span>')
    .replace(/(\+?\d[\d\s-]{7,}\d)/g, '<span class="mask">teléfono oculto</span>')
    .replace(/@\w{3,}|\b(instagram|whatsapp|wpp|telegram|facebook)\b/gi, '<span class="mask">contacto oculto</span>');
}
const masked = (t) => maskText(t).includes('class="mask"');

/* ---------- pantallas ---------- */
const SCREENS = {};
const reg = (id, role, name, render) => (SCREENS[id] = { id, role, name, render });

reg('R-01', 'ambos', 'Registro', () => {
  const h = S.role === 'anfitrion';
  return `${topbar(h ? 'Creá tu cuenta de anfitrión' : 'Creá tu cuenta')}
  <div class="stack">
    <button class="btn sec2"><i class="ti ti-brand-google"></i>Completar con Google</button>
    <button class="btn sec2"><i class="ti ti-brand-apple"></i>Completar con Apple</button>
    <p class="small muted" style="text-align:center;margin:2px 0">o con tu mail</p>
    <label class="f">Nombre completo<input class="inp" value="${h ? 'Laura Gómez' : 'Federico Pérez'}"></label>
    <label class="f">Mail<input class="inp" type="email" value="${h ? 'laura@mail.com' : 'fede@mail.com'}"></label>
    ${h ? `<div class="sec">Para cobrar</div>
      <label class="f">CBU o CVU<input class="inp" inputmode="numeric" value="0000003100012345678901"></label>
      <label class="f">Dirección de facturación<input class="inp" value="Av. Córdoba 4500, CABA"></label>`
    : `<div class="sec">Para tu factura</div>
      <label class="f">Domicilio de facturación<input class="inp" value="Gorriti 5200, CABA"></label>
      <div class="f" style="font-size:13px;font-weight:500">Tipo de comprobante
        <div class="choices">${opt(S.comprobante === 'B', 'comp', 'B', 'Factura B · consumidor final')}${opt(S.comprobante === 'A', 'comp', 'A', 'Factura A · responsable inscripto')}</div></div>`}
    <p class="xs muted">Al continuar aceptás los términos y el tratamiento de tus datos personales según la Ley 25.326.</p>
  </div>
  <div class="sticky"><button class="btn" data-go="R-02">Continuar</button></div>`;
});

reg('R-02', 'ambos', 'Verificación de identidad', () => {
  const d = S.docs, all = d.frente && d.dorso && d.selfie;
  const item = (k, icon, t, sub) => `<button class="radio" aria-pressed="${d[k]}" data-act="doc" data-arg="${k}"><i class="ti ${d[k] ? 'ti-circle-check' : icon}"></i><div><div class="b">${t}</div><div class="small muted">${d[k] ? 'Listo' : sub}</div></div></button>`;
  return `${topbar('Verificá tu identidad')}
  <p class="lead">Lo pedimos una sola vez. Así todos en la comunidad saben con quién están tratando.</p>
  <div class="stack">
    ${item('frente', 'ti-id', 'DNI de frente', 'Sacale una foto con buena luz')}
    ${item('dorso', 'ti-id', 'DNI de dorso', 'Que se lea el código de barras')}
    ${item('selfie', 'ti-face-id', 'Selfie con prueba de vida', 'Vas a mover la cabeza cuando te lo pidamos')}
  </div>
  <div class="note info" style="margin-top:14px"><i class="ti ti-lock"></i><span>Tu DNI y tu selfie solo se usan para validar tu identidad. Nadie más los ve.</span></div>
  <div class="sticky"><button class="btn" ${all ? 'data-act="verify"' : 'aria-disabled="true" data-act="needdocs"'}>Verificar identidad</button></div>`;
});

reg('C-01', 'cliente', 'Inicio', () => `
  <div class="row between" style="margin-top:8px"><span class="b" style="font-family:var(--display);font-size:20px">${APP_NAME}</span><span class="chip"><i class="ti ti-map-pin"></i>${S.zona}</span></div>
  <h2 class="big">¿Qué querés guardar?</h2>
  <p class="lead">Contanos qué tenés y te mostramos bauleras, cocheras y placares cerca tuyo donde entra todo junto.</p>
  <div class="pile" style="min-height:110px;margin-bottom:14px">${boxSVG('L', 1.3)}${boxSVG('M', 1.3)}${boxSVG('S', 1.3)}${objIcon('bici')}${boxSVG('M', 1.3)}</div>
  <button class="btn" data-go="C-02"><i class="ti ti-package"></i>Armar mi lista</button>
  <div class="sec">Cómo funciona</div>
  <div class="stack small">
    <div class="row"><i class="ti ti-list-check" style="font-size:22px;color:var(--kraft-d)"></i><span>Cargás tus cajas y objetos, y elegís las fechas.</span></div>
    <div class="row"><i class="ti ti-map-2" style="font-size:22px;color:var(--kraft-d)"></i><span>Comparás espacios con el precio total de tu pedido.</span></div>
    <div class="row"><i class="ti ti-truck" style="font-size:22px;color:var(--kraft-d)"></i><span>Lo llevás vos o contratás el transporte en la app.</span></div>
    <div class="row"><i class="ti ti-shield-check" style="font-size:22px;color:var(--kraft-d)"></i><span>Tu pago queda retenido hasta que retirás tus cosas, y el guardado tiene seguro.</span></div>
  </div>`);

reg('C-02', 'cliente', 'Inventario', () => {
  const box = (k) => `<div class="boxrow"><div style="display:grid;place-items:center">${boxSVG(k, 1.2)}</div><div><div class="b">Caja ${k}</div><div class="xs muted">${BOX[k].dims} · ${BOX[k].uso}</div></div>${stepper(k, S.inv[k], 'caja ' + k)}</div>`;
  const ob = (k) => `<div class="boxrow"><div style="display:grid;place-items:center">${objIcon(k)}</div><div><div class="b">${OBJ[k].n}</div><div class="xs muted">Ocupa como ${OBJ[k].eq} caja${OBJ[k].eq > 1 ? 's' : ''} L</div></div>${stepper(k, S.inv[k], OBJ[k].n)}</div>`;
  const total = cajas() + objs().reduce((a, k) => a + S.inv[k], 0);
  return `${topbar('Tu lista')}
  <div class="pile" data-live="pile">${pile()}</div>
  <p class="small muted" style="margin:6px 0 0" data-live="sum">${total ? resumen() : 'Tu lista está vacía.'}</p>
  <div class="sec">Cajas</div><div class="card" style="padding:4px 14px">${box('S')}${box('M')}${box('L')}</div>
  <p class="xs muted" style="margin:6px 2px 0">Podés usar tus propias cajas si respetan estas medidas, o comprar un kit al reservar.</p>
  <div class="sec">Objetos que no van en caja</div><div class="card" style="padding:4px 14px">${Object.keys(OBJ).map(ob).join('')}</div>
  <label class="f" style="margin-top:10px">¿Otra cosa? Contanos qué es y sus medidas<input class="inp" data-bind="otro" placeholder="Tabla de surf, 2 × 0,6 × 0,1 m" value="${esc(S.otro)}"></label>
  <div class="sec">Valor de lo que guardás</div>
  <label class="f">Valor total aproximado<input class="inp" inputmode="numeric" data-bind="valor" data-type="num" value="${S.valor}"></label>
  <div class="note info" style="margin-top:8px"><i class="ti ti-info-circle"></i><span>Si contratás transporte, el envío incluye un seguro del 1,5 % sobre este valor, que cubre daños durante el traslado.</span></div>
  <div class="sticky"><button class="btn" ${total ? 'data-go="C-03"' : 'aria-disabled="true"'}>Elegir fechas</button></div>`;
});

reg('C-03', 'cliente', 'Fechas y zona', () => `${topbar('¿Desde cuándo y dónde?')}
  <div class="grid2">
    <label class="f">Desde<input class="inp" type="date" data-bind="desde" value="${S.desde}"></label>
    <label class="f">Hasta<input class="inp" type="date" data-bind="hasta" value="${S.hasta}" ${S.sinFecha ? 'disabled' : ''}></label>
  </div>
  <div class="card row between" style="margin-top:12px"><div><div class="b">Sin fecha de retiro</div><div class="xs muted">Se renueva cada 30 días hasta que lo des de baja.</div></div>${toggle(S.sinFecha, 'sinfecha', 'Sin fecha de retiro')}</div>
  <p class="small muted" data-live="dias">${S.sinFecha ? 'Se cobra por períodos de 30 días.' : `${days()} días de guardado`}</p>
  <div class="sec">Zona</div>
  <label class="f">Barrio o dirección<input class="inp" data-bind="zona" value="${esc(S.zona)}"></label>
  <div class="choices" style="margin-top:8px">${['Palermo', 'Colegiales', 'Belgrano', 'Villa Crespo'].map((b) => opt(S.zona === b, 'zona', b, b)).join('')}</div>
  <div class="sticky"><button class="btn" data-go="C-04"><i class="ti ti-search"></i>Ver espacios</button></div>`);

reg('C-04', 'cliente', 'Mapa de espacios', () => {
  const list = SPACES.map((sp) => ({ sp, why: compat(sp), q: quote(sp) }));
  const ok = list.filter((l) => !l.why);
  return `${topbar('Espacios para tu lista')}
  <p class="small muted" style="margin-top:-6px">${cajas()} cajas, ${objs().length} tipo${objs().length === 1 ? '' : 's'} de objeto · ${S.sinFecha ? 'sin fecha de retiro' : `${fecha(S.desde)} al ${fecha(S.hasta)}`}</p>
  <div class="map">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <rect width="100" height="100" fill="#E7EAE4"/>
      <path d="M0 30 L100 22 M0 58 L100 50 M0 84 L100 78 M18 0 L26 100 M46 0 L52 100 M74 0 L80 100" stroke="#fff" stroke-width="2.4"/>
      <path d="M0 12 L100 4 M60 0 L66 100" stroke="#fff" stroke-width="1"/>
      <rect x="54" y="60" width="16" height="12" fill="#D3E2CF"/><rect x="8" y="64" width="9" height="14" fill="#D3E2CF"/>
    </svg>
    ${list.map(({ sp, why, q }) => `<button class="pin ${why ? 'off' : ''} ${sp.id === S.sel && !why ? 'sel' : ''}" style="left:${sp.x}%;top:${sp.y}%" data-act="pick" data-arg="${sp.id}" aria-label="${sp.name}">${why ? '<i class="ti ti-x"></i>' : money(q.total)}</button>`).join('')}
  </div>
  <p class="xs muted" style="margin:6px 0 0">${ok.length} de ${SPACES.length} espacios tienen lugar para todo junto. Los demás aparecen tachados.</p>
  <div class="stack" style="margin-top:12px">
    ${list.sort((a, b) => !!a.why - !!b.why || a.q.total - b.q.total).map(({ sp, why, q }) => `
    <button class="space" data-act="${why ? 'nofit' : 'open'}" data-arg="${sp.id}" ${why ? 'style="opacity:.55"' : ''}>
      <div class="thumb"><i class="ti ${sp.tipo === 'Cochera' ? 'ti-car-garage' : sp.tipo === 'Placard' ? 'ti-door' : sp.tipo === 'Habitación' ? 'ti-bed' : 'ti-box'}"></i></div>
      <div><div class="row between"><span class="b">${sp.name}</span><span class="small"><i class="ti ti-star stars"></i> ${sp.rating}</span></div>
        <div class="xs muted">${sp.hin}</div>
        ${why ? `<span class="chip bad" style="margin-top:6px">${why}</span>` : `<div class="row between" style="margin-top:6px"><span class="b">${money(q.total)} <span class="xs muted" style="font-weight:400">total</span></span>${sp.modo === 'inmediata' ? '<span class="chip ok"><i class="ti ti-bolt"></i>Inmediata</span>' : '<span class="chip">Con aprobación</span>'}</div>`}
      </div></button>`).join('')}
  </div>`;
});

reg('C-05', 'cliente', 'Ficha del espacio', () => {
  const sp = space(), q = quote(sp);
  return `${topbar(sp.name)}
  <div class="thumb hero"><i class="ti ti-photo" style="font-size:34px"></i></div>
  <div class="row between"><span class="small"><i class="ti ti-star stars"></i> ${sp.rating} · ${sp.rev} reseñas · Anfitriona/ón ${sp.anf} <i class="ti ti-rosette-discount-check" style="color:var(--tape)" title="Identidad verificada"></i></span></div>
  <div class="choices" style="margin:10px 0">${sp.modo === 'inmediata' ? '<span class="chip ok"><i class="ti ti-bolt"></i>Reserva inmediata</span>' : '<span class="chip">Requiere aprobación (24 h)</span>'}<span class="chip">${sp.seg}</span><span class="chip">Cancelación ${sp.corta.toLowerCase()}</span></div>
  <div class="card stack small">
    <div class="row"><i class="ti ti-login-2"></i><span><b>Check-in:</b> ${sp.hin}</span></div>
    <div class="row"><i class="ti ti-logout-2"></i><span><b>Check-out:</b> ${sp.hout}</span></div>
    <div class="row"><i class="ti ti-door-enter"></i><span><b>Recepción:</b> ${sp.recep.toLowerCase()}</span></div>
    <div class="row"><i class="ti ti-calendar-check"></i><span><b>Disponibilidad:</b> tiene lugar para tu lista ${S.sinFecha ? `desde el ${fecha(S.desde)}` : `del ${fecha(S.desde)} al ${fecha(S.hasta)}`}</span></div>
    <div class="row"><i class="ti ti-calendar"></i><span><b>Estadía:</b> mínimo ${sp.min} días${sp.max ? `, máximo ${sp.max}` : ''}</span></div>
    <div class="row"><i class="ti ti-ban"></i><span><b>No se aceptan:</b> perecederos, inflamables, animales</span></div>
  </div>
  <div class="sec">Tu cotización</div>
  <div class="card">
    ${q.items.map((i) => `<div class="line"><span>${i.n}</span><span>${money(i.v)}</span></div>`).join('')}
    ${q.disc ? `<div class="line" style="color:var(--ok)"><span>Descuento ${q.disc.pct} % (${discLabel(q.disc)})</span><span>– ${money(q.desc)}</span></div>` : ''}
    <div class="line"><span>Cargo de servicio y seguro (3 %)</span><span>${money(q.cargo)}</span></div>
    <div class="line total"><span>Total sin transporte</span><span>${money(q.alquiler + q.cargo)}</span></div>
  </div>
  <p class="xs muted">Dirección exacta visible al confirmar la reserva.</p>
  <div class="sticky stack"><button class="btn" data-act="reservar">Reservar</button><button class="btn sec2" data-act="consultar"><i class="ti ti-message-circle"></i>Consultar a ${sp.anf}</button></div>`;
});

reg('C-06', 'cliente', 'Logística', () => {
  const v = volumen();
  return `${topbar('¿Cómo llegan tus cosas?')}
  <div class="stack">
    <button class="radio" aria-pressed="${S.logistica === 'propia'}" data-act="log" data-arg="propia"><i class="ti ti-walk"></i><div><div class="b">Las llevo yo</div><div class="small muted">Coordinás el horario con el anfitrión dentro de su franja de check-in.</div></div></button>
    <button class="radio" aria-pressed="${S.logistica === 'transporte'}" data-act="log" data-arg="transporte"><i class="ti ti-truck"></i><div><div class="b">Contratar transporte</div><div class="small muted">Te mostramos los operadores disponibles vía Zipnova, con seguro incluido.</div></div></button>
  </div>
  ${S.logistica === 'transporte' ? `
    <div class="sec">Operadores para ${num(v)} m³</div>
    <div class="stack">${OPERADORES.filter((o) => o.max >= v).map((o) => `<button class="radio" aria-pressed="${S.operador === o.id}" data-act="op" data-arg="${o.id}"><i class="ti ti-truck-delivery"></i><div style="flex:1"><div class="row between"><span class="b">${o.n}</span><span class="b">${money(o.flete + S.valor * 0.015)}</span></div><div class="xs muted">${o.d} · flete ${money(o.flete)} + seguro ${money(S.valor * 0.015)}</div></div></button>`).join('')}</div>
    <div class="grid2" style="margin-top:12px"><label class="f">Fecha de retiro en tu casa<input class="inp" type="date" data-bind="envioFecha" value="${S.envioFecha}"></label>
    <label class="f">Franja<select class="inp" data-bind="envioHora">${['9 a 11 h', '10 a 12 h', '14 a 16 h', '16 a 18 h'].map((h) => `<option ${h === S.envioHora ? 'selected' : ''}>${h}</option>`).join('')}</select></label></div>
    <div class="note info" style="margin-top:10px"><i class="ti ti-info-circle"></i><span>El anfitrión confirma que puede recibir en esa fecha. Si no puede, elegís otra y el envío se reprograma.</span></div>`
  : `<div class="sec">¿Cuándo las llevás?</div><div class="grid2"><label class="f">Fecha<input class="inp" type="date" data-bind="envioFecha" value="${S.envioFecha}"></label><label class="f">Franja<select class="inp" data-bind="envioHora">${['9 a 11 h', '10 a 12 h', '14 a 16 h', '16 a 18 h'].map((h) => `<option ${h === S.envioHora ? 'selected' : ''}>${h}</option>`).join('')}</select></label></div>
    <p class="xs muted">Check-in de este espacio: ${space().hin}.</p>`}
  <div class="sticky"><button class="btn" ${S.logistica === 'transporte' && !S.operador ? 'aria-disabled="true" data-act="needop"' : 'data-go="C-07"'}>Continuar al pago</button></div>`;
});

reg('C-07', 'cliente', 'Checkout', () => {
  const sp = space(), q = quote(sp);
  return `${topbar('Revisá y pagá')}
  <div class="card small"><div class="b">${sp.name}</div><div class="muted">${S.sinFecha ? `Desde ${fecha(S.desde)} · sin fecha de retiro (cada 30 días)` : `${fecha(S.desde)} al ${fecha(S.hasta)} · ${days()} días`}</div></div>
  <div class="sec">Detalle</div>
  <div class="card">
    ${q.items.map((i) => `<div class="line"><span>${i.n}<br><span class="xs muted">${i.c}</span></span><span>${money(i.v)}</span></div>`).join('')}
    ${q.disc ? `<div class="line" style="color:var(--ok)"><span>Descuento ${q.disc.pct} %<br><span class="xs">${discLabel(q.disc)}</span></span><span>– ${money(q.desc)}</span></div>` : ''}
    ${q.nr ? `<div class="line" style="color:var(--ok)"><span>Tarifa no reembolsable (10 %)</span><span>– ${money(q.nr)}</span></div>` : ''}
    ${q.envio ? `<div class="line"><span>Transporte: flete</span><span>${money(q.flete)}</span></div><div class="line"><span>Transporte: seguro 1,5 %<br><span class="xs muted">sobre ${money(S.valor)} declarados</span></span><span>${money(q.seguro)}</span></div>` : ''}
    <div class="line"><span>Cargo de servicio y seguro del guardado<br><span class="xs muted">3 % sobre alquiler${q.envio ? ' + envío' : ''}</span></span><span>${money(q.cargo)}</span></div>
    ${q.kits ? `<div class="line"><span>Kits de cajas</span><span>${money(q.kits)}</span></div>` : ''}
    <div class="line total"><span>Total</span><span>${money(q.total)}</span></div>
  </div>
  <div class="sec">¿Necesitás cajas?</div>
  <div class="card" style="padding:4px 14px">${['S', 'M', 'L'].map((k) => `<div class="boxrow"><div style="display:grid;place-items:center">${boxSVG(k)}</div><div><div class="b">Caja ${k}</div><div class="xs muted">${money(KIT[k])} c/u</div></div>${stepper('kit' + k, S.kits[k], 'kit ' + k)}</div>`).join('')}</div>
  ${sp.noReemb ? `<div class="sec">Tarifa</div><div class="stack">
    <button class="radio" aria-pressed="${!S.noReemb}" data-act="nr" data-arg="0"><i class="ti ti-arrow-back-up"></i><div><div class="b">Con reembolso</div><div class="small muted">Política ${sp.corta.toLowerCase()} para estadías cortas y ${sp.larga.toLowerCase()} de larga duración.</div></div></button>
    <button class="radio" aria-pressed="${S.noReemb}" data-act="nr" data-arg="1"><i class="ti ti-discount"></i><div><div class="b">No reembolsable: 10 % menos</div><div class="small muted">Si cancelás, no se devuelve el alquiler.</div></div></button></div>` : ''}
  <div class="sec">Comprobante</div>
  <div class="choices">${opt(S.comprobante === 'B', 'comp', 'B', 'Factura B')}${opt(S.comprobante === 'A', 'comp', 'A', 'Factura A')}</div>
  <p class="xs muted">El alquiler te lo factura el anfitrión; el cargo de servicio, ${APP_NAME}.</p>
  <div class="note info"><i class="ti ti-shield-lock"></i><span>Tu pago queda retenido y el anfitrión lo cobra cuando retirás tus cosas (o cada 30 días en estadías largas). ${S.noReemb ? 'Elegiste la tarifa no reembolsable.' : `Cancelación ${sp.corta.toLowerCase()}; además tenés 24 h para cancelar sin costo si reservás con 7 días de anticipación.`}</span></div>
  <div class="sticky"><button class="btn" data-act="pagar"><i class="ti ti-credit-card"></i>Pagar ${money(q.total)} con MercadoPago</button></div>`;
});

reg('C-08', 'cliente', 'Solicitud pendiente', () => `${topbar('Solicitud enviada', false)}
  <div style="text-align:center;margin:24px 0"><i class="ti ti-hourglass-high" style="font-size:54px;color:var(--warn)"></i></div>
  <h2 class="big" style="text-align:center;font-size:28px">${space().anf} tiene 23 h 58 min para responder</h2>
  <p class="lead" style="text-align:center">Mientras tanto el espacio queda reservado para vos. Si no responde a tiempo, la solicitud se cae y te devolvemos el pago completo.</p>
  <div class="card small stack"><div class="line"><span>Pago retenido</span><span class="b">${money(quote().total)}</span></div><div class="line"><span>Vence</span><span>mañana, 20:00</span></div></div>
  <div class="sticky stack"><button class="btn" data-act="aprobar">Simular aprobación</button><button class="btn sec2" data-go="C-10">Ir a mis reservas</button></div>`);

reg('C-09', 'cliente', 'Reserva confirmada', () => {
  const sp = space();
  return `${topbar('Reserva confirmada', false)}
  <p class="lead" style="margin-top:-6px">Mostrá este código al entregar tus cosas${S.logistica === 'transporte' ? ' (el operador lo lleva en la orden de envío)' : ''}.</p>
  ${qr(sp.id + 11)}
  <p style="text-align:center;font-weight:700;letter-spacing:.1em;margin:8px 0 16px">GRD-${2400 + sp.id}-K7</p>
  <div class="card stack small">
    <div class="row"><i class="ti ti-map-pin"></i><span><b>Dirección:</b> Av. Córdoba 4500, 3.º piso, baulera 12</span></div>
    <div class="row"><i class="ti ti-calendar-event"></i><span><b>Ingreso:</b> ${fecha(S.envioFecha)}, ${S.envioHora} <span class="chip ok">Confirmado por ${sp.anf}</span></span></div>
    <div class="row"><i class="ti ti-${S.logistica === 'transporte' ? 'truck' : 'walk'}"></i><span>${S.logistica === 'transporte' ? `${OPERADORES.find((o) => o.id === S.operador).n} retira en tu casa` : 'Lo llevás vos'}</span></div>
    <div class="row"><i class="ti ti-door-enter"></i><span>${sp.recep}</span></div>
  </div>
  <div class="sticky stack"><button class="btn" data-go="C-10">Ver mis reservas</button></div>`;
});

reg('C-10', 'cliente', 'Mis reservas', () => {
  const sp = space(), r = S.reserva;
  if (!r) return `${topbar('Mis reservas', false)}<div class="card" style="text-align:center;padding:28px"><i class="ti ti-package" style="font-size:36px;color:var(--kraft)"></i><p class="b">Todavía no reservaste</p><p class="small muted">Armá tu lista y encontrá dónde guardar tus cosas.</p><button class="btn" data-go="C-02">Armar mi lista</button></div>`;
  const st = { pendiente: ['Esperando aprobación', 'warn'], confirmada: ['Confirmada', 'ok'], guardado: ['Guardando', 'tape'], cerrada: ['Finalizada', ''] }[r];
  const steps = [['Reserva pagada', true], ['Anfitrión confirma', r !== 'pendiente'], [S.logistica === 'transporte' ? 'Retiro en tu casa' : 'Llevás tus cosas', r === 'guardado' || r === 'cerrada'], ['Check-in con fotos', r === 'guardado' || r === 'cerrada'], ['Check-out y calificación', r === 'cerrada']];
  const now = steps.findIndex((s) => !s[1]);
  return `${topbar('Mis reservas', false)}
  <div class="card">
    <div class="row between"><span class="b">${sp.name}</span><span class="chip ${st[1]}">${st[0]}</span></div>
    <p class="small muted" style="margin:4px 0 12px">${cajas()} cajas${objs().length ? ' y ' + objs().map((k) => OBJ[k].n.toLowerCase()).join(', ') : ''} · ${S.sinFecha ? 'sin fecha de retiro' : `hasta el ${fecha(S.hasta)}`}</p>
    <ol class="timeline small">${steps.map(([t, d], i) => `<li><span class="dot ${d ? 'done' : i === now ? 'now' : ''}">${d ? '<i class="ti ti-check"></i>' : ''}</span><span ${i === now ? 'class="b"' : ''}>${t}</span></li>`).join('')}</ol>
  </div>
  <div class="grid2" style="margin-top:12px">
    <button class="btn sec2" data-go="C-10c"><i class="ti ti-message-circle"></i>Chat</button>
    <button class="btn sec2" data-act="${r === 'confirmada' ? 'gocheckin' : 'nocheck'}"><i class="ti ti-login-2"></i>Check-in</button>
    <button class="btn sec2" data-act="extender"><i class="ti ti-calendar-plus"></i>Extender</button>
    <button class="btn danger" data-act="cancelar"><i class="ti ti-x"></i>Cancelar</button>
  </div>
  ${r === 'guardado' ? '<div class="sticky"><button class="btn" data-go="C-12">Retirar mis cosas</button></div>' : ''}`;
});

function chatScreen(title, back) {
  const warned = S.chat.some((m) => m.me && m.warn);
  return `${topbar(title, back)}
  <div class="note"><i class="ti ti-alert-triangle"></i><span>Por tu seguridad, ocultamos teléfonos, mails, CBU, alias y enlaces. Los acuerdos fuera de ${APP_NAME} no tienen seguro ni pago protegido.</span></div>
  <div class="stack" style="margin:14px 0">${S.chat.map((m) => `<div class="bubble ${m.me ? 'me' : 'them'}">${maskText(m.t)}</div>`).join('')}
  ${warned ? '<p class="xs" style="color:var(--bad);text-align:center">Advertencia: compartir datos de contacto puede suspender tu cuenta.</p>' : ''}</div>
  <div class="sticky row"><input class="inp" data-bind="chatIn" placeholder="Escribí un mensaje" value="${esc(S.chatIn)}" aria-label="Mensaje"><button class="back" style="width:44px;height:44px;background:var(--tape);color:#fff;border:0" data-act="send" aria-label="Enviar"><i class="ti ti-send"></i></button></div>
  <p class="xs muted">Probá escribir un teléfono o un mail para ver cómo se ocultan.</p>`;
}
reg('C-10c', 'cliente', 'Chat con el anfitrión', () => chatScreen(`Chat con ${space().anf}`, true));

reg('C-11', 'cliente', 'Check-in', () => `${topbar('Check-in')}
  <p class="lead">${space().anf} escaneó tu código y registró cómo llegaron tus cosas.</p>
  <div class="photos">${[1, 2, 3, 4, 5, 6].map(() => '<div class="photo full"><i class="ti ti-photo"></i></div>').join('')}</div>
  <div class="card stack small" style="margin-top:12px">
    <div class="line"><span>Ingreso</span><span>${fecha(S.envioFecha)}, 10:42</span></div>
    <div class="line"><span>Talles de cajas</span><span class="chip ok">Correctos</span></div>
    <div class="line"><span>Estado</span><span>Sin daños</span></div>
  </div>
  <div class="note info" style="margin-top:12px"><i class="ti ti-shield-check"></i><span>Si algo se dañó en el traslado, reclamalo desde acá dentro de las 48 h: lo cubre el seguro del envío.</span></div>
  <div class="sticky stack"><button class="btn" data-go="C-10">Listo</button><button class="btn sec2" data-act="reclamo">Informar un daño</button></div>`);

reg('C-12', 'cliente', 'Check-out y calificación', () => `${topbar('Retirar y calificar')}
  <div class="card stack small"><div class="b">¿Cómo retirás?</div>
    <div class="choices">${opt(S.logistica === 'propia', 'log', 'propia', 'Lo retiro yo')}${opt(S.logistica === 'transporte', 'log', 'transporte', 'Contratar transporte')}</div>
    ${S.logistica === 'transporte' ? `<div class="stack">${OPERADORES.filter((o) => o.max >= volumen()).map((o) => `<button class="radio" aria-pressed="${S.retiroOp === o.id}" data-act="rop" data-arg="${o.id}"><i class="ti ti-truck-delivery"></i><div style="flex:1"><div class="row between"><span class="b">${o.n}</span><span class="b">${money(o.flete + S.valor * 0.015)}</span></div><div class="xs muted">Flete ${money(o.flete)} + seguro ${money(S.valor * 0.015)} · lo lleva a tu casa</div></div></button>`).join('')}</div>` : ''}
    <div class="grid2"><label class="f">Fecha<input class="inp" type="date" value="${S.hasta}"></label><label class="f">Franja<select class="inp"><option>10 a 12 h</option><option>14 a 16 h</option></select></label></div>
    <p class="xs muted" style="margin:0">Check-out de este espacio: ${space().hout}. ${space().anf} confirma la fecha.</p></div>
  <div class="sec">¿Cómo te fue con ${space().anf}?</div>
  <div class="rate" role="radiogroup" aria-label="Calificación">${[1, 2, 3, 4, 5].map((n) => `<button class="${n <= S.rating ? 'on' : ''}" data-act="rate" data-arg="${n}" aria-label="${n} estrellas"><i class="ti ti-star"></i></button>`).join('')}</div>
  <label class="f" style="margin-top:8px">Comentario<textarea class="inp" rows="3" placeholder="La baulera estaba impecable y Laura muy atenta."></textarea></label>
  <p class="xs muted">Tu reseña y la de ${space().anf} se publican juntas, cuando ambos califican o a los 14 días.</p>
  <div class="sticky stack"><button class="btn" data-act="cerrar">Confirmar retiro y enviar reseña</button><button class="btn sec2" data-act="danoGuardado"><i class="ti ti-alert-triangle"></i>Informar un daño en el guardado</button></div>`);

/* ---------- anfitrión ---------- */
const hcap = () => { const h = S.host; const v = (+h.alto || 0) * (+h.ancho || 0) * (+h.prof || 0); return { v, L: Math.floor(v / BOX.L.vol), M: Math.floor(v / BOX.M.vol), S: Math.floor(v / BOX.S.vol) }; };
const wizard = (n) => `<div class="row" style="gap:4px;margin:-6px 0 14px">${[1, 2, 3, 4, 5].map((i) => `<span style="flex:1;height:4px;border-radius:9px;background:${i <= n ? 'var(--tape)' : 'var(--line)'}"></span>`).join('')}</div><p class="xs muted" style="margin:-8px 0 12px">Paso ${n} de 5</p>`;

reg('A-01', 'anfitrion', 'Paso 1: dirección y tipo', () => `${topbar('Publicá tu espacio')}${wizard(1)}
  <div class="sec" style="margin-top:0">¿Qué tipo de espacio es?</div>
  <div class="grid2">${[['Baulera', 'ti-box'], ['Cochera', 'ti-car-garage'], ['Placard', 'ti-door'], ['Habitación', 'ti-bed']].map(([t, i]) => `<button class="radio" aria-pressed="${S.host.tipo === t}" data-act="htipo" data-arg="${t}"><i class="ti ${i}"></i><span class="b">${t}</span></button>`).join('')}</div>
  <label class="f" style="margin-top:14px">Dirección exacta<input class="inp" data-bind="host.dir" value="${esc(S.host.dir)}"></label>
  <div class="note info" style="margin-top:8px"><i class="ti ti-eye-off"></i><span>Solo mostramos el barrio. La dirección se comparte cuando confirmás una reserva.</span></div>
  <div class="sticky"><button class="btn" data-go="A-02">Siguiente</button></div>`);

reg('A-02', 'anfitrion', 'Paso 2: medidas netas y fotos', () => {
  const c = hcap();
  return `${topbar('Medidas y fotos')}${wizard(2)}
  <div class="note"><i class="ti ti-ruler-measure"></i><span><b>Medí solo el espacio que vas a alquilar.</b> Descontá estantes, cosas tuyas que se quedan y el paso para circular. Con esto calculamos cuántas cajas entran.</span></div>
  <div class="grid3" style="margin-top:12px">
    <label class="f">Alto (m)<input class="inp" inputmode="decimal" data-bind="host.alto" data-type="num" value="${S.host.alto}"></label>
    <label class="f">Ancho (m)<input class="inp" inputmode="decimal" data-bind="host.ancho" data-type="num" value="${S.host.ancho}"></label>
    <label class="f">Profundidad (m)<input class="inp" inputmode="decimal" data-bind="host.prof" data-type="num" value="${S.host.prof}"></label>
  </div>
  <div class="card" style="margin-top:12px" data-live="cap">${capCard(c)}</div>
  <div class="sec">Fotos</div>
  <div class="photos">${[0, 1, 2, 3, 4, 5].map((i) => `<button class="photo ${i < S.host.fotos ? 'full' : ''}" data-act="foto" aria-label="Agregar foto"><i class="ti ${i < S.host.fotos ? 'ti-photo' : 'ti-camera-plus'}"></i></button>`).join('')}</div>
  <p class="xs muted">Subí al menos 3: el espacio vacío, la puerta y el acceso.</p>
  <div class="sticky"><button class="btn" data-go="A-03">Siguiente</button></div>`;
});
function capCard(c) { return `<div class="row between"><span class="small muted">Tu espacio ofrece</span><span class="b">${num(c.v)} m³</span></div><div class="row" style="gap:14px;margin-top:8px;align-items:flex-end">${boxSVG('L')}<span><span class="b" style="font-family:var(--display);font-size:24px">${c.L}</span> cajas L</span></div><p class="xs muted" style="margin:6px 0 0">O ${c.M} cajas M, o ${c.S} cajas S. A los clientes les mostramos cajas, nunca m³.</p>`; }

reg('A-03', 'anfitrion', 'Paso 3: horarios, estadía y recepción', () => {
  const h = S.host;
  return `${topbar('Horarios y estadía')}${wizard(3)}
  <div class="sec" style="margin-top:0">Días en que recibís y entregás</div>
  <div class="choices">${['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => opt(h.dias.includes(d), 'dia', d, d)).join('')}</div>
  <div class="grid2" style="margin-top:12px"><label class="f">Franja de check-in<input class="inp" data-bind="host.hin" value="${h.hin}"></label><label class="f">Franja de check-out<input class="inp" data-bind="host.hout" value="${h.hout}"></label></div>
  <p class="xs muted">Todo ingreso o retiro, con o sin transporte, se coordina dentro de estas franjas.</p>
  <div class="sec">Estadía</div>
  <div class="grid2"><label class="f">Mínimo (días)<input class="inp" inputmode="numeric" data-bind="host.min" data-type="num" value="${h.min}"></label><label class="f">Máximo (días)<input class="inp" inputmode="numeric" data-bind="host.max" placeholder="Sin máximo" value="${h.max}"></label></div>
  <p class="xs muted">Sin máximo, los clientes pueden elegir “sin fecha de retiro”.</p>
  <div class="sec">¿Dónde se dejan las cosas?</div>
  <div class="stack">
    <button class="radio" aria-pressed="${h.recep === 'puerta'}" data-act="recep" data-arg="puerta"><i class="ti ti-door"></i><div><div class="b">En la puerta del inmueble</div><div class="small muted">Vos las entrás después.</div></div></button>
    <button class="radio" aria-pressed="${h.recep === 'dentro'}" data-act="recep" data-arg="dentro"><i class="ti ti-box"></i><div><div class="b">Dentro del espacio</div><div class="small muted">Acompañás a quien las trae hasta la baulera.</div></div></button>
  </div>
  <div class="sticky"><button class="btn" data-go="A-04">Siguiente</button></div>`;
});

reg('A-04', 'anfitrion', 'Paso 4: precios y descuentos', () => {
  const h = S.host;
  const row = (k, n) => { const [mn, av, mx] = ZONA[k]; const lo = mn * 0.7, hi = mx * 1.2, pos = (p) => Math.max(0, Math.min(100, (p - lo) / (hi - lo) * 100)); return `<div style="padding:10px 0;border-bottom:1px dashed var(--line)"><div class="row between"><span class="row" style="gap:8px">${k.length === 1 ? boxSVG(k, 0.8) : `<i class="ti ${OBJ[k].icon}" style="font-size:20px;color:var(--kraft-d)"></i>`}<span class="b">${n}</span></span><span class="row" style="gap:6px"><span class="small muted">$</span><input class="inp" style="width:84px;padding:6px 8px" inputmode="numeric" data-bind="host.prices.${k}" data-type="num" value="${h.prices[k]}" aria-label="Precio por día ${n}"><span class="xs muted">/día</span></span></div><div class="range"><span class="zone" style="left:${pos(mn)}%;right:${100 - pos(mx)}%"></span><span class="avg" style="left:${pos(av)}%"></span><span class="you" style="left:${pos(h.prices[k])}%"></span></div><div class="xs muted">En tu zona: mínimo ${money(mn)} · promedio ${money(av)} · máximo ${money(mx)}</div></div>`; };
  const warn = h.prices.L < h.prices.M || h.prices.M < h.prices.S;
  return `${topbar('Precios')}${wizard(4)}
  <p class="small muted" style="margin-top:0">Precio por día. Te mostramos lo que cobran otros espacios de Palermo.</p>
  ${warn ? '<div class="note" style="margin-bottom:8px"><i class="ti ti-alert-triangle"></i><span>Una caja más grande está más barata que una más chica. Revisá tus precios.</span></div>' : ''}
  <div class="card" style="padding:0 14px">${row('S', 'Caja S')}${row('M', 'Caja M')}${row('L', 'Caja L')}</div>
  <div class="sec">Espacios cercanos</div>
  <div class="card small">${SPACES.slice(1, 4).map((o) => `<div class="line"><span>${o.name}</span><span class="muted">S ${money(o.prices.S)} · M ${money(o.prices.M)} · L ${money(o.prices.L)}</span></div>`).join('')}</div>
  <div class="sec">Objetos que no van en caja</div>
  <div class="card" style="padding:0 14px">${Object.keys(OBJ).filter((k) => h.acepta[k]).map((k) => row(k, OBJ[k].n)).join('')}</div>
  <div class="sec">Descuentos</div>
  <div class="stack">${h.disc.map((d, i) => `<div class="card"><div class="row between"><div class="choices">${opt(d.t === 'dias', 'dtipo', i + ':dias', 'Por días')}${opt(d.t === 'cajas', 'dtipo', i + ':cajas', 'Por cajas')}${opt(d.t === 'combo', 'dtipo', i + ':combo', 'Ambos')}</div><button class="back" data-act="ddel" data-arg="${i}" aria-label="Quitar descuento"><i class="ti ti-trash"></i></button></div>
    <div class="grid3" style="margin-top:10px">${d.t !== 'cajas' ? `<label class="f">Desde (días)<input class="inp" inputmode="numeric" data-bind="host.disc.${i}.dias" data-type="num" value="${d.dias}"></label>` : ''}${d.t !== 'dias' ? `<label class="f">Desde (cajas)<input class="inp" inputmode="numeric" data-bind="host.disc.${i}.cajas" data-type="num" value="${d.cajas}"></label>` : ''}<label class="f">Descuento %<input class="inp" inputmode="numeric" data-bind="host.disc.${i}.pct" data-type="num" value="${d.pct}"></label></div></div>`).join('')}
  <button class="btn sec2" data-act="dadd"><i class="ti ti-plus"></i>Agregar descuento</button></div>
  <p class="xs muted">Si un pedido califica para más de uno, se aplica el mayor.</p>
  <div class="sticky"><button class="btn" data-go="A-05">Siguiente</button></div>`;
});

reg('A-05', 'anfitrion', 'Paso 5: reserva, cancelación y reglas', () => {
  const h = S.host;
  const pol = { Flexible: 'Reembolso total hasta 24 h antes del ingreso', Moderada: 'Reembolso total hasta 5 días antes', Limitada: 'Reembolso total hasta 14 días antes', Firme: 'Reembolso total hasta 30 días antes', Estricta: 'Reembolso total solo dentro de las 48 h de reservar (con 14 días de anticipación)' };
  return `${topbar('Reglas de tu espacio')}${wizard(5)}
  <div class="sec" style="margin-top:0">¿Cómo se reserva?</div>
  <div class="stack">
    <button class="radio" aria-pressed="${h.modo === 'inmediata'}" data-act="modo" data-arg="inmediata"><i class="ti ti-bolt"></i><div><div class="b">Reserva inmediata</div><div class="small muted">Se confirma cuando el cliente paga. Aparecés antes en las búsquedas.</div></div></button>
    <button class="radio" aria-pressed="${h.modo === 'aprobacion'}" data-act="modo" data-arg="aprobacion"><i class="ti ti-user-check"></i><div><div class="b">Con mi aprobación</div><div class="small muted">Tenés 24 h para aceptar. Mientras, el espacio queda bloqueado.</div></div></button>
  </div>
  <div class="sec">Cancelación: estadías de menos de 28 días</div>
  <div class="choices">${Object.keys(pol).map((p) => opt(h.corta === p, 'corta', p, p)).join('')}</div>
  <p class="small muted" style="margin:6px 0 0">${pol[h.corta]}.</p>
  <div class="sec">Cancelación: 28 días o más</div>
  <div class="choices">${opt(h.larga === 'Firme', 'larga', 'Firme', 'Firme')}${opt(h.larga === 'Estricta', 'larga', 'Estricta', 'Estricta')}</div>
  <p class="small muted" style="margin:6px 0 0">${h.larga === 'Firme' ? 'Reembolso total hasta 30 días antes; después, el cliente paga los primeros 30 días.' : 'Reembolso total solo dentro de las 48 h de reservar y con 28 días de anticipación.'}</p>
  <div class="card row between" style="margin-top:12px"><div><div class="b">Ofrecer tarifa no reembolsable</div><div class="xs muted">10 % de descuento adicional, sin reembolso si el cliente cancela.</div></div>${toggle(h.noReemb, 'hnr', 'Tarifa no reembolsable')}</div>
  <div class="sec">¿Qué objetos aceptás?</div>
  <div class="card stack">${Object.keys(OBJ).map((k) => `<div class="row between"><span class="row" style="gap:8px"><i class="ti ${OBJ[k].icon}"></i>${OBJ[k].n}</span>${toggle(h.acepta[k], 'acepta" data-arg="' + k, OBJ[k].n)}</div>`).join('')}</div>
  <div class="sec">No se permite</div>
  <div class="choices">${['Perecederos', 'Inflamables', 'Animales', 'Objetos de valor', 'Líquidos'].map((p) => opt(h.prohibidos.includes(p), 'prohib', p, p)).join('')}</div>
  <div class="sticky"><button class="btn" data-go="A-06">Ver cómo queda</button></div>`;
});

reg('A-06', 'anfitrion', 'Vista previa y publicación', () => {
  const h = S.host, c = hcap();
  return `${topbar('Así te ven los clientes')}
  <div class="thumb hero"><i class="ti ti-photo" style="font-size:34px"></i></div>
  <div class="b" style="font-family:var(--display);font-size:20px">${h.tipo} en Palermo</div>
  <div class="choices" style="margin:8px 0 12px">${h.modo === 'inmediata' ? '<span class="chip ok"><i class="ti ti-bolt"></i>Reserva inmediata</span>' : '<span class="chip">Con aprobación</span>'}<span class="chip">Cancelación ${h.corta.toLowerCase()}</span><span class="chip">Hasta ${c.L} cajas L</span></div>
  <div class="card stack small">
    <div class="line"><span>Check-in</span><span>${h.dias.join(', ')} · ${h.hin}</span></div>
    <div class="line"><span>Estadía</span><span>mín. ${h.min} días${h.max ? `, máx. ${h.max}` : ''}</span></div>
    <div class="line"><span>Recepción</span><span>${h.recep === 'puerta' ? 'En la puerta' : 'Dentro del espacio'}</span></div>
    <div class="line"><span>Caja S / M / L por día</span><span>${money(h.prices.S)} / ${money(h.prices.M)} / ${money(h.prices.L)}</span></div>
    <div class="line"><span>Descuentos</span><span>${h.disc.length ? h.disc.map((d) => `${d.pct} %`).join(', ') : 'Ninguno'}</span></div>
  </div>
  <div class="note info" style="margin-top:12px"><i class="ti ti-receipt"></i><span>Cobrás el alquiler menos el 12 % de comisión, en tu CBU, al check-out (o cada 30 días en estadías largas). El alquiler se lo facturás vos al cliente.</span></div>
  <div class="sticky"><button class="btn" data-act="publicar">Publicar</button></div>`;
});

reg('A-07', 'anfitrion', 'Dashboard', () => {
  const c = hcap(), ocup = 1.22 + 2.1, pct = Math.round(ocup / c.v * 100);
  return `${topbar('Tu espacio', false)}
  <div class="card"><div class="row between"><span class="b">${S.host.tipo} en Palermo</span><span class="chip ${S.host.published ? 'ok' : 'warn'}">${S.host.published ? 'Publicado' : 'Borrador'}</span></div>
    <div class="row between small" style="margin:10px 0 6px"><span class="muted">Ocupación esta semana</span><span class="b">${pct} %</span></div>
    <div class="meter"><span style="width:${pct}%"></span></div>
    <p class="xs muted" style="margin:6px 0 0">Te quedan lugar para ${Math.floor((c.v - ocup) / BOX.L.vol)} cajas L.</p></div>
  <div class="grid2" style="margin-top:10px"><div class="kpi"><span class="xs muted">Por cobrar</span><strong>${money(101376)}</strong></div><div class="kpi"><span class="xs muted">Calificación</span><strong>4,9 <i class="ti ti-star stars" style="font-size:18px"></i></strong></div></div>
  <div class="sec">Para hacer hoy</div>
  <div class="stack">
    <button class="space" data-go="A-09" style="grid-template-columns:40px 1fr"><i class="ti ti-user-question" style="font-size:26px;color:var(--warn)"></i><div><div class="b">Solicitud de Federico</div><div class="xs muted">4 cajas M, 2 L y una bici · vence en 23 h</div></div></button>
    <button class="space" data-go="A-10" style="grid-template-columns:40px 1fr"><i class="ti ti-truck" style="font-size:26px;color:var(--tape)"></i><div><div class="b">Ingreso con transporte</div><div class="xs muted">20 nov, 10 a 12 h · Utilitario chico</div></div></button>
    <button class="space" data-go="A-08" style="grid-template-columns:40px 1fr"><i class="ti ti-message-circle" style="font-size:26px;color:var(--kraft-d)"></i><div><div class="b">2 consultas sin responder</div><div class="xs muted">Responder rápido mejora tu posición</div></div></button>
  </div>
  <div class="sec">Publicación</div>
  <div class="grid2"><button class="btn sec2" data-go="A-04"><i class="ti ti-currency-dollar"></i>Precios</button><button class="btn sec2" data-act="pausar"><i class="ti ti-player-pause"></i>Pausar</button></div>`;
});

reg('A-08', 'anfitrion', 'Mensajes', () => {
  const item = (n, sub, tag, cls) => `<button class="space" data-act="conv" data-arg="${n}" style="grid-template-columns:44px 1fr"><span style="width:44px;height:44px;border-radius:50%;background:var(--kraft-2);display:grid;place-items:center;font-weight:700;color:var(--kraft-d)">${n[0]}</span><div><div class="row between"><span class="b">${n}</span><span class="chip ${cls}">${tag}</span></div><div class="xs muted">${sub}</div></div></button>`;
  return `${topbar('Mensajes', false)}
  <div class="sec" style="margin-top:0">Consultas de interesados</div>
  <div class="stack">${item('Paula', '¿Aceptan una tabla de surf?', 'Sin responder', 'warn')}${item('Tomás', '¿Hay lugar desde el 1 de diciembre?', 'Sin responder', 'warn')}</div>
  <div class="sec">Tus clientes</div>
  <div class="stack">${item('Federico', 'Hola Laura, ¿la baulera tiene luz?', 'Reserva activa', 'ok')}${item('Camila', 'Paso el sábado a buscar una caja.', 'Reserva activa', 'ok')}</div>
  <p class="xs muted">Responder rápido mejora tu posición en las búsquedas.</p>`;
});
reg('A-08c', 'anfitrion', 'Chat con un cliente', () => chatScreen(`Chat con ${S.conv}`, true));

reg('A-09', 'anfitrion', 'Solicitudes y envíos', () => {
  const h = S.host;
  return `${topbar('Solicitud de Federico')}
  <div class="card row" style="gap:12px"><span style="width:44px;height:44px;border-radius:50%;background:var(--kraft-2);display:grid;place-items:center;font-weight:700;color:var(--kraft-d)">FP</span><div><div class="b">Federico P. <i class="ti ti-rosette-discount-check" style="color:var(--tape)"></i></div><div class="xs muted">Identidad verificada · 3 reservas · 5,0</div></div></div>
  <div class="sec">Quiere guardar</div>
  <div class="pile">${boxSVG('L')}${boxSVG('L')}${boxSVG('M')}${boxSVG('M')}${boxSVG('M')}${boxSVG('M')}${objIcon('bici')}</div>
  <div class="card stack small" style="margin-top:10px">
    <div class="line"><span>Fechas</span><span>20 nov al 20 dic · 30 días</span></div>
    <div class="line"><span>Espacio que ocupa</span><span>como 8 cajas L</span></div>
    <div class="line"><span>Cobrás (neto)</span><span class="b">${money(101376)}</span></div>
  </div>
  ${h.solicitud === 'pendiente' ? `<div class="note" style="margin-top:12px"><i class="ti ti-clock"></i><span>Tenés 23 h para responder. Mientras, este espacio queda reservado para Federico.</span></div>
  <div class="sticky grid2"><button class="btn danger" data-act="rechazar">Rechazar</button><button class="btn" data-act="aceptar">Aceptar</button></div>`
  : `<div class="sec">Envío de ingreso</div>
  <div class="card small"><div class="row between"><span class="b">Utilitario chico vía Zipnova</span>${h.envioOk ? '<span class="chip ok">Confirmado</span>' : '<span class="chip warn">A confirmar</span>'}</div><p class="muted" style="margin:4px 0 0">20 nov · 10 a 12 h · recepción dentro del espacio</p></div>
  <div class="sticky stack">${h.envioOk ? '<button class="btn" data-go="A-10">Ir al check-in</button>' : '<button class="btn" data-act="okEnvio">Puedo recibir ese día</button><button class="btn sec2" data-act="otraFecha">Proponer otra fecha</button>'}<button class="btn danger" data-act="hcancel">Cancelar esta reserva</button></div>`}`;
});

reg('A-10', 'anfitrion', 'Check-in y check-out', () => {
  const k = S.host.checkin, o = S.host.checkout, etapa = S.host.etapa;
  const sw = `<div class="choices" style="margin:-4px 0 12px">${opt(etapa === 'in', 'etapa', 'in', 'Check-in')}${opt(etapa === 'out', 'etapa', 'out', 'Check-out')}</div>`;
  const qrStep = (st, act) => `<li><span class="dot ${st.qr ? 'done' : 'now'}">${st.qr ? '<i class="ti ti-check"></i>' : ''}</span><div style="flex:1"><div class="b">Escaneá el QR</div>${st.qr ? '<div class="xs muted">GRD-2401-K7 · reserva válida</div>' : `<button class="btn sec2" style="margin-top:8px" data-act="${act}"><i class="ti ti-scan"></i>Abrir cámara</button>`}</div></li>`;
  const fotoStep = (st, act, t) => `<li><span class="dot ${st.fotos >= 3 ? 'done' : st.qr ? 'now' : ''}">${st.fotos >= 3 ? '<i class="ti ti-check"></i>' : ''}</span><div style="flex:1"><div class="b">${t}</div><div class="photos" style="margin-top:8px">${[0, 1, 2].map((i) => `<button class="photo ${i < st.fotos ? 'full' : ''}" data-act="${act}" aria-label="Foto"><i class="ti ${i < st.fotos ? 'ti-photo' : 'ti-camera-plus'}"></i></button>`).join('')}</div></div></li>`;
  if (etapa === 'out') return `${topbar('Check-out de Federico')}${sw}
  <ol class="timeline small" style="margin-top:4px">${qrStep(o, 'oscan')}${fotoStep(o, 'ofoto', 'Sacá fotos de lo que se retira')}</ol>
  <div class="note info"><i class="ti ti-wallet"></i><span>Al confirmar el retiro liberamos tu cobro y se libera el espacio para nuevas reservas.</span></div>
  <div class="sticky"><button class="btn" ${o.qr && o.fotos >= 3 ? 'data-act="finCheckout"' : 'aria-disabled="true" data-act="faltan"'}>Confirmar retiro</button></div>`;
  return `${topbar('Check-in de Federico')}${sw}
  <ol class="timeline small" style="margin-top:4px">
    ${qrStep(k, 'scan')}${fotoStep(k, 'cfoto', 'Sacá fotos de lo que entra')}
    <li><span class="dot ${k.talles ? 'done' : ''}">${k.talles ? '<i class="ti ti-check"></i>' : ''}</span><div style="flex:1"><div class="b">Revisá los talles</div><div class="card small stack" style="margin-top:8px"><div class="row between"><span>4 cajas M</span>${toggle(k.talles, 'talles', 'Talles correctos')}</div><div class="row between"><span>2 cajas L</span>${toggle(k.talles, 'talles', 'Talles correctos')}</div><div class="row between"><span>1 bicicleta</span><span class="chip ok">OK</span></div></div><div class="grid2" style="margin-top:8px"><button class="btn sec2" data-act="recotizar">Caja más grande</button><button class="btn danger" data-act="rechazarCaja">Rechazar objeto</button></div></div></li>
  </ol>
  <div class="sticky stack"><button class="btn" ${k.qr && k.fotos >= 3 && k.talles ? 'data-act="finCheckin"' : 'aria-disabled="true" data-act="faltan"'}>Confirmar ingreso</button><button class="btn sec2" data-act="dano"><i class="ti ti-alert-triangle"></i>Registrar daño del traslado</button></div>`;
});

reg('A-11', 'anfitrion', 'Cobros y calificación', () => `${topbar('Cobros', false)}
  <div class="grid2"><div class="kpi"><span class="xs muted">Cobrado en noviembre</span><strong>${money(186450)}</strong></div><div class="kpi"><span class="xs muted">Por cobrar</span><strong>${money(101376)}</strong></div></div>
  <div class="sec">Movimientos</div>
  <div class="card">
    <div class="line"><span>Federico P. · alquiler<br><span class="xs muted">${money(115200)} − comisión 12 % (${money(13824)})</span></span><span class="b">${money(101376)}</span></div>
    <div class="row between xs"><span class="chip warn">Se libera al check-out</span><button class="opt" data-act="factura">Cargar factura</button></div>
    <div class="divider"></div>
    <div class="line"><span>Camila R. · alquiler<br><span class="xs muted">período 2 de 3</span></span><span class="b">${money(54600)}</span></div>
    <div class="row between xs"><span class="chip ok">Transferido a tu CBU</span><span class="chip ok">Factura cargada</span></div>
  </div>
  <div class="sec">Calificá a Camila</div>
  <div class="rate">${[1, 2, 3, 4, 5].map((n) => `<button class="${n <= S.hostRating ? 'on' : ''}" data-act="hrate" data-arg="${n}" aria-label="${n} estrellas"><i class="ti ti-star"></i></button>`).join('')}</div>
  <p class="xs muted">Ambas reseñas se publican juntas, para evitar represalias.</p>
  <div class="note" style="margin-top:10px"><i class="ti ti-alert-circle"></i><span>Si cancelás una reserva confirmada pagás una penalidad del 20 % del total, y si ya hay cosas guardadas tenés que dar al menos 15 días para retirarlas.</span></div>`);

/* ---------- navegación ---------- */
const ORDER = {
  compartidas: ['R-01', 'R-02'],
  cliente: ['C-01', 'C-02', 'C-03', 'C-04', 'C-05', 'C-06', 'C-07', 'C-08', 'C-09', 'C-10', 'C-10c', 'C-11', 'C-12'],
  anfitrion: ['A-01', 'A-02', 'A-03', 'A-04', 'A-05', 'A-06', 'A-07', 'A-08', 'A-08c', 'A-09', 'A-10', 'A-11'],
};
const TABS = {
  cliente: [['C-01', 'ti-search', 'Explorar'], ['C-10', 'ti-package', 'Reservas'], ['C-10c', 'ti-message-circle', 'Mensajes']],
  anfitrion: [['A-07', 'ti-layout-dashboard', 'Panel'], ['A-08', 'ti-message-circle', 'Mensajes'], ['A-11', 'ti-wallet', 'Cobros'], ['A-01', 'ti-home-edit', 'Publicación']],
};
const TABS_ON = ['C-01', 'C-04', 'C-10', 'C-10c', 'A-07', 'A-08', 'A-11'];
const codeOf = (id) => id.replace(/c$/, '');

function go(id, push = true) {
  const sc = SCREENS[id];
  if (sc.role !== 'ambos' && sc.role !== S.role) S.role = sc.role;
  if (push && S.screen !== id) S.hist.push(S.screen);
  S.screen = id;
  render(true);
}
function render(scrollTop) {
  const sc = SCREENS[S.screen], el = $('#screen');
  const y = el.scrollTop;
  el.innerHTML = sc.render();
  el.scrollTop = scrollTop ? 0 : y;
  if (scrollTop) el.focus({ preventScroll: true });
  $('#tabs').innerHTML = TABS_ON.includes(S.screen) ? TABS[S.role].map(([id, ic, n]) => `<button data-go="${id}" aria-current="${S.screen === id}"><i class="ti ${ic}" aria-hidden="true"></i>${n}</button>`).join('') : '';
  $('#code').textContent = `${codeOf(S.screen)} · ${sc.name}`;
  document.querySelectorAll('.role').forEach((b) => b.setAttribute('aria-selected', b.dataset.role === S.role));
  renderIndex();
  history.replaceState(null, '', '#' + S.screen);
}
function renderIndex() {
  const sec = (t, ids) => `<h2>${t}</h2>` + ids.map((id) => `<button data-go="${id}" aria-current="${S.screen === id}"><span>${codeOf(id)}</span>${SCREENS[id].name}</button>`).join('');
  $('#index').innerHTML = sec('Registro (ambos roles)', ORDER.compartidas) + sec('Cliente', ORDER.cliente) + sec('Anfitrión', ORDER.anfitrion);
}
let tt;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('on'), 2400); }

const ACT = {
  back: () => { const p = S.hist.pop(); if (p) go(p, false); },
  inc: (k) => { if (k.startsWith('kit')) S.kits[k[3]]++; else S.inv[k]++; render(); },
  dec: (k) => { if (k.startsWith('kit')) S.kits[k[3]] = Math.max(0, S.kits[k[3]] - 1); else S.inv[k] = Math.max(0, S.inv[k] - 1); render(); },
  comp: (v) => { S.comprobante = v; render(); },
  doc: (k) => { S.docs[k] = true; render(); },
  needdocs: () => toast('Sacá las tres fotos para continuar.'),
  verify: () => { S.verified = true; toast('Identidad verificada'); go(S.next || (S.role === 'anfitrion' ? 'A-01' : 'C-06')); S.next = null; },
  sinfecha: () => { S.sinFecha = !S.sinFecha; render(); },
  zona: (b) => { S.zona = b; render(); },
  pick: (id) => { const sp = space(+id); const w = compat(sp); if (w) return toast(`${sp.name}: ${w.toLowerCase()}.`); S.sel = +id; go('C-05'); },
  open: (id) => { S.sel = +id; go('C-05'); },
  nofit: (id) => toast(`${space(+id).name}: ${compat(space(+id)).toLowerCase()}.`),
  reservar: () => { if (!S.verified) { S.next = 'C-06'; S.role = 'cliente'; go('R-01'); } else go('C-06'); },
  consultar: () => { if (!S.verified) { toast('Para consultar, creá tu cuenta.'); S.next = 'C-10c'; go('R-01'); } else go('C-10c'); },
  log: (v) => { S.logistica = v; if (v === 'propia') S.operador = null; render(); },
  op: (v) => { S.operador = v; render(); },
  needop: () => toast('Elegí un operador para continuar.'),
  pagar: () => { const sp = space(); S.reserva = sp.modo === 'inmediata' ? 'confirmada' : 'pendiente'; toast('Pago aprobado y retenido'); go(sp.modo === 'inmediata' ? 'C-09' : 'C-08'); },
  aprobar: () => { S.reserva = 'confirmada'; toast(`${space().anf} aceptó tu solicitud`); go('C-09'); },
  gocheckin: () => { S.reserva = 'guardado'; go('C-11'); },
  nocheck: () => toast(S.reserva === 'pendiente' ? 'Primero el anfitrión tiene que aceptar.' : 'El check-in ya se hizo.'),
  extender: () => toast(`Podés extender hasta el ${S.sinFecha ? '—' : '20 ene'}: el espacio sigue teniendo lugar.`),
  cancelar: () => toast(S.noReemb ? 'Tu tarifa es no reembolsable: si cancelás, no se devuelve el alquiler.' : `Estás dentro de las 24 h de tu reserva: te devolvemos el 100 %. Después rige la política ${space().corta.toLowerCase()}.`),
  reclamo: () => toast('Abrimos un reclamo al seguro del envío.'),
  rate: (n) => { S.rating = +n; render(); },
  hrate: (n) => { S.hostRating = +n; render(); toast('Reseña guardada'); },
  cerrar: () => { if (!S.rating) return toast('Elegí de 1 a 5 estrellas.'); S.reserva = 'cerrada'; toast('Retiro confirmado. ¡Gracias!'); go('C-10'); },
  send: () => { const t = S.chatIn.trim(); if (!t) return toast('Escribí un mensaje primero.'); const w = masked(t); S.chat.push({ me: true, t, warn: w }); S.chatIn = ''; render(); if (w) toast('Ocultamos datos de contacto de tu mensaje.'); },
  htipo: (t) => { S.host.tipo = t; render(); },
  foto: () => { S.host.fotos = Math.min(6, S.host.fotos + 1); render(); },
  dia: (d) => { const a = S.host.dias; a.includes(d) ? a.splice(a.indexOf(d), 1) : a.push(d); render(); },
  recep: (v) => { S.host.recep = v; render(); },
  dtipo: (v) => { const [i, t] = v.split(':'); S.host.disc[+i].t = t; render(); },
  ddel: (i) => { S.host.disc.splice(+i, 1); render(); },
  dadd: () => { S.host.disc.push({ t: 'dias', dias: 7, cajas: 5, pct: 5 }); render(); },
  modo: (v) => { S.host.modo = v; render(); },
  corta: (v) => { S.host.corta = v; render(); },
  larga: (v) => { S.host.larga = v; render(); },
  acepta: (k) => { S.host.acepta[k] = !S.host.acepta[k]; render(); },
  prohib: (p) => { const a = S.host.prohibidos; a.includes(p) ? a.splice(a.indexOf(p), 1) : a.push(p); render(); },
  publicar: () => { S.host.published = true; toast('Publicado'); go('A-07'); },
  pausar: () => { S.host.published = !S.host.published; toast(S.host.published ? 'Publicación activa' : 'Publicación pausada'); render(); },
  aceptar: () => { S.host.solicitud = 'aceptada'; toast('Solicitud aceptada'); render(); },
  rechazar: () => { toast('Solicitud rechazada. Le devolvemos el pago al cliente.'); go('A-07'); },
  okEnvio: () => { S.host.envioOk = true; toast('Fecha de ingreso confirmada'); render(); },
  otraFecha: () => toast('Le propusimos al cliente otras fechas dentro de tu franja.'),
  scan: () => { S.host.checkin.qr = true; render(); },
  cfoto: () => { S.host.checkin.fotos = Math.min(3, S.host.checkin.fotos + 1); render(); },
  talles: () => { S.host.checkin.talles = !S.host.checkin.talles; render(); },
  faltan: () => toast('Completá los tres pasos para confirmar.'),
  finCheckin: () => { toast('Ingreso registrado. Avisamos a Federico.'); go('A-07'); },
  dano: () => toast('Registramos el daño y abrimos el reclamo al seguro del envío.'),
  factura: () => toast('Factura cargada'),
  nr: (v) => { S.noReemb = v === '1'; render(); },
  hnr: () => { S.host.noReemb = !S.host.noReemb; render(); },
  rop: (v) => { S.retiroOp = v; render(); },
  danoGuardado: () => toast('Abrimos un reclamo al seguro del guardado. El cobro del anfitrión queda en suspenso.'),
  conv: (n) => { S.conv = n; go('A-08c'); },
  hcancel: () => toast('Si cancelás, pagás una penalidad del 20 % del total y el cliente recibe el reembolso completo.'),
  etapa: (v) => { S.host.etapa = v; render(); },
  oscan: () => { S.host.checkout.qr = true; render(); },
  ofoto: () => { S.host.checkout.fotos = Math.min(3, S.host.checkout.fotos + 1); render(); },
  finCheckout: () => { toast('Retiro registrado. Liberamos tu cobro.'); go('A-11'); },
  recotizar: () => toast('Le avisamos a Federico: esa caja se cobra como del talle siguiente.'),
  rechazarCaja: () => toast('Objeto rechazado. Federico puede llevárselo o quitarlo de la reserva.'),
};

document.addEventListener('click', (e) => {
  const g = e.target.closest('[data-go]');
  if (g) { e.preventDefault(); return go(g.dataset.go); }
  const a = e.target.closest('[data-act]');
  if (a && ACT[a.dataset.act]) { e.preventDefault(); ACT[a.dataset.act](a.dataset.arg); }
  const r = e.target.closest('.role');
  if (r) { S.role = r.dataset.role; S.hist = []; go(S.role === 'cliente' ? 'C-01' : 'R-01', false); }
});
function setPath(path, val) { const p = path.split('.'); let o = S; while (p.length > 1) o = o[p.shift()]; o[p[0]] = val; }
const LIVE = {
  pile: () => pile(),
  sum: () => { const t = cajas() + objs().reduce((a, k) => a + S.inv[k], 0); return t ? resumen() : 'Tu lista está vacía.'; },
  cap: () => capCard(hcap()),
  dias: () => S.sinFecha ? 'Se cobra por períodos de 30 días.' : `${days()} días de guardado`,
};
document.addEventListener('input', (e) => {
  const b = e.target.dataset.bind; if (!b) return;
  const v = e.target.dataset.type === 'num' ? Number(String(e.target.value).replace(',', '.')) || 0 : e.target.value;
  setPath(b, v);
  document.querySelectorAll('[data-live]').forEach((el) => (el.innerHTML = LIVE[el.dataset.live]()));
});
document.addEventListener('change', (e) => { if (e.target.dataset.bind && ['date', 'select-one'].includes(e.target.type)) render(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.dataset.bind === 'chatIn') ACT.send(); });

document.title = `${APP_NAME} · Prototipo UX/UI`;
$('#appName').textContent = APP_NAME;
const start = location.hash.slice(1);
if (SCREENS[start]) { S.role = SCREENS[start].role === 'anfitrion' ? 'anfitrion' : 'cliente'; S.screen = start; }
render(true);
