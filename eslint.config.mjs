import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Permite o uso explícito de `any`
      "@typescript-eslint/no-unsafe-assignment": "off", // Permite atribuições inseguras
      "@typescript-eslint/no-unsafe-call": "off", // Permite chamadas inseguras
      "@typescript-eslint/no-unsafe-member-access": "off", // Permite acesso inseguro a membros
      "@typescript-eslint/no-unsafe-return": "off", // Permite retornos inseguros
      "@typescript-eslint/no-unsafe-function-type": "off", // Desativa a regra
      "@typescript-eslint/no-unused-vars": "off"
    },
  },
];

export default eslintConfig;