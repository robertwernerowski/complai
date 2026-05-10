// COMPLAI — data.js
// Language system: ES (default) + EN

var LANG = 'es';

function t(es, en) { return LANG === 'en' ? en : es; }

// ─── QUIZ STEPS ──────────────────────────────────────────────────────────────

var QUIZ_STEPS_ES = {
  worker: [
    { title:'¿Facturas casi todo tu dinero a una sola empresa?', desc:'Es la señal más potente. La Seguridad Social cruza automáticamente los datos de facturación para detectar autónomos con un único cliente habitual.', note:'Inspector: cruza tus facturas con la AEAT para detectar dependencia económica total.',
      options:[{text:'Sí, casi todo mi dinero viene de una empresa',sub:'Señal fuerte de falso autónomo',score:25,color:'red'},{text:'Un cliente representa más del 75% de mis ingresos',sub:'Señal moderada — posible TRADE no declarado',score:10,color:'amber'},{text:'Tengo varios clientes con ingresos distribuidos',sub:'Sin señal de dependencia económica',score:0,color:'green'}]},
    { title:'¿La empresa te da órdenes o te supervisa directamente?', desc:'La dependencia — estar bajo el círculo rector del empresario — es el criterio central del Estatuto de los Trabajadores para definir una relación laboral.', note:'Inspector: busca emails con instrucciones directas, mensajes de supervisores, asistencia a reuniones de equipo.',
      options:[{text:'Sí, recibo instrucciones directas y me supervisan',sub:'Dependencia clara — señal fuerte',score:20,color:'red'},{text:'Hay cierta supervisión pero también tengo autonomía',sub:'Situación mixta',score:8,color:'amber'},{text:'Organizo mi trabajo de forma completamente independiente',sub:'Sin señal de dependencia',score:0,color:'green'}]},
    { title:'¿Tienes un horario fijo que la empresa define?', desc:'Si actúas dentro del ámbito de dirección y organización de otra empresa, ya estamos hablando de una relación laboral — criterio directo del inspector.',
      options:[{text:'Sí, tengo horario fijo que la empresa define',sub:'Señal clara de laboralidad',score:15,color:'red'},{text:'Tengo franjas horarias sugeridas pero con flexibilidad',sub:'Señal moderada',score:6,color:'amber'},{text:'Decido completamente mis propios horarios',sub:'Sin señal en este criterio',score:0,color:'green'}]},
    { title:'¿Usas ordenador, móvil, plataformas o email corporativo de la empresa?', desc:'Los inspectores advierten: "tener un móvil de empresa, material con el logo del despacho o facturar a través de la empresa son indicios que levantan sospechas."',
      options:[{text:'Sí, uso medios o herramientas de la empresa',sub:'Ajenidad en los medios — señal fuerte',score:15,color:'red'},{text:'Uso algunos medios de la empresa pero también los míos',sub:'Señal moderada',score:6,color:'amber'},{text:'Uso exclusivamente mis propios medios',sub:'Sin señal en este criterio',score:0,color:'green'}]},
    { title:'¿Cobras siempre la misma cantidad fija cada mes?', desc:'La Seguridad Social inicia investigaciones automáticas cuando detecta que alguien "factura cada mes la misma cantidad a una sola empresa, sin variaciones."',
      options:[{text:'Sí, mis facturas son siempre prácticamente iguales',sub:'Equivale a nómina encubierta — señal muy fuerte',score:20,color:'red'},{text:'Varía algo pero es básicamente siempre igual',sub:'Señal moderada',score:7,color:'amber'},{text:'Mis facturas varían según el trabajo real entregado',sub:'Sin señal — facturación variable correcta',score:0,color:'green'}]},
    { title:'¿La empresa te paga aunque no haya trabajo o el cliente no pague?', desc:'El inspector analiza si "el profesional asume o no el riesgo y ventura de las operaciones." Si la empresa te garantiza ingresos fijos, actúas como empleado.',
      options:[{text:'Sí, cobro aunque no haya trabajo o el cliente no pague',sub:'Sin riesgo económico propio — señal clara',score:15,color:'red'},{text:'No, si no hay trabajo no cobro y asumo los riesgos',sub:'Riesgo económico propio — indicador de autonomía',score:0,color:'green'}]},
    { title:'¿La empresa te impuso darte de alta como autónomo en lugar de contratarte?', desc:'El falso autónomo ocurre cuando una empresa "obliga a un trabajador a darse de alta en el RETA y emitir facturas, cuando en realidad actúa como empleado."',
      options:[{text:'Sí, la condición era trabajar como autónomo',sub:'Señal directa de fraude laboral',score:20,color:'red'},{text:'No exactamente pero sentí que no había otra opción',sub:'Posible presión implícita',score:8,color:'amber'},{text:'Fue mi propia decisión trabajar como autónomo',sub:'Sin señal en este criterio',score:0,color:'green'}]}
  ],
  company: [
    { title:'¿Algún autónomo trabaja exclusivamente para ti?', desc:'La Inspección detecta falsos autónomos como "personas que solo prestan servicios a una única empresa." Es el primer filtro automático del cruce de datos AEAT-Seguridad Social.', note:'Plan ITSS 2025-2027: refuerza cruce masivo de datos AEAT-SS para detectar estos casos sistemáticamente.',
      options:[{text:'Sí, uno o varios autónomos solo trabajan para mí',sub:'Riesgo alto — detectable en cruce automático de datos',score:25,color:'red'},{text:'Uno genera más del 75% de sus ingresos conmigo',sub:'Riesgo moderado — posible TRADE no declarado',score:10,color:'amber'},{text:'Todos tienen múltiples clientes y puedo acreditarlo',sub:'Sin riesgo en este criterio',score:0,color:'green'}]},
    { title:'¿Organizas tú sus horarios o les das instrucciones directas?', desc:'Si la empresa fija horarios, da instrucciones y supervisa el resultado, existe dependencia organizativa — el criterio más usado por los inspectores.', note:'Inspector: entrevistará a tus autónomos preguntando quién fija sus horarios y cómo reciben instrucciones.',
      options:[{text:'Sí, fijo sus horarios y les doy instrucciones',sub:'Riesgo alto — dependencia organizativa clara',score:20,color:'red'},{text:'Hay coordinación pero ellos organizan su propio trabajo',sub:'Riesgo moderado — documenta la autonomía',score:8,color:'amber'},{text:'Deciden completamente cómo y cuándo hacer su trabajo',sub:'Sin riesgo en este criterio',score:0,color:'green'}]},
    { title:'¿Les proporcionas ordenador, móvil, plataformas o email corporativo?', desc:'Según los inspectores: "tener un móvil de empresa, material con el logo del despacho o acceso a sistemas son indicios que levantan sospechas."',
      options:[{text:'Sí, les doy herramientas, email corporativo o accesos',sub:'Riesgo alto — ajenidad en los medios',score:15,color:'red'},{text:'Usan algunos medios míos pero también los propios',sub:'Riesgo moderado — documenta la justificación',score:8,color:'amber'},{text:'Usan exclusivamente sus propios medios',sub:'Sin riesgo en este criterio',score:0,color:'green'}]},
    { title:'¿Tus autónomos te facturan siempre la misma cantidad cada mes?', desc:'La Seguridad Social puede iniciar investigación automática cuando detecta que alguien "factura cada mes la misma cantidad a una sola empresa, sin variaciones."',
      options:[{text:'Sí, sus facturas son prácticamente iguales cada mes',sub:'Riesgo muy alto — nómina encubierta detectada automáticamente',score:20,color:'red'},{text:'Varían algo pero son básicamente iguales',sub:'Riesgo moderado',score:7,color:'amber'},{text:'Sus facturas varían según el trabajo entregado',sub:'Sin riesgo — facturación variable correcta',score:0,color:'green'}]},
    { title:'¿Pueden aceptar o rechazar trabajo libremente y está documentado?', desc:'La libertad real de rechazar encargos es uno de los pocos indicadores favorables a la autonomía reconocidos por el Tribunal Supremo. Debe estar documentada con comunicaciones escritas.',
      options:[{text:'No, tienen obligación de aceptar',sub:'Riesgo alto — dependencia manifiesta',score:20,color:'red'},{text:'Pueden rechazar pero no tenemos registros escritos',sub:'Riesgo moderado — falta documentación',score:8,color:'amber'},{text:'Sí, y tenemos comunicaciones escritas que lo demuestran',sub:'Sin riesgo — autonomía documentada',score:0,color:'green'}]},
    { title:'¿Los clientes finales contratan con tu empresa o con el autónomo directamente?', desc:'La ajenidad en el mercado significa que es tu marca la que atrae clientes. Si el autónomo es invisible para el cliente final, es un indicador de laboralidad.',
      options:[{text:'Con mi empresa — el autónomo es invisible para el cliente',sub:'Riesgo alto — ajenidad en el mercado',score:15,color:'red'},{text:'El autónomo tiene identidad propia ante el cliente',sub:'Reduce el riesgo en este criterio',score:0,color:'green'}]}
  ]
};

var QUIZ_STEPS_EN = {
  worker: [
    { title:'Do you invoice almost all your income to a single company?', desc:'This is the strongest signal. Social Security automatically cross-checks invoicing data to detect freelancers with a single regular client.', note:'Inspector: cross-references your invoices with the tax authority to detect total economic dependency.',
      options:[{text:'Yes, almost all my income comes from one company',sub:'Strong bogus self-employed signal',score:25,color:'red'},{text:'One client represents over 75% of my income',sub:'Moderate signal — possible undeclared TRADE status',score:10,color:'amber'},{text:'I have multiple clients with distributed income',sub:'No economic dependency signal',score:0,color:'green'}]},
    { title:'Does the company give you direct orders or supervise you?', desc:'Dependency — being under the employer\'s sphere of direction — is the central criterion of Spanish employment law to define an employment relationship.', note:'Inspector: looks for emails with direct instructions, supervisor messages, attendance at team meetings.',
      options:[{text:'Yes, I receive direct instructions and am supervised',sub:'Clear dependency — strong signal',score:20,color:'red'},{text:'Some oversight but I also have autonomy',sub:'Mixed situation',score:8,color:'amber'},{text:'I organise my work completely independently',sub:'No dependency signal',score:0,color:'green'}]},
    { title:'Do you have a fixed schedule set by the company?', desc:'If you operate within the management and organisational sphere of another company, this already constitutes an employment relationship — a direct inspector criterion.',
      options:[{text:'Yes, I have a fixed schedule the company defines',sub:'Clear employment signal',score:15,color:'red'},{text:'I have suggested time slots but with flexibility',sub:'Moderate signal',score:6,color:'amber'},{text:'I decide my own hours completely',sub:'No signal on this criterion',score:0,color:'green'}]},
    { title:'Do you use the company\'s computer, phone, platforms or corporate email?', desc:'Inspectors warn: "having a company phone, branded office materials or invoicing through the company are red flags that raise suspicion."',
      options:[{text:'Yes, I use the company\'s tools or equipment',sub:'Means dependency — strong signal',score:15,color:'red'},{text:'I use some company tools but also my own',sub:'Moderate signal',score:6,color:'amber'},{text:'I use exclusively my own equipment',sub:'No signal on this criterion',score:0,color:'green'}]},
    { title:'Do you always get paid the same fixed amount every month?', desc:'Social Security launches automatic investigations when it detects someone invoicing the same amount to a single company month after month with no variation.',
      options:[{text:'Yes, my invoices are always practically identical',sub:'Equivalent to hidden payslip — very strong signal',score:20,color:'red'},{text:'It varies a little but is basically always the same',sub:'Moderate signal',score:7,color:'amber'},{text:'My invoices vary according to the actual work delivered',sub:'No signal — correct variable billing',score:0,color:'green'}]},
    { title:'Does the company pay you even when there\'s no work or a client doesn\'t pay?', desc:'The inspector analyses whether the professional bears the economic risk of operations. If the company guarantees fixed income, you are acting as an employee.',
      options:[{text:'Yes, I get paid even when there\'s no work or client default',sub:'No personal economic risk — clear signal',score:15,color:'red'},{text:'No, if there\'s no work I don\'t get paid and bear the risk',sub:'Personal economic risk — indicator of genuine autonomy',score:0,color:'green'}]},
    { title:'Did the company require you to register as self-employed instead of hiring you?', desc:'Bogus self-employment occurs when a company forces a worker to register as self-employed and issue invoices, when in reality they act as an employee.',
      options:[{text:'Yes, working as self-employed was the condition',sub:'Direct signal of employment fraud',score:20,color:'red'},{text:'Not exactly, but I felt there was no other option',sub:'Possible implicit pressure',score:8,color:'amber'},{text:'It was my own decision to work as self-employed',sub:'No signal on this criterion',score:0,color:'green'}]}
  ],
  company: [
    { title:'Does any freelancer work exclusively for you?', desc:'Labour inspection detects bogus self-employment as "individuals who only provide services to a single company." This is the first automatic filter of the tax authority–social security cross-check.', note:'Plan ITSS 2025-2027: reinforces mass data cross-checking to detect these cases systematically.',
      options:[{text:'Yes, one or several freelancers only work for me',sub:'High risk — detectable in automatic data cross-check',score:25,color:'red'},{text:'One generates over 75% of their income with me',sub:'Moderate risk — possible undeclared TRADE status',score:10,color:'amber'},{text:'All have multiple clients and I can document it',sub:'No risk on this criterion',score:0,color:'green'}]},
    { title:'Do you organise their schedules or give them direct instructions?', desc:'If the company sets schedules, gives instructions and supervises output, organisational dependency exists — the most commonly used criterion by inspectors.', note:'Inspector: will interview your freelancers asking who sets their schedules and how they receive instructions.',
      options:[{text:'Yes, I set their schedules and give them instructions',sub:'High risk — clear organisational dependency',score:20,color:'red'},{text:'There\'s coordination but they organise their own work',sub:'Moderate risk — document the autonomy',score:8,color:'amber'},{text:'They decide completely how and when to do their work',sub:'No risk on this criterion',score:0,color:'green'}]},
    { title:'Do you provide them with computers, phones, platforms or corporate email?', desc:'According to inspectors: "having a company phone, branded office materials or access to company systems are red flags that raise suspicion."',
      options:[{text:'Yes, I give them tools, corporate email or system access',sub:'High risk — means dependency',score:15,color:'red'},{text:'They use some of my resources but also their own',sub:'Moderate risk — document the justification',score:8,color:'amber'},{text:'They use exclusively their own equipment',sub:'No risk on this criterion',score:0,color:'green'}]},
    { title:'Do your freelancers invoice you the same amount every month?', desc:'Social Security can launch an automatic investigation when it detects someone invoicing the same amount to a single company month after month with no variation.',
      options:[{text:'Yes, their invoices are practically identical each month',sub:'Very high risk — hidden payroll auto-detected by SS',score:20,color:'red'},{text:'They vary a little but are basically always the same',sub:'Moderate risk',score:7,color:'amber'},{text:'Their invoices vary according to the work delivered',sub:'No risk — correct variable billing',score:0,color:'green'}]},
    { title:'Can they freely accept or decline work, and is it documented?', desc:'The real freedom to decline assignments is one of the few indicators of genuine autonomy recognised by the Spanish Supreme Court. It must be documented with written communications.',
      options:[{text:'No, they are obligated to accept',sub:'High risk — manifest dependency',score:20,color:'red'},{text:'They can decline but we have no written records',sub:'Moderate risk — documentation missing',score:8,color:'amber'},{text:'Yes, and we have written communications to prove it',sub:'No risk — documented autonomy',score:0,color:'green'}]},
    { title:'Do end clients contract with your company or directly with the freelancer?', desc:'Market dependency means your brand attracts the clients. If the freelancer is invisible to the end client, that is an indicator of employment.',
      options:[{text:'With my company — the freelancer is invisible to the client',sub:'High risk — market dependency',score:15,color:'red'},{text:'The freelancer has their own identity with the client',sub:'Reduces risk on this criterion',score:0,color:'green'}]}
  ]
};

var FINDINGS_ES = {
  worker: [
    {red:{t:'Dependencia económica total',d:'Facturas a un único cliente — primer filtro automático del inspector. Riesgo muy alto.'},amber:{t:'Concentración de ingresos',d:'Un cliente domina tus ingresos. Posiblemente seas TRADE no declarado.'},green:{t:'Pluriactividad demostrada',d:'Varios clientes. Tu mejor protección frente a una inspección.'}},
    {red:{t:'Dependencia organizativa',d:'Recibes órdenes directas. Criterio central del Estatuto de los Trabajadores.'},amber:{t:'Supervisión parcial',d:'Hay cierta supervisión. Documenta tu autonomía en cada encargo.'},green:{t:'Independencia organizativa',d:'Organizas tu propio trabajo. Sin señal en este criterio.'}},
    {red:{t:'Horario fijo impuesto',d:'La empresa controla tu tiempo. Señal directa de laboralidad según el TS.'},amber:{t:'Horario semidirigido',d:'Cierta flexibilidad pero condicionada. Documenta que eres tú quien decide.'},green:{t:'Horario propio',d:'Decides tus horas. Sin señal en este criterio.'}},
    {red:{t:'Medios de la empresa',d:'Usas sus herramientas. Ajenidad en los medios — criterio clave del inspector.'},amber:{t:'Medios mixtos',d:'Usas algunos medios propios. Documenta cuáles son tuyos.'},green:{t:'Medios propios',d:'Trabajas con tus herramientas. Sin señal en este criterio.'}},
    {red:{t:'Factura fija mensual',d:'Igual cada mes. La SS lo detecta automáticamente en el cruce de datos.'},amber:{t:'Facturación casi fija',d:'Poca variación. El inspector lo interpretará como nómina encubierta.'},green:{t:'Facturación variable',d:'Facturas según el trabajo real. Correcto.'}},
    {red:{t:'Sin riesgo económico propio',d:'La empresa garantiza tus ingresos. Ajenidad en los riesgos — criterio clave.'},green:{t:'Riesgo económico propio',d:'Si no hay trabajo no cobras. Indicador positivo de autonomía real.'}},
    {red:{t:'Alta en RETA impuesta',d:'Te obligaron a trabajar como autónomo. Fraude laboral directo según la ley.'},amber:{t:'Presión implícita',d:'No hubo libertad real de elección. Refuerza tu caso de reclamación.'},green:{t:'Elección propia',d:'Fue tu decisión. Sin señal en este criterio.'}}
  ],
  company: [
    {red:{t:'Dependencia económica — riesgo alto',d:'Autónomos que solo te facturan a ti. Detectable en cruce automático AEAT-SS.'},amber:{t:'Concentración de ingresos — moderado',d:'Dependencia económica elevada. Verifica si debes registrarlo como TRADE.'},green:{t:'Pluriactividad verificada',d:'Todos tienen múltiples clientes. Mantén documentación que lo acredite.'}},
    {red:{t:'Dependencia organizativa — riesgo alto',d:'Fijas horarios y das instrucciones. Criterio central de laboralidad según el TS.'},amber:{t:'Coordinación no documentada — moderado',d:'Hay cierta autonomía pero sin evidencias escritas.'},green:{t:'Autonomía organizativa acreditada',d:'Ellos organizan su trabajo. Mantén esa evidencia por escrito.'}},
    {red:{t:'Medios de la empresa — riesgo alto',d:'Les das herramientas o email corporativo. Ajenidad en los medios.'},amber:{t:'Medios mixtos — moderado',d:'Documenta la justificación de cualquier medio corporativo.'},green:{t:'Medios propios',d:'Usan sus propias herramientas. Sin riesgo en este criterio.'}},
    {red:{t:'Factura fija — riesgo muy alto',d:'Igual cada mes. Detección automática por la SS. Actúa urgentemente.'},amber:{t:'Facturación semivariable — moderado',d:'Introduce más variabilidad ligada a entregables reales.'},green:{t:'Facturación variable correcta',d:'Facturas según trabajo entregado. Conserva todos los registros.'}},
    {red:{t:'Sin libertad de rechazo — riesgo alto',d:'Dependencia manifiesta. Documenta cualquier rechazo de encargo inmediatamente.'},amber:{t:'Libertad no documentada — moderado',d:'Guarda emails de aceptación y rechazo de cada encargo.'},green:{t:'Libertad documentada',d:'Tienen comunicaciones escritas de rechazos. Guárdalas todas.'}},
    {red:{t:'Ajenidad en el mercado — riesgo alto',d:'Tu marca atrae los clientes. Uno de los cinco indicadores clave del inspector.'},green:{t:'Identidad propia del autónomo',d:'El autónomo es visible para el cliente. Reduce el riesgo.'}}
  ]
};

var FINDINGS_EN = {
  worker: [
    {red:{t:'Total economic dependency',d:'Invoicing a single client — the inspector\'s first automatic filter. Very high risk.'},amber:{t:'Income concentration',d:'One client dominates your income. You may be an undeclared TRADE.'},green:{t:'Proven multi-client activity',d:'Multiple clients. Your best protection against an inspection.'}},
    {red:{t:'Organisational dependency',d:'You receive direct orders. The central criterion of Spanish employment law.'},amber:{t:'Partial supervision',d:'Some oversight exists. Document your autonomy on each assignment.'},green:{t:'Organisational independence',d:'You organise your own work. No signal on this criterion.'}},
    {red:{t:'Fixed schedule imposed',d:'The company controls your time. Direct employment signal per the Supreme Court.'},amber:{t:'Semi-directed schedule',d:'Some flexibility but conditional. Document that you decide your hours.'},green:{t:'Own schedule',d:'You decide your hours. No signal on this criterion.'}},
    {red:{t:'Company means',d:'You use their tools. Means dependency — a key inspector criterion.'},amber:{t:'Mixed means',d:'You use some of your own. Document which equipment is yours.'},green:{t:'Own means',d:'You work with your own tools. No signal on this criterion.'}},
    {red:{t:'Fixed monthly invoice',d:'Same every month. Social Security detects this automatically in the data cross-check.'},amber:{t:'Near-fixed billing',d:'Little variation. The inspector will interpret this as a hidden payslip.'},green:{t:'Variable billing',d:'You invoice for actual work done. Correct.'}},
    {red:{t:'No personal economic risk',d:'The company guarantees your income. Risk dependency — a key criterion.'},green:{t:'Personal economic risk',d:'If there\'s no work you don\'t get paid. Positive autonomy indicator.'}},
    {red:{t:'Forced self-employed registration',d:'You were made to work as self-employed. Direct employment fraud under the law.'},amber:{t:'Implicit pressure',d:'No real freedom of choice. Strengthens your claim.'},green:{t:'Own choice',d:'It was your decision. No signal on this criterion.'}}
  ],
  company: [
    {red:{t:'Economic dependency — high risk',d:'Freelancers who only invoice you. Detectable in automatic AEAT–SS cross-check.'},amber:{t:'Income concentration — moderate',d:'High economic dependency. Check whether you must register them as TRADE.'},green:{t:'Verified multi-client activity',d:'All have multiple clients. Keep documentation to prove it.'}},
    {red:{t:'Organisational dependency — high risk',d:'You set schedules and give instructions. Central employment criterion per the Supreme Court.'},amber:{t:'Undocumented coordination — moderate',d:'Some autonomy exists but no written evidence.'},green:{t:'Documented organisational autonomy',d:'They organise their own work. Keep that evidence in writing.'}},
    {red:{t:'Company means — high risk',d:'You provide tools or corporate email. Means dependency.'},amber:{t:'Mixed means — moderate',d:'Document the justification for any corporate resource.'},green:{t:'Own means',d:'They use their own tools. No risk on this criterion.'}},
    {red:{t:'Fixed invoice — very high risk',d:'Same every month. Automatic Social Security detection. Act urgently.'},amber:{t:'Semi-variable billing — moderate',d:'Introduce more variability tied to real deliverables.'},green:{t:'Correct variable billing',d:'Invoices vary by work delivered. Keep all records.'}},
    {red:{t:'No freedom to decline — high risk',d:'Manifest dependency. Document any declined assignment immediately.'},amber:{t:'Undocumented freedom — moderate',d:'Keep emails of accepted and declined assignments.'},green:{t:'Documented freedom',d:'Written records of declined work exist. Keep them all.'}},
    {red:{t:'Market dependency — high risk',d:'Your brand attracts clients. One of the five key inspector indicators.'},green:{t:'Freelancer\'s own identity',d:'The freelancer is visible to the client. Reduces risk.'}}
  ]
};

var ACTIONS_ES = {
  worker: {
    low: ['Documenta activamente tu relación con cada cliente — correos, contratos, registros de trabajo entregado.','Mantén siempre facturas variables que reflejen el trabajo real de cada mes.','Guarda evidencia de que trabajas con tus propios medios y que decides tus horarios.'],
    medium: ['Consulta con un abogado laboralista para revisar tu situación concreta.','Recopila pruebas: emails con instrucciones, registros de horarios, facturas históricas.','Diversifica tus clientes para reducir la dependencia económica de uno solo.','Puedes denunciar ante la Inspección de Trabajo — incluso de forma anónima por el Buzón de Fraude Laboral.'],
    high: ['Consulta con un abogado laboralista especializado urgentemente — tienes derechos que reclamar.','Recopila todas las pruebas: correos, mensajes, facturas, instrucciones recibidas.','Tienes derecho a reclamar cotizaciones retroactivas, vacaciones, indemnización y acceso al paro.','Puedes denunciar ante la Inspección de Trabajo de forma anónima por el Buzón de Fraude Laboral.','Protege ya tus accesos a plataformas y correos corporativos antes de perderlos.']
  },
  company: {
    low: ['Mantén documentación de la pluriactividad de tus autónomos.','Guarda todos los emails donde aceptan o rechazan encargos.','Revisa tus contratos de servicios anualmente con un especialista.'],
    medium: ['Solicita a tus autónomos que documenten por escrito su disponibilidad y otros clientes.','Introduce variabilidad en la facturación ligada a entregables reales.','Añade a tus contratos cláusulas explícitas de sustitución y libertad de aceptación.','Verifica si debes registrar como TRADE a quienes superan el 75% de dependencia.'],
    high: ['Actúa antes de recibir una inspección — el coste es mucho mayor después.','Consulta con un abogado laboralista especializado en autónomos urgentemente.','Las multas pueden alcanzar 10.000€ por trabajador más cotizaciones retroactivas con recargo del 20%.','El Plan ITSS 2025-2027 cruza datos automáticamente — si hay señales ya pueden estar en su radar.','Regulariza las situaciones más evidentes antes de que la Inspección las detecte.']
  }
};

var ACTIONS_EN = {
  worker: {
    low: ['Actively document your relationship with each client — emails, contracts, records of work delivered.','Always maintain variable invoices that reflect the actual work done each month.','Keep evidence that you work with your own equipment and decide your own hours.'],
    medium: ['Consult an employment lawyer to review your specific situation.','Gather evidence: emails with instructions, schedule records, historical invoices.','Diversify your clients to reduce economic dependency on a single one.','You can report to the Labour Inspection anonymously via the Buzón de Fraude Laboral.'],
    high: ['Consult a specialist employment lawyer urgently — you have rights to claim.','Gather all evidence: emails, messages, invoices, instructions received.','You are entitled to claim backdated social security contributions, holiday pay, severance and unemployment benefit.','You can report to the Labour Inspection anonymously via the Buzón de Fraude Laboral.','Protect your access to corporate platforms and emails before losing them.']
  },
  company: {
    low: ['Keep documentation of your freelancers\' multi-client activity.','Save all emails where they accept or decline assignments.','Review your service contracts annually with a specialist.'],
    medium: ['Ask your freelancers to document their availability and other clients in writing.','Introduce variability in billing tied to real deliverables.','Add explicit substitution clauses and freedom-to-decline clauses to your contracts.','Check whether you must register as TRADE anyone exceeding 75% economic dependency.'],
    high: ['Act before an inspection arrives — the cost is much greater afterwards.','Consult an employment lawyer specialising in self-employment urgently.','Fines can reach €10,000 per worker plus backdated contributions with a 20% surcharge.','Plan ITSS 2025-2027 cross-checks data automatically — if signals exist, they may already be on the radar.','Regularise the most obvious situations before the Inspection detects them.']
  }
};

var RIGHTS_ES = {
  high: [
    'Alta retroactiva en la SS — la empresa debe darte de alta con efectos de hasta 4 años atrás',
    'Pago de cotizaciones atrasadas que la empresa no ingresó, con recargos del 20%',
    'Reconocimiento de vacaciones, pagas extras y antigüedad desde el inicio de la relación',
    'Indemnización por despido equivalente a 33 días por año trabajado',
    'Acceso a la prestación por desempleo (paro) que no puedes solicitar como autónomo',
    'Cobertura por accidente laboral y baja por enfermedad del régimen general'
  ],
  medium: [
    'Derecho a revisar tu situación y reclamar si se confirma la laboralidad',
    'Posibilidad de solicitar devolución de cuotas del RETA pagadas indebidamente',
    'Acceso a todos los derechos laborales desde el inicio si un juez confirma la laboralidad'
  ]
};

var RIGHTS_EN = {
  high: [
    'Retroactive Social Security registration — the company must register you going back up to 4 years',
    'Payment of backdated contributions the company did not pay, with a 20% surcharge',
    'Recognition of holiday pay, bonuses and seniority from the start of the relationship',
    'Severance equivalent to 33 days per year worked',
    'Access to unemployment benefit you cannot claim as self-employed',
    'Coverage for workplace accidents and sick leave under the general regime'
  ],
  medium: [
    'Right to review your situation and claim if employment status is confirmed',
    'Possibility of reclaiming self-employed contributions paid without justification',
    'Access to all employment rights from the start if a court confirms employment status'
  ]
};

var PROMPTS = {
  worker: function(txt) {
    var lang = LANG === 'en' ? 'English' : 'Spanish';
    return 'You are COMPLAI, an expert in Spanish labour inspections for self-employed workers. A freelancer describes their situation and wants to know if they are a bogus self-employed worker (falso autónomo). Analyse using the five real criteria: dependencia, ajenidad en los frutos, ajenidad en el mercado, ajenidad en los riesgos, and means of production. Use Spanish Supreme Court jurisprudence 2024-2025 and Plan ITSS 2025-2027.\n\nRespond in ' + lang + '. Maximum 3-4 short paragraphs. Identify signals of bogus self-employment, rights they could claim, and the recommended first step. Clear language, no legal jargon.\n\nSituation:\n"' + txt + '"';
  },
  company: function(txt) {
    var lang = LANG === 'en' ? 'English' : 'Spanish';
    return 'You are COMPLAI, an expert in Spanish labour inspections. A company describes its relationship with freelancers and wants to know its inspection risk. Analyse using the five real criteria of the Spanish Labour Inspection: dependencia, ajenidad en los frutos, ajenidad en el mercado, ajenidad en los riesgos, and means. Use Plan ITSS 2025-2027 and Spanish Supreme Court jurisprudence.\n\nRespond in ' + lang + '. Maximum 3-4 paragraphs. Identify specific risks and give concrete recommendations to reduce them before an inspection. Clear language.\n\nSituation:\n"' + txt + '"';
  },
  contract: function(txt) {
    var lang = LANG === 'en' ? 'English' : 'Spanish';
    return 'You are COMPLAI, an expert in Spanish employment law and labour inspections. Analyse the following freelance service contract or agreement. The text may be in Spanish or English.\n\nIdentify clauses or terms that create risk of being classified as bogus self-employment (falso autónomo) under the five real criteria of the Spanish Labour Inspection: dependencia, ajenidad en los frutos, ajenidad en el mercado, ajenidad en los riesgos, ajenidad en los medios de producción.\n\nFor each problem found:\n1. Quote the problematic passage\n2. Explain why it is a risk in plain language\n3. Propose a safer alternative wording\n\nAlso highlight positive aspects of the contract that demonstrate genuine autonomy.\n\nFormat your response with sections: HIGH RISK, MODERATE RISK, POSITIVE ASPECTS, SUMMARY.\n\nRespond in ' + lang + '.\n\nContract:\n"' + txt.replace(/"/g, '\\"') + '"';
  }
};

// ─── Active language accessors ────────────────────────────────────────────────
function getQuizSteps() { return LANG === 'en' ? QUIZ_STEPS_EN : QUIZ_STEPS_ES; }
function getFindings()  { return LANG === 'en' ? FINDINGS_EN  : FINDINGS_ES; }
function getActions()   { return LANG === 'en' ? ACTIONS_EN   : ACTIONS_ES; }
function getRights()    { return LANG === 'en' ? RIGHTS_EN    : RIGHTS_ES; }

// Keep QUIZ_STEPS as a proxy for backward compatibility
Object.defineProperty(window, 'QUIZ_STEPS', { get: getQuizSteps });
Object.defineProperty(window, 'FINDINGS',   { get: getFindings });
Object.defineProperty(window, 'ACTIONS',    { get: getActions });
Object.defineProperty(window, 'RIGHTS',     { get: getRights });
