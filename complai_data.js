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
    low: [
      'Documenta activamente tu relación con cada cliente — correos, contratos, registros de trabajo entregado.',
      'Mantén siempre facturas variables que reflejen el trabajo real de cada mes.',
      'Guarda evidencia de que trabajas con tus propios medios y que decides tus horarios.'
    ],
    medium: [
      'Consulta con un abogado laboralista para revisar tu situación concreta.',
      'Recopila pruebas: emails con instrucciones, registros de horarios, facturas históricas.',
      'Diversifica tus clientes para reducir la dependencia económica de uno solo.',
      'Si crees que eres falso autónomo, puedes denunciar ante la Inspección de Trabajo o el Buzón de Fraude Laboral de la Seguridad Social.'
    ],
    high: [
      'Consulta con un abogado laboralista especializado urgentemente — tienes derechos que reclamar.',
      'Recopila todas las pruebas: correos, mensajes, facturas, instrucciones recibidas.',
      'Tienes derecho a reclamar cotizaciones retroactivas, vacaciones, indemnización y acceso al paro.',
      'Puedes denunciar ante la Inspección de Trabajo — incluso de forma anónima por el Buzón de Fraude Laboral.',
      'Protege ya tus accesos a plataformas y correos corporativos antes de perderlos.'
    ]
  },
  company: {
    low: [
      'Mantén documentación de la pluriactividad de tus autónomos.',
      'Guarda todos los emails donde aceptan o rechazan encargos.',
      'Revisa tus contratos de servicios anualmente con un especialista.'
    ],
    medium: [
      'Solicita a tus autónomos que documenten por escrito su disponibilidad y otros clientes.',
      'Introduce variabilidad en la facturación ligada a entregables reales.',
      'Añade a tus contratos cláusulas explícitas de sustitución y libertad de aceptación.',
      'Verifica si debes registrar como TRADE a quienes superan el 75% de dependencia.'
    ],
    high: [
      'Actúa antes de recibir una inspección — el coste es mucho mayor después.',
      'Consulta con un abogado laboralista especializado en autónomos urgentemente.',
      'Las multas pueden alcanzar 10.000€ por trabajador más cotizaciones retroactivas con recargo del 20%.',
      'El Plan ITSS 2025-2027 cruza datos automáticamente — si hay señales, ya pueden estar en su radar.',
      'Regulariza las situaciones más evidentes antes de que la Inspección las detecte.'
    ]
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
  }
};
