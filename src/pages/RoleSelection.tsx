import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Hammer, Home } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "../components/LanguageSelector";

const RoleSelection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="absolute top-6 right-6">
          <LanguageSelector />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("welcomeTitle")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("welcomeSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contractor Card */}
          <Card className="p-8 bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all group">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Hammer className="h-10 w-10 text-primary" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {t("contractorTitle")}
                </h2>
                <p className="text-muted-foreground">
                  {t("contractorDesc")}
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                onClick={() => navigate("/login")}
              >
                {t("contractorButton")}
              </Button>
            </div>
          </Card>

          {/* Homeowner Card */}
          <Card className="p-8 bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all group">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Home className="h-10 w-10 text-primary" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {t("homeownerTitle")}
                </h2>
                <p className="text-muted-foreground">
                  {t("homeownerDesc")}
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                onClick={() => navigate("/login")}
              >
                {t("homeownerButton")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
