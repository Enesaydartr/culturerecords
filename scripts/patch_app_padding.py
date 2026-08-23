with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-red-600 selection:text-white pb-28 font-mono"',
    'className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-red-600 selection:text-white pb-36 sm:pb-28 font-mono overflow-x-hidden"'
)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App.tsx bottom padding updated!")
