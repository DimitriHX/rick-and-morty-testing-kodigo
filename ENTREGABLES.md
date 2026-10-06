# Entregables: Garantizar la calidad y estabilidad del software mediante la implementación de una pirámide de pruebas automatizadas

**Actividad:** Práctica individual  
**Descripción:** Desarrollar competencias en pruebas unitarias automatizadas aplicadas a un proyecto real con Next.js y React, utilizando Vitest como framework de testing. Diseñar suites de pruebas efectivas, medir la cobertura de código y garantizar la calidad del software mediante métricas objetivas y reproducibles.

---

## 🛠️ Cumplimiento de Requisitos Técnicos

| Requisito Técnico | Estado | Detalle de Implementación |
|---|:---:|---|
| **1. Configurar Vitest como framework de pruebas** | ✅ Cumplido | Configuración establecida en `vitest.config.ts` (entorno `jsdom`, provider `v8`, alias `@/`) y `vitest.setup.ts` con `@testing-library/jest-dom/vitest`. |
| **2. Crear pruebas unitarias para componentes React** | ✅ Cumplido | Implementadas suites para componentes en `src/components/`: `CharacterCard.test.tsx` (5 tests) y `Pagination.test.tsx` (4 tests). |
| **3. Crear pruebas para funciones utilitarias y lógica de negocio** | ✅ Cumplido | Implementada suite para funciones de API en `src/lib/api.test.ts` (10 tests: `getCharacters`, `getCharacter`, `getEpisodes`). Pruebas en `src/app/` (`page.test.tsx`, `character/[id]/page.test.tsx`, `error.test.tsx`, `loading.test.tsx`, `layout.test.tsx`). |
| **4. Verificar que la cobertura mínima sea del 80%** | ✅ Cumplido | Umbral superado ampliamente, alcanzando **100%** en las 4 métricas exigidas: Statements, Branches, Functions y Lines. |
| **5. Ejecutar las pruebas mediante el comando `vitest run --coverage`** | ✅ Cumplido | Comando ejecutable y configurado en scripts (`npm run test:coverage`), con ejecución limpia y 28 pruebas exitosas. |

---

## 📊 Evidencia de Ejecución (`vitest run --coverage`)

```text
 RUN  v3.2.7 /home/dimitri/develop/proyectoRickMorty/rick-and-morty-testing-activity
      Coverage enabled with v8

 ✓ src/lib/api.test.ts (10 tests)
 ✓ src/app/loading.test.tsx (1 test)
 ✓ src/app/error.test.tsx (1 test)
 ✓ src/components/Pagination.test.tsx (4 tests)
 ✓ src/app/page.test.tsx (3 tests)
 ✓ src/components/CharacterCard.test.tsx (5 tests)
 ✓ src/app/layout.test.tsx (1 test)
 ✓ src/app/character/[id]/page.test.tsx (3 tests)

 Test Files  8 passed (8)
      Tests  28 passed (28)

 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |      100 |     100 |     100 |                   
 app               |     100 |      100 |     100 |     100 |                   
  error.tsx        |     100 |      100 |     100 |     100 |                   
  layout.tsx       |     100 |      100 |     100 |     100 |                   
  loading.tsx      |     100 |      100 |     100 |     100 |                   
  page.tsx         |     100 |      100 |     100 |     100 |                   
 ...character/[id] |     100 |      100 |     100 |     100 |                   
  page.tsx         |     100 |      100 |     100 |     100 |                   
 components        |     100 |      100 |     100 |     100 |                   
  ...acterCard.tsx |     100 |      100 |     100 |     100 |                   
  Pagination.tsx   |     100 |      100 |     100 |     100 |                   
 lib               |     100 |      100 |     100 |     100 |                   
  api.ts           |     100 |      100 |     100 |     100 |                   
-------------------|---------|----------|---------|---------|-------------------
```
