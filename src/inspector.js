var mode = null, wc = 0, cc = 0, WN = 8, CN = 7;
var wa = Array(WN).fill(null), wsc = Array(WN).fill(0), wcl = Array(WN).fill(null);
var ca = Array(CN).fill(null), csc = Array(CN).fill(0), ccl = Array(CN).fill(null);
var waiT = '', caiT = '';

function buildQuiz(mode) {
  var isW = mode === 'w';
  var steps = isW ? QUIZ_STEPS.worker : QUIZ_STEPS.company;
  var container = document.getElementById('q' + mode);
  var total = steps.length + 1;

  var html = '<div class="pbar"><div class="pfill ' + (isW ? 'pf-r' : 'pf-b') + '" id="p' + mode + '" style="width:0%"></div></div>';

  steps.forEach(function(step, i) {
    html += '<div class="step' + (i === 0 ? ' active' : '') + '" id="' + mode + 's' + i + '">';
    html += '<div class="quiz-step-counter"><span class="quiz-step-dot"></span> Pregunta ' + (i+1) + ' de ' + total + '</div>';
    html += '<div class="stitle">' + step.title + '</div>';
    html += '<div class="sdesc">' + step.desc + '</div>';
    if (step.note) html += '<div class="inote"><i class="ti ti-eye" aria-hidden="true"></i> ' + step.note + '</div>';
    html += '<div class="opts">';
    step.options.forEach(function(opt, oi) {
      var cls = isW ? 'sr' : 'sb';
      var iconColor = opt.color === 'red' ? '#791F1F' : opt.color === 'amber' ? '#633806' : '#27500A';
      var icon = opt.color === 'red' ? 'ti-alert-circle' : opt.color === 'amber' ? 'ti-alert-triangle' : 'ti-check';
      html += '<div class="opt" onclick="' + (isW ? 'ws' : 'cs') + '(' + i + ',' + oi + ',' + opt.score + ',\'' + opt.color + '\')">';
      html += '<i class="ti ' + icon + '" style="color:' + iconColor + ';font-size:16px;flex-shrink:0;margin-top:2px" aria-hidden="true"></i>';
      html += '<div><div class="ot">' + opt.text + '</div><div class="os">' + opt.sub + '</div></div></div>';
    });
    html += '</div></div>';
  });

  html += '<div class="step" id="' + mode + 's' + steps.length + '">';
  html += '<div class="quiz-step-counter"><span class="quiz-step-dot ai-dot"></span> Análisis IA &mdash; ' + total + ' de ' + total + '</div>';
  html += '<div class="stitle">¿Hay algo en tu situación que te parece sospechoso?</div>';
  html += '<div class="sdesc">Describe con tus palabras ' + (isW ? 'cómo funciona tu relación con la empresa' : 'cualquier aspecto de tu relación con los autónomos') + '. La IA lo analizará contra los criterios reales de la Inspección de Trabajo española 2025.</div>';
  html += '<div class="open-box"><textarea id="' + mode + 'txt" placeholder="' + (isW ? 'Ejemplo: me pagan 1.800€ fijos cada mes, tengo que estar disponible de 9 a 18h, asisto a las reuniones de equipo...' : 'Ejemplo: les pedimos que usen nuestro sistema de gestión, asisten a reuniones mensuales de equipo...') + '" oninput="' + mode + 'cc();' + mode + 'chk()" maxlength="800"></textarea><div class="char-count"><span id="' + mode + 'cn">0</span>/800</div></div>';
  html += '<div class="aib" id="' + mode + 'ai"><div class="aihdr">Análisis IA</div><div id="' + mode + 'aic"></div></div>';
  html += '<button class="anabtn" id="' + mode + 'aib" onclick="' + mode + 'anal()"><i class="ti ti-sparkles" aria-hidden="true"></i> Analizar con IA</button>';
  html += '<span class="sklnk" onclick="' + mode + 'skip()">Saltar y ver resultado →</span>';
  html += '</div>';

  html += '<div class="nav-row">';
  html += '<button class="bbk" id="' + mode + 'bk" onclick="' + mode + 'go(-1)" style="visibility:hidden"><i class="ti ti-arrow-left" aria-hidden="true"></i> Anterior</button>';
  html += '<span class="sctr" id="' + mode + 'ctr">1 de ' + total + '</span>';
  html += '<button class="' + (isW ? 'bnr' : 'bnb') + '" id="' + mode + 'nxt" onclick="' + mode + 'go(1)" disabled>Siguiente <i class="ti ti-arrow-right" aria-hidden="true"></i></button>';
  html += '</div>';

  container.innerHTML = html;
}

function startM(m) {
  mode = m;
  document.getElementById('mscreen').style.display = 'none';
  buildQuiz(m);
  document.getElementById('q' + m).classList.add('show');
  upn(m);
}

function ws(i, o, sc, cl) { wa[i]=o; wsc[i]=sc; wcl[i]=cl; selO('ws'+i, o, 'sr'); if(i<WN-1) document.getElementById('wnxt').disabled=false; }
function cs(i, o, sc, cl) { ca[i]=o; csc[i]=sc; ccl[i]=cl; selO('cs'+i, o, 'sb'); if(i<CN-1) document.getElementById('cnxt').disabled=false; }

function selO(sid, o, cls) {
  document.querySelectorAll('#'+sid+' .opt').forEach(function(el, i) {
    el.classList.remove('sr','sb');
    if (i===o) el.classList.add(cls);
  });
}

function wgo(d) {
  if (d>0 && wa[wc]===null && wc<WN-1) return;
  var p='ws'+wc; wc+=d; var n='ws'+wc;
  document.getElementById(p).classList.remove('active');
  if (wc>=WN) { showR(); return; }
  document.getElementById(n).classList.add('active');
  document.getElementById('wnxt').disabled = (wc===WN-1) ? false : wa[wc]===null;
  if (wc===WN-1) document.getElementById('wnxt').innerHTML='Ver resultado';
  upn('w');
}

function cgo(d) {
  if (d>0 && ca[cc]===null && cc<CN-1) return;
  var p='cs'+cc; cc+=d; var n='cs'+cc;
  document.getElementById(p).classList.remove('active');
  if (cc>=CN) { showR(); return; }
  document.getElementById(n).classList.add('active');
  document.getElementById('cnxt').disabled = (cc===CN-1) ? false : ca[cc]===null;
  if (cc===CN-1) document.getElementById('cnxt').innerHTML='Ver resultado';
  upn('c');
}

function upn(m) {
  var isW = m==='w', cur=isW?wc:cc, tot=isW?WN:CN;
  document.getElementById('p'+m).style.width = Math.round((cur/tot)*100)+'%';
  document.getElementById(m+'bk').style.visibility = cur>0?'visible':'hidden';
  document.getElementById(m+'ctr').textContent = (cur+1)+' de '+tot;
}

function wcc() { document.getElementById('wcn').textContent = document.getElementById('wtxt').value.length; }
function ccc() { document.getElementById('ccn').textContent = document.getElementById('ctxt').value.length; }
function wchk() { var v=document.getElementById('wtxt').value.trim(); document.getElementById('waib').style.display=v.length>20?'block':'none'; document.getElementById('wnxt').disabled=false; }
function cchk() { var v=document.getElementById('ctxt').value.trim(); document.getElementById('caib').style.display=v.length>20?'block':'none'; document.getElementById('cnxt').disabled=false; }

async function wanal() {
  var txt = document.getElementById('wtxt').value.trim(); if(!txt) return;
  var box=document.getElementById('wai'), con=document.getElementById('waic');
  box.classList.add('show');
  con.innerHTML = '<div style="font-size:13px;color:var(--text-secondary);display:flex;align-items:center;gap:8px">Analizando <div class="dots"><span></span><span></span><span></span></div></div>';
  document.getElementById('waib').disabled = true;
  try {
    var r = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:800, messages:[{role:'user',content:PROMPTS.worker(txt)}] }) });
    var d = await r.json();
    waiT = d.content&&d.content[0]&&d.content[0].text ? d.content[0].text : 'No se pudo completar el análisis.';
    con.innerHTML = '<div class="aitxt">'+waiT.replace(/\n/g,'<br>')+'</div>';
  } catch(e) { con.innerHTML='<div style="font-size:13px;color:var(--text-secondary)">Error al conectar. Puedes continuar sin el análisis IA.</div>'; }
}

async function canal() {
  var txt = document.getElementById('ctxt').value.trim(); if(!txt) return;
  var box=document.getElementById('cai'), con=document.getElementById('caic');
  box.classList.add('show');
  con.innerHTML = '<div style="font-size:13px;color:var(--text-secondary);display:flex;align-items:center;gap:8px">Analizando <div class="dots"><span></span><span></span><span></span></div></div>';
  document.getElementById('caib').disabled = true;
  try {
    var r = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:800, messages:[{role:'user',content:PROMPTS.company(txt)}] }) });
    var d = await r.json();
    caiT = d.content&&d.content[0]&&d.content[0].text ? d.content[0].text : 'No se pudo completar el análisis.';
    con.innerHTML = '<div class="aitxt">'+caiT.replace(/\n/g,'<br>')+'</div>';
  } catch(e) { con.innerHTML='<div style="font-size:13px;color:var(--text-secondary)">Error al conectar. Puedes continuar sin el análisis IA.</div>'; }
}

function wskip() { showR(); }
function cskip() { showR(); }

function showR() {
  var isW = mode==='w';
  document.getElementById('q'+mode).classList.remove('show');
  document.getElementById('res').classList.add('show');

  var scores=isW?wsc:csc, fcols=isW?wcl:ccl, fdata=isW?FINDINGS.worker:FINDINGS.company;
  var total = scores.slice(0,isW?WN-1:CN-1).reduce(function(a,b){return a+b;},0);
  var mx = isW?115:105, pct=Math.min(100,Math.round((total/mx)*100));
  document.getElementById('mth').style.left = 'calc('+pct+'% - 8px)';
  var pctEl = document.getElementById('result-pct');
  if (pctEl) pctEl.textContent = pct + '%';

  var ci=document.getElementById('scirc'), sv=document.getElementById('svv'), ss=document.getElementById('sss'), slb=document.getElementById('slb');
  slb.textContent = isW ? 'Tu nivel de riesgo de ser falso autónomo' : 'Tu nivel de riesgo ante una inspección';
  var level;
  if (pct<30) { level='low'; ci.style.background='#EAF3DE'; ci.style.color='#27500A'; ci.innerHTML='<i class="ti ti-shield-check"></i>'; sv.textContent=isW?'Pocas señales detectadas':'Riesgo bajo'; ss.textContent=isW?'Tu situación no muestra señales fuertes de falso autónomo.':'Tu operación muestra pocos indicadores de riesgo.'; }
  else if (pct<60) { level='medium'; ci.style.background='#FAEEDA'; ci.style.color='#633806'; ci.innerHTML='<i class="ti ti-alert-triangle"></i>'; sv.textContent='Riesgo moderado'; ss.textContent=isW?'Hay señales que podrían indicar laboralidad. Actúa antes de que llegue una inspección.':'Existen vulnerabilidades. Un inspector podría cuestionarte.'; }
  else { level='high'; ci.style.background='#FCEBEB'; ci.style.color='#791F1F'; ci.innerHTML='<i class="ti ti-alert-circle"></i>'; sv.textContent=isW?'Señales claras de falso autónomo':'Riesgo alto'; ss.textContent=isW?'Tu situación tiene señales claras. Tienes derechos. Actúa ahora.':'Tu situación tiene indicadores graves. Actúa urgentemente.'; }

  if (isW && RIGHTS[level]) {
    var rs=document.getElementById('rsec');
    rs.innerHTML='<div class="rbox"><div class="rboxt"><i class="ti ti-scale"></i> Derechos que puedes reclamar si eres falso autónomo</div>'+RIGHTS[level].map(function(r){return'<div class="ri"><i class="ti ti-check"></i>'+r+'</div>';}).join('')+'</div>';
  }

  var aiT = isW?waiT:caiT;
  if (aiT) {
    document.getElementById('aisec').innerHTML='<div class="sect">Análisis IA de tu situación</div><div class="airsec"><div class="airsect"><i class="ti ti-sparkles"></i> Lo que detectó COMPLAI</div><div class="airstxt">'+aiT.replace(/\n/g,'<br>')+'</div></div>';
  }

  var fe=document.getElementById('finds'); fe.innerHTML='';
  fcols.slice(0,isW?WN-1:CN-1).forEach(function(col,i){
    if(!col||!fdata[i]||!fdata[i][col])return;
    var d=fdata[i][col]; var el=document.createElement('div'); el.className='fi '+col;
    var ic=col==='red'?'ti-alert-circle':col==='amber'?'ti-alert-triangle':'ti-check';
    el.innerHTML='<i class="ti '+ic+' fic"></i><div><div class="ft">'+d.t+'</div><div class="fd">'+d.d+'</div></div>';
    fe.appendChild(el);
  });

  var ae=document.getElementById('acts'); ae.innerHTML='';
  var actsD=isW?ACTIONS.worker:ACTIONS.company;
  actsD[level].forEach(function(a){
    var el=document.createElement('div'); el.className='act';
    el.innerHTML='<i class="ti ti-arrow-right" style="color:#185FA5;flex-shrink:0;margin-top:2px"></i>'+a;
    ae.appendChild(el);
  });

  var ab=document.getElementById('askb');
  ab.textContent='Explorar herramientas de COMPLAI →';
  ab.onclick=function(){ showSection('tools'); document.querySelectorAll('.nav-btn').forEach(function(el){el.classList.remove('active');}); document.querySelectorAll('.nav-btn')[1].classList.add('active'); };
}

function rst() {
  mode=null; wc=0; cc=0;
  wa=Array(WN).fill(null); wsc=Array(WN).fill(0); wcl=Array(WN).fill(null);
  ca=Array(CN).fill(null); csc=Array(CN).fill(0); ccl=Array(CN).fill(null);
  waiT=''; caiT='';
  document.getElementById('mscreen').style.display='block';
  document.getElementById('qw').classList.remove('show'); document.getElementById('qw').innerHTML='';
  document.getElementById('qc').classList.remove('show'); document.getElementById('qc').innerHTML='';
  document.getElementById('res').classList.remove('show');
  document.getElementById('rsec').innerHTML=''; document.getElementById('aisec').innerHTML='';
  document.getElementById('finds').innerHTML=''; document.getElementById('acts').innerHTML='';
}
