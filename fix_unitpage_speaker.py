import re

with open("src/pages/UnitPage.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(
    r"line\.speaker",
    "(line as any).speaker",
    text
)

with open("src/pages/UnitPage.tsx", "w", encoding="utf-8") as f:
    f.write(text)
