with open("vite.config.ts", "r", encoding="utf-8") as f:
    content = f.read()

target = """export default defineConfig({
  plugins: [react(), bubiletApiPlugin(), audioTrimmerPlugin()],"""

replacement = """export default defineConfig({
  base: "./",
  plugins: [react(), bubiletApiPlugin(), audioTrimmerPlugin()],"""

if target in content:
    content = content.replace(target, replacement)
    with open("vite.config.ts", "w", encoding="utf-8") as f:
        f.write(content)
    print("vite.config.ts updated with base: './'")
else:
    print("target not found")
