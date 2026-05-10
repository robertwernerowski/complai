function showSection(s) {
  document.querySelectorAll('.section').forEach(function(el){el.classList.remove('show');});
  document.querySelectorAll('.nav-btn').forEach(function(el){el.classList.remove('active');});
  document.getElementById('section-'+s).classList.add('show');
  event.currentTarget.classList.add('active');
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
