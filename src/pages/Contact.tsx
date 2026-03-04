import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { SEOHead } from "../components/SEOHead";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white">
      <SEOHead 
        title="Contact Numcafé - Posez vos Questions sur la Tech et l'IA"
        description="Contactez Numcafé pour vos questions sur l'actualité numérique, les tendances tech et l'intelligence artificielle. Notre équipe vous répond autour d'un café digital."
        keywords="contact numcafé, questions tech, actualité numérique, intelligence artificielle, tendances tech, support"
        canonical="https://numcafe.com/contact"
      />
      {/* Hero */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-semibold text-[#1D1D1D] mb-6">Contactez-nous</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Une question, une suggestion ou simplement envie de discuter tech et actualité numérique ? N'hésitez pas à nous écrire, nous serions
            ravis d'échanger avec vous autour d'une tasse de café virtuelle.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[#1D1D1D] mb-8">Nos coordonnées</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
                    <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#C69C6D]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1D1D1D] mb-1">Email</h3>
                      <a
                        href="mailto:hello@numcafe.com"
                        className="text-gray-600 hover:text-[#C69C6D] transition-colors"
                      >
                        hello@numcafe.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
                    <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#C69C6D]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1D1D1D] mb-1">Localisation</h3>
                      <p className="text-gray-600">Frankfurt, Allemagne</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="font-semibold text-[#1D1D1D] mb-3">Temps de réponse</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous nous efforçons de répondre à tous les messages dans un délai de 24 à 48 heures ouvrées.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-[#1D1D1D] mb-6">Envoyez-nous un message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-xl">
                    <p className="text-green-800">
                      Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[#1D1D1D] mb-2 font-medium">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C6D]/50 focus:border-[#C69C6D]"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[#1D1D1D] mb-2 font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C6D]/50 focus:border-[#C69C6D]"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[#1D1D1D] mb-2 font-medium">
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C6D]/50 focus:border-[#C69C6D]"
                      placeholder="De quoi souhaitez-vous parler ?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[#1D1D1D] mb-2 font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C6D]/50 focus:border-[#C69C6D] resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-colors inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Envoyer le message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-[#1D1D1D] mb-8 text-center">Questions fréquentes</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-lg transition-all">
              <h3 className="font-semibold text-[#1D1D1D] mb-3">Puis-je proposer un article ?</h3>
              <p className="text-gray-600 leading-relaxed">
                Absolument ! Nous sommes toujours à la recherche de contributeurs passionnés. Contactez-nous à
                hello@numcafe.com avec votre proposition.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-lg transition-all">
              <h3 className="font-semibold text-[#1D1D1D] mb-3">Comment m'abonner à la newsletter ?</h3>
              <p className="text-gray-600 leading-relaxed">
                Vous pouvez vous abonner directement depuis la page blog ou nous envoyer un email avec l'objet
                "Newsletter".
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-lg transition-all">
              <h3 className="font-semibold text-[#1D1D1D] mb-3">Proposez-vous des partenariats ?</h3>
              <p className="text-gray-600 leading-relaxed">
                Oui, nous sommes ouverts aux partenariats avec des marques et entreprises alignées avec nos valeurs.
                Contactez-nous pour discuter des opportunités.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}