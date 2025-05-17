import requests
from typing import List, Dict
from utils.models import Movie

def get_genre_mapping(api_key: str) -> Dict[int, str]:
    # get the genre mapping from TMDB API in Spanish
    url = f"https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=es-MX"
    response = requests.get(url)
    return {g["id"]: g["name"] for g in response.json().get("genres", [])}

def fetch_all_now_playing_movies(api_key: str, max_pages: int = 3) -> List[Movie]:
    # Fetch all movies currently playing in theaters
    genre_mapping = get_genre_mapping(api_key)
    movies = []
    
    for page in range(1, max_pages + 1):
        url = f"https://api.themoviedb.org/3/movie/now_playing?api_key={api_key}&region=MX&page={page}"
        response = requests.get(url)
        data = response.json()
        
        for movie_data in data.get("results", []):
            # Convert genre IDs to names using the genre mapping
            genres = [
                genre_mapping[gid] 
                for gid in movie_data.get("genre_ids", []) 
                if gid in genre_mapping
            ]
            
            movies.append(Movie(
                id=str(movie_data["id"]),
                title=movie_data.get("title", "Sin título"),
                genres=genres,
                mood_tags=[],  # we will fill this later
                audience_rating=movie_data.get("vote_average", 0)
            ))
    
    return movies