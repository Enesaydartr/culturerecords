with open("public/_redirects", "w", encoding="utf-8") as f:
    f.write("/* /index.html 200\n")

print("public/_redirects created for Netlify and Cloudflare Pages!")
