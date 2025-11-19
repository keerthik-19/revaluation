import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Hammer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

const RoleSelectionNew = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="absolute top-6 right-6">
          <LanguageSelector />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{color: '#10B981'}}>
            {t("welcomeTitle")}
          </h1>
          <p className="text-xl" style={{color: '#10B981'}}>
            {t("welcomeSubtitle")}
          </p>
        </div>

        <div className="flex items-center justify-center">
          {/* Contractor Card */}
          <Card className="p-8 bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all cursor-pointer group max-w-md">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Hammer className="h-10 w-10 text-primary" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{color: '#10B981'}}>
                  {t("contractorTitle")}
                </h2>
                <p style={{color: '#10B981'}}>
                  {t("contractorDesc")}
                </p>
              </div>

              <Button
                size="lg"
                className="w-full"
                style={{backgroundColor: '#059669', color: 'white'}}
                onClick={() => navigate("/contractor/auth")}
              >
                {t("contractorButton")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionNew;
