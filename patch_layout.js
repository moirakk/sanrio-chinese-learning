import fs from 'fs';

let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Add import for PinModal
if (!content.includes('PinModal')) {
    content = content.replace("import { useProfile } from '../hooks/useProfile';", "import { useProfile } from '../hooks/useProfile';\nimport PinModal from './PinModal';");
}

// Add state for PinModal
if (!content.includes('const [isPinModalOpen, setIsPinModalOpen]')) {
    content = content.replace("export default function Layout({", "import { useState } from 'react';\n\nexport default function Layout({");
    content = content.replace("const { profile, setProfile } = useProfile();", "const { profile, setProfile } = useProfile();\n  const [isPinModalOpen, setIsPinModalOpen] = useState(false);\n  const [targetProfile, setTargetProfile] = useState<'sister9' | 'sister12'>('sister12');");
    content = content.replace("const handleProfileSwitch = () => {\n    setProfile(profile === 'sister9' ? 'sister12' : 'sister9');\n  };", "const handleProfileSwitch = () => {\n    const next = profile === 'sister9' ? 'sister12' : 'sister9';\n    setTargetProfile(next);\n    setIsPinModalOpen(true);\n  };\n\n  const handlePinSuccess = () => {\n    setProfile(targetProfile);\n    setIsPinModalOpen(false);\n  };");
}

// Add PinModal to render
if (!content.includes('<PinModal')) {
    content = content.replace("</nav>\n    </div>", "</nav>\n\n      <PinModal \n        isOpen={isPinModalOpen} \n        onClose={() => setIsPinModalOpen(false)} \n        onSuccess={handlePinSuccess}\n        targetProfile={targetProfile}\n      />\n    </div>");
}

fs.writeFileSync('src/components/Layout.tsx', content);
