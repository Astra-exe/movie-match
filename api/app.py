from flask import Flask, request, jsonify
from pydantic import ValidationError
from recommender import MovieRecommender  # Import the recommender class
from utils.models import GroupRequest
from movie_fetcher import fetch_all_now_playing_movies
import config

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        #Validate the request data
        group_data = GroupRequest.model_validate(request.json)
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400

    try:
        # Get the list of movies currently playing
        movies = fetch_all_now_playing_movies(config.TMDB_API_KEY)
        
        # Generate recommendations
        recommender = MovieRecommender(group_data, movies)
        recommendations = recommender.get_recommendations(top_n=3)  # Top 3 movies

        # Fromat the response
        response = {
            "recommendations": [{
                "movie_id": rec["movie"].id,
                "title": rec["movie"].title,
                "genres": rec["movie"].genres,
                "affinity": rec["affinity"],  # Affinity score
                "why": rec["movie"].gemini_explanation,  # Gemini explanation
            } for rec in recommendations]
        }
        
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": f"Error interno: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)