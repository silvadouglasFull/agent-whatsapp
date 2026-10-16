/**
 * @file eslint.config.mjs
 * @description ESLint flat configuration file with import sorting and unused code removal rules.
 */

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // Ordena os imports e exports alfabeticamente
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Desativa regras nativas padrão para evitar conflitos
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Remove automaticamente importações não utilizadas
      "unused-imports/no-unused-imports": "error",

      // Identifica variáveis não utilizadas (permite ignorar variáveis iniciadas com _)
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;