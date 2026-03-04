// Plugin SEO type Yoast pour Studio Numcafé

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  focusKeyword: string;
  slug: string;
}

export type SEOScore = 'green' | 'yellow' | 'orange' | 'red';

export interface SEOAnalysis {
  score: SEOScore;
  percentage: number;
  checks: SEOCheck[];
}

export interface SEOCheck {
  id: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
}

// Analyse SEO d'un article
export function analyzeSEO(
  title: string,
  content: string,
  seoData: SEOData
): SEOAnalysis {
  const checks: SEOCheck[] = [];

  // 1. Vérifier la longueur du meta title
  const titleLength = seoData.metaTitle?.length || title.length;
  if (titleLength >= 40 && titleLength <= 60) {
    checks.push({
      id: 'title-length',
      label: 'Longueur du titre',
      status: 'pass',
      message: `Le titre contient ${titleLength} caractères (optimal: 40-60)`,
    });
  } else if (titleLength > 0 && titleLength < 70) {
    checks.push({
      id: 'title-length',
      label: 'Longueur du titre',
      status: 'warning',
      message: `Le titre contient ${titleLength} caractères (recommandé: 40-60)`,
    });
  } else {
    checks.push({
      id: 'title-length',
      label: 'Longueur du titre',
      status: 'fail',
      message: titleLength === 0 
        ? 'Le titre est vide' 
        : `Le titre est trop long (${titleLength} caractères)`,
    });
  }

  // 2. Vérifier la longueur de la meta description
  const descLength = seoData.metaDescription?.length || 0;
  if (descLength >= 120 && descLength <= 160) {
    checks.push({
      id: 'desc-length',
      label: 'Longueur de la description',
      status: 'pass',
      message: `La description contient ${descLength} caractères (optimal: 120-160)`,
    });
  } else if (descLength > 0 && descLength < 200) {
    checks.push({
      id: 'desc-length',
      label: 'Longueur de la description',
      status: 'warning',
      message: `La description contient ${descLength} caractères (recommandé: 120-160)`,
    });
  } else {
    checks.push({
      id: 'desc-length',
      label: 'Longueur de la description',
      status: 'fail',
      message: descLength === 0 
        ? 'La description est vide' 
        : `La description est trop longue (${descLength} caractères)`,
    });
  }

  // 3. Vérifier la présence de H2
  const hasH2 = /<h2/i.test(content) || /##\s/.test(content);
  checks.push({
    id: 'has-h2',
    label: 'Présence de sous-titres H2',
    status: hasH2 ? 'pass' : 'warning',
    message: hasH2 
      ? 'L\'article contient des sous-titres H2' 
      : 'Ajoutez des sous-titres H2 pour structurer votre contenu',
  });

  // 4. Vérifier la présence d'images
  const hasImage = /<img/i.test(content);
  checks.push({
    id: 'has-image',
    label: 'Présence d\'image',
    status: hasImage ? 'pass' : 'warning',
    message: hasImage 
      ? 'L\'article contient au moins une image' 
      : 'Ajoutez des images pour enrichir votre contenu',
  });

  // 5. Vérifier la présence de liens internes
  const hasInternalLink = /<a[^>]*href/i.test(content);
  checks.push({
    id: 'has-internal-link',
    label: 'Présence de liens internes',
    status: hasInternalLink ? 'pass' : 'warning',
    message: hasInternalLink 
      ? 'L\'article contient des liens' 
      : 'Ajoutez des liens internes pour améliorer le maillage',
  });

  // 6. Vérifier le mot-clé principal
  if (seoData.focusKeyword) {
    const keyword = seoData.focusKeyword.toLowerCase();
    const titleLower = (seoData.metaTitle || title).toLowerCase();
    const contentLower = content.toLowerCase();
    
    const inTitle = titleLower.includes(keyword);
    const inContent = contentLower.includes(keyword);
    
    if (inTitle && inContent) {
      checks.push({
        id: 'focus-keyword',
        label: 'Mot-clé principal',
        status: 'pass',
        message: `Le mot-clé "${seoData.focusKeyword}" est présent dans le titre et le contenu`,
      });
    } else if (inContent) {
      checks.push({
        id: 'focus-keyword',
        label: 'Mot-clé principal',
        status: 'warning',
        message: `Le mot-clé "${seoData.focusKeyword}" est présent dans le contenu mais pas dans le titre`,
      });
    } else {
      checks.push({
        id: 'focus-keyword',
        label: 'Mot-clé principal',
        status: 'fail',
        message: `Le mot-clé "${seoData.focusKeyword}" n'est pas présent dans le contenu`,
      });
    }
  } else {
    checks.push({
      id: 'focus-keyword',
      label: 'Mot-clé principal',
      status: 'warning',
      message: 'Définissez un mot-clé principal pour optimiser votre SEO',
    });
  }

  // 7. Vérifier l'image OG
  if (seoData.ogImage) {
    checks.push({
      id: 'og-image',
      label: 'Image Open Graph',
      status: 'pass',
      message: 'Une image de partage est définie',
    });
  } else {
    checks.push({
      id: 'og-image',
      label: 'Image Open Graph',
      status: 'warning',
      message: 'Ajoutez une image pour optimiser le partage sur les réseaux sociaux',
    });
  }

  // Calculer le score global
  const passCount = checks.filter(c => c.status === 'pass').length;
  const warningCount = checks.filter(c => c.status === 'warning').length;
  const failCount = checks.filter(c => c.status === 'fail').length;
  
  const percentage = Math.round((passCount / checks.length) * 100);
  
  let score: SEOScore;
  if (percentage >= 80) {
    score = 'green';
  } else if (percentage >= 60) {
    score = 'yellow';
  } else if (percentage >= 40) {
    score = 'orange';
  } else {
    score = 'red';
  }

  return {
    score,
    percentage,
    checks,
  };
}

// Obtenir la couleur du score
export function getScoreColor(score: SEOScore): string {
  const colors = {
    green: '#10b981',
    yellow: '#fbbf24',
    orange: '#f97316',
    red: '#ef4444',
  };
  return colors[score];
}

// Obtenir le label du score
export function getScoreLabel(score: SEOScore): string {
  const labels = {
    green: 'Excellent',
    yellow: 'Bon',
    orange: 'Moyen',
    red: 'À améliorer',
  };
  return labels[score];
}
