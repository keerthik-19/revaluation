import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "./ui/button";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "EN", name: "English" },
    { code: "es", label: "ES", name: "Español" },
    { code: "fr", label: "FR", name: "Français" },
    { code: "de", label: "DE", name: "Deutsch" },
    { code: "zh", label: "中", name: "中文" },
  ];

  return (
    <div className="flex items-center gap-2 border border-border rounded-md p-1 bg-card">
      <Globe className="h-4 w-4 ml-2" style={{color: '#10B981'}} />
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage(lang.code as any)}
          className="h-7 px-2 text-xs"
          style={language === lang.code ? {backgroundColor: '#059669', color: 'white'} : {color: '#10B981'}}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
