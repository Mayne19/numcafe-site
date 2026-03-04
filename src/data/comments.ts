export interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  isAuthor: boolean;
  replies?: Comment[];
}

export interface ArticleComments {
  [articleSlug: string]: Comment[];
}

// Commentaires par article
export const articleComments: ArticleComments = {
  "intelligence-artificielle-revolution-silencieuse": [
    {
      id: "1",
      author: "Sophie Martin",
      date: "il y a 2 jours",
      content: "Article très intéressant ! J'apprécie particulièrement la clarté des explications. Merci pour ce contenu de qualité.",
      isAuthor: false,
      replies: [
        {
          id: "1-1",
          author: "Mayne",
          date: "il y a 1 jour",
          content: "Merci Sophie ! Ravi que cet article vous ait plu. N'hésitez pas si vous avez des questions.",
          isAuthor: true,
          replies: [
            {
              id: "1-1-1",
              author: "Sophie Martin",
              date: "il y a 18 heures",
              content: "Parfait, j'aurais une question justement : prévoyez-vous d'approfondir ce sujet dans un prochain article ?",
              isAuthor: false,
            }
          ]
        }
      ]
    },
    {
      id: "2",
      author: "Thomas Dubois",
      date: "il y a 3 jours",
      content: "Excellente analyse ! J'aimerais voir plus d'articles sur ce sujet.",
      isAuthor: false,
      replies: []
    }
  ],
  "web3-metavers-nouvelles-frontieres": [
    {
      id: "1",
      author: "Lucas Bernard",
      date: "il y a 1 jour",
      content: "Le Web3 va vraiment tout changer. Merci pour cet article complet qui explique bien les enjeux.",
      isAuthor: false,
      replies: [
        {
          id: "1-1",
          author: "Mayne",
          date: "il y a 12 heures",
          content: "Merci Lucas ! Le Web3 est effectivement un sujet passionnant qui mérite d'être exploré en profondeur.",
          isAuthor: true,
        }
      ]
    },
    {
      id: "2",
      author: "Marie Leroy",
      date: "il y a 2 jours",
      content: "J'ai enfin compris ce qu'est le Web3 grâce à votre article. Très pédagogique !",
      isAuthor: false,
      replies: []
    },
    {
      id: "3",
      author: "Pierre Durand",
      date: "il y a 3 jours",
      content: "Le métavers, c'est l'avenir. Hâte de voir comment cela va évoluer dans les prochaines années.",
      isAuthor: false,
      replies: []
    }
  ],
  "cybersecurite-enjeux-2024": [
    {
      id: "1",
      author: "Antoine Rousseau",
      date: "il y a 1 jour",
      content: "La cybersécurité est un sujet crucial. Excellent article qui met en lumière les risques actuels.",
      isAuthor: false,
      replies: [
        {
          id: "1-1",
          author: "Mayne",
          date: "il y a 8 heures",
          content: "Merci Antoine ! La sécurité numérique est effectivement un enjeu majeur que nous continuerons à explorer.",
          isAuthor: true,
        }
      ]
    },
    {
      id: "2",
      author: "Claire Fontaine",
      date: "il y a 2 jours",
      content: "Très instructif ! Je vais appliquer vos conseils de sécurité dès aujourd'hui.",
      isAuthor: false,
      replies: []
    }
  ],
  "design-thinking-innovation": [
    {
      id: "1",
      author: "Julien Moreau",
      date: "il y a 3 jours",
      content: "Le design thinking est une méthodologie puissante. Merci pour ces explications concrètes.",
      isAuthor: false,
      replies: []
    },
    {
      id: "2",
      author: "Emma Petit",
      date: "il y a 4 jours",
      content: "J'utilise le design thinking dans mes projets, votre article résume parfaitement la démarche !",
      isAuthor: false,
      replies: [
        {
          id: "2-1",
          author: "Mayne",
          date: "il y a 3 jours",
          content: "Merci Emma ! C'est super de voir que vous appliquez déjà ces principes dans vos projets.",
          isAuthor: true,
        }
      ]
    }
  ],
  "freelance-guide-complet": [
    {
      id: "1",
      author: "Alexandre Martin",
      date: "il y a 2 jours",
      content: "Guide très complet pour les freelances ! J'aurais aimé avoir ces conseils quand j'ai commencé.",
      isAuthor: false,
      replies: [
        {
          id: "1-1",
          author: "Mayne",
          date: "il y a 1 jour",
          content: "Merci Alexandre ! Le but est justement d'aider ceux qui se lancent dans cette belle aventure.",
          isAuthor: true,
        }
      ]
    },
    {
      id: "2",
      author: "Sarah Dubois",
      date: "il y a 3 jours",
      content: "Freelance depuis 2 ans, je confirme que tous vos conseils sont pertinents. Merci !",
      isAuthor: false,
      replies: []
    }
  ],
  "marketing-digital-tendances": [
    {
      id: "1",
      author: "Nicolas Laurent",
      date: "il y a 1 jour",
      content: "Les tendances marketing digital évoluent vite. Merci pour cette analyse à jour !",
      isAuthor: false,
      replies: []
    },
    {
      id: "2",
      author: "Amélie Roux",
      date: "il y a 2 jours",
      content: "Article très utile pour ma stratégie marketing. Les exemples concrets sont appréciés.",
      isAuthor: false,
      replies: [
        {
          id: "2-1",
          author: "Mayne",
          date: "il y a 1 jour",
          content: "Merci Amélie ! N'hésitez pas si vous avez besoin de plus de précisions sur certains points.",
          isAuthor: true,
        }
      ]
    }
  ],
  "productivite-outils-essentiels": [
    {
      id: "1",
      author: "Vincent Garnier",
      date: "il y a 2 jours",
      content: "J'utilise déjà plusieurs de ces outils. Excellent récap pour booster sa productivité !",
      isAuthor: false,
      replies: []
    },
    {
      id: "2",
      author: "Laura Blanc",
      date: "il y a 3 jours",
      content: "Merci pour ces recommandations ! J'ai testé 2 outils et c'est déjà un gain de temps énorme.",
      isAuthor: false,
      replies: [
        {
          id: "2-1",
          author: "Mayne",
          date: "il y a 2 jours",
          content: "Super Laura ! La productivité, c'est avant tout trouver les bons outils adaptés à son workflow.",
          isAuthor: true,
        }
      ]
    }
  ],
  "blockchain-au-dela-crypto": [
    {
      id: "1",
      author: "Maxime Girard",
      date: "il y a 1 jour",
      content: "La blockchain a tellement d'applications au-delà de la crypto. Merci pour cet éclairage !",
      isAuthor: false,
      replies: [
        {
          id: "1-1",
          author: "Mayne",
          date: "il y a 8 heures",
          content: "Exactement Maxime ! La blockchain est une technologie révolutionnaire bien au-delà des cryptomonnaies.",
          isAuthor: true,
        }
      ]
    },
    {
      id: "2",
      author: "Camille Bonnet",
      date: "il y a 2 jours",
      content: "Article passionnant qui démystifie la blockchain. Très bien vulgarisé !",
      isAuthor: false,
      replies: []
    }
  ]
};

// Données initiales de likes/dislikes par article
export const initialLikes: { [articleSlug: string]: { [commentId: string]: number } } = {
  "intelligence-artificielle-revolution-silencieuse": {
    "1": 12,
    "1-1": 8,
    "1-1-1": 3,
    "2": 5
  },
  "web3-metavers-nouvelles-frontieres": {
    "1": 15,
    "1-1": 6,
    "2": 9,
    "3": 7
  },
  "cybersecurite-enjeux-2024": {
    "1": 18,
    "1-1": 10,
    "2": 11
  },
  "design-thinking-innovation": {
    "1": 8,
    "2": 14,
    "2-1": 5
  },
  "freelance-guide-complet": {
    "1": 22,
    "1-1": 9,
    "2": 16
  },
  "marketing-digital-tendances": {
    "1": 13,
    "2": 19,
    "2-1": 7
  },
  "productivite-outils-essentiels": {
    "1": 17,
    "2": 21,
    "2-1": 8
  },
  "blockchain-au-dela-crypto": {
    "1": 20,
    "1-1": 11,
    "2": 14
  }
};

export const initialDislikes: { [articleSlug: string]: { [commentId: string]: number } } = {
  "intelligence-artificielle-revolution-silencieuse": {
    "1": 0,
    "1-1": 0,
    "1-1-1": 0,
    "2": 1
  },
  "web3-metavers-nouvelles-frontieres": {
    "1": 0,
    "1-1": 0,
    "2": 1,
    "3": 0
  },
  "cybersecurite-enjeux-2024": {
    "1": 1,
    "1-1": 0,
    "2": 0
  },
  "design-thinking-innovation": {
    "1": 0,
    "2": 0,
    "2-1": 0
  },
  "freelance-guide-complet": {
    "1": 0,
    "1-1": 0,
    "2": 1
  },
  "marketing-digital-tendances": {
    "1": 1,
    "2": 0,
    "2-1": 0
  },
  "productivite-outils-essentiels": {
    "1": 0,
    "2": 0,
    "2-1": 0
  },
  "blockchain-au-dela-crypto": {
    "1": 0,
    "1-1": 0,
    "2": 1
  }
};

// Fonction helper pour compter le total de commentaires
export function countTotalComments(comments: Comment[]): number {
  return comments.reduce((total, comment) => {
    let count = 1; // Count the parent comment
    if (comment.replies && comment.replies.length > 0) {
      count += countTotalComments(comment.replies);
    }
    return total + count;
  }, 0);
}

// Fonction pour obtenir les commentaires d'un article
export function getArticleComments(slug: string): Comment[] {
  return articleComments[slug] || [];
}