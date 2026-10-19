/* =========================================================
   MY FLOUS — I18N (language switching)
   Three supported languages: English (default), French, Arabic.
   Static UI strings are translated via [data-i18n] / [data-i18n-placeholder]
   / [data-i18n-aria] attributes on elements in index.html; a handful of
   JS-generated strings (greeting, add-transaction modal, category editor
   title) call I18n.t() directly. Arabic also flips the document to RTL.
   ========================================================= */

'use strict';

const I18n = (() => {

  const LANGUAGES = [
    { code: 'en', native: 'English',  englishName: 'English',  dir: 'ltr', flag: 'gb' },
    { code: 'fr', native: 'Français', englishName: 'French',   dir: 'ltr', flag: 'fr' },
    { code: 'ar', native: 'العربية',   englishName: 'Arabic',    dir: 'rtl', flag: 'sa' }
  ];

  /* ---- Flag icons (simplified, generic depictions — not artwork) ---- */
  const FLAGS = {
    gb: `<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="20" fill="#00247D"/>
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" stroke-width="4"/>
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#CF142B" stroke-width="1.6"/>
      <path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" stroke-width="6.6"/>
      <path d="M15,0 V20 M0,10 H30" stroke="#CF142B" stroke-width="4"/>
    </svg>`,
    fr: `<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="20" x="0" fill="#0055A4"/>
      <rect width="10" height="20" x="10" fill="#FFFFFF"/>
      <rect width="10" height="20" x="20" fill="#EF4135"/>
    </svg>`,
    sa: `<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="20" fill="#006C35"/>
      <rect x="4" y="13.4" width="16" height="2" rx="1" fill="#FFFFFF"/>
      <path d="M20 14.4 L23.5 14.4 L20.6 13.2 Z" fill="#FFFFFF"/>
      <rect x="4" y="8.5" width="12" height="1.6" rx="0.8" fill="#FFFFFF" opacity="0.9"/>
    </svg>`
  };

  const T = {
    en: {
      'splash.tagline': 'Track every dinar',
      'brand.name': 'My Flous',
      'nav.menuAria': 'Menu', 'nav.notifAria': 'Notifications', 'nav.profileAria': 'Profile',
      'nav.home': 'Home', 'nav.history': 'History', 'nav.stats': 'Statistics', 'nav.statsShort': 'Stats',
      'nav.profile': 'Profile', 'nav.addTransactionAria': 'Add transaction',
      'common.closeMenuAria': 'Close menu', 'common.closeAria': 'Close', 'common.backAria': 'Back',
      'common.clearSearchAria': 'Clear search',
      'home.subtitle': "Here's where your money stands today",
      'home.totalBalance': 'Total balance', 'home.incomeMonth': 'Income (month)', 'home.expensesMonth': 'Expenses (month)',
      'home.myAccounts': 'My Accounts', 'home.thisMonth': 'This Month', 'home.quickActions': 'Quick Actions',
      'home.recentTransactions': 'Recent transactions',
      'home.viewIncomeAria': 'View income details in History', 'home.viewExpenseAria': 'View expense details in History',
      'account.cash': 'Cash', 'account.bank': 'Bank', 'account.savings': 'Savings',
      'common.details': 'Details', 'common.seeAll': 'See all',
      'common.income': 'Income', 'common.expense': 'Expense', 'common.expenses': 'Expenses',
      'common.transfer': 'Transfer', 'common.saved': 'Saved', 'common.remaining': 'Remaining', 'common.all': 'All',
      'common.amount': 'Amount', 'common.category': 'Category', 'common.from': 'From', 'common.to': 'To',
      'common.date': 'Date', 'common.optional': '(optional)', 'common.name': 'Name', 'common.age': 'Age',
      'common.country': 'Country', 'common.bio': 'Bio', 'common.delete': 'Delete',
      'common.areYouSure': 'Are you sure?', 'common.cancel': 'Cancel', 'common.confirm': 'Confirm',
      'common.backup': 'Backup', 'common.restore': 'Restore', 'common.danger': 'Danger',
      'history.subtitle': 'Every transaction, all in one place', 'history.searchPlaceholder': 'Search transactions...',
      'stats.subtitle': 'See where your money goes', 'stats.biggestCategory': 'Biggest category',
      'stats.noExpensesYet': 'No expenses yet', 'stats.savingRate': 'Saving rate',
      'stats.ofIncomeThisMonth': 'of income this month', 'stats.monthlyIncome': 'Monthly Income',
      'stats.monthlyExpenses': 'Monthly Expenses', 'stats.savingsGrowth': 'Savings Growth',
      'stats.expenseCategories': 'Expense Categories', 'stats.weeklySpending': 'Weekly Spending',
      'stats.monthlyReport': 'Monthly Report', 'stats.last6Months': 'Last 6 months', 'stats.last7Days': 'Last 7 days',
      'stats.thisMonthInline': 'This month',
      'report.summary': 'In {month} you earned {income} and spent {expenses}, leaving {remaining} remaining.',
      'report.topCategory': 'Most of it went to {category} ({pct}% of spending).',
      'report.spendingUp': 'Spending is up {pct}% compared to {month}.',
      'report.spendingDown': 'Spending is down {pct}% compared to {month} — nice work.',
      'report.spendingFlat': 'Spending is about flat compared to {month}.',
      'report.firstMonth': 'This is the first month with enough data to compare.',
      'report.totalIncome': 'Total income', 'report.totalExpenses': 'Total expenses',
      'report.movedToSavings': 'Moved to savings', 'report.remainingBalance': 'Remaining balance',
      'profile.subtitle': 'Your account and preferences', 'profile.changePhotoAria': 'Change profile photo',
      'profile.yourName': 'Your Name', 'profile.addDetailsBelow': 'Add your details below',
      'profile.namePlaceholder': 'e.g. Rayen', 'profile.agePlaceholder': 'e.g. 21',
      'profile.selectCountry': 'Select country', 'profile.selectCountryTitle': 'Select Country',
      'profile.searchCountryPlaceholder': 'Search country...', 'profile.occupation': 'Occupation',
      'profile.bioPlaceholder': 'Tell us a little about yourself...',
      'occupation.student': 'Student', 'occupation.pupil': 'Pupil', 'occupation.employee': 'Employee',
      'settings.title': 'Settings', 'settings.darkMode': 'Dark mode', 'settings.darkModeAria': 'Toggle dark mode',
      'settings.notifications': 'Notifications', 'settings.notificationsAria': 'Toggle notifications',
      'settings.currency': 'Currency', 'settings.expenseCategories': 'Expense categories',
      'settings.incomeCategories': 'Income categories', 'settings.exportData': 'Export data',
      'settings.importData': 'Import data', 'settings.resetData': 'Reset data', 'settings.about': 'About',
      'settings.resetConfirmTitle': 'Reset all data?',
      'settings.resetConfirmMessage': 'This permanently deletes every account, transaction, category and preference from this device. Consider exporting a backup first.',
      'settings.resetConfirmOk': 'Reset',
      'settings.resetDone': 'App data reset',
      'settings.language': 'Language', 'settings.chooseLanguage': 'Choose Language',
      'about.description': 'My Flous is a personal finance tracker that helps you follow every dinar — income, expenses, transfers and savings — across cash, bank and savings accounts, with clear monthly statistics and a private, on-device backup you fully control.',
      'about.creators': 'Creators',
      'txn.accountDestination': 'Account destination', 'txn.paidFrom': 'Paid from',
      'txn.descriptionLabel': 'Description', 'txn.descriptionPlaceholder': 'e.g. Carrefour groceries',
      'txn.addIncome': 'Add Income', 'txn.addExpense': 'Add Expense', 'txn.transferMoney': 'Transfer Money',
      'categories.manage': 'Manage Categories', 'categories.addCategory': 'Add category',
      'categories.editCategory': 'Edit Category', 'categories.namePlaceholder': 'e.g. Subscriptions',
      'categories.icon': 'Icon', 'categories.color': 'Color', 'categories.saveCategory': 'Save Category',
      'greeting.morning': 'Good Morning', 'greeting.afternoon': 'Good Afternoon', 'greeting.evening': 'Good Evening',

      'onboarding.welcomeTitle': 'Welcome to My Flous',
      'onboarding.welcomeSubtitle': 'Your money, beautifully organized. Let\u2019s set things up — it only takes a minute.',
      'onboarding.getStarted': 'Get Started',
      'onboarding.skip': 'Skip',
      'onboarding.back': 'Back',
      'onboarding.next': 'Next',
      'onboarding.stepOf': 'Step {current} of {total}',
      'onboarding.languageTitle': 'Choose your language',
      'onboarding.languageSubtitle': 'You can always change this later in Settings.',
      'onboarding.nameTitle': 'What\u2019s your name?',
      'onboarding.nameSubtitle': 'We\u2019ll use this to personalize your dashboard.',
      'onboarding.namePlaceholder': 'e.g. Rayen',
      'onboarding.countryTitle': 'Where are you based?',
      'onboarding.countrySubtitle': 'This helps us tailor currency and defaults for you.',
      'onboarding.countryButton': 'Select your country',
      'onboarding.categoryTitle': 'What best describes you?',
      'onboarding.categorySubtitle': 'This helps us tailor tips to your situation.',
      'onboarding.readyTitle': 'You\u2019re all set!',
      'onboarding.readySubtitleNamed': 'Welcome aboard, {name} — My Flous is ready to help you track every dinar.',
      'onboarding.readySubtitle': 'My Flous is ready to help you track every dinar.',
      'onboarding.startButton': 'Start Tracking',

      'tour.balanceTitle': 'Your Balance',
      'tour.balanceText': 'This card shows your total balance across cash, bank and savings, all in one glance.',
      'tour.addTitle': 'Add Transactions',
      'tour.addText': 'Tap the + button anytime to log an income, an expense, or a transfer between accounts.',
      'tour.navTitle': 'History & Statistics',
      'tour.navText': 'Browse your full transaction history and see where your money goes over time.',
      'tour.profileTitle': 'Your Profile',
      'tour.profileText': 'Manage your details, currency, categories and app settings anytime here.',
      'tour.next': 'Next',
      'tour.skip': 'Skip tour',
      'tour.done': 'Got it',
      'tour.stepOf': '{current} / {total}',
      'profile.replayTour': 'Replay app tour'
    },
    fr: {
      'splash.tagline': 'Suivez chaque dinar',
      'brand.name': 'My Flous',
      'nav.menuAria': 'Menu', 'nav.notifAria': 'Notifications', 'nav.profileAria': 'Profil',
      'nav.home': 'Accueil', 'nav.history': 'Historique', 'nav.stats': 'Statistiques', 'nav.statsShort': 'Stats',
      'nav.profile': 'Profil', 'nav.addTransactionAria': 'Ajouter une transaction',
      'common.closeMenuAria': 'Fermer le menu', 'common.closeAria': 'Fermer', 'common.backAria': 'Retour',
      'common.clearSearchAria': 'Effacer la recherche',
      'home.subtitle': "Voici où en est votre argent aujourd'hui",
      'home.totalBalance': 'Solde total', 'home.incomeMonth': 'Revenus (mois)', 'home.expensesMonth': 'Dépenses (mois)',
      'home.myAccounts': 'Mes comptes', 'home.thisMonth': 'Ce mois-ci', 'home.quickActions': 'Actions rapides',
      'home.recentTransactions': 'Transactions récentes',
      'home.viewIncomeAria': 'Voir le détail des revenus dans l\u2019historique',
      'home.viewExpenseAria': 'Voir le détail des dépenses dans l\u2019historique',
      'account.cash': 'Espèces', 'account.bank': 'Banque', 'account.savings': 'Épargne',
      'common.details': 'Détails', 'common.seeAll': 'Tout voir',
      'common.income': 'Revenu', 'common.expense': 'Dépense', 'common.expenses': 'Dépenses',
      'common.transfer': 'Virement', 'common.saved': 'Épargné', 'common.remaining': 'Restant', 'common.all': 'Tout',
      'common.amount': 'Montant', 'common.category': 'Catégorie', 'common.from': 'De', 'common.to': 'Vers',
      'common.date': 'Date', 'common.optional': '(optionnel)', 'common.name': 'Nom', 'common.age': 'Âge',
      'common.country': 'Pays', 'common.bio': 'Bio', 'common.delete': 'Supprimer',
      'common.areYouSure': 'Êtes-vous sûr(e) ?', 'common.cancel': 'Annuler', 'common.confirm': 'Confirmer',
      'common.backup': 'Sauvegarde', 'common.restore': 'Restaurer', 'common.danger': 'Danger',
      'history.subtitle': 'Toutes vos transactions, au même endroit', 'history.searchPlaceholder': 'Rechercher des transactions...',
      'stats.subtitle': 'Voyez où va votre argent', 'stats.biggestCategory': 'Plus grande catégorie',
      'stats.noExpensesYet': 'Aucune dépense pour le moment', 'stats.savingRate': "Taux d'épargne",
      'stats.ofIncomeThisMonth': 'des revenus de ce mois', 'stats.monthlyIncome': 'Revenus mensuels',
      'stats.monthlyExpenses': 'Dépenses mensuelles', 'stats.savingsGrowth': "Croissance de l'épargne",
      'stats.expenseCategories': 'Catégories de dépenses', 'stats.weeklySpending': 'Dépenses hebdomadaires',
      'stats.monthlyReport': 'Rapport mensuel', 'stats.last6Months': '6 derniers mois', 'stats.last7Days': '7 derniers jours',
      'stats.thisMonthInline': 'Ce mois-ci',
      'report.summary': 'En {month}, vous avez gagné {income} et dépensé {expenses}, laissant {remaining} restant.',
      'report.topCategory': 'La majeure partie est allée à {category} ({pct}% des dépenses).',
      'report.spendingUp': 'Les dépenses ont augmenté de {pct}% par rapport à {month}.',
      'report.spendingDown': 'Les dépenses ont baissé de {pct}% par rapport à {month} — bon travail.',
      'report.spendingFlat': 'Les dépenses sont globalement stables par rapport à {month}.',
      'report.firstMonth': "C'est le premier mois avec assez de données pour comparer.",
      'report.totalIncome': 'Revenus totaux', 'report.totalExpenses': 'Dépenses totales',
      'report.movedToSavings': "Transféré vers l'épargne", 'report.remainingBalance': 'Solde restant',
      'profile.subtitle': 'Votre compte et vos préférences', 'profile.changePhotoAria': 'Changer la photo de profil',
      'profile.yourName': 'Votre nom', 'profile.addDetailsBelow': 'Ajoutez vos informations ci-dessous',
      'profile.namePlaceholder': 'ex. Rayen', 'profile.agePlaceholder': 'ex. 21',
      'profile.selectCountry': 'Sélectionner un pays', 'profile.selectCountryTitle': 'Sélectionner un pays',
      'profile.searchCountryPlaceholder': 'Rechercher un pays...', 'profile.occupation': 'Occupation',
      'profile.bioPlaceholder': 'Parlez-nous un peu de vous...',
      'occupation.student': 'Étudiant', 'occupation.pupil': 'Élève', 'occupation.employee': 'Employé',
      'settings.title': 'Paramètres', 'settings.darkMode': 'Mode sombre', 'settings.darkModeAria': 'Activer le mode sombre',
      'settings.notifications': 'Notifications', 'settings.notificationsAria': 'Activer les notifications',
      'settings.currency': 'Devise', 'settings.expenseCategories': 'Catégories de dépenses',
      'settings.incomeCategories': 'Catégories de revenus', 'settings.exportData': 'Exporter les données',
      'settings.importData': 'Importer les données', 'settings.resetData': 'Réinitialiser les données', 'settings.about': 'À propos',
      'settings.resetConfirmTitle': 'Réinitialiser toutes les données ?',
      'settings.resetConfirmMessage': 'Cette action supprime définitivement tous les comptes, transactions, catégories et préférences de cet appareil. Pensez à exporter une sauvegarde avant.',
      'settings.resetConfirmOk': 'Réinitialiser',
      'settings.resetDone': 'Données de l\'application réinitialisées',
      'settings.language': 'Langue', 'settings.chooseLanguage': 'Choisir la langue',
      'about.description': "My Flous est un gestionnaire de finances personnelles qui vous aide à suivre chaque dinar — revenus, dépenses, virements et épargne — sur vos comptes espèces, banque et épargne, avec des statistiques mensuelles claires et une sauvegarde privée, sur l'appareil, entièrement sous votre contrôle.",
      'about.creators': 'Créateurs',
      'txn.accountDestination': 'Compte de destination', 'txn.paidFrom': 'Payé depuis',
      'txn.descriptionLabel': 'Description', 'txn.descriptionPlaceholder': 'ex. Courses Carrefour',
      'txn.addIncome': 'Ajouter un revenu', 'txn.addExpense': 'Ajouter une dépense', 'txn.transferMoney': 'Transférer de l\u2019argent',
      'categories.manage': 'Gérer les catégories', 'categories.addCategory': 'Ajouter une catégorie',
      'categories.editCategory': 'Modifier la catégorie', 'categories.namePlaceholder': 'ex. Abonnements',
      'categories.icon': 'Icône', 'categories.color': 'Couleur', 'categories.saveCategory': 'Enregistrer la catégorie',
      'greeting.morning': 'Bonjour', 'greeting.afternoon': 'Bon après-midi', 'greeting.evening': 'Bonsoir',

      'onboarding.welcomeTitle': 'Bienvenue sur My Flous',
      'onboarding.welcomeSubtitle': 'Votre argent, joliment organisé. Configurons tout ça — ça ne prend qu\u2019une minute.',
      'onboarding.getStarted': 'Commencer',
      'onboarding.skip': 'Passer',
      'onboarding.back': 'Retour',
      'onboarding.next': 'Suivant',
      'onboarding.stepOf': 'Étape {current} sur {total}',
      'onboarding.languageTitle': 'Choisissez votre langue',
      'onboarding.languageSubtitle': 'Vous pourrez toujours changer cela plus tard dans les Paramètres.',
      'onboarding.nameTitle': 'Quel est votre nom ?',
      'onboarding.nameSubtitle': 'Nous l\u2019utiliserons pour personnaliser votre tableau de bord.',
      'onboarding.namePlaceholder': 'ex. Rayen',
      'onboarding.countryTitle': 'Où êtes-vous basé(e) ?',
      'onboarding.countrySubtitle': 'Cela nous aide à adapter la devise et les réglages par défaut.',
      'onboarding.countryButton': 'Sélectionner votre pays',
      'onboarding.categoryTitle': 'Qu\u2019est-ce qui vous décrit le mieux ?',
      'onboarding.categorySubtitle': 'Cela nous aide à adapter les conseils à votre situation.',
      'onboarding.readyTitle': 'Tout est prêt !',
      'onboarding.readySubtitleNamed': 'Bienvenue, {name} — My Flous est prêt à vous aider à suivre chaque dinar.',
      'onboarding.readySubtitle': 'My Flous est prêt à vous aider à suivre chaque dinar.',
      'onboarding.startButton': 'Commencer à suivre',

      'tour.balanceTitle': 'Votre solde',
      'tour.balanceText': 'Cette carte affiche votre solde total — espèces, banque et épargne — en un coup d\u2019œil.',
      'tour.addTitle': 'Ajouter des transactions',
      'tour.addText': 'Appuyez sur le bouton + à tout moment pour ajouter un revenu, une dépense ou un virement.',
      'tour.navTitle': 'Historique et statistiques',
      'tour.navText': 'Parcourez votre historique complet et suivez vos tendances de dépenses ici.',
      'tour.profileTitle': 'Votre profil',
      'tour.profileText': 'Gérez vos informations, votre devise, vos catégories et les réglages de l\u2019application.',
      'tour.next': 'Suivant',
      'tour.skip': 'Passer la visite',
      'tour.done': 'Compris',
      'tour.stepOf': '{current} / {total}',
      'profile.replayTour': 'Revoir la visite guidée'
    },
    ar: {
      'splash.tagline': 'تتبّع كل دينار',
      'brand.name': 'نقودي',
      'nav.menuAria': 'القائمة', 'nav.notifAria': 'الإشعارات', 'nav.profileAria': 'الملف الشخصي',
      'nav.home': 'الرئيسية', 'nav.history': 'السجل', 'nav.stats': 'الإحصائيات', 'nav.statsShort': 'إحصائيات',
      'nav.profile': 'الملف الشخصي', 'nav.addTransactionAria': 'إضافة معاملة',
      'common.closeMenuAria': 'إغلاق القائمة', 'common.closeAria': 'إغلاق', 'common.backAria': 'رجوع',
      'common.clearSearchAria': 'مسح البحث',
      'home.subtitle': 'هذا هو وضع أموالك اليوم',
      'home.totalBalance': 'الرصيد الإجمالي', 'home.incomeMonth': 'الدخل (الشهر)', 'home.expensesMonth': 'المصاريف (الشهر)',
      'home.myAccounts': 'حساباتي', 'home.thisMonth': 'هذا الشهر', 'home.quickActions': 'إجراءات سريعة',
      'home.recentTransactions': 'أحدث المعاملات',
      'home.viewIncomeAria': 'عرض تفاصيل الدخل في السجل', 'home.viewExpenseAria': 'عرض تفاصيل المصاريف في السجل',
      'account.cash': 'نقدًا', 'account.bank': 'البنك', 'account.savings': 'الادخار',
      'common.details': 'التفاصيل', 'common.seeAll': 'عرض الكل',
      'common.income': 'دخل', 'common.expense': 'مصروف', 'common.expenses': 'المصاريف',
      'common.transfer': 'تحويل', 'common.saved': 'المدّخر', 'common.remaining': 'المتبقي', 'common.all': 'الكل',
      'common.amount': 'المبلغ', 'common.category': 'الفئة', 'common.from': 'من', 'common.to': 'إلى',
      'common.date': 'التاريخ', 'common.optional': '(اختياري)', 'common.name': 'الاسم', 'common.age': 'العمر',
      'common.country': 'البلد', 'common.bio': 'نبذة', 'common.delete': 'حذف',
      'common.areYouSure': 'هل أنت متأكد؟', 'common.cancel': 'إلغاء', 'common.confirm': 'تأكيد',
      'common.backup': 'نسخة احتياطية', 'common.restore': 'استعادة', 'common.danger': 'خطر',
      'history.subtitle': 'كل معاملاتك في مكان واحد', 'history.searchPlaceholder': 'ابحث في المعاملات...',
      'stats.subtitle': 'تعرّف على وجهة أموالك', 'stats.biggestCategory': 'أكبر فئة',
      'stats.noExpensesYet': 'لا توجد مصاريف بعد', 'stats.savingRate': 'معدّل الادخار',
      'stats.ofIncomeThisMonth': 'من دخل هذا الشهر', 'stats.monthlyIncome': 'الدخل الشهري',
      'stats.monthlyExpenses': 'المصاريف الشهرية', 'stats.savingsGrowth': 'نمو الادخار',
      'stats.expenseCategories': 'فئات المصاريف', 'stats.weeklySpending': 'الإنفاق الأسبوعي',
      'stats.monthlyReport': 'التقرير الشهري', 'stats.last6Months': 'آخر 6 أشهر', 'stats.last7Days': 'آخر 7 أيام',
      'stats.thisMonthInline': 'هذا الشهر',
      'report.summary': 'في {month}، بلغ دخلك {income} وبلغت مصاريفك {expenses}، ليتبقى لديك {remaining}.',
      'report.topCategory': 'ذهب معظمها إلى {category} ({pct}% من الإنفاق).',
      'report.spendingUp': 'ارتفع الإنفاق بنسبة {pct}% مقارنة بشهر {month}.',
      'report.spendingDown': 'انخفض الإنفاق بنسبة {pct}% مقارنة بشهر {month} — عمل رائع.',
      'report.spendingFlat': 'الإنفاق شبه ثابت مقارنة بشهر {month}.',
      'report.firstMonth': 'هذا هو أول شهر تتوفر فيه بيانات كافية للمقارنة.',
      'report.totalIncome': 'إجمالي الدخل', 'report.totalExpenses': 'إجمالي المصاريف',
      'report.movedToSavings': 'المحوّل إلى الادخار', 'report.remainingBalance': 'الرصيد المتبقي',
      'profile.subtitle': 'حسابك وتفضيلاتك', 'profile.changePhotoAria': 'تغيير صورة الملف الشخصي',
      'profile.yourName': 'اسمك', 'profile.addDetailsBelow': 'أضف بياناتك أدناه',
      'profile.namePlaceholder': 'مثال: ياسين بن علي', 'profile.agePlaceholder': 'مثال: 21',
      'profile.selectCountry': 'اختر البلد', 'profile.selectCountryTitle': 'اختر البلد',
      'profile.searchCountryPlaceholder': 'ابحث عن بلد...', 'profile.occupation': 'المهنة',
      'profile.bioPlaceholder': 'أخبرنا قليلاً عن نفسك...',
      'occupation.student': 'طالب جامعي', 'occupation.pupil': 'تلميذ', 'occupation.employee': 'موظف',
      'settings.title': 'الإعدادات', 'settings.darkMode': 'الوضع الداكن', 'settings.darkModeAria': 'تبديل الوضع الداكن',
      'settings.notifications': 'الإشعارات', 'settings.notificationsAria': 'تبديل الإشعارات',
      'settings.currency': 'العملة', 'settings.expenseCategories': 'فئات المصاريف',
      'settings.incomeCategories': 'فئات الدخل', 'settings.exportData': 'تصدير البيانات',
      'settings.importData': 'استيراد البيانات', 'settings.resetData': 'إعادة تعيين البيانات', 'settings.about': 'حول التطبيق',
      'settings.resetConfirmTitle': 'إعادة تعيين كل البيانات؟',
      'settings.resetConfirmMessage': 'سيؤدي هذا إلى حذف جميع الحسابات والمعاملات والفئات والتفضيلات نهائيًا من هذا الجهاز. يُستحسن تصدير نسخة احتياطية أولًا.',
      'settings.resetConfirmOk': 'إعادة التعيين',
      'settings.resetDone': 'تمت إعادة تعيين بيانات التطبيق',
      'settings.language': 'اللغة', 'settings.chooseLanguage': 'اختر اللغة',
      'about.description': 'ماي فلوس هو تطبيق لإدارة الماليات الشخصية يساعدك على تتبّع كل دينار — الدخل والمصاريف والتحويلات والادخار — عبر حساباتك النقدية والبنكية والادخارية، مع إحصائيات شهرية واضحة ونسخة احتياطية خاصة على جهازك تتحكم بها بالكامل.',
      'about.creators': 'الفريق',
      'txn.accountDestination': 'الحساب الوجهة', 'txn.paidFrom': 'الدفع من',
      'txn.descriptionLabel': 'الوصف', 'txn.descriptionPlaceholder': 'مثال: تسوّق من كارفور',
      'txn.addIncome': 'إضافة دخل', 'txn.addExpense': 'إضافة مصروف', 'txn.transferMoney': 'تحويل أموال',
      'categories.manage': 'إدارة الفئات', 'categories.addCategory': 'إضافة فئة',
      'categories.editCategory': 'تعديل الفئة', 'categories.namePlaceholder': 'مثال: الاشتراكات',
      'categories.icon': 'الأيقونة', 'categories.color': 'اللون', 'categories.saveCategory': 'حفظ الفئة',
      'greeting.morning': 'صباح الخير', 'greeting.afternoon': 'مساء الخير', 'greeting.evening': 'مساء الخير',

      'onboarding.welcomeTitle': 'مرحبًا بك في ماي فلوس',
      'onboarding.welcomeSubtitle': 'أموالك، منظمة بأناقة. لنقم بالإعداد معًا — الأمر لا يستغرق سوى دقيقة.',
      'onboarding.getStarted': 'ابدأ الآن',
      'onboarding.skip': 'تخطي',
      'onboarding.back': 'رجوع',
      'onboarding.next': 'التالي',
      'onboarding.stepOf': 'الخطوة {current} من {total}',
      'onboarding.languageTitle': 'اختر لغتك',
      'onboarding.languageSubtitle': 'يمكنك دائمًا تغيير هذا لاحقًا من الإعدادات.',
      'onboarding.nameTitle': 'ما اسمك؟',
      'onboarding.nameSubtitle': 'سنستخدمه لتخصيص لوحتك الرئيسية.',
      'onboarding.namePlaceholder': 'مثال: ريان',
      'onboarding.countryTitle': 'أين تقيم؟',
      'onboarding.countrySubtitle': 'يساعدنا هذا على تخصيص العملة والإعدادات الافتراضية لك.',
      'onboarding.countryButton': 'اختر بلدك',
      'onboarding.categoryTitle': 'ما الذي يصفك أكثر؟',
      'onboarding.categorySubtitle': 'يساعدنا هذا على تخصيص النصائح لوضعك.',
      'onboarding.readyTitle': 'كل شيء جاهز!',
      'onboarding.readySubtitleNamed': 'أهلًا بك، {name} — ماي فلوس جاهز لمساعدتك على تتبّع كل دينار.',
      'onboarding.readySubtitle': 'ماي فلوس جاهز لمساعدتك على تتبّع كل دينار.',
      'onboarding.startButton': 'ابدأ التتبع',

      'tour.balanceTitle': 'رصيدك',
      'tour.balanceText': 'تعرض هذه البطاقة رصيدك الإجمالي عبر النقد والبنك والادخار، بنظرة واحدة.',
      'tour.addTitle': 'إضافة المعاملات',
      'tour.addText': 'اضغط على زر + في أي وقت لتسجيل دخل أو مصروف أو تحويل بين الحسابات.',
      'tour.navTitle': 'السجل والإحصائيات',
      'tour.navText': 'تصفّح سجل معاملاتك الكامل وشاهد اتجاهات إنفاقك عبر الزمن هنا.',
      'tour.profileTitle': 'ملفك الشخصي',
      'tour.profileText': 'أدر بياناتك وعملتك وفئاتك وإعدادات التطبيق في أي وقت من هنا.',
      'tour.next': 'التالي',
      'tour.skip': 'تخطي الجولة',
      'tour.done': 'فهمت',
      'tour.stepOf': '{current} / {total}',
      'profile.replayTour': 'إعادة عرض الجولة الإرشادية'
    }
  };

  let currentLang = 'en';

  function t(key){
    const dict = T[currentLang] || T.en;
    return dict[key] || T.en[key] || key;
  }

  function getLanguage(){ return currentLang; }

  function getLangMeta(code){
    return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
  }

  /** Push translations into every [data-i18n*] element currently in the DOM. */
  function translateDOM(){
    qsa('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    qsa('[data-i18n-placeholder]').forEach(el => { el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder)); });
    qsa('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  }

  /** Update the little flag + name shown on the drawer's Language row. */
  function updateDrawerBadge(){
    const flagEl = qs('#drawer-language-flag');
    const nameEl = qs('#drawer-language-name');
    const meta = getLangMeta(currentLang);
    if (flagEl) flagEl.innerHTML = FLAGS[meta.flag];
    if (nameEl) nameEl.textContent = meta.native;
  }

  /** Re-brand the wordmark + logo-dot pairs. Arabic gets نقودي / ن;
   *  English & French keep the styled "My **Flous**" wordmark. */
  function updateBrandText(){
    const isAr = currentLang === 'ar';

    const splash = qs('#splash-brand-text');
    if (splash) splash.innerHTML = isAr ? 'نقودي' : 'My <b>Flous</b>';

    const drawerText = qs('#drawer-brand-text');
    if (drawerText) drawerText.innerHTML = isAr ? 'نقودي' : 'My <b>Flous</b>';
    // Logo mark (#drawer-brand-dot) is now a PNG image and stays the same across languages.

    const aboutText = qs('#about-brand-text');
    if (aboutText) aboutText.textContent = isAr ? 'نقودي' : 'My Flous';
    // Logo mark (#about-brand-dot) is now a PNG image and stays the same across languages.
  }

  function applyLanguage(lang, opts = {}){
    const meta = getLangMeta(lang);
    currentLang = meta.code;

    document.documentElement.setAttribute('lang', meta.code);
    document.documentElement.setAttribute('dir', meta.dir);
    document.body.classList.toggle('lang-rtl', meta.dir === 'rtl');

    translateDOM();
    updateDrawerBadge();
    updateBrandText();

    if (!opts.skipSave) Storage.Prefs.setLanguage(meta.code);

    // Re-render anything driven from JS strings (greeting, top-bar title, live modal state).
    if (window.App && typeof window.App.renderDashboard === 'function') window.App.renderDashboard();
    if (window.App && typeof window.App.refreshChrome === 'function') window.App.refreshChrome();
    if (typeof ProfileForm !== 'undefined' && Storage.Profile) ProfileForm.render(Storage.Profile.get());
  }

  /* ---------------------------------------------------------
     LANGUAGE PICKER — bottom sheet listing the 3 languages,
     mirroring the Country picker's modal markup/behaviour.
     --------------------------------------------------------- */
  const LanguagePicker = (() => {
    let isOpen = false;

    function els(){
      return {
        overlay: qs('#language-modal-overlay'),
        sheet:   qs('#language-modal-sheet'),
        list:    qs('#language-picker-list')
      };
    }

    function renderList(){
      const e = els();
      if (!e.list) return;
      e.list.innerHTML = LANGUAGES.map(lang => `
        <div class="country-row language-row${lang.code === currentLang ? ' country-row-selected' : ''}" data-lang="${lang.code}">
          <span class="language-row-flag">${FLAGS[lang.flag]}</span>
          <span class="country-row-name language-row-name">${lang.native}</span>
          ${lang.code === currentLang ? '<svg class="country-row-check" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>
      `).join('');
    }

    function open(){
      const e = els();
      if (!e.overlay) return;
      renderList();
      e.overlay.classList.add('modal-open');
      e.overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      isOpen = true;
      window.requestAnimationFrame(() => e.sheet.classList.add('sheet-in'));
    }

    function close(){
      const e = els();
      if (!e.overlay || !isOpen) return;
      isOpen = false;
      e.sheet.classList.remove('sheet-in');
      e.sheet.classList.add('sheet-out');
      e.overlay.classList.remove('modal-open');
      window.setTimeout(() => {
        e.sheet.classList.remove('sheet-out');
        e.overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }, 280);
    }

    function bind(){
      const e = els();
      if (!e.overlay) return;

      qsa('[data-language-modal-close]').forEach(el => el.addEventListener('click', close));

      if (e.list){
        e.list.addEventListener('click', (evt) => {
          const row = evt.target.closest('[data-lang]');
          if (!row) return;
          const chosen = row.dataset.lang;
          close();
          if (chosen === currentLang) return;

          applyLanguage(chosen);
          // Full refresh so every screen — including ones not currently
          // mounted (charts, modals, cached copy) — re-initializes cleanly
          // in the new language, exactly like reopening the app.
          window.setTimeout(() => window.location.reload(), 300);
        });
      }

      const trigger = qs('#drawer-language-btn');
      if (trigger){
        trigger.addEventListener('click', () => {
          if (typeof hapticTap === 'function') hapticTap();
          open();
        });
      }

      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' && isOpen) close();
      });
    }

    return { bind, open, close };
  })();

  function init(){
    LanguagePicker.bind();
    const saved = Storage.Prefs.getLanguage();
    applyLanguage(saved, { skipSave: true });
  }

  return { init, t, applyLanguage, getLanguage, LANGUAGES, FLAGS };
})();

window.I18n = I18n;
