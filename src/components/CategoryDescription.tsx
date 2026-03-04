import { motion, AnimatePresence } from "motion/react";

interface CategoryDescriptionProps {
  selectedCategory: string;
}

// Composants de description pour chaque catégorie
const DescriptionTous = () => (
  <p className="text-sm md:text-base text-gray-600 italic">
    Explorez l'ensemble de nos publications sur l'actualité numérique, l'intelligence artificielle et les tendances tech 2025.
  </p>
);

const DescriptionCultureDigitale = () => (
  <p className="text-sm md:text-base text-gray-600 italic">
    Découvrez les dernières tendances et innovations dans le monde numérique, de la réalité virtuelle aux applications mobiles.
  </p>
);

const DescriptionDesignUX = () => (
  <p className="text-sm md:text-base text-gray-600 italic">
    Explorez les tendances tech du design numérique, les meilleures pratiques UX et l'art de créer des interfaces engageantes dans la culture digitale.
  </p>
);

const DescriptionDeveloppementWeb = () => (
  <p className="text-sm md:text-base text-gray-600 italic">
    Plongez dans l'actualité numérique avec nos guides numériques sur les frameworks modernes, les performances et les nouvelles technologies web expliquées simplement.
  </p>
);

const DescriptionIntelligenceArtificielle = () => (
  <p className="text-sm md:text-base text-gray-600 italic">
    Découvrez les dernières innovations en intelligence artificielle, les outils IA gratuits et les technologies qui façonnent le futur du numérique.
  </p>
);

const DescriptionProductiviteCafe = () => (
  <p className="text-sm md:text-base text-gray-600 italic">
    Savourez nos articles sur la culture café, les rituels de productivité et l'art d'équilibrer travail et bien-être avec votre tasse de café quotidienne.
  </p>
);

const DescriptionSEO = () => (
  <p className="text-sm md:text-base text-gray-600 italic">
    Apprenez les techniques de référencement pour optimiser votre site web et augmenter votre visibilité sur les moteurs de recherche.
  </p>
);

const DescriptionReseauxSociaux = () => (
  <p className="text-sm md:text-base text-gray-600 italic">
    Découvrez comment optimiser vos réseaux sociaux pour atteindre un public plus large et engager votre audience.
  </p>
);

const DescriptionEcommerceMarketing = () => (
  <p className="text-sm md:text-base text-gray-600 italic">
    Maîtrisez les stratégies e-commerce, la publicité digitale et les techniques de conversion pour booster vos ventes en ligne.
  </p>
);

// Composant parent qui affiche UNE SEULE description à la fois
export function CategoryDescription({ selectedCategory }: CategoryDescriptionProps) {
  // Fonction pour retourner le bon composant selon la catégorie
  const getDescriptionComponent = () => {
    switch (selectedCategory) {
      case "Culture Digitale":
        return <DescriptionCultureDigitale />;
      case "Design & UX":
        return <DescriptionDesignUX />;
      case "Développement Web":
        return <DescriptionDeveloppementWeb />;
      case "Intelligence Artificielle":
        return <DescriptionIntelligenceArtificielle />;
      case "Productivité & Café":
        return <DescriptionProductiviteCafe />;
      case "SEO & Référencement":
        return <DescriptionSEO />;
      case "Réseaux sociaux":
        return <DescriptionReseauxSociaux />;
      case "E-commerce & Marketing Digital":
        return <DescriptionEcommerceMarketing />;
      default:
        return <DescriptionTous />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-8 md:mb-12 max-w-3xl mx-auto px-4"
      >
        {getDescriptionComponent()}
      </motion.div>
    </AnimatePresence>
  );
}
