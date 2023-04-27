import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
	plugins: [
		react(),
		eslint({
			fix: true,
			failOnError: false
		})
	],
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "./src/assets"),
			core: path.resolve(__dirname, "./src/core"),
			components: path.resolve(__dirname, "./src/components"),
			data: path.resolve(__dirname, "./src/data"),
			hooks: path.resolve(__dirname, "./src/hooks"),
			services: path.resolve(__dirname, "./src/services"),
			stores: path.resolve(__dirname, "./src/stores"),
			types: path.resolve(__dirname, "./src/types"),
			theme: path.resolve(__dirname, "./src/theme"),
			utils: path.resolve(__dirname, "./src/utils"),
			"./runtimeConfig": "./runtimeConfig.browser"
		}
	},
	server: {
		port: 3000
	},
	build: {
		outDir: "./build",
		commonjsOptions: { include: [] }
	},
	optimizeDeps: {
		disabled: false
	}
});
