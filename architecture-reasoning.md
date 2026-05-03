# A. Razonamiento sobre Modelos de Datos: Suplementos de Longevidad High-Ticket

## ¿Por qué este nicho necesita un esquema diferente al de un e-commerce genérico?

Un e-commerce de moda o electrónica vende objetos. Un e-commerce de suplementos de
longevidad vende **confianza científica, resultados medibles y continuidad**. Esas tres
dimensiones fuerzan entidades de datos que Shopify o WooCommerce nunca modelaron bien.

---

## Paso 1 — Identificar las tensiones únicas del nicho

| Tensión | Implicación en datos |
|---|---|
| El cliente no puede ver/tocar el producto antes de comprarlo | Necesitamos evidencia digitalizada: COA, certificaciones, referencias científicas |
| La FDA prohíbe claims de curación | Los beneficios deben estar modelados con precisión (biomarkers, no "cura enfermedades") |
| El margen viene de la suscripción, no del pedido único | Subscription como entidad de primera clase, no como campo en Order |
| El diferenciador es la dosis clínica, no el precio | Cada ingrediente debe llevar su dosis, rango clínico de referencia y estudios que lo respaldan |
| Vendemos un protocolo de 90 días, no botellas sueltas | Protocol como entidad separada que orquesta productos, check-ins y biomarkers |
| El resultado medible es el activo de marketing más poderoso | BiomarkerLog vinculado al usuario y al protocolo para generar testimonios verificables |

---

## Paso 2 — Entidades que un e-commerce normal NO tiene

### `BatchCOA` (Certificate of Analysis por lote)
Un e-commerce normal tiene imágenes de producto. Nosotros necesitamos un documento de
laboratorio independiente por número de lote, con resultados de identidad, potencia,
microbiología y metales pesados. Esta entidad es el corazón de la estrategia "Glass Box Brand".

**Campos críticos que no existen en plataformas genéricas:**
- `batchNumber` — vincula el empaque físico (QR) con el registro digital
- `testingLab` — nombre del laboratorio independiente (no el fabricante)
- `documentUrl` — PDF del COA real, no un resumen
- `heavyMetalsFree`, `potencyVerified`, `microbiologicalClean` — booleanos para
  mostrar en UI un semáforo de seguridad por lote

### `ProductIngredient` (tabla puente enriquecida)
Un e-commerce normal pone los ingredientes como texto plano en la descripción. Aquí cada
ingrediente es una fila con:
- `amountMg` — dosis exacta por porción
- `clinicalDoseMin` / `clinicalDoseMax` — rango de la literatura científica
- `isClinicalDose` — booleano calculable para mostrar el badge "Dosis Clínica Verificada"
- `pubmedStudyIds[]` — array de IDs de PubMed que respaldan esa dosis
- `isProprietaryBlend` — si es `true`, el badge no se muestra (transparencia forzada)

### `Protocol` + `ProtocolProduct` + `ProtocolEnrollment`
Esta tríada no existe en ninguna plataforma genérica porque ninguna vende "sistemas". Un
protocolo orquesta qué productos se toman, en qué orden, qué biomarkers debe mejorar y
cuándo se hace el check-in. Esto convierte una compra de $79 en una compra de $497.

### `BiomarkerLog`
Los reviews en e-commerces genéricos son texto subjetivo. Aquí el cliente puede loguear
HRV, sleep score, VO2 max con fecha, origen (Oura, Whoop, manual) y nota. Esto genera:
1. Prueba social cuantitativa ("HRV +15% en 60 días")
2. Datos para los check-ins del protocolo
3. Contenido de marketing basado en resultados reales

### `ScientificAdvisor` + `AdvisorArticle`
El experto es un activo de marca que ningún competidor puede copiar sin contratar a la
misma persona. Modelarlo como entidad permite vincularlo a protocolos específicos,
mostrar sus credenciales verificables y publicar contenido educativo bajo su nombre.

---

## Paso 3 — Tabla `Product`: campos específicos del nicho

| Campo | Tipo | Por qué existe |
|---|---|---|
| `servingSize` | String | "2 cápsulas" — requerido en etiquetado |
| `servingsPerContainer` | Int | Calcula duración del suministro |
| `form` | Enum | CAPSULE / POWDER / LIQUID — afecta biodisponibilidad |
| `manufacturerName` | String | Transparencia radical |
| `isCGMPCertified` | Boolean | Current Good Manufacturing Practice — FDA |
| `primaryBiomarker` | String | "NAD+" — para filtros y SEO de ingrediente |
| `targetBiomarkers` | String[] | Array de métricas que mejora el producto |
| `clinicalDoseVerified` | Boolean | Computed from ingredients, used in UI |

### Campos que un e-commerce genérico tiene pero aquí son insuficientes:
- `description` (Text) — aquí lleva el mecanismo de acción científico
- `images` — aquí incluyen imágenes del laboratorio y del COA

---

## Paso 4 — Tabla `Order`: campos específicos del nicho

| Campo | Tipo | Por qué existe |
|---|---|---|
| `guaranteeExpiresAt` | DateTime | La garantía de 90 días es parte del argumento de venta; debe ser rastreable |
| `guaranteeClaimedAt` | DateTime | Para calcular tasa de devolución real y auditar el claim |
| `subscriptionId` | String? | Una orden puede ser generada por una suscripción activa |

### Implicación en el flujo de checkout:
La orden puede contener: (a) productos individuales, (b) un protocolo completo o
(c) ítems de una suscripción renovada. El campo `isProtocol` en `OrderItem` y la
FK opcional a `Protocol` resuelven esta ambigüedad sin duplicar tablas.

---

## Conclusión del razonamiento

El esquema resultante tiene **17 modelos** vs los ~6 de un e-commerce básico. El
incremento refleja exactamente el valor que el cliente está pagando cuando elige este
nicho sobre Amazon: transparencia verificable, un sistema de resultados medibles y
una relación a largo plazo a través de la suscripción.
