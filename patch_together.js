import fs from 'fs';
let content = fs.readFileSync('src/pages/TogetherPage.tsx', 'utf-8');
content = content.replace("import React, { useState, useEffect }", "import { useState }");
content = content.replace("const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);", "");
content = content.replace("setSelectedUnitId(unitId);", "");
content = content.replace("style={{ animationDelay: '0.5s' }}", "");
fs.writeFileSync('src/pages/TogetherPage.tsx', content);
