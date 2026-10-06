# Entregables de la Actividad Práctica
**Actividad:** Garantizar la calidad y estabilidad del software mediante la implementación de una pirámide de pruebas automatizadas.  
**Estudiante:** DimitriHX  
**Repositorio Fork:** [https://github.com/DimitriHX/rick-and-morty-testing-activity](https://github.com/DimitriHX/rick-and-morty-testing-activity)  
**Repositorio Base:** [https://github.com/Kodigo-academic/rick-and-morty-testing-activity](https://github.com/Kodigo-academic/rick-and-morty-testing-activity)  

---

## 🛠️ Cumplimiento de Requisitos Técnicos (context.md)

| # | Requisito Técnico | Estado | Evidencia / Implementación |
|---|---|:---:|---|
| 1 | **Configurar Vitest como framework de pruebas** | ✅ CUMPLIDO | Configurado `vitest.config.ts` con provider `v8`, entorno `jsdom`, alias `@/` y setup en `vitest.setup.ts`. |
| 2 | **Crear pruebas unitarias para componentes React** | ✅ CUMPLIDO | Suites implementadas para `CharacterCard.test.tsx` (5 tests) y `Pagination.test.tsx` (4 tests). |
| 3 | **Crear pruebas para funciones utilitarias y lógica de negocio** | ✅ CUMPLIDO | Suite implementada para `src/lib/api.test.ts` (10 tests) cubriendo `getCharacters`, `getCharacter` y `getEpisodes`. Además se cubrieron Server Components async (`page.test.tsx`, `character/[id]/page.test.tsx`), `error.test.tsx`, `loading.test.tsx` y `layout.test.tsx`. |
| 4 | **Verificar que la cobertura mínima sea del 80%** | ✅ CUMPLIDO (100%) | Se obtuvo **100%** en las 4 métricas obligatorias (Statements, Branches, Functions, Lines), superando el umbral del 80% configurado en `thresholds`. |
| 5 | **Ejecutar las pruebas mediante el comando `vitest run --coverage`** | ✅ CUMPLIDO | El comando se ejecuta limpiamente con código de salida 0 sin advertencias. |

---

## 📊 Evidencia de Ejecución y Reporte de Cobertura

### Comando ejecutado:
```bash
vitest run --coverage
```

### Salida de consola:
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

---

## 🚀 Instrucciones para Subir el Fork a GitHub

Los remotos de Git han sido configurados en el proyecto:
- **`origin`**: `https://github.com/DimitriHX/rick-and-morty-testing-activity.git` (tu fork en GitHub)
- **`upstream`**: `https://github.com/Kodigo-academic/rick-and-morty-testing-activity.git` (repositorio base original)

Para subir tus cambios a tu cuenta de GitHub, ejecuta en la terminal:

```bash
cd /home/dimitri/develop/proyectoRickMorty/rick-and-morty-testing-activity

# 1. Agregar los archivos modificados y nuevos al staging
git add .

# 2. Crear el commit con los cambios
git commit -m "feat(tests): configure Vitest and implement unit tests with 100% coverage"

# 3. Subir la rama a tu fork en GitHub
git push -u origin main
```
