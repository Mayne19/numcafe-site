import { motion } from "motion/react";
import { Mail } from "lucide-react";

export function LegalNotice() {
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
            <h1 className="text-[#1D1D1D] mb-4">Mentions légales</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Informations légales concernant l'édition et l'hébergement du site Numcafé, conformément aux obligations légales en vigueur.
            </p>
          </div>
          
          <div className="space-y-8 text-gray-600">
            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">1. Informations générales</h2>
              <p className="mb-4">
                Le site Numcafé est édité par une personne physique agissant sous le pseudonyme <strong className="text-[#C69C6D]">Mayne</strong>, à titre non professionnel.
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#555555' }}>
                <li><strong className="text-[#1D1D1D]">Éditeur :</strong> Mayne</li>
                <li><strong className="text-[#1D1D1D]">Email de contact :</strong> hello@numcafe.com</li>
                <li><strong className="text-[#1D1D1D]">Pays de résidence :</strong> Allemagne</li>
              </ul>
              <p className="mt-4 italic">
                Aucune activité commerciale n'est exercée via ce site.
                En conséquence, les informations telles que SIRET, RCS ou numéro de TVA ne sont pas applicables.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">2. Directeur de la publication</h2>
              <p>
                Le directeur de la publication est <strong className="text-[#C69C6D]">Mayne</strong>, en qualité d'éditeur du site.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">3. Hébergement</h2>
              <p className="mb-4">
                Le site Numcafé est hébergé par :
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#555555' }}>
                <li><strong className="text-[#1D1D1D]">Raison sociale :</strong> Hostinger International Ltd.</li>
                <li><strong className="text-[#1D1D1D]">Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
                <li><strong className="text-[#1D1D1D]">Site web :</strong> <a href="https://www.hostinger.com" target="_blank" rel="noopener noreferrer" className="text-[#C69C6D] hover:underline">https://www.hostinger.com</a></li>
                <li><strong className="text-[#1D1D1D]">Téléphone :</strong> +1 212 651 9606</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">4. Propriété intellectuelle</h2>
              <p className="mb-4">
                Tous les contenus présents sur le site Numcafé (textes, images, graphismes, logos, vidéos, etc.) sont protégés par la législation sur le droit d'auteur.
              </p>
              <p className="mb-4">
                Toute reproduction, adaptation ou diffusion de ces contenus, totale ou partielle, est interdite sans autorisation écrite préalable de l'éditeur.
              </p>
              <p>
                Les marques et logos appartenant à des tiers restent la propriété exclusive de leurs détenteurs respectifs.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">5. Responsabilité</h2>
              <p className="mb-4">
                Numcafé s'efforce de fournir des informations exactes et à jour.
                Cependant, aucune garantie n'est donnée quant à l'exactitude, la précision ou l'exhaustivité des contenus.
              </p>
              <p className="mb-3">
                L'éditeur décline toute responsabilité pour :
              </p>
              <ul className="space-y-2 ml-6" style={{ color: '#555555' }}>
                <li>• toute erreur ou omission,</li>
                <li>• toute indisponibilité temporaire du site,</li>
                <li>• tout dommage résultant de l'utilisation du site ou de sites tiers accessibles via des liens.</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">6. Liens hypertextes</h2>
              <p className="mb-4">
                Le site peut contenir des liens vers des sites tiers.
                Numcafé n'exerce aucun contrôle sur ces sites et ne peut être tenu responsable de leurs contenus ou de leur fonctionnement.
              </p>
              <p>
                La création de liens vers Numcafé doit faire l'objet d'une autorisation préalable.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">7. Loi applicable</h2>
              <p>
                Les présentes mentions légales sont régies par la loi française.
                En cas de litige, et à défaut de résolution amiable, les tribunaux français seront compétents.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200">
              <h2 className="mb-4 font-semibold text-[#1D1D1D] text-[20px]">8. Contact</h2>
              <p className="mb-4">
                Pour toute question relative à ces mentions légales :
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