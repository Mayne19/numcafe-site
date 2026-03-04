import { motion } from "motion/react";
import { Mail } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <div className="bg-gradient-to-br from-[#FAF7F4] via-white to-[#FAF7F4] min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#C69C6D] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#C69C6D] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-[#1D1D1D] mb-4">Politique de confidentialité</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chez Numcafé, nous accordons une grande importance à la protection de vos données personnelles. 
              Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégons vos données.
            </p>
          </div>
          
          <div className="space-y-8 text-gray-600">
            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">1. Responsable du traitement</h2>
              <p className="mb-4">
                Le responsable du traitement des données personnelles est :
              </p>
              <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FFFBF5] rounded-xl p-6 border-2 border-[#C69C6D] border-opacity-20">
                <p className="font-semibold text-[#1D1D1D] mb-2">
                  <strong className="text-[#C69C6D]">Mayne</strong>
                </p>
                <p className="mb-3">Éditeur du site Numcafé</p>
                <a 
                  href="mailto:hello@numcafe.com" 
                  className="inline-flex items-center gap-2 text-[#C69C6D] hover:text-[#B88C5D] transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  hello@numcafe.com
                </a>
                <p className="mt-4 text-sm italic" style={{ color: '#555555' }}>
                  Aucune adresse postale personnelle n'est publiée afin de respecter la confidentialité de l'éditeur, conformément à la législation applicable aux sites non professionnels.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">2. Données collectées</h2>
              <p className="mb-4">
                Nous collectons les données suivantes :
              </p>
              <p className="mb-2"><strong>2.1 Données fournies directement</strong></p>
              <ul className="space-y-2 ml-4 mb-4" style={{ color: '#555555' }}>
                <li>• Nom et prénom (formulaire de contact)</li>
                <li>• Adresse email (newsletter et formulaire de contact)</li>
                <li>• Message et sujet (formulaire de contact)</li>
              </ul>
              
              <p className="mb-2"><strong>2.2 Données collectées automatiquement</strong></p>
              <ul className="space-y-2 ml-4" style={{ color: '#555555' }}>
                <li>• Adresse IP</li>
                <li>• Type de navigateur et version</li>
                <li>• Pages consultées et durée de visite</li>
                <li>• Données de navigation (cookies)</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">3. Finalités du traitement</h2>
              <p className="mb-4">
                Vos données sont collectées pour les finalités suivantes :
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#555555' }}>
                <li>• Répondre à vos demandes de contact</li>
                <li>• Vous envoyer notre newsletter (avec votre consentement)</li>
                <li>• Améliorer nos services et l'expérience utilisateur</li>
                <li>• Réaliser des statistiques de visite</li>
                <li>• Assurer la sécurité du site</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">4. Base légale du traitement</h2>
              <p className="mb-4">
                Le traitement de vos données repose sur :
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#555555' }}>
                <li>• Votre consentement (newsletter)</li>
                <li>• L'exécution d'un contrat ou de mesures précontractuelles</li>
                <li>• Notre intérêt légitime (amélioration du site, statistiques)</li>
                <li>• Le respect d'une obligation légale</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">5. Destinataires des données</h2>
              <p className="mb-4">
                Vos données peuvent être transmises aux destinataires suivants :
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#555555' }}>
                <li>• Personnel autorisé de Numcafé</li>
                <li>• Prestataires techniques (hébergement, services d'emailing)</li>
                <li>• Autorités compétentes sur demande légale</li>
              </ul>
              <p className="mt-4">
                Nous ne vendons ni ne louons vos données personnelles à des tiers.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">6. Durée de conservation</h2>
              <p className="mb-4">
                Vos données sont conservées pour les durées suivantes :
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#555555' }}>
                <li>• Données de contact : jusqu'à désinscription ou 3 ans d'inactivité</li>
                <li>• Newsletter : jusqu'à désinscription</li>
                <li>• Données de navigation : 13 mois maximum</li>
                <li>• Formulaire de contact : 3 ans après le dernier contact</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">7. Vos droits</h2>
              <p className="mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#555555' }}>
                <li>• <strong className="text-[#1D1D1D]">Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li>• <strong className="text-[#1D1D1D]">Droit de rectification :</strong> corriger vos données inexactes</li>
                <li>• <strong className="text-[#1D1D1D]">Droit à l'effacement :</strong> supprimer vos données</li>
                <li>• <strong className="text-[#1D1D1D]">Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li>• <strong className="text-[#1D1D1D]">Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                <li>• <strong className="text-[#1D1D1D]">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li>• <strong className="text-[#1D1D1D]">Droit de retirer votre consentement :</strong> à tout moment</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:hello@numcafe.com" className="text-[#C69C6D] hover:underline font-medium">hello@numcafe.com</a>
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">8. Cookies</h2>
              <p className="mb-4">
                Notre site utilise des cookies pour améliorer votre expérience. Les cookies sont de petits fichiers texte stockés sur votre appareil.
              </p>
              <p className="mb-2"><strong>Types de cookies utilisés :</strong></p>
              <ul className="space-y-2 ml-4 mb-4" style={{ color: '#555555' }}>
                <li>• <strong className="text-[#1D1D1D]">Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                <li>• <strong className="text-[#1D1D1D]">Cookies analytiques :</strong> pour mesurer l'audience et améliorer le site</li>
                <li>• <strong className="text-[#1D1D1D]">Cookies de préférence :</strong> pour mémoriser vos choix</li>
              </ul>
              <p>
                Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">9. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Cependant, aucune transmission sur Internet n'est totalement sécurisée.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">10. Transfert de données</h2>
              <p>
                Vos données sont hébergées au sein de l'Union Européenne. En cas de transfert hors UE, nous nous assurons que des garanties appropriées sont mises en place conformément au RGPD.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">11. Modifications</h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">12. Réclamation</h2>
              <p className="mb-4">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#555555' }}>
                <li>• Site web : <a href="https://www.cnil.fr" className="text-[#C69C6D] hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></li>
                <li>• Adresse : 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">13. Contact</h2>
              <p className="mb-4">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez-nous :
              </p>
              <a 
                href="mailto:hello@numcafe.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all hover:gap-3 font-medium"
              >
                <Mail className="w-5 h-5" />
                hello@numcafe.com
              </a>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-300 text-center">
              <p className="text-sm text-gray-500">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}