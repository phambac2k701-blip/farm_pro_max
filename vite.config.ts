import { defineConfig } from "vite";

export default defineConfig({
  base:
    process.env.GITHUB_ACTIONS === "true"
      ? "/farm_pro_max/"
      : "/",
  build: {
    target: "es2022",
  },
});
