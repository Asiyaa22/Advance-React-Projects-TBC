cat > tailwind.config.cjs <<'EOF'
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#9333ea",
        accent: "#f59e0b"
      }
    }
  },
  plugins: []
};
EOF
