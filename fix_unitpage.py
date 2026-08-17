import re

with open("/Users/a1234/.verdent/verdent-projects/sanrio-chinese-learning/src/pages/UnitPage.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# fix getUnit import if it was there before but removed
if "getUnit" in text and "import {" in text:
    text = text.replace(", getUnit", "")

# add speaker to interface locally if missing or fix map typing
text = text.replace("k => <span", "(k: any) => <span")

with open("/Users/a1234/.verdent/verdent-projects/sanrio-chinese-learning/src/pages/UnitPage.tsx", "w", encoding="utf-8") as f:
    f.write(text)
