function showSection(s) {
  document.querySelectorAll('.section').forEach(function(el){el.classList.remove('show');});
  document.querySelectorAll('.nav-btn').forEach(function(el){el.classList.remove('active');});
  document.querySelectorAll('.mobile-nav-btn').forEach(function(el){el.classList.remove('active');});
  document.getElementById('section-'+s).classList.add('show');
  if (event && event.currentTarget) event.currentTarget.classList.add('active');
  // Also sync mobile nav
  document.querySelectorAll('.mobile-nav-btn[data-section="'+s+'"]').forEach(function(el){el.classList.add('active');});
  document.querySelectorAll('.nav-btn[data-section="'+s+'"]').forEach(function(el){el.classList.add('active');});
}

function showTab(t, el) {
  document.querySelectorAll('.tab').forEach(function(e){e.classList.remove('active');});
  document.querySelectorAll('.tool-panel').forEach(function(e){e.classList.remove('show');});
  el.classList.add('active');
  document.getElementById('panel-'+t).classList.add('show');
}

function fmt(n) {
  return n.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
}

function calcParo() {
  var base = parseFloat(document.getElementById('p-base').value) || 0;
  var months = parseInt(document.getElementById('p-months').value) || 0;
  var hijos = parseInt(document.getElementById('p-hijos').value) || 0;
  var tipo = document.getElementById('p-tipo').value;

  if (base < 1 || months < 12) {
    alert('Introduce tu base de cotización y asegúrate de haber cotizado al menos 12 meses.');
    return;
  }

  var pct = tipo === 'total' ? 0.70 : 0.50;
  var bruta = base * pct;

  var IPREM = 600;
  var minPct = hijos > 0 ? 1.07 : 0.80;
  var maxPct = hijos >= 2 ? 2.25 : hijos === 1 ? 2.00 : 1.75;
  var minimo = IPREM * (minPct + 1/6);
  var maximo = IPREM * (maxPct + 1/6);

  var final = Math.min(Math.max(bruta, minimo), maximo);

  var durMap = {12:4, 18:6, 24:8, 30:10, 36:12, 42:14, 48:16};
  var dur = durMap[months] || 0;

  document.getElementById('paro-amount').textContent = Math.round(final).toLocaleString('es-ES');
  document.getElementById('paro-title').textContent = 'Prestación estimada: ' + fmt(final) + '/mes';
  document.getElementById('pr-base').textContent = fmt(base);
  document.getElementById('pr-pct').textContent = Math.round(pct*100) + '%';
  document.getElementById('pr-bruta').textContent = fmt(bruta);
  document.getElementById('pr-min').textContent = fmt(minimo);
  document.getElementById('pr-max').textContent = fmt(maximo);
  document.getElementById('pr-final').textContent = fmt(final);
  document.getElementById('pr-dur').textContent = dur + ' meses máximo';
  document.getElementById('pr-total').textContent = fmt(final * dur);

  var warn = '';
  if (bruta < minimo) {
    warn += '<div class="info-box"><i class="ti ti-info-circle"></i> Tu base de cotización es baja pero se aplica el mínimo legal de <strong>' + fmt(minimo) + '</strong>. Considera subir tu base de cotización para mejorar esta prestación.</div>';
  }
  if (bruta > maximo) {
    warn += '<div class="warn-box"><i class="ti ti-alert-triangle"></i> Tu prestación calculada (' + fmt(bruta) + ') supera el máximo legal. Solo cobrarás <strong>' + fmt(maximo) + '</strong> independientemente de tu base.</div>';
  }
  if (months >= 48) {
    warn += '<div class="good-box"><i class="ti ti-check"></i> Con 48+ meses cotizados tienes derecho a la duración máxima de <strong>16 meses</strong> de prestación.</div>';
  }
  document.getElementById('paro-warn').innerHTML = warn;
  document.getElementById('paro-result').classList.add('show');
}

async function analyseContract() {
  var txt = document.getElementById('contract-txt').value.trim();
  if (txt.length < 50) {
    alert('Por favor pega el texto de tu contrato o descríbelo con más detalle (mínimo 50 caracteres).');
    return;
  }
  var box = document.getElementById('contract-result');
  var out = document.getElementById('contract-output');
  box.classList.add('show');
  out.innerHTML = '<div style="font-size:13px;color:var(--text-secondary);display:flex;align-items:center;gap:8px">Analizando tu contrato <div class="dots"><span></span><span></span><span></span></div></div>';

  try {
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        messages: [{
          role: 'user',
          content: PROMPTS.contract(txt)
        }]
      })
    });
    var data = await response.json();
    var reply = data.content && data.content[0] && data.content[0].text
      ? data.content[0].text
      : 'No se pudo completar el análisis.';
    out.innerHTML = '<div class="ai-txt">' +
      reply
        .replace(/\n\n/g, '</p><p style="margin-top:10px">')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') +
      '</div>';
  } catch(e) {
    out.innerHTML = '<div style="font-size:13px;color:var(--text-secondary)">Error al conectar. Comprueba tu conexión e inténtalo de nuevo.</div>';
  }
}

function calcTax() {
  var ingresos = parseFloat(document.getElementById('t-ingresos').value) || 0;
  var gastos = parseFloat(document.getElementById('t-gastos').value) || 0;
  var retenciones = parseFloat(document.getElementById('t-retenciones').value) || 0;
  var pagos130 = parseFloat(document.getElementById('t-pagos130').value) || 0;
  var trimestre = parseInt(document.getElementById('t-trimestre').value) || 2;
  var familia = document.getElementById('t-familia').value;

  if (ingresos < 1) {
    alert('Introduce tus ingresos acumulados.');
    return;
  }

  var neto = Math.max(0, ingresos - gastos);
  var base130 = neto * 0.20;
  var apagar = Math.max(0, base130 - retenciones - pagos130);

  document.getElementById('tr-neto').textContent = fmt(neto);
  document.getElementById('tr-20').textContent = fmt(base130);
  document.getElementById('tr-ret').textContent = '- ' + fmt(retenciones);
  document.getElementById('tr-prev').textContent = '- ' + fmt(pagos130);
  document.getElementById('tr-pay').textContent = fmt(apagar);

  var factor = 4 / trimestre;
  var netoAnual = neto * factor;
  var retencionesAnual = retenciones * factor;
  var pagos130Anual = (pagos130 + apagar) * factor;

  var minimoMap = { single: 5550, married: 6700, kids1: 6600, kids2: 8500 };
  var minimoPersonal = minimoMap[familia] || 5550;
  var baseImponible = Math.max(0, netoAnual - minimoPersonal);

  function calcIRPF(base) {
    var tax = 0;
    var tramos = [
      { limit: 12450, rate: 0.19 },
      { limit: 20200, rate: 0.24 },
      { limit: 35200, rate: 0.30 },
      { limit: 60000, rate: 0.37 },
      { limit: 300000, rate: 0.45 },
      { limit: Infinity, rate: 0.47 }
    ];
    var prev = 0;
    for (var i = 0; i < tramos.length; i++) {
      if (base <= prev) break;
      var chunk = Math.min(base, tramos[i].limit) - prev;
      tax += chunk * tramos[i].rate;
      prev = tramos[i].limit;
    }
    return tax;
  }

  var irpfBruto = calcIRPF(baseImponible);
  var resultadoRenta = irpfBruto - retencionesAnual - pagos130Anual;

  document.getElementById('ar-base').textContent = fmt(netoAnual);
  document.getElementById('ar-minimo').textContent = '- ' + fmt(minimoPersonal);
  document.getElementById('ar-irpf').textContent = fmt(irpfBruto);
  document.getElementById('ar-ret').textContent = '- ' + fmt(retencionesAnual);
  document.getElementById('ar-130').textContent = '- ' + fmt(pagos130Anual);

  var resEl = document.getElementById('ar-result');
  if (resultadoRenta > 0) {
    resEl.textContent = 'A PAGAR ' + fmt(resultadoRenta);
    resEl.className = 'rv red';
  } else {
    resEl.textContent = 'A DEVOLVER ' + fmt(Math.abs(resultadoRenta));
    resEl.className = 'rv green';
  }

  var bar = document.getElementById('tranche-bar');
  var tramos2 = [
    { limit: 12450, color: '#3B6D11' },
    { limit: 20200, color: '#185FA5' },
    { limit: 35200, color: '#EF9F27' },
    { limit: 60000, color: '#E24B4A' },
    { limit: Infinity, color: '#791F1F' }
  ];
  var barHTML = '';
  var prev2 = 0;
  var total = Math.min(baseImponible, 300000) || 1;
  for (var j = 0; j < tramos2.length; j++) {
    if (baseImponible <= prev2) break;
    var chunk2 = Math.min(baseImponible, tramos2[j].limit) - prev2;
    var pct2 = Math.round((chunk2 / total) * 100);
    if (pct2 > 0) {
      barHTML += '<div style="width:' + pct2 + '%;background:' + tramos2[j].color + ';height:8px"></div>';
    }
    prev2 = tramos2[j].limit;
  }
  bar.innerHTML = barHTML || '<div style="width:100%;background:#EAF3DE;height:8px;border-radius:4px"></div>';

  var alertHTML = '';
  if (resultadoRenta > 2000) {
    alertHTML = '<div class="warn-box" style="margin-top:.75rem"><i class="ti ti-alert-triangle"></i> <strong>¡Atención!</strong> Tu Renta puede salirte a pagar <strong>' + fmt(resultadoRenta) + '</strong>. Para evitar la sorpresa de junio, aumenta tus pagos del modelo 130 o asegúrate de que tus clientes te retengan el 15% correctamente.</div>';
  } else if (resultadoRenta < -500) {
    alertHTML = '<div class="good-box" style="margin-top:.75rem"><i class="ti ti-check"></i> Tu Renta probablemente te <strong>saldrá a devolver</strong> gracias a las retenciones y pagos del 130. Hacienda tarda entre 3-6 meses en devolver desde la presentación en mayo-junio.</div>';
  } else {
    alertHTML = '<div class="info-box" style="margin-top:.75rem"><i class="ti ti-info-circle"></i> Tu Renta está bastante equilibrada. El resultado puede variar si tienes otras rentas o deducciones adicionales.</div>';
  }
  document.getElementById('tax-alert').innerHTML = alertHTML;
  document.getElementById('tax-result').classList.add('show');
}

// ─── DOCUMENT GENERATOR ────────────────────────────────────────────────────

var DOC_TEMPLATES = {
  rechazo: {
    es: {
      label: 'Rechazo de encargo',
      fields: [
        {id:'doc-nombre', label:'Tu nombre completo', placeholder:'Ana García Martínez'},
        {id:'doc-empresa', label:'Nombre de la empresa', placeholder:'Empresa S.L.'},
        {id:'doc-encargo', label:'Descripción del encargo rechazado', placeholder:'Desarrollo de módulo de reportes para el proyecto X'}
      ],
      generate: function(f) {
        return 'Estimado/a equipo de ' + f['doc-empresa'] + ',\n\n' +
          'Me dirijo a ustedes en relación con el encargo remitido referente a: ' + f['doc-encargo'] + '.\n\n' +
          'En ejercicio de mi plena autonomía como profesional independiente, y de conformidad con las condiciones de nuestra relación mercantil, les comunico que no podré asumir dicho encargo en este momento.\n\n' +
          'Como autónomo/a independiente, dispongo de plena libertad para aceptar o rechazar los encargos que me sean propuestos, sin que ello implique incumplimiento de obligación alguna, tal y como establece el marco jurídico aplicable a las relaciones entre profesionales independientes y sus clientes.\n\n' +
          'Quedo a su disposición para futuros encargos que se ajusten mejor a mi disponibilidad y especialización.\n\n' +
          'Atentamente,\n' + f['doc-nombre'];
      }
    },
    en: {
      label: 'Reject assignment',
      fields: [
        {id:'doc-nombre', label:'Your full name', placeholder:'Ana García Martínez'},
        {id:'doc-empresa', label:'Company name', placeholder:'Company S.L.'},
        {id:'doc-encargo', label:'Description of the rejected assignment', placeholder:'Development of reporting module for Project X'}
      ],
      generate: function(f) {
        return 'Dear ' + f['doc-empresa'] + ' team,\n\n' +
          'I am writing regarding the assignment submitted in relation to: ' + f['doc-encargo'] + '.\n\n' +
          'In the exercise of my full autonomy as an independent professional, and in accordance with the conditions of our commercial relationship, I hereby notify you that I am unable to take on this assignment at this time.\n\n' +
          'As an independent self-employed professional, I retain full freedom to accept or decline any assignments proposed to me, without this constituting any breach of obligation, in accordance with the legal framework applicable to relationships between independent professionals and their clients.\n\n' +
          'I remain available for future assignments that better match my availability and expertise.\n\n' +
          'Yours sincerely,\n' + f['doc-nombre'];
      }
    }
  },
  tarifa: {
    es: {
      label: 'Confirmación de tarifa variable',
      fields: [
        {id:'doc-nombre', label:'Tu nombre completo', placeholder:'Ana García Martínez'},
        {id:'doc-empresa', label:'Nombre de la empresa', placeholder:'Empresa S.L.'},
        {id:'doc-tarifa', label:'Descripción del entregable y tarifa acordada', placeholder:'Auditoría de código: 800€ por entrega completada'}
      ],
      generate: function(f) {
        return 'Estimado/a equipo de ' + f['doc-empresa'] + ',\n\n' +
          'A efectos de dejar constancia escrita de las condiciones económicas de nuestra colaboración, les confirmo lo siguiente:\n\n' +
          'La contraprestación económica acordada es: ' + f['doc-tarifa'] + '.\n\n' +
          'Dicha retribución está vinculada al entregable específico y no a un tiempo de presencia o disponibilidad. El importe final podrá variar en función del volumen de trabajo real entregado en cada período, de acuerdo con el principio de autonomía profesional que rige nuestra relación mercantil.\n\n' +
          'Esta confirmación tiene carácter meramente informativo y no implica subordinación laboral alguna.\n\n' +
          'Atentamente,\n' + f['doc-nombre'];
      }
    },
    en: {
      label: 'Variable rate confirmation',
      fields: [
        {id:'doc-nombre', label:'Your full name', placeholder:'Ana García Martínez'},
        {id:'doc-empresa', label:'Company name', placeholder:'Company S.L.'},
        {id:'doc-tarifa', label:'Deliverable description and agreed rate', placeholder:'Code audit: €800 per completed deliverable'}
      ],
      generate: function(f) {
        return 'Dear ' + f['doc-empresa'] + ' team,\n\n' +
          'For the record, I hereby confirm the agreed financial terms of our professional engagement:\n\n' +
          'The agreed remuneration is: ' + f['doc-tarifa'] + '.\n\n' +
          'This fee is tied to a specific deliverable and not to any time of attendance or availability. The final amount may vary according to the volume of work actually delivered in each period, in accordance with the principle of professional autonomy that governs our commercial relationship.\n\n' +
          'This confirmation is purely informational and does not imply any employment subordination.\n\n' +
          'Yours sincerely,\n' + f['doc-nombre'];
      }
    }
  },
  medios: {
    es: {
      label: 'Confirmación de medios propios',
      fields: [
        {id:'doc-nombre', label:'Tu nombre completo', placeholder:'Ana García Martínez'},
        {id:'doc-empresa', label:'Nombre de la empresa', placeholder:'Empresa S.L.'},
        {id:'doc-medios', label:'Medios propios utilizados', placeholder:'Ordenador portátil propio, software de diseño con licencia personal, smartphone particular'}
      ],
      generate: function(f) {
        return 'Estimado/a equipo de ' + f['doc-empresa'] + ',\n\n' +
          'Me dirijo a ustedes para dejar constancia de que, en el desarrollo de los servicios prestados a su empresa, utilizo exclusivamente medios e instrumentos de trabajo propios, sin hacer uso de infraestructura, equipos ni herramientas proporcionadas por la empresa.\n\n' +
          'En concreto, los medios de trabajo utilizados son de mi exclusiva propiedad: ' + f['doc-medios'] + '.\n\n' +
          'Esta comunicación tiene por objeto acreditar la ajenidad en los medios de producción que caracteriza la relación de prestación de servicios como profesional autónomo independiente, de conformidad con los criterios de la jurisprudencia del Tribunal Supremo y la doctrina de la Inspección de Trabajo.\n\n' +
          'Atentamente,\n' + f['doc-nombre'];
      }
    },
    en: {
      label: 'Own equipment confirmation',
      fields: [
        {id:'doc-nombre', label:'Your full name', placeholder:'Ana García Martínez'},
        {id:'doc-empresa', label:'Company name', placeholder:'Company S.L.'},
        {id:'doc-medios', label:'Own equipment used', placeholder:'Personal laptop, design software with personal licence, personal smartphone'}
      ],
      generate: function(f) {
        return 'Dear ' + f['doc-empresa'] + ' team,\n\n' +
          'I am writing to confirm that in providing services to your company, I use exclusively my own tools and working equipment, and do not use any infrastructure, equipment or tools provided by the company.\n\n' +
          'Specifically, the working tools I use are entirely my own property: ' + f['doc-medios'] + '.\n\n' +
          'This communication is intended to evidence my independent ownership of production means, a characteristic feature of a self-employed professional relationship in accordance with the criteria established by the Spanish Supreme Court and the Labour Inspection doctrine.\n\n' +
          'Yours sincerely,\n' + f['doc-nombre'];
      }
    }
  },
  sustitucion: {
    es: {
      label: 'Acuerdo de sustitución',
      fields: [
        {id:'doc-nombre', label:'Tu nombre completo', placeholder:'Ana García Martínez'},
        {id:'doc-empresa', label:'Nombre de la empresa', placeholder:'Empresa S.L.'},
        {id:'doc-sustituto', label:'Nombre del sustituto (o "profesional de mi elección")', placeholder:'Carlos López Ruiz'}
      ],
      generate: function(f) {
        return 'Estimado/a equipo de ' + f['doc-empresa'] + ',\n\n' +
          'Por medio de la presente les comunico que, en virtud de la autonomía que rige nuestra relación mercantil como profesionales independientes, me reservo el derecho a subcontratar o delegar la ejecución de determinados encargos en otros profesionales de mi elección, siempre que cuenten con la cualificación necesaria.\n\n' +
          'En este caso concreto, comunico que el siguiente profesional podrá actuar en mi nombre para la prestación de servicios acordados: ' + f['doc-sustituto'] + '.\n\n' +
          'Esta capacidad de sustitución es un elemento esencial de la relación de prestación de servicios entre autónomos y refleja la ausencia de subordinación personal característica de una relación laboral, de acuerdo con la doctrina del Tribunal Supremo.\n\n' +
          'Atentamente,\n' + f['doc-nombre'];
      }
    },
    en: {
      label: 'Substitution agreement',
      fields: [
        {id:'doc-nombre', label:'Your full name', placeholder:'Ana García Martínez'},
        {id:'doc-empresa', label:'Company name', placeholder:'Company S.L.'},
        {id:'doc-sustituto', label:'Substitute\'s name (or "professional of my choice")', placeholder:'Carlos López Ruiz'}
      ],
      generate: function(f) {
        return 'Dear ' + f['doc-empresa'] + ' team,\n\n' +
          'I hereby inform you that, pursuant to the autonomy governing our commercial relationship as independent professionals, I reserve the right to subcontract or delegate the execution of certain assignments to other professionals of my choosing, provided they have the necessary qualifications.\n\n' +
          'In this specific instance, I hereby notify you that the following professional may act on my behalf in the provision of agreed services: ' + f['doc-sustituto'] + '.\n\n' +
          'This right of substitution is an essential element of a self-employed service relationship and reflects the absence of personal subordination characteristic of an employment relationship, in accordance with the doctrine of the Spanish Supreme Court.\n\n' +
          'Yours sincerely,\n' + f['doc-nombre'];
      }
    }
  }
};

function showDocSubPanel(panel) {
  document.querySelectorAll('.doc-sub-panel').forEach(function(el){el.classList.remove('show');});
  document.querySelectorAll('.doc-toggle-btn').forEach(function(el){el.classList.remove('active');});
  document.getElementById('doc-sub-'+panel).classList.add('show');
  event.currentTarget.classList.add('active');
}

function updateDocTemplate() {
  var lang = (typeof LANG !== 'undefined' ? LANG : 'es');
  var key = document.getElementById('doc-template-select').value;
  var tpl = DOC_TEMPLATES[key][lang];
  var container = document.getElementById('doc-fields');
  var html = '';
  tpl.fields.forEach(function(f) {
    html += '<div class="field"><label class="lbl">'+f.label+'</label><input class="inp" id="'+f.id+'" placeholder="'+f.placeholder+'"></div>';
  });
  container.innerHTML = html;
  document.getElementById('doc-output').classList.remove('show');
}

function generateDoc() {
  var lang = (typeof LANG !== 'undefined' ? LANG : 'es');
  var key = document.getElementById('doc-template-select').value;
  var tpl = DOC_TEMPLATES[key][lang];
  var fields = {};
  var missing = false;
  tpl.fields.forEach(function(f) {
    var val = (document.getElementById(f.id) || {}).value || '';
    fields[f.id] = val.trim();
    if (!fields[f.id]) missing = true;
  });
  if (missing) {
    alert(lang === 'en' ? 'Please fill in all fields.' : 'Por favor, rellena todos los campos.');
    return;
  }
  var text = tpl.generate(fields);
  document.getElementById('doc-textarea').value = text;
  document.getElementById('doc-output').classList.add('show');
}

function copyDoc() {
  var ta = document.getElementById('doc-textarea');
  ta.select();
  document.execCommand('copy');
  var btn = document.getElementById('copy-doc-btn');
  var lang = (typeof LANG !== 'undefined' ? LANG : 'es');
  btn.textContent = lang === 'en' ? '✓ Copied!' : '✓ ¡Copiado!';
  btn.classList.add('copied');
  setTimeout(function() {
    btn.textContent = lang === 'en' ? 'Copy' : 'Copiar';
    btn.classList.remove('copied');
  }, 2000);
}

function printChecklist() {
  window.print();
}

// ─── AEAT CALENDAR ─────────────────────────────────────────────────────────

var DEADLINES = [
  { id: 'd1',  month: 'Ene', day: '1–30', title: 'Q4: Modelo 130 + IVA (303/390) + Resumen anual', models: 'Modelos 130, 303, 390', range: [new Date('2026-01-01'), new Date('2026-01-30')] },
  { id: 'd2',  month: 'Feb', day: '1–28', title: 'Modelo 347 — Declaración informativa operaciones', models: 'Modelo 347 (si aplica)', range: [new Date('2026-02-01'), new Date('2026-02-28')] },
  { id: 'd3',  month: 'May', day: '2–30', title: 'Renta anual — Modelo 100', models: 'Modelo 100 (IRPF)', range: [new Date('2026-05-02'), new Date('2026-06-30')] },
  { id: 'd4',  month: 'Abr', day: '1–20', title: 'Q1: Modelo 130 + IVA trimestral', models: 'Modelos 130, 303', range: [new Date('2026-04-01'), new Date('2026-04-20')] },
  { id: 'd5',  month: 'Jul', day: '1–20', title: 'Q2: Modelo 130 + IVA trimestral', models: 'Modelos 130, 303', range: [new Date('2026-07-01'), new Date('2026-07-20')] },
  { id: 'd6',  month: 'Oct', day: '1–20', title: 'Q3: Modelo 130 + IVA trimestral', models: 'Modelos 130, 303', range: [new Date('2026-10-01'), new Date('2026-10-20')] },
  { id: 'd7',  month: 'Ene', day: '1–30', title: 'Q4 2026: Modelo 130 + IVA + Resumen anual', models: 'Modelos 130, 303, 390', range: [new Date('2027-01-01'), new Date('2027-01-30')] }
];

function getDeadlineStatus(range) {
  var now = new Date();
  var start = range[0];
  var end = range[1];
  if (now > end) return 'pasado';
  var diff = start - now;
  if (diff <= 30 * 24 * 3600 * 1000) return 'proximo';
  return 'pendiente';
}

function renderCalendar() {
  var lang = (typeof LANG !== 'undefined' ? LANG : 'es');
  var container = document.getElementById('aeat-deadlines');
  if (!container) return;
  var html = '';
  DEADLINES.forEach(function(d) {
    var status = getDeadlineStatus(d.range);
    var badgeClass = 'badge-' + status;
    var badgeText = status === 'proximo'
      ? (lang === 'en' ? 'UPCOMING' : 'PRÓXIMO')
      : status === 'pasado'
        ? (lang === 'en' ? 'PAST' : 'PASADO')
        : (lang === 'en' ? 'PENDING' : 'PENDIENTE');
    html += '<div class="deadline-card">' +
      '<div class="deadline-date"><div class="month">' + d.month + '</div><div class="day">' + d.day + '</div></div>' +
      '<div class="deadline-body">' +
        '<div class="deadline-title">' + d.title + '</div>' +
        '<div class="deadline-models"><i class="ti ti-file-description"></i> ' + d.models + '</div>' +
        '<span class="deadline-badge ' + badgeClass + '">' + badgeText + '</span>' +
      '</div>' +
    '</div>';
  });
  container.innerHTML = html;
}

// ─── BOE MONITOR ───────────────────────────────────────────────────────────

async function searchBOE() {
  var query = document.getElementById('boe-search-input').value.trim();
  if (!query) {
    var lang = (typeof LANG !== 'undefined' ? LANG : 'es');
    alert(lang === 'en' ? 'Enter a search query.' : 'Introduce una pregunta.');
    return;
  }
  var box = document.getElementById('boe-ai-result');
  var out = document.getElementById('boe-ai-output');
  box.classList.add('show');
  out.innerHTML = '<div style="font-size:13px;color:var(--text-secondary);display:flex;align-items:center;gap:8px">Buscando <div class="dots"><span></span><span></span><span></span></div></div>';

  var lang = (typeof LANG !== 'undefined' ? LANG : 'es');
  var prompt = lang === 'en'
    ? 'You are a Spanish legal expert specialising in self-employment (autónomos) law. The user wants to know about recent BOE (Boletín Oficial del Estado) publications relevant to: "' + query + '". Based on your knowledge up to 2025, describe the most relevant legal changes, their BOE references if known, and what they mean for self-employed workers in Spain. Answer in English, clearly and concisely.'
    : 'Eres un experto en derecho laboral español especializado en autónomos. El usuario quiere saber sobre publicaciones recientes en el BOE (Boletín Oficial del Estado) relevantes para: "' + query + '". Basándote en tu conocimiento hasta 2025, describe los cambios legales más relevantes, sus referencias BOE si las conoces, y qué significan para los autónomos en España. Responde en español de forma clara y concisa.';

  try {
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 900,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    var data = await response.json();
    var reply = data.content && data.content[0] && data.content[0].text
      ? data.content[0].text
      : (lang === 'en' ? 'Could not complete the search.' : 'No se pudo completar la búsqueda.');
    out.innerHTML = '<div class="ai-txt">' +
      reply
        .replace(/\n\n/g, '</p><p style="margin-top:10px">')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') +
      '</div>';
  } catch(e) {
    out.innerHTML = '<div style="font-size:13px;color:var(--text-secondary)">Error al conectar. Inténtalo de nuevo.</div>';
  }
}

// ─── FUNDAE CALCULATOR ─────────────────────────────────────────────────────

function calcFundae() {
  var size = document.getElementById('fundae-size').value;
  var lang = (typeof LANG !== 'undefined' ? LANG : 'es');
  var credit;
  var note;

  switch (size) {
    case 'solo':
      credit = 94;
      note = lang === 'en'
        ? 'Annual FUNDAE credit for solo self-employed (RETA) workers (2025 figure). Fixed amount regardless of contribution base.'
        : 'Crédito anual FUNDAE para autónomos individuales (RETA) — cifra 2025. Importe fijo independientemente de la base de cotización.';
      break;
    case '1-5':
      credit = 420;
      note = lang === 'en'
        ? 'Annual credit for companies with 1–5 employees. Based on 2025 FUNDAE tables.'
        : 'Crédito anual para empresas de 1 a 5 trabajadores. Según tablas FUNDAE 2025.';
      break;
    case '6-9':
      credit = 900;
      note = lang === 'en'
        ? 'Annual credit for companies with 6–9 employees. Based on 2025 FUNDAE tables.'
        : 'Crédito anual para empresas de 6 a 9 trabajadores. Según tablas FUNDAE 2025.';
      break;
    case '10-49':
      credit = null;
      note = lang === 'en'
        ? 'For 10–49 employees: credit equals 1.1% of the previous year\'s professional contingency Social Security contributions. Enter your SS contributions to calculate.'
        : 'Para 10–49 trabajadores: el crédito equivale al 1,1% de las cotizaciones de contingencias profesionales del año anterior. Introduce tus cotizaciones para calcularlo.';
      break;
    case '50+': credit = null;
      note = lang === 'en'
        ? 'For 50+ employees: credit equals 0.6% of the previous year\'s professional contingency Social Security contributions.'
        : 'Para 50+ trabajadores: el crédito equivale al 0,6% de las cotizaciones de contingencias profesionales del año anterior.';
      break;
  }

  var html = '';
  if (credit !== null) {
    html = '<div class="result-main" style="margin-bottom:.75rem">' +
      '<div class="result-circ" style="background:var(--green-light);color:var(--green-dark)">' +
        '<div class="big">' + credit + '</div><div style="font-size:10px;margin-top:2px">€/año</div>' +
      '</div>' +
      '<div><div class="result-title">' + (lang === 'en' ? 'Estimated FUNDAE credit' : 'Crédito FUNDAE estimado') + '</div>' +
        '<div class="result-sub">' + (lang === 'en' ? 'Annual training credit 2025' : 'Crédito formativo anual 2025') + '</div></div>' +
    '</div>';
  }
  html += '<div class="info-box" style="margin-top:0">' + note + '</div>';
  document.getElementById('fundae-result').innerHTML = html;
  document.getElementById('fundae-result').style.display = 'block';
}
