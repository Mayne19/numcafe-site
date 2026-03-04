import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Toaster } from "sonner@2.0.3";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { LoadingScreen } from "./components/LoadingScreen";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Article } from "./pages/Article";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { LegalNotice } from "./pages/LegalNotice";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { NotFound } from "./pages/NotFound";
import { IntelligenceArtificielle } from "./pages/IntelligenceArtificielle";
import { DeveloppementWeb } from "./pages/DeveloppementWeb";
import { DesignUX } from "./pages/DesignUX";
import { SEOReferencement } from "./pages/SEOReferencement";
import { CultureDigitale } from "./pages/CultureDigitale";
import { ProductiviteCafe } from "./pages/ProductiviteCafe";
import { ReseauxSociaux } from "./pages/ReseauxSociaux";
import { EcommerceMarketing } from "./pages/EcommerceMarketing";
import { AuthorArticles } from "./pages/AuthorArticles";
import { Authors } from "./pages/Authors";
import { LoginStudio } from "./pages/LoginStudio";
import { Studio } from "./pages/Studio";

const LOADING_SCREEN_KEY = "numcafe_loading_shown";

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if the loading screen has already been shown
    const hasShown = sessionStorage.getItem(LOADING_SCREEN_KEY);
    return !hasShown;
  });

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  useEffect(() => {
    // Force full page reload on browser back/forward navigation
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleLoadingComplete = () => {
    // Mark loading screen as shown for this session
    sessionStorage.setItem(LOADING_SCREEN_KEY, "true");
    setIsLoading(false);
  };

  return (
    <LanguageProvider>
      <Toaster position="top-right" richColors />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            onComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Routes admin sans Layout */}
            <Route path="/login-studio" element={<LoginStudio />} />
            <Route path="/studio" element={<Studio />} />

            {/* Routes publiques avec Layout */}
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route
                    path="/article/:slug"
                    element={<Article />}
                  />
                  <Route path="/a-propos" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route
                    path="/mentions-legales"
                    element={<LegalNotice />}
                  />
                  <Route
                    path="/politique-de-confidentialite"
                    element={<PrivacyPolicy />}
                  />
                  <Route
                    path="/intelligence-artificielle"
                    element={<IntelligenceArtificielle />}
                  />
                  <Route
                    path="/developpement-web"
                    element={<DeveloppementWeb />}
                  />
                  <Route path="/design-ux" element={<DesignUX />} />
                  <Route
                    path="/seo-referencement"
                    element={<SEOReferencement />}
                  />
                  <Route
                    path="/culture-digitale"
                    element={<CultureDigitale />}
                  />
                  <Route
                    path="/productivite-cafe"
                    element={<ProductiviteCafe />}
                  />
                  <Route
                    path="/reseaux-sociaux"
                    element={<ReseauxSociaux />}
                  />
                  <Route
                    path="/ecommerce-marketing"
                    element={<EcommerceMarketing />}
                  />
                  <Route
                    path="/auteur/:authorSlug"
                    element={<AuthorArticles />}
                  />
                  <Route
                    path="/auteurs"
                    element={<Authors />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      )}
    </LanguageProvider>
  );
}