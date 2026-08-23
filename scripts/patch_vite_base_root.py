with open("vite.config.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('base: "./",', 'base: "/",')

with open("vite.config.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("vite.config.ts base set to '/' for Vercel root hosting!")
