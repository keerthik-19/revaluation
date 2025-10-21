import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'it' | 'ar' | 'hi';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
}

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.loginAsAgent': 'Login as Agent',
    'nav.contractor': 'Contractor',
    'nav.reminders': 'Reminders',
    
    // Landing Page
    'landing.title': "Discover Your Property's True Value",
    'landing.subtitle': 'Get instant property valuations and connect with trusted professionals for your next renovation project.',
    'landing.searchPlaceholder': 'Enter your address (e.g. 123 Main Street, New York, NY 10001)',
    
    // Dashboard
    'dashboard.title': 'Your Project Dashboard',
    'dashboard.subtitle': 'Track your renovation progress and connect with your team',
    'dashboard.agentDashboard': 'Agent Dashboard',
    'dashboard.contractorDashboard': 'Contractor Dashboard',
    'dashboard.manageClients': 'Manage your clients and projects',
    'dashboard.manageJobs': 'Manage your active jobs',
    'dashboard.progress': 'Progress',
    'dashboard.complete': 'Complete',
    'dashboard.budgetRange': 'Budget Range',
    'dashboard.progressPhotos': 'Progress Photos',
    'dashboard.photos': 'photos',
    'dashboard.yourTeam': 'Your Team',
    'dashboard.agent': 'Agent',
    'dashboard.contractor': 'Contractor',
    'dashboard.welcome': 'Welcome to Assemble!',
    'dashboard.getStarted': 'Get started by creating your first project',
    'dashboard.startNewProject': 'Start New Project',
    
    // Progress Photos
    'photos.before': 'Before',
    'photos.demolition': 'Demolition',
    'photos.framing': 'Framing',
    'photos.noPhotos': 'No progress photos yet',
    'photos.uploadFirst': 'Upload First Photo',
    
    // Reminders
    'reminders.title': 'Project Reminders',
    'reminders.subtitle': 'Manage tasks and send notifications to keep your renovation on track',
    'reminders.pending': 'Pending',
    'reminders.overdue': 'Overdue',
    'reminders.allTasks': 'All Tasks',
    'reminders.completed': 'Completed',
    'reminders.sendReminder': 'Send Reminder',
    'reminders.sent': 'Sent',
    'reminders.assignedTo': 'Assigned to:',
    'reminders.due': 'Due:',
    'reminders.noTasks': 'No tasks found',
    'reminders.noCompletedTasks': 'No completed tasks yet. Check back as work progresses!',
    'reminders.noPendingTasks': 'Great! No pending tasks at the moment.',
    'reminders.noTasksCreated': 'No tasks have been created for this project yet.',
    
    // Guided Flow
    'flow.meetAgent': 'Meet Your Agent',
    'flow.chooseAgent': 'Choose an agent who specializes in your type of project',
    'flow.chooseContractor': 'Choose Your Contractor',
    'flow.selectContractor': 'Select a verified contractor for your renovation',
    'flow.scheduleConsultation': 'Schedule Your Consultation',
    'flow.bookTime': 'Book a time to discuss your project with your team',
    'flow.availableTimes': 'Available Times',
    'flow.selectDate': 'Select a date to see available times',
    'flow.back': 'Back',
    'flow.next': 'Next',
    'flow.skip': 'Skip',
    'flow.completeSetup': 'Complete Setup',
    
    // Time slots
    'time.60min': '60 min',
    'time.meetTeam': 'Meet with your agent & contractor',
    'time.reviewScope': 'Review project scope & timeline',
    'time.discussBudget': 'Discuss budget & financing options',
  },
  
  es: {
    // Navigation
    'nav.loginAsAgent': 'Iniciar como Agente',
    'nav.contractor': 'Contratista',
    'nav.reminders': 'Recordatorios',
    
    // Landing Page
    'landing.title': 'Descubre el Verdadero Valor de tu Propiedad',
    'landing.subtitle': 'Obtén valoraciones instantáneas de propiedades y conecta con profesionales de confianza para tu próximo proyecto de renovación.',
    'landing.searchPlaceholder': 'Ingresa tu dirección (ej. 123 Main Street, New York, NY 10001)',
    
    // Dashboard
    'dashboard.title': 'Panel de tu Proyecto',
    'dashboard.subtitle': 'Sigue el progreso de tu renovación y conecta con tu equipo',
    'dashboard.agentDashboard': 'Panel de Agente',
    'dashboard.contractorDashboard': 'Panel de Contratista',
    'dashboard.manageClients': 'Gestiona tus clientes y proyectos',
    'dashboard.manageJobs': 'Gestiona tus trabajos activos',
    'dashboard.progress': 'Progreso',
    'dashboard.complete': 'Completo',
    'dashboard.budgetRange': 'Rango de Presupuesto',
    'dashboard.progressPhotos': 'Fotos de Progreso',
    'dashboard.photos': 'fotos',
    'dashboard.yourTeam': 'Tu Equipo',
    'dashboard.agent': 'Agente',
    'dashboard.contractor': 'Contratista',
    'dashboard.welcome': '¡Bienvenido a Assemble!',
    'dashboard.getStarted': 'Comienza creando tu primer proyecto',
    'dashboard.startNewProject': 'Iniciar Nuevo Proyecto',
    
    // Progress Photos
    'photos.before': 'Antes',
    'photos.demolition': 'Demolición',
    'photos.framing': 'Estructura',
    'photos.noPhotos': 'Aún no hay fotos de progreso',
    'photos.uploadFirst': 'Subir Primera Foto',
    
    // Reminders
    'reminders.title': 'Recordatorios del Proyecto',
    'reminders.subtitle': 'Gestiona tareas y envía notificaciones para mantener tu renovación en el buen camino',
    'reminders.pending': 'Pendiente',
    'reminders.overdue': 'Vencido',
    'reminders.allTasks': 'Todas las Tareas',
    'reminders.completed': 'Completadas',
    'reminders.sendReminder': 'Enviar Recordatorio',
    'reminders.sent': 'Enviado',
    'reminders.assignedTo': 'Asignado a:',
    'reminders.due': 'Vence:',
    'reminders.noTasks': 'No se encontraron tareas',
    'reminders.noCompletedTasks': 'Aún no hay tareas completadas. ¡Vuelve cuando haya progreso!',
    'reminders.noPendingTasks': '¡Genial! No hay tareas pendientes por el momento.',
    'reminders.noTasksCreated': 'Aún no se han creado tareas para este proyecto.',
  },
  
  fr: {
    // Navigation
    'nav.loginAsAgent': 'Connexion en tant qu\'Agent',
    'nav.contractor': 'Entrepreneur',
    'nav.reminders': 'Rappels',
    
    // Landing Page
    'landing.title': 'Découvrez la Vraie Valeur de Votre Propriété',
    'landing.subtitle': 'Obtenez des évaluations instantanées de propriétés et connectez-vous avec des professionnels de confiance pour votre prochain projet de rénovation.',
    'landing.searchPlaceholder': 'Entrez votre adresse (ex. 123 Main Street, New York, NY 10001)',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord de Votre Projet',
    'dashboard.subtitle': 'Suivez les progrès de votre rénovation et connectez-vous avec votre équipe',
    'dashboard.agentDashboard': 'Tableau de Bord Agent',
    'dashboard.contractorDashboard': 'Tableau de Bord Entrepreneur',
    'dashboard.manageClients': 'Gérez vos clients et projets',
    'dashboard.manageJobs': 'Gérez vos travaux actifs',
    'dashboard.progress': 'Progrès',
    'dashboard.complete': 'Terminé',
    'dashboard.budgetRange': 'Fourchette Budgétaire',
    'dashboard.progressPhotos': 'Photos de Progrès',
    'dashboard.photos': 'photos',
    'dashboard.yourTeam': 'Votre Équipe',
    'dashboard.agent': 'Agent',
    'dashboard.contractor': 'Entrepreneur',
    'dashboard.welcome': 'Bienvenue chez Assemble!',
    'dashboard.getStarted': 'Commencez en créant votre premier projet',
    'dashboard.startNewProject': 'Démarrer un Nouveau Projet',
    
    // Progress Photos
    'photos.before': 'Avant',
    'photos.demolition': 'Démolition',
    'photos.framing': 'Charpente',
    'photos.noPhotos': 'Pas encore de photos de progrès',
    'photos.uploadFirst': 'Télécharger la Première Photo',
  },
  
  it: {
    // Navigation
    'nav.loginAsAgent': 'Accedi come Agente',
    'nav.contractor': 'Impresario',
    'nav.reminders': 'Promemoria',
    
    // Landing Page
    'landing.title': 'Scopri il Vero Valore della Tua Proprietà',
    'landing.subtitle': 'Ottieni valutazioni istantanee delle proprietà e connettiti con professionisti di fiducia per il tuo prossimo progetto di ristrutturazione.',
    'landing.searchPlaceholder': 'Inserisci il tuo indirizzo (es. 123 Main Street, New York, NY 10001)',
    
    // Dashboard
    'dashboard.title': 'Dashboard del Tuo Progetto',
    'dashboard.subtitle': 'Traccia i progressi della tua ristrutturazione e connettiti con il tuo team',
    'dashboard.agentDashboard': 'Dashboard Agente',
    'dashboard.contractorDashboard': 'Dashboard Impresario',
    'dashboard.manageClients': 'Gestisci i tuoi clienti e progetti',
    'dashboard.manageJobs': 'Gestisci i tuoi lavori attivi',
    'dashboard.progress': 'Progresso',
    'dashboard.complete': 'Completo',
    'dashboard.budgetRange': 'Range di Budget',
    'dashboard.progressPhotos': 'Foto del Progresso',
    'dashboard.photos': 'foto',
    'dashboard.yourTeam': 'Il Tuo Team',
    'dashboard.agent': 'Agente',
    'dashboard.contractor': 'Impresario',
    'dashboard.welcome': 'Benvenuto in Assemble!',
    'dashboard.getStarted': 'Inizia creando il tuo primo progetto',
    'dashboard.startNewProject': 'Avvia Nuovo Progetto',
  },
  
  ar: {
    // Navigation
    'nav.loginAsAgent': 'تسجيل الدخول كوكيل',
    'nav.contractor': 'مقاول',
    'nav.reminders': 'تذكيرات',
    
    // Landing Page
    'landing.title': 'اكتشف القيمة الحقيقية لعقارك',
    'landing.subtitle': 'احصل على تقييمات فورية للعقارات وتواصل مع المتخصصين الموثوقين لمشروع التجديد القادم.',
    'landing.searchPlaceholder': 'أدخل عنوانك (مثال: 123 Main Street, New York, NY 10001)',
    
    // Dashboard
    'dashboard.title': 'لوحة تحكم مشروعك',
    'dashboard.subtitle': 'تتبع تقدم تجديدك وتواصل مع فريقك',
    'dashboard.agentDashboard': 'لوحة تحكم الوكيل',
    'dashboard.contractorDashboard': 'لوحة تحكم المقاول',
    'dashboard.manageClients': 'إدارة عملائك ومشاريعك',
    'dashboard.manageJobs': 'إدارة أعمالك النشطة',
    'dashboard.progress': 'التقدم',
    'dashboard.complete': 'مكتمل',
    'dashboard.budgetRange': 'نطاق الميزانية',
    'dashboard.progressPhotos': 'صور التقدم',
    'dashboard.photos': 'صور',
    'dashboard.yourTeam': 'فريقك',
    'dashboard.agent': 'وكيل',
    'dashboard.contractor': 'مقاول',
    'dashboard.welcome': 'مرحباً بك في Assemble!',
    'dashboard.getStarted': 'ابدأ بإنشاء مشروعك الأول',
    'dashboard.startNewProject': 'بدء مشروع جديد',
  },
  
  hi: {
    // Navigation
    'nav.loginAsAgent': 'एजेंट के रूप में लॉगिन करें',
    'nav.contractor': 'ठेकेदार',
    'nav.reminders': 'रिमाइंडर',
    
    // Landing Page
    'landing.title': 'अपनी संपत्ति का वास्तविक मूल्य खोजें',
    'landing.subtitle': 'तत्काल संपत्ति मूल्यांकन प्राप्त करें और अपनी अगली नवीनीकरण परियोजना के लिए भरोसेमंद पेशेवरों से जुड़ें।',
    'landing.searchPlaceholder': 'अपना पता दर्ज करें (जैसे 123 Main Street, New York, NY 10001)',
    
    // Dashboard
    'dashboard.title': 'आपका प्रोजेक्ट डैशबोर्ड',
    'dashboard.subtitle': 'अपनी नवीनीकरण प्रगति को ट्रैक करें और अपनी टीम से जुड़ें',
    'dashboard.agentDashboard': 'एजेंट डैशबोर्ड',
    'dashboard.contractorDashboard': 'ठेकेदार डैशबोर्ड',
    'dashboard.manageClients': 'अपने ग्राहकों और परियोजनाओं का प्रबंधन करें',
    'dashboard.manageJobs': 'अपने सक्रिय कामों का प्रबंधन करें',
    'dashboard.progress': 'प्रगति',
    'dashboard.complete': 'पूर्ण',
    'dashboard.budgetRange': 'बजट रेंज',
    'dashboard.progressPhotos': 'प्रगति फोटो',
    'dashboard.photos': 'फोटो',
    'dashboard.yourTeam': 'आपकी टीम',
    'dashboard.agent': 'एजेंट',
    'dashboard.contractor': 'ठेकेदार',
    'dashboard.welcome': 'Assemble में आपका स्वागत है!',
    'dashboard.getStarted': 'अपनी पहली परियोजना बनाकर शुरुआत करें',
    'dashboard.startNewProject': 'नया प्रोजेक्ट शुरू करें',
  }
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};