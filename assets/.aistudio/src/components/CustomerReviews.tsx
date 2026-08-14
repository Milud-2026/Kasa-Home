import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, Camera, Plus, Filter, MessageSquare } from 'lucide-react';
import { Review } from '../types';

interface CustomerReviewsProps {
  reviews: Review[];
  onAddReview: (newRev: Review) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews, onAddReview }) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [onlyWithPhotos, setOnlyWithPhotos] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('Casablanca');
  const [newRating, setNewRating] = useState(5);
  const [newColor, setNewColor] = useState('Beige Bouclé (Nude)');
  const [newComment, setNewComment] = useState('');
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>({});

  const filteredReviews = reviews.filter((r) => {
    if (filterRating && r.rating !== filterRating) return false;
    if (onlyWithPhotos && (!r.images || r.images.length === 0)) return false;
    return true;
  });

  const handleHelpfulClick = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const created: Review = {
      id: `rev-custom-${Date.now()}`,
      author: newAuthor.trim(),
      location: newCity,
      rating: newRating,
      date: 'Aujourd\'hui',
      verified: true,
      colorChosen: newColor,
      comment: newComment.trim(),
      helpfulCount: 0,
    };

    onAddReview(created);
    setIsWriteModalOpen(false);
    setNewAuthor('');
    setNewComment('');
  };

  return (
    <section id="reviews-section" className="my-10 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
      {/* Header & Overall Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
            Retours Expérience Clients Maroc
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Avis Clients Vérifiés ({reviews.length})
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            100% d'avis authentiques d'acheteurs ayant commandé chez Mon Habitat.
          </p>
        </div>

        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="bg-stone-900 hover:bg-amber-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Donner mon avis</span>
        </button>
      </div>

      {/* Score Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center bg-stone-50 p-6 rounded-2xl border border-stone-100">
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-4">
          <span className="font-serif text-5xl font-extrabold text-[#2A231F]">4.8</span>
          <div className="flex text-amber-400 my-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs text-stone-600 font-medium">Recommandé par 98% des clients</span>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-8 flex flex-col gap-1.5 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <span className="w-12 font-medium">5 étoiles</span>
            <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '85%' }} />
            </div>
            <span className="w-8 font-bold text-right">85%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 font-medium">4 étoiles</span>
            <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }} />
            </div>
            <span className="w-8 font-bold text-right">15%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 font-medium">3 étoiles</span>
            <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '0%' }} />
            </div>
            <span className="w-8 font-bold text-right">0%</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-500 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtrer par :
          </span>
          <button
            onClick={() => setFilterRating(null)}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              filterRating === null
                ? 'bg-amber-900 text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Tous ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              filterRating === 5
                ? 'bg-amber-900 text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            5 Étoiles
          </button>
          <button
            onClick={() => setOnlyWithPhotos(!onlyWithPhotos)}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
              onlyWithPhotos
                ? 'bg-amber-900 text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Avec photos
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-4">
        {filteredReviews.length === 0 ? (
          <p className="text-center py-8 text-stone-500 text-xs">
            Aucun avis ne correspond à vos filtres.
          </p>
        ) : (
          filteredReviews.map((rev) => {
            const addedHelpful = helpfulCounts[rev.id] || 0;
            return (
              <div
                key={rev.id}
                className="p-4 sm:p-5 rounded-xl border border-stone-100 bg-stone-50/50 hover:bg-stone-50 transition-colors flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-100 font-bold text-xs flex items-center justify-center">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900 text-xs sm:text-sm">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                            <CheckCircle className="w-3 h-3 text-emerald-600" /> Achat vérifié ({rev.location})
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-500">
                        Finition choisie : <strong className="text-stone-700">{rev.colorChosen}</strong>
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                </div>

                {/* Rating Stars */}
                <div className="flex text-amber-400 my-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{rev.comment}</p>

                {/* Review Photo Attachments */}
                {rev.images && rev.images.length > 0 && (
                  <div className="flex items-center gap-2 mt-1 overflow-x-auto pb-1">
                    {rev.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Photo client"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover border border-stone-200"
                      />
                    ))}
                  </div>
                )}

                {/* Helpful Counter */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    className="text-[11px] text-stone-500 hover:text-amber-900 flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-stone-200 shadow-2xs"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Utile ({rev.helpfulCount + addedHelpful})</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Write Review */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-800" />
                Écrire un avis client
              </h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="text-stone-400 hover:text-stone-800 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Votre Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Rachid Tazi"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Note (Étoiles)</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-800 focus:outline-none font-bold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellence)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Très bien)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Moyen)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Couleur commandée</label>
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Votre avis détaillé *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Partagez votre avis sur le confort, la livraison et le tissu bouclé..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-800 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 text-stone-700 font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-900 text-amber-100 font-bold hover:bg-amber-950"
                >
                  Publier l'avis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
