import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { settings } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
          SERVICE CLIENT & SUPPORT
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">Contactez-nous</h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Notre équipe est à votre disposition 7j/7 pour répondre à toutes vos questions concernant vos commandes et conseils de décoration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 bg-stone-900 text-white rounded-3xl p-8 space-y-8 shadow-xl">
          <div>
            <h2 className="text-2xl font-serif font-bold text-amber-400">Mon Habitat Maroc</h2>
            <p className="text-stone-300 text-xs mt-1">Siège social & Showroom</p>
          </div>

          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-200">Adresse</div>
                <div className="text-stone-300 text-xs mt-0.5">{settings.storeAddress}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-200">WhatsApp Direct</div>
                <div className="text-stone-300 text-xs mt-0.5">{settings.whatsappNumber}</div>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-xs font-bold text-amber-400 hover:underline"
                >
                  Discuter sur WhatsApp &rarr;
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-200">Téléphone Fixe</div>
                <div className="text-stone-300 text-xs mt-0.5">{settings.supportPhone}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-200">Email</div>
                <div className="text-stone-300 text-xs mt-0.5">{settings.supportEmail}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-200">Horaires d'ouverture</div>
                <div className="text-stone-300 text-xs mt-0.5">Lundi – Samedi : 09h00 – 20h00</div>
                <div className="text-stone-400 text-xs">Dimanche : 10h00 – 18h00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">Message Envoyé avec Succès !</h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Merci {formData.name}. Notre équipe vous recontactera par téléphone ou WhatsApp très rapidement.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-stone-900 text-white font-bold text-xs px-6 py-3 rounded-xl mt-4"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-stone-900">Laissez-nous un message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Nom Complet *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Youssef Berrada"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: 06 61 23 45 67"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Adresse Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: email@domaine.ma"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ex: Casablanca, Rabat, Marrakech..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Votre Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Bonjour, je souhaiterais des informations sur..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer le Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
