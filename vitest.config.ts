import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // The browser tests in e2e/ run with Playwright.
      include: ["src/**/*.test.{ts,tsx}"],
    },
  }),
);
