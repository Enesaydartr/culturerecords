with open("src/index.css", "r", encoding="utf-8") as f:
    content = f.read()

mobile_css = """
/* iOS Safe Area & Mobile Touch Utilities */
.safe-area-pb {
  padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
}

@media (max-width: 640px) {
  input, textarea, select {
    font-size: 16px !important; /* Prevents auto-zoom on iOS Safari */
  }
  
  /* Smooth touch scrolling */
  * {
    -webkit-tap-highlight-color: transparent;
  }
}
"""

if ".safe-area-pb" not in content:
    content += "\n" + mobile_css

with open("src/index.css", "w", encoding="utf-8") as f:
    f.write(content)

print("index.css updated with mobile touch and safe-area styles!")
