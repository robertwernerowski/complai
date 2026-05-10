var QUIZ_STEPS = {
  worker: [
    { title:'¿Facturas casi todo tu dinero a una sola empresa?', desc:'Es la señal más potente. La Seguridad Social cruza automáticamente los datos de facturación para detectar autónomos con un único cliente habitual.', note:'Inspector: cruza tus facturas con la AEAT para detectar dependencia económica total.',
      options:[{text:'Sí, casi todo mi dinero viene de una empresa',sub:'Señal fuerte de falso autónomo',score:25,color:'red'},{text:'Un cliente representa más del 75% de mis ingresos',sub:'Señal moderada — posible TRADE no declarado',score:10,color:'amber'},{text:'Tengo varios clientes con ingresos distribuidos',sub:'Sin señal de dependencia económica',score:0,color:'green'}]},
    { title:'¿La empresa te da órdenes o te supervisa directamente?', desc:'La dependencia — estar bajo el círculo rector del empresario — es el criterio central del Estatuto de los Trabajadores para definir una relación laboral.', note:'Inspector: busca emails con instrucciones directas, mensajes de supervisores, asistencia a reuniones de equipo.',
      options:[{text:'Sí, recibo instrucciones directas y me supervisan',sub:'Dependencia clara — señal fuerte',score:20,color:'red'},{text:'Hay cierta supervisión pero también tengo autonomía',sub:'Situación mixta',score:8,color:'amber'},{text:'Organizo mi trabajo de forma completamente independiente',sub:'Sin señal de dependencia',score:0,color:'green'}]},
    { title:'¿Tienes un horario fijo que la empresa define?', desc:'Si actúas dentro del ámbito de dirección y organización de otra empresa, ya estamos hablando de una relación laboral — criterio directo del inspector.',
      options:[{text:'Sí, tengo horario fijo que la empresa define',sub:'Señal clara de laboralidad',score:15,color:'red'},{text:'Tengo franjas horarias sugeridas pero con flexibilidad',sub:'Señal moderada',score:6,color:'amber'},{text:'Decido completamente mis propios horarios',sub:'Sin señal en este criterio',score:0,color:'green'}]},
    { title:'¿Usas ordenador, móvil, plataformas o email corporativo de la empresa?', desc:'Los inspectores advierten: "tener un móvil de empresa, material con el logo del despacho o facturar a través de la empresa son indicios que levantan sospechas."',
      options:[{text:'Sí, uso medios o herramientas de la empresa',sub:'Ajenidad en los medios — señal fuerte',score:15,color:'red'},{text:'Uso algunos medios de la empresa pero también los míos',sub:'Señal moderada',score:6,color:'amber'},{text:'Uso exclusivamente mis propios medios',sub:'Sin señal en este criterio',score:0,color:'green'}]},
    { title:'¿Cobras siempre la misma cantidad fija cada mes?', desc:'La Seguridad Social inicia investigaciones automáticas cuando detecta que alguien "factura cada mes la misma cantidad a una sola empresa, sin variaciones." Este fue uno de los primeros indicadores en el Plan ITSS 2025-2027.',
      options:[{text:'Sí, mis facturas son siempre prácticamente iguales',sub:'Equivale a nómina encubierta — señal muy fuerte',score:20,color:'red'},{text:'Varía algo pero es básicamente siempre igual',sub:'Señal moderada',score:7,color:'amber'},{text:'Mis facturas varían según el trabajo real entregado',sub:'Sin señal — facturación variable correcta',score:0,color:'green'}]},
    { title:'¿La empresa te paga aunque no haya trabajo o el cliente no pague?', desc:'El inspector analiza si "el profesional asume o no el riesgo y ventura de las operaciones." Si la empresa te garantiza ingresos fijos, actúas como empleado.',
      options:[{text:'Sí, cobro aunque no haya trabajo o el cliente no pague',sub:'Sin riesgo económico propio — señal clara',score:15,color:'red'},{text:'No, si no hay trabajo no cobro y asumo los riesgos',sub:'Riesgo económico propio — indicador de autonomía',score:0,color:'green'}]},
    { title:'¿La empresa te impuso darte de alta como autónomo en lugar de contratarte?', desc:'El falso autónomo ocurre cuando una empresa "obliga a un trabajador a darse de alta en el RETA y emitir facturas, cuando en realidad actúa como empleado." Esto ahorra a la empresa un 30% en costes de Seguridad Social.',
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

var FINDINGS = {
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

var ACTIONS = {
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

var RIGHTS = {
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

var PROMPTS = {
  worker: function(txt) {
    return 'Eres COMPLAI, experto en inspecciones de trabajo de autónomos en España. Un trabajador autónomo describe su situación y quiere saber si es un falso autónomo. Analiza usando los cinco criterios reales: dependencia, ajenidad en los frutos, ajenidad en el mercado, ajenidad en los riesgos, y medios de producción. Usa jurisprudencia del TS español 2024-2025 y el Plan ITSS 2025-2027.\n\nResponde en español. Máximo 3-4 párrafos cortos. Identifica señales de falso autónomo, qué derechos podría reclamar y primer paso recomendado. Lenguaje claro, sin jerga legal.\n\nSituación:\n"' + txt + '"';
  },
  company: function(txt) {
    return 'Eres COMPLAI, experto en inspecciones de trabajo en España. Una empresa describe su relación con autónomos y quiere saber su riesgo de inspección. Analiza usando los cinco criterios reales de la Inspección de Trabajo: dependencia, ajenidad en los frutos, ajenidad en el mercado, ajenidad en los riesgos, y medios. Usa el Plan ITSS 2025-2027 y jurisprudencia del TS español.\n\nResponde en español. Máximo 3-4 párrafos. Identifica riesgos específicos y da recomendaciones concretas para reducirlos antes de una inspección. Lenguaje claro.\n\nSituación:\n"' + txt + '"';
  },
  contract: function(txt) {
    return 'Eres COMPLAI, experto en derecho laboral español y en inspecciones de trabajo. Analiza el siguiente contrato o acuerdo de servicios de un autónomo en España. El texto puede estar en español o en inglés.\n\nIdentifica cláusulas o términos que creen riesgo de ser clasificado como falso autónomo según los cinco criterios reales de la Inspección de Trabajo española: dependencia, ajenidad en los frutos, ajenidad en el mercado, ajenidad en los riesgos, ajenidad en los medios de producción.\n\nPara cada problema encontrado:\n1. Cita el fragmento problemático\n2. Explica por qué es un riesgo en lenguaje claro\n3. Propón una alternativa de redacción más segura\n\nTambién señala los aspectos positivos del contrato que demuestran autonomía genuina.\n\nFormatea tu respuesta con secciones: RIESGO ALTO, RIESGO MODERADO, ASPECTOS POSITIVOS, RESUMEN.\n\nResponde siempre en español.\n\nContrato:\n"' + txt.replace(/"/g, '\\"') + '"';
  }
};
