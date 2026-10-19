/* =========================================================
   MYFLOUS WEBSITE — I18N
   Same three languages and flag set as the app itself
   (js/i18n.js: en → gb flag, fr → fr flag, ar → sa flag,
   with full RTL on Arabic).
   ========================================================= */
(() => {
  'use strict';

  const LANG_KEY = 'myflous-site-lang';

  const T = {
    en: {
      'nav.features': 'Features', 'nav.about': 'About', 'nav.creator': 'Creator', 'nav.download': 'Download',
      'hero.eyebrow': 'Made for the Maghreb — free & offline-first',
      'hero.title1': 'Track every dinar,', 'hero.title2': 'before it tracks', 'hero.title3': 'you.',
      'hero.sub': "MyFlous keeps your cash, bank and savings honest — every riyal, dinar or dirham logged, categorized and understood, without a single byte ever leaving your phone.",
      'hero.ctaAndroid': 'Download for Android', 'hero.ctaWeb': 'Open web version',
      'hero.trust': 'No sign-up · Works offline · Your data stays on your device',
      'card.totalBalance': 'Total balance', 'card.cash': 'Cash', 'card.bank': 'Bank', 'card.savings': 'Savings',
      'card.groceries': 'Groceries', 'card.today': 'Today',
      'card.salary': 'Salary', 'card.yesterday': 'Yesterday',
      'card.transport': 'Transport', 'card.daysAgo': '2 days ago',
      'features.eyebrow': 'Inside the app', 'features.title': "Everything money needs, nothing it doesn't.",
      'features.sub': 'MyFlous does one job — tracking where your money goes — and does it with real depth.',
      'feature1.title': 'Three accounts, one balance',
      'feature1.desc': 'Cash in your pocket, money in the bank, savings on the side — tracked separately, summed automatically, never mixed up.',
      'feature2.title': 'Income, expense & transfer',
      'feature2.desc': 'Log every kind of move, tagged to a category with its own icon and color.',
      'feature3.title': 'Five ways to see your money',
      'feature3.desc': 'Monthly bars, a savings trend line, a category donut, a weekly view and a written report — pick the one that clicks.',
      'feature4.title': 'Any currency, one tap away',
      'feature4.desc': 'Switch currency and every number across Dashboard, History and Statistics updates instantly.',
      'feature5.title': 'English · Français · العربية',
      'feature5.desc': 'A fully translated interface, including proper right-to-left layout for Arabic — not just flipped text.',
      'feature6.title': 'Light, dark, always gold',
      'feature6.desc': 'Two themes built around a single gold accent, easy on the eyes whatever the hour.',
      'feature7.title': 'Your data, your backup',
      'feature7.desc': 'Everything lives on your device. Export a full backup file whenever you want, import it whenever you need it back.',
      'feature8.title': 'Categories that fit your life',
      'feature8.desc': 'Keep the defaults or build your own — pick an icon and color for every category you track.',
      'about.eyebrow': 'What is MyFlous',
      'about.title': 'A money tracker that stays out of your business — literally.',
      'about.p1': 'MyFlous started from a simple frustration: most finance apps want your bank login, your phone number, and a subscription before they\'ll show you a single chart. MyFlous doesn\'t. It\'s a self-contained ledger that lives on your phone, built for students, employees and anyone who wants a clear answer to "where did my money go this month?" — without handing their financial life to a server somewhere.',
      'about.p2': "Open it, add your accounts, start logging. That's the whole onboarding.",
      'about.stat1': 'account types', 'about.stat2': 'languages, full RTL', 'about.stat3': 'chart views', 'about.stat4': 'data leaves your phone',
      'creator.eyebrow': 'Built by one person', 'creator.role': 'Creator & developer of MyFlous',
      'creator.bio': 'Rayen designed and built MyFlous end to end — product, interface and code — with a simple goal: give people everywhere a finance tracker that respects both their money and their privacy. MyFlous is an independent, ad-free project, shaped directly by feedback from the people who use it every day.',
      'final.title': 'Ready to meet your flous?', 'final.sub': 'Free to use, nothing to sign up for, no ads to skip.',
      'footer.built': 'Built by Rayen Ben Amara.', 'footer.rights': '© 2026 MyFlous. All rights reserved.'
    },
    fr: {
      'nav.features': 'Fonctionnalités', 'nav.about': 'À propos', 'nav.creator': 'Créateur', 'nav.download': 'Télécharger',
      'hero.eyebrow': 'Pensé pour le Maghreb — gratuit et 100 % hors ligne',
      'hero.title1': 'Suis chaque dinar,', 'hero.title2': 'avant qu\'il ne t\'', 'hero.title3': 'échappe.',
      'hero.sub': "MyFlous garde un œil honnête sur ton cash, ta banque et ton épargne — chaque riyal, dinar ou dirham noté, catégorisé et compris, sans qu'un seul octet ne quitte ton téléphone.",
      'hero.ctaAndroid': "Télécharger pour Android", 'hero.ctaWeb': 'Ouvrir la version web',
      'hero.trust': 'Sans inscription · Fonctionne hors ligne · Tes données restent sur ton appareil',
      'card.totalBalance': 'Solde total', 'card.cash': 'Espèces', 'card.bank': 'Banque', 'card.savings': 'Épargne',
      'card.groceries': 'Courses', 'card.today': "Aujourd'hui",
      'card.salary': 'Salaire', 'card.yesterday': 'Hier',
      'card.transport': 'Transport', 'card.daysAgo': 'Il y a 2 jours',
      'features.eyebrow': "Dans l'application", 'features.title': "Tout ce qu'il faut pour ton argent, rien de plus.",
      'features.sub': "MyFlous fait un seul métier — suivre où va ton argent — et le fait sérieusement.",
      'feature1.title': 'Trois comptes, un seul solde',
      'feature1.desc': 'Cash en poche, argent en banque, épargne de côté — suivis séparément, additionnés automatiquement, jamais mélangés.',
      'feature2.title': 'Revenu, dépense & virement',
      'feature2.desc': 'Note chaque mouvement, associé à une catégorie avec sa propre icône et sa couleur.',
      'feature3.title': 'Cinq façons de voir ton argent',
      'feature3.desc': "Barres mensuelles, courbe d'épargne, donut par catégorie, vue hebdomadaire et rapport écrit — choisis celle qui te parle.",
      'feature4.title': 'Toute devise, en un geste',
      'feature4.desc': 'Change de devise et chaque montant, sur Accueil, Historique et Statistiques, se met à jour instantanément.',
      'feature5.title': 'English · Français · العربية',
      'feature5.desc': "Une interface entièrement traduite, avec une vraie mise en page droite-à-gauche pour l'arabe — pas juste du texte inversé.",
      'feature6.title': 'Clair, sombre, toujours doré',
      'feature6.desc': "Deux thèmes construits autour d'un seul accent doré, doux pour les yeux à toute heure.",
      'feature7.title': 'Tes données, ta sauvegarde',
      'feature7.desc': 'Tout reste sur ton appareil. Exporte un fichier de sauvegarde complet quand tu veux, réimporte-le quand tu en as besoin.',
      'feature8.title': 'Des catégories à ton image',
      'feature8.desc': 'Garde celles par défaut ou crée les tiennes — choisis une icône et une couleur pour chaque catégorie.',
      'about.eyebrow': "Qu'est-ce que MyFlous",
      'about.title': 'Un suivi de budget qui ne se mêle pas de tes affaires — vraiment.',
      'about.p1': "MyFlous est né d'une frustration simple : la plupart des applis de finance veulent tes identifiants bancaires, ton numéro et un abonnement avant de t'afficher le moindre graphique. MyFlous, non. C'est un carnet de comptes autonome qui vit sur ton téléphone, pensé pour les étudiants, les salariés et quiconque veut une réponse claire à « où est passé mon argent ce mois-ci ? » — sans confier sa vie financière à un serveur quelque part.",
      'about.p2': "Ouvre l'appli, ajoute tes comptes, commence à noter. C'est toute la mise en route.",
      'about.stat1': 'types de comptes', 'about.stat2': 'langues, RTL complet', 'about.stat3': 'vues graphiques', 'about.stat4': 'donnée ne quitte ton téléphone',
      'creator.eyebrow': 'Créé par une seule personne', 'creator.role': 'Créateur et développeur de MyFlous',
      'creator.bio': "Rayen a conçu et développé MyFlous de bout en bout — produit, interface et code — avec un objectif simple : offrir à tout le monde un suivi financier qui respecte à la fois leur argent et leur vie privée. MyFlous est un projet indépendant, sans publicité, façonné directement par les retours de ceux qui l'utilisent chaque jour.",
      'final.title': 'Prêt à retrouver tes flous ?', 'final.sub': "Gratuit, sans inscription, sans publicité à esquiver.",
      'footer.built': 'Créé par Rayen Ben Amara.', 'footer.rights': '© 2026 MyFlous. Tous droits réservés.'
    },
    ar: {
      'nav.features': 'المزايا', 'nav.about': 'عن التطبيق', 'nav.creator': 'المطوّر', 'nav.download': 'تحميل',
      'hero.eyebrow': 'صُنع للمغرب العربي — مجاني ويعمل بلا إنترنت',
      'hero.title1': 'تتبّع كل دينار،', 'hero.title2': 'قبل أن', 'hero.title3': 'يفلت منك.',
      'hero.sub': 'يحافظ MyFlous على وضوح أموالك النقدية والبنكية والمدّخرة — كل دينار أو ريال أو درهم مسجَّل ومصنَّف ومفهوم، دون أن تغادر بياناتك هاتفك أبدًا.',
      'hero.ctaAndroid': 'تحميل لأندرويد', 'hero.ctaWeb': 'فتح نسخة المتصفح',
      'hero.trust': 'بلا تسجيل · يعمل بلا إنترنت · بياناتك تبقى على جهازك',
      'card.totalBalance': 'الرصيد الإجمالي', 'card.cash': 'نقدًا', 'card.bank': 'البنك', 'card.savings': 'الادخار',
      'card.groceries': 'بقالة', 'card.today': 'اليوم',
      'card.salary': 'الراتب', 'card.yesterday': 'أمس',
      'card.transport': 'النقل', 'card.daysAgo': 'قبل يومين',
      'features.eyebrow': 'داخل التطبيق', 'features.title': 'كل ما تحتاجه لأموالك، ولا شيء زائد.',
      'features.sub': 'يقوم MyFlous بمهمة واحدة — تتبّع وجهة أموالك — وينجزها بعمق حقيقي.',
      'feature1.title': 'ثلاثة حسابات، رصيد واحد',
      'feature1.desc': 'النقد في جيبك، المال في البنك، الادخار جانبًا — يُتابَع كل منها منفصلاً ويُجمَع تلقائيًا دون أي خلط.',
      'feature2.title': 'دخل، مصروف وتحويل',
      'feature2.desc': 'سجّل كل حركة، مرتبطة بفئة لها أيقونتها ولونها الخاص.',
      'feature3.title': 'خمس طرق لرؤية أموالك',
      'feature3.desc': 'أعمدة شهرية، خط اتجاه الادخار، مخطط دائري للفئات، عرض أسبوعي وتقرير مكتوب — اختر ما يناسبك.',
      'feature4.title': 'أي عملة، بلمسة واحدة',
      'feature4.desc': 'غيّر العملة وستتحدث فورًا كل الأرقام في الرئيسية والسجل والإحصائيات.',
      'feature5.title': 'English · Français · العربية',
      'feature5.desc': 'واجهة مترجمة بالكامل، مع تخطيط حقيقي من اليمين لليسار للعربية — وليس مجرد نص معكوس.',
      'feature6.title': 'فاتح، داكن، وذهبي دائمًا',
      'feature6.desc': 'وضعان مبنيّان حول لون ذهبي واحد، مريحان للعين في أي وقت.',
      'feature7.title': 'بياناتك، نسختك الاحتياطية',
      'feature7.desc': 'كل شيء يبقى على جهازك. صدّر نسخة احتياطية كاملة متى شئت، واستوردها متى احتجتها.',
      'feature8.title': 'فئات تناسب حياتك',
      'feature8.desc': 'استخدم الفئات الافتراضية أو أنشئ فئاتك الخاصة — اختر أيقونة ولونًا لكل فئة تتابعها.',
      'about.eyebrow': 'ما هو MyFlous',
      'about.title': 'متتبّع مالي لا يتدخّل في شؤونك — فعليًا.',
      'about.p1': 'بدأ MyFlous من إحباط بسيط: معظم تطبيقات المال تريد بيانات حسابك البنكي ورقم هاتفك واشتراكًا قبل أن تعرض لك رسمًا بيانيًا واحدًا. MyFlous لا يفعل ذلك. إنه دفتر حسابات مستقل يعيش على هاتفك، صُمّم للطلاب والموظفين ولكل من يريد إجابة واضحة عن سؤال "أين ذهبت أموالي هذا الشهر؟" — دون تسليم حياته المالية لخادم في مكان ما.',
      'about.p2': 'افتحه، أضف حساباتك، وابدأ التسجيل. هذا كل ما في الإعداد الأولي.',
      'about.stat1': 'أنواع حسابات', 'about.stat2': 'لغات، بدعم كامل من اليمين لليسار', 'about.stat3': 'طرق عرض بيانية', 'about.stat4': 'بيانات تغادر هاتفك',
      'creator.eyebrow': 'من صنع شخص واحد', 'creator.role': 'مؤسس ومطوّر MyFlous',
      'creator.bio': 'صمّم ريان وطوّر MyFlous من الألف إلى الياء — المنتج والواجهة والكود — بهدف بسيط: منح كل مستخدم في أي مكان متتبّعًا ماليًا يحترم أمواله وخصوصيته معًا. MyFlous مشروع مستقل وخالٍ من الإعلانات، تشكّله مباشرة آراء من يستخدمونه كل يوم.',
      'final.title': 'جاهز للقاء فلوسك؟', 'final.sub': 'مجاني تمامًا، بلا تسجيل، وبلا إعلانات لتتخطّاها.',
      'footer.built': 'من صنع ريان بن عمارة.', 'footer.rights': '© 2026 MyFlous. جميع الحقوق محفوظة.'
    }
  };

  const FLAGS = {
    en: `<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#00247D"/><path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" stroke-width="4"/><path d="M0,0 L30,20 M30,0 L0,20" stroke="#CF142B" stroke-width="1.6"/><path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" stroke-width="6.6"/><path d="M15,0 V20 M0,10 H30" stroke="#CF142B" stroke-width="4"/></svg>`,
    fr: `<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="20" x="0" fill="#0055A4"/><rect width="10" height="20" x="10" fill="#FFFFFF"/><rect width="10" height="20" x="20" fill="#EF4135"/></svg>`,
    ar: `<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#006C35"/><rect x="4" y="13.4" width="16" height="2" rx="1" fill="#FFFFFF"/><path d="M20 14.4 L23.5 14.4 L20.6 13.2 Z" fill="#FFFFFF"/><rect x="4" y="8.5" width="12" height="1.6" rx="0.8" fill="#FFFFFF" opacity="0.9"/></svg>`
  };

  const CODES = { en: 'EN', fr: 'FR', ar: 'AR' };
  const DIR = { en: 'ltr', fr: 'ltr', ar: 'rtl' };

  function translate(lang){
    const dict = T[lang] || T.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', DIR[lang]);
    document.body.classList.toggle('rtl', DIR[lang] === 'rtl');

    const flagIcon = document.getElementById('langFlagIcon');
    const langCode = document.getElementById('langCode');
    if (flagIcon) flagIcon.innerHTML = FLAGS[lang];
    if (langCode) langCode.textContent = CODES[lang];

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('.mobile-lang-opt').forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  function initialLang(){
    let saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* storage unavailable */ }
    if (saved && T[saved]) return saved;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return T[nav] ? nav : 'en';
  }

  document.addEventListener('DOMContentLoaded', () => {
    translate(initialLang());

    const langBtn = document.getElementById('langBtn');
    const langSwitch = document.getElementById('langSwitch');
    const langMenu = document.getElementById('langMenu');

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langSwitch.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', () => {
      langSwitch.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    });
    langMenu.addEventListener('click', (e) => e.stopPropagation());

    langMenu.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        translate(opt.getAttribute('data-lang'));
        langSwitch.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.querySelectorAll('.mobile-lang-opt').forEach(opt => {
      opt.addEventListener('click', () => translate(opt.getAttribute('data-lang')));
    });
  });
})();
