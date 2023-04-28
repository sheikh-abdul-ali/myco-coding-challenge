module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				primary: "#182232",
				secondary: "#2e3846"
			}
		}
	},
	variants: {
		extend: {}
	},
	// corePlugins: {
	// 	preflight: false
	// },
	plugins: []
};
