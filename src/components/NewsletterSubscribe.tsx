import { useState, FormEvent } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Veuillez entrer une adresse email valide');
      return;
    }

    // Simuler l'inscription à la newsletter (stockage local)
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    
    if (subscribers.includes(email)) {
      toast.info('Vous êtes déjà inscrit à la newsletter');
      setIsSubscribed(true);
      return;
    }

    subscribers.push(email);
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    
    setIsSubscribed(true);
    toast.success('Merci de votre inscription !');
    setEmail('');

    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-[#C69C6D]/10 to-[#C69C6D]/5 rounded-2xl p-8">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#C69C6D]/20 flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-[#C69C6D]" />
        </div>

        <h3 className="mb-3">Restez informé</h3>
        
        <p className="text-gray-600 mb-6">
          Recevez nos derniers articles et analyses directement dans votre boîte mail. 
          Pas de spam, que du contenu de qualité.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C69C6D] focus:ring-2 focus:ring-[#C69C6D]/20 outline-none transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#C69C6D] text-white hover:bg-[#B58A5C] transition-colors font-medium whitespace-nowrap"
              >
                S'abonner
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              En vous inscrivant, vous acceptez de recevoir nos communications par email.
            </p>
          </form>
        ) : (
          <div className="flex items-center gap-3 text-green-600 bg-green-50 px-6 py-4 rounded-lg">
            <CheckCircle className="w-6 h-6" />
            <span className="font-medium">Inscription réussie !</span>
          </div>
        )}
      </div>
    </div>
  );
}
