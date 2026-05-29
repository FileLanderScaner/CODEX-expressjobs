# ExpressJobs Public Calls Radar

`PRODUCTION_STATUS=NO-GO_PRODUCTION`

## Alcance V1

`/llamados-publicos` agrega un radar seguro de referencias a llamados publicos, concursos y oportunidades oficiales de Uruguay. La primera version usa datos semilla/manuales, fuente visible y enlaces externos al sitio oficial o a paginas oficiales generales.

## Que Hace

- Muestra referencias manuales a fuentes publicas/oficiales.
- Expone filtros frontend por palabra clave, categoria, estado y cierre proximo.
- Muestra fuente externa visible y boton `Ver llamado oficial`.
- Conecta cada card con Caso Claro para preparar postulaciones por WhatsApp.
- Incluye paquetes de preparacion documental: revision rapida, preparacion de postulacion y carpeta completa.
- Aclara que los datos son de muestra para piloto controlado.

## Que No Hace

- No scrapea Uruguay Concursa ni terceros.
- No usa crawler, cron, API route de extraccion, Puppeteer, Cheerio, Axios ni automatizacion externa.
- No copia bases completas ni contenido extenso de llamados externos.
- No afirma vigencia, cupos, requisitos finales ni fechas sin fuente oficial.
- No administra, representa ni se afilia con Uruguay Concursa, ONSC, gub.uy, Udelar u organismos publicos.
- No activa pagos reales, PayPal live ni checkout.

## Politica de Fuentes Externas

- Cada referencia debe incluir `sourceName` y `sourceUrl`.
- Si no se valida una URL concreta de un llamado real, usar una URL general oficial y marcar estado `referencia`.
- Los usuarios deben verificar bases, fechas, requisitos y postulacion en la fuente oficial.
- La integracion automatica solo puede evaluarse en una fase futura con permiso, API, datos abiertos, RSS/feed autorizado o convenio.

## Conexion con Caso Claro

Caso Claro ofrece apoyo documental para postulaciones:

- Revision rapida de requisitos.
- Checklist de documentos.
- Carpeta para concurso.
- CV, carta o resumen.
- Control de fechas.
- Consulta por WhatsApp.

Precios piloto:

- Revision rapida de llamado: `UYU 800`.
- Preparacion de postulacion: `UYU 1.500`.
- Carpeta completa para concurso: desde `UYU 3.500`.

## Checklist QA

- `/llamados-publicos` carga en desktop y mobile.
- Navegacion desktop/mobile muestra `Llamados públicos`.
- Home muestra teaser sin eliminar `Publicar tarea`, `Buscar trabajos`, `Crear cuenta` ni `Crear perfil`.
- Cada card muestra fuente y enlace externo.
- WhatsApp CTA usa `publicSalesContact.whatsappNumber`.
- No hay scraping, cron ni API route de importacion.
- No hay afirmacion de afiliacion ni representacion de organismos publicos.
- `PRODUCTION_STATUS=NO-GO_PRODUCTION`.

## Proximos Pasos Para Integracion Autorizada

Modo recomendado: `EXPRESSJOBS_PUBLIC_CALLS_AUTHORIZED_IMPORT_RESEARCH`.

Investigar sin ejecutar scraping:

- Si existe API oficial.
- Si hay datos abiertos relacionados.
- Si existe RSS/feed autorizado.
- Condiciones de uso.
- `robots.txt`.
- Alternativa manual o semiautorizada.
- Posibilidad de convenio o integracion oficial.
