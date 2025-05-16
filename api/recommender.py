from typing import List, Dict
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import Counter
from utils.models import Movie
from utils.nlp_utils import get_emotion_profile, extract_mood_tags

class MovieRecommender:
    def __init__(self, group_data: Dict, movies: List[Movie]):
        self.group_data = group_data
        self.movies = movies
        # Adjusted weights for the new moods
        self.weights = {
            'genres': 0.5,
            'emotions': 0.1,
            'mood': 0.2,
            'text': 0.1,
            'context': 0.1
        }

    def _get_group_genre_weights(self) -> Dict[str, float]:
        # Calculate genre weights based on the group's favorite genres
        all_genres = [g for person in self.group_data.people for g in person.fav_genres]
        total = len(all_genres)
        return {genre: count/total for genre, count in Counter(all_genres).items()}

    def _calculate_genre_affinity(self, movie: Movie) -> float:
        # Affinity based on the genres of the movie and the group's favorite genres
        group_genres = self._get_group_genre_weights()
        return sum(group_genres.get(genre, 0) for genre in movie.genres)

    def _calculate_emotion_affinity(self, movie: Movie) -> float:
        # Compare the movie's mood tags with the group's emojis
        emotion_profile = get_emotion_profile(
            [e for p in self.group_data.people for e in p.emojis]
        )
        
        # Convert the movie's mood tags to a string for vectorization
        vectorizer = TfidfVectorizer()
        emotions_text = ' '.join(emotion_profile.keys())
        movie_text = ' '.join(movie.mood_tags)
        
        tfidf = vectorizer.fit_transform([emotions_text, movie_text])
        return cosine_similarity(tfidf[0], tfidf[1])[0][0]

    def _calculate_mood_affinity(self, movie: Movie) -> float:
        # Rules for mood affinity
        mood_rules = {
            # Moods
            'Modo fan': lambda m: m.audience_rating >= 8.0,
            'Explorador': lambda m: 'Documental' in m.genres or 'Indie' in m.genres,
            'Relajado': lambda m: 'Comedia' in m.genres or 'Animación' in m.genres,
            'Buscando emociones fuertes': lambda m: any(g in m.genres for g in ['Terror', 'Thriller', 'Acción']),
            'Modo cita': lambda m: 'Romance' in m.genres and 'Comedia' in m.genres,
            'Solo quiero reírme': lambda m: 'Comedia' in m.genres and m.audience_rating >= 7.0,
            'Curioso por algo distinto': lambda m: len(set(m.genres) >= 3) and 'Mainstream' not in movie.keywords,
            'Modo nostálgico': lambda m: any(k in m.keywords for k in ['años 80', 'años 90', 'clásico']),
            'Buscando profundidad': lambda m: 'Drama' in m.genres and m.audience_rating >= 7.5
        }
        
        current_mood = self.group_data.mood
        return 1.0 if mood_rules.get(current_mood, lambda _: False)(movie) else 0.0

    def _calculate_text_affinity(self, movie: Movie) -> float:
        # Affinity based on the free text provided by the group
        group_keywords = extract_mood_tags(self.group_data.free_text)
        common = len(set(group_keywords) & set(movie.mood_tags))
        return common / len(group_keywords) if group_keywords else 0.0

    def _context_filter(self, movie: Movie) -> float:
        # Context rules for filtering movies
        context_rules = {
            'familia': not any(g in movie.genres for g in ['terror', 'thriller']),
            'pareja': 'romance' in movie.genres,
            'amigos': True  # No hay restricciones
        }
        return 1.0 if context_rules.get(self.group_data.context, True) else 0.0

    def calculate_affinity(self, movie: Movie) -> float:
        # calculate the overall affinity score for a movie
        scores = {
            'genres': self._calculate_genre_affinity(movie),
            'emotions': self._calculate_emotion_affinity(movie),
            'mood': self._calculate_mood_affinity(movie),
            'text': self._calculate_text_affinity(movie),
            'context': self._context_filter(movie)
        }
        return sum(score * self.weights[factor] for factor, score in scores.items())

    def get_recommendations(self, top_n: int = 5) -> List[Dict]:
        # Make recommendations based on the calculated affinities
        scored_movies = [{
            'movie': movie,
            'affinity': round(self.calculate_affinity(movie), 2)
        } for movie in self.movies]
        
        return sorted(scored_movies, key=lambda x: x['affinity'], reverse=True)[:top_n]