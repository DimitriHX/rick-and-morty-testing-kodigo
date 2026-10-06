# Rick and Morty Explorer 🧪

Una aplicación web moderna para explorar el universo de Rick and Morty, construida con Next.js 15, React 19 y Tailwind CSS v4.

## 🚀 Características

- **Exploración de Personajes**: Navega a través de todos los personajes de la serie con una interfaz de cuadrícula responsive.
- **Detalle de Personaje**: Información detallada de cada personaje, incluyendo origen, ubicación y episodios.
- **Paginación**: Navegación fluida entre páginas de resultados.
- **Diseño Responsive**: Optimizado para móviles, tablets y escritorio.
- **Modo Oscuro**: Interfaz oscura por defecto con estética acorde a la serie.
- **Server-Side Rendering (SSR)**: Carga rápida y SEO optimizado gracias a Next.js App Router.

## 🛠️ Tecnologías

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Biblioteca UI**: [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **API**: [The Rick and Morty API](https://rickandmortyapi.com/)
- **Tipado**: TypeScript

## 📦 Instalación y Ejecución Local

1.  **Clonar el repositorio** (o descargar el código):
    ```bash
    git clone https://github.com/DimitriHX/rick-and-morty-testing-activity.git
    cd rick-and-morty-testing-activity
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    # o
    pnpm install
    # o
    yarn install
    ```

3.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm run dev
    # o
    pnpm dev
    # o
    yarn dev
    ```

4.  Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚀 Despliegue

La forma más sencilla de desplegar esta aplicación es utilizando [Vercel](https://vercel.com/new).

1.  Sube tu código a un repositorio de GitHub, GitLab o Bitbucket.
2.  Importa el proyecto en Vercel.
3.  Vercel detectará automáticamente que es un proyecto Next.js.
4.  Haz clic en **Deploy**.

## 📂 Estructura del Proyecto

- `src/app`: Rutas de la aplicación (App Router).
  - `page.tsx`: Página principal (lista de personajes).
  - `character/[id]/page.tsx`: Página de detalle de personaje.
  - `loading.tsx` / `error.tsx`: Estados de carga y error.
  - `layout.tsx`: Layout principal con Header y Footer.
- `src/components`: Componentes reutilizables (`CharacterCard`, `Pagination`).
- `src/lib`: Lógica de cliente API (`api.ts`).
- `src/types`: Definiciones de tipos TypeScript (`rickandmorty.ts`).

## ✅ Requisitos Cumplidos

- [x] Consumo de API de Personajes.
- [x] Vista de cuadrícula con imagen, nombre, estado y especie.
- [x] Paginación.
- [x] Vista de detalle con información completa.
- [x] Lista de episodios en la vista de detalle.
- [x] Enrutamiento cliente-servidor (Next.js).
- [x] Diseño Responsive.
- [x] Loading states y manejo de errores.

---

## 🧪 Pruebas Automatizadas y Cobertura (Vitest)

Esta suite de pruebas fue diseñada para cumplir y superar el requisito de pirámide de pruebas automatizadas con una cobertura mínima del **80%** en todas las métricas (**Statements**, **Branches**, **Functions** y **Lines**).

### 🛠️ Comandos de Ejecución

```bash
# Ejecutar todas las pruebas una vez
npm test
# o con vitest directo:
npx vitest run

# Ejecutar pruebas en modo observador (watch)
npm run test:watch

# Ejecutar pruebas con reporte de cobertura (Requisito context.md)
vitest run --coverage
# o mediante npm:
npm run test:coverage
```

### 📊 Reporte de Cobertura Obtenido (V8)

```text
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

Test Files  8 passed (8)
Tests       28 passed (28)
```

### 📋 Cobertura de Suites de Prueba

1. **Lógica de Negocio y API (`src/lib/api.test.ts` - 10 tests):**
   - `getCharacters`: Default `page=1`, página personalizada, errores de respuesta (`res.ok = false`) y fallos de red.
   - `getCharacter`: Obtención por ID y manejo de errores 404/500.
   - `getEpisodes`: Array vacío sin llamar fetch, múltiples episodios, normalización de objeto a array y manejo de errores.
2. **Componentes React UI (`src/components/` - 9 tests):**
   - `CharacterCard.test.tsx`: Renderizado completo de datos, enlaces dinámicos, colores de estado (`Alive`, `Dead`, `unknown`) y fallback de estado desconocido.
   - `Pagination.test.tsx`: Deshabilitación y enlaces en primera página, página intermedia, última página y página única.
3. **App Router y Server Components (`src/app/` - 9 tests):**
   - `page.test.tsx`: Server Component async `Home` con resolución de `searchParams` y renderizado de lista y paginador.
   - `character/[id]/page.test.tsx`: Server Component async `CharacterPage` con parseo de URLs de episodios, badges y fallback de tipo `Unknown`.
   - `error.test.tsx`: Client Component con log de error y acción `reset()`.
   - `loading.test.tsx`: Verificación de estructura Skeleton con `animate-pulse`.
   - `layout.test.tsx`: Root layout con Header, navegación y Footer.

