var mode=null,wc=0,cc=0,WN=8,CN=7;
var wa=Array(WN).fill(null),wsc=Array(WN).fill(0),wcl=Array(WN).fill(null);
var ca=Array(CN).fill(null),csc=Array(CN).fill(0),ccl=Array(CN).fill(null);
var waiT='',caiT='';

function startM(m){
  mode=m;
  document.getElementById('mscreen').style.display='none';
  document.getElementById('q'+m).classList.add('show');
  upn(m);
}

function ws(i,o,sc,cl){
  wa[i]=o;wsc[i]=sc;wcl[i]=cl;
  selO('ws'+i,o,'sr');
  if(i<7)document.getElementById('wnxt').disabled=false;
}

function cs(i,o,sc,cl){
  ca[i]=o;csc[i]=sc;ccl[i]=cl;
  selO('cs'+i,o,'sb');
  if(i<6)document.getElementById('cnxt').disabled=false;
}

function selO(sid,o,cls){
  document.querySelectorAll('#'+sid+' .opt').forEach(function(el,i){
    el.classList.remove('sr','sb');
    if(i===o)el.classList.add(cls);
  });
}

function wgo(d){
  if(d>0&&wa[wc]===null&&wc<7)return;
  var p='ws'+wc;wc+=d;var n='ws'+wc;
  document.getElementById(p).classList.remove('active');
  if(wc>=WN){showR();return;}
  document.getElementById(n).classList.add('active');
  document.getElementById('wnxt').disabled=wc===7?false:wa[wc]===null;
  if(wc===WN-1)document.getElementById('wnxt').innerHTML='Ver resultado';
  upn('w');
}

function cgo(d){
  if(d>0&&ca[cc]===null&&cc<6)return;
  var p='cs'+cc;cc+=d;var n='cs'+cc;
  document.getElementById(p).classList.remove('active');
  if(cc>=CN){showR();return;}
  document.getElementById(n).classList.add('active');
  document.getElementById('cnxt').disabled=cc===6?false:ca[cc]===null;
  if(cc===CN-1)document.getElementById('cnxt').innerHTML='Ver resultado';
  upn('c');
}

function upn(m){
  var isW=m==='w',cur=isW?wc:cc,tot=isW?WN:CN;
  document.getElementById('p'+m).style.width=Math.round((cur/tot)*100)+'%';
  document.getElementById((isW?'w':'c')+'bk').style.visibility=cur>0?'visible':'hidden';
  document.getElementById((isW?'w':'c')+'ctr').textContent=(cur+1)+' de '+tot;
}

function wcc(){document.getElementById('wcn').textContent=document.getElementById('wtxt').value.length;}
function ccc(){document.getElementById('ccn').textContent=document.getElementById('ctxt').value.length;}

function wchk(){
  var v=document.getElementById('wtxt').value.trim();
  document.getElementById('waib').style.display=v.length>20?'block':'none';
  document.getElementById('wnxt').disabled=false;
}

function cchk(){
  var v=document.getElementById('ctxt').value.trim();
  document.getElementById('caib').style.display=v.length>20?'block':'none';
  document.getElementById('cnxt').disabled=false;
}

async function wanal(){
  var txt=document.getElementById('wtxt').value.trim();if(!txt)return;
  var box=document.getElementById('wai'),con=document.getElementById('waic');
  box.classList.add('show');
  con.innerHTML='<div style="font-size:13px;color:#999;display:flex;align-items:center;gap:8px">Analizando <div class="dots"><span></span><span></span><span></span></div></div>';
  document.getElementById('waib').disabled=true;
  try{
    var r=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:800,
        messages:[{role:'user',content:PROMPTS.worker(txt)}]
      })
    });
    var d=await r.json();
    waiT=d.content&&d.content[0]&&d.content[0].text?d.content[0].text:'No se pudo completar el análisis.';
    con.innerHTML='<div class="aitxt">'+waiT.replace(/\n/g,'<br>')+'</div>';
  }catch(e){
    con.innerHTML='<div style="font-size:13px;color:#999">Error al conectar. Puedes continuar sin el análisis IA.</div>';
  }
}

async function canal(){
  var txt=document.getElementById('ctxt').value.trim();if(!txt)return;
  var box=document.getElementById('cai'),con=document.getElementById('caic');
  box.classList.add('show');
  con.innerHTML='<div style="font-size:13px;color:#999;display:flex;align-items:center;gap:8px">Analizando <div class="dots"><span></span><span></span><span></span></div></div>';
  document.getElementById('caib').disabled=true;
  try{
    var r=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:800,
        messages:[{role:'user',content:PROMPTS.company(txt)}]
      })
    });
    var d=await r.json();
    caiT=d.content&&d.content[0]&&d.content[0].text?d.content[0].text:'No se pudo completar el análisis.';
    con.innerHTML='<div class="aitxt">'+caiT.replace(/\n/g,'<br>')+'</div>';
  }catch(e){
    con.innerHTML='<div style="font-size:13px;color:#999">Error al conectar. Puedes continuar sin el análisis IA.</div>';
  }
}

function wskip(){showR();}
function cskip(){showR();}

function showR(){
  var isW=mode==='w';
  document.getElementById('q'+mode).classList.remove('show');
  document.getElementById('res').classList.add('show');

  var scores=isW?wsc:csc,fcols=isW?wcl:ccl,fdata=isW?FINDINGS.worker:FINDINGS.company;
  var total=scores.slice(0,isW?7:6).reduce(function(a,b){return a+b;},0);
  var mx=isW?115:105,pct=Math.min(100,Math.round((total/mx)*100));
  document.getElementById('mth').style.left='calc('+pct+'% - 8px)';

  var ci=document.getElementById('scirc'),svv=document.getElementById('svv'),sss=document.getElementById('sss'),slb=document.getElementById('slb');
  slb.textContent=isW?'Tu nivel de riesgo de ser falso autónomo':'Tu nivel de riesgo ante una inspección';
  var level;
  if(pct<30){
    level='low';ci.style.background='#EAF3DE';ci.style.color='#27500A';
    ci.innerHTML='<i class="ti ti-shield-check"></i>';
    svv.textContent=isW?'Pocas señales detectadas':'Riesgo bajo';
    sss.textContent=isW?'Tu situación no muestra señales fuertes de falso autónomo.':'Tu operación muestra pocos indicadores de riesgo.';
  }else if(pct<60){
    level='medium';ci.style.background='#FAEEDA';ci.style.color='#633806';
    ci.innerHTML='<i class="ti ti-alert-triangle"></i>';
    svv.textContent='Riesgo moderado';
    sss.textContent=isW?'Hay señales que podrían indicar laboralidad. Actúa antes de que llegue una inspección.':'Existen vulnerabilidades. Un inspector podría cuestionarte.';
  }else{
    level='high';ci.style.background='#FCEBEB';ci.style.color='#791F1F';
    ci.innerHTML='<i class="ti ti-alert-circle"></i>';
    svv.textContent=isW?'Señales claras de falso autónomo':'Riesgo alto';
    sss.textContent=isW?'Tu situación tiene señales claras. Tienes derechos. Actúa ahora.':'Tu situación tiene indicadores graves. Actúa urgentemente.';
  }

  if(isW&&RIGHTS[level]){
    var rs=document.getElementById('rsec');
    rs.innerHTML='<div class="rbox"><div class="rboxt"><i class="ti ti-scale"></i> Derechos que puedes reclamar si eres falso autónomo</div>'+
      RIGHTS[level].map(function(r){return'<div class="ri"><i class="ti ti-check"></i>'+r+'</div>';}).join('')+'</div>';
  }

  var aiT=isW?waiT:caiT;
  if(aiT){
    document.getElementById('aisec').innerHTML='<div class="sect">Análisis IA de tu situación</div><div class="airsec"><div class="airsect"><i class="ti ti-sparkles"></i> Lo que detectó COMPLAI</div><div class="airstxt">'+aiT.replace(/\n/g,'<br>')+'</div></div>';
  }

  var fe=document.getElementById('finds');fe.innerHTML='';
  fcols.slice(0,isW?7:6).forEach(function(col,i){
    if(!col||!fdata[i]||!fdata[i][col])return;
    var d=fdata[i][col];
    var el=document.createElement('div');el.className='fi '+col;
    var ic=col==='red'?'ti-alert-circle':col==='amber'?'ti-alert-triangle':'ti-check';
    el.innerHTML='<i class="ti '+ic+' fic"></i><div><div class="ft">'+d.t+'</div><div class="fd">'+d.d+'</div></div>';
    fe.appendChild(el);
  });

  var ae=document.getElementById('acts');ae.innerHTML='';
  var actsD=isW?ACTIONS.worker:ACTIONS.company;
  actsD[level].forEach(function(a){
    var el=document.createElement('div');el.className='act';
    el.innerHTML='<i class="ti ti-arrow-right" style="color:#185FA5;flex-shrink:0;margin-top:2px"></i>'+a;
    ae.appendChild(el);
  });

  var ab=document.getElementById('askb');
  ab.className='askbtn '+(isW?'r':'b');
  ab.textContent=isW?'Quiero saber más sobre mis derechos →':'Quiero proteger mi empresa ante una inspección →';
  ab.onclick=function(){
    window.open('https://www.google.com/search?q=abogado+laboralista+autónomos+España','_blank');
  };
}

function rst(){
  mode=null;wc=0;cc=0;
  wa=Array(WN).fill(null);wsc=Array(WN).fill(0);wcl=Array(WN).fill(null);
  ca=Array(CN).fill(null);csc=Array(CN).fill(0);ccl=Array(CN).fill(null);
  waiT='';caiT='';
  document.getElementById('mscreen').style.display='block';
  ['qw','qc','res'].forEach(function(id){document.getElementById(id).classList.remove('show');});
  document.querySelectorAll('.opt').forEach(function(el){el.classList.remove('sr','sb');});
  ['ws0','ws1','ws2','ws3','ws4','ws5','ws6','ws7'].forEach(function(id,i){
    document.getElementById(id).classList.toggle('active',i===0);
  });
  ['cs0','cs1','cs2','cs3','cs4','cs5','cs6'].forEach(function(id,i){
    document.getElementById(id).classList.toggle('active',i===0);
  });
  ['wtxt','ctxt'].forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('wcn').textContent='0';
  document.getElementById('ccn').textContent='0';
  ['wai','cai'].forEach(function(id){document.getElementById(id).classList.remove('show');});
  ['waib','caib'].forEach(function(id){
    var el=document.getElementById(id);
    el.style.display='none';el.disabled=false;
  });
  document.getElementById('wnxt').disabled=true;
  document.getElementById('wnxt').innerHTML='Siguiente <i class="ti ti-arrow-right"></i>';
  document.getElementById('cnxt').disabled=true;
  document.getElementById('cnxt').innerHTML='Siguiente <i class="ti ti-arrow-right"></i>';
  document.getElementById('rsec').innerHTML='';
  document.getElementById('aisec').innerHTML='';
  document.getElementById('pw').style.width='0%';
  document.getElementById('pc').style.width='0%';
  document.getElementById('wbk').style.visibility='hidden';
  document.getElementById('cbk').style.visibility='hidden';
  document.getElementById('wctr').textContent='1 de 8';
  document.getElementById('cctr').textContent='1 de 7';
}
