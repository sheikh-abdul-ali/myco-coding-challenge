module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				primary: "#182232",
				secondary: "#2e3846",
				error: "#FF4500",
				gray: {
					200: "hsl(0, 0%, 92.8%)"
				}
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
