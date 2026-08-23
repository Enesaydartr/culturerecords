with open("vite.config.ts", "r", encoding="utf-8") as f:
    content = f.read()

target_export = """export default defineConfig({
  base: "/",
  plugins: [react(), bubiletApiPlugin(), audioTrimmerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})"""

replacement_export = """export default defineConfig({
  base: "/",
  plugins: [react(), bubiletApiPlugin(), audioTrimmerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true, // Allows ngrok, local network, and custom domains
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: true,
  }
})"""

if target_export in content:
    content = content.replace(target_export, replacement_export)
    print("vite.config.ts updated with server allowedHosts!")

with open("vite.config.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Saved vite.config.ts!")
