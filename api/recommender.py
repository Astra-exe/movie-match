from typing import List, Dict
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import Counter
from utils.models import Movie
from utils.nlp_utils import get_emotion_profile, extract_mood_tags, generate_gemini_explanation
import numpy as np

class MovieRecommender:
    def __init__(self, group_data: Dict, movies: List[Movie]):
        self.group_data = group_data
        self.movies = movies
        self.weights = {
            'genres': 0.7,
            'emotions': 0.05,
            'mood': 0.1,
            'text': 0.05,
            'context': 0.1
        }

    def _get_group_genre_weights(self) -> Dict[str, float]:
        all_genres = [g for person in self.group_data.people for g in person.genre]
        total = len(all_genres)
        return {genre: count/total for genre, count in Counter(all_genres).items()}

    def _calculate_genre_affinity(self, movie: Movie) -> float:
        group_genres = set(g for person in self.group_data.people for g in person.genre)
        movie_genres = set(movie.genres)
        intersection = group_genres & movie_genres
        union = group_genres | movie_genres
        return len(intersection) / len(union) if union else 0.0

    def _calculate_emotion_affinity(self, movie: Movie) -> float:
        emotion_profile = get_emotion_profile(
            [e for p in self.group_data.people for e in p.emojis]
        )
        
        # using TF-IDF to calculate similarity
        vectorizer = TfidfVectorizer(ngram_range=(1, 2))
        emotions_text = ' '.join(emotion_profile.keys())
        movie_text = ' '.join(movie.mood_tags)
        
        try:
            tfidf = vectorizer.fit_transform([emotions_text, movie_text])
            return cosine_similarity(tfidf[0], tfidf[1])[0][0]
        except ValueError:
            return 0.0

    def _calculate_mood_affinity(self, movie: Movie) -> float:
        current_mood = self.group_data.mood
        mood_scoring = {
            'modo fan': movie.audience_rating / 10,  # Ej: 8.5 → 0.85
            'explorador': 1.0 if any(g in movie.genres for g in ["Documental", "Indie"]) else 0.3,
            'buscando emociones fuertes': len(set(movie.genres) & {"Terror", "Thriller", "Acción"}) / 3,
            'relajado': 0.8 if "Comedia" in movie.genres else 0.2,
            'modo cita': 1.0 if ("Romance" in movie.genres and "Comedia" in movie.genres) else 0.0,
            'quiero reírme': min(movie.audience_rating / 10 + 0.2, 1.0) if "Comedia" in movie.genres else 0.0,
            'curioso por algo distinto': min(len(set(movie.genres)) / 5, 1.0) * (0.8 if "Mainstream" not in movie.mood_tags else 0.2),
            'modo nostálgico': 0.7 if any(tag in movie.mood_tags for tag in ["clásico", "retro"]) else 0.3,
            'buscando profundidad': (movie.audience_rating / 10) * 0.8 if "Drama" in movie.genres else 0.0
        }
        return mood_scoring.get(current_mood, 0.0)

    def _calculate_text_affinity(self, movie: Movie) -> float:
        if not self.group_data.comments:
            return 0.0
        
        vectorizer = TfidfVectorizer(stop_words='spanish')
        group_text = self.group_data.comments
        movie_text = ' '.join(movie.mood_tags)
        
        try:
            tfidf = vectorizer.fit_transform([group_text, movie_text])
            return cosine_similarity(tfidf[0], tfidf[1])[0][0]
        except ValueError:
            return 0.0

    def _context_filter(self, movie: Movie) -> float:
        context_rules = {
            'familia': 0.0 if any(g in movie.genres for g in ['terror', 'thriller']) else 1.0,
            'pareja': 0.8 if "Romance" in movie.genres else 0.2,
            'amigos': 1.0
        }
        return context_rules.get(self.group_data.context.lower(), 1.0)

    def calculate_affinity(self, movie: Movie) -> float:
        scores = {
            'genres': self._calculate_genre_affinity(movie),
            'emotions': self._calculate_emotion_affinity(movie),
            'mood': self._calculate_mood_affinity(movie),
            'text': self._calculate_text_affinity(movie),
            'context': self._context_filter(movie)
        }
        # Normalize scores to [0, 1]
        for k in scores:
            scores[k] = max(0.0, min(scores[k], 1.0))
        # Adjust weights if needed
        weights = self.weights
        # Debug print
        # print(f"\n{movie.title}:")
        # for k, v in scores.items(): print(f"{k}: {v:.2f}")
        return float(np.dot(list(scores.values()), list(weights.values())))

    def get_recommendations(self, top_n: int = 5) -> List[Dict]:
        scored_movies = [{
            'movie': movie,
            'affinity': round(self.calculate_affinity(movie), 4)
        } for movie in self.movies]

        sorted_movies = sorted(scored_movies, key=lambda x: x['affinity'], reverse=True)[:top_n]
        
        for i, rec in enumerate(sorted_movies):
            rec['movie'].gemini_explanation = generate_gemini_explanation(
                self.group_data,
                rec['movie'],
                rec['affinity'],
                is_top=(i == 0)
            )
        
        return sorted_movies