with open("src/data/units.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Make sure speaker exists in ConversationItem
if "speaker?: string;" not in text:
    text = text.replace("note: string;", "note: string;\n  speaker?: string;")

with open("src/data/units.ts", "w", encoding="utf-8") as f:
    f.write(text)
