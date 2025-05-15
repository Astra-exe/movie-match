from flask import Flask, request, jsonify
from pydantic import ValidationError
from utils.models import GroupRequest
from movie_fetcher import fetch_all_now_playing_movies
import config

app = Flask(__name__)

@app.route("/api/recommend", methods=["POST"])
def recommend():
    try:
        # validate the request data
        group_data = GroupRequest.model_validate(request.json)
    except ValidationError as e:
        # if there's a validation error, return a 400 response with the error details
        return jsonify({"error": e.errors()}), 400
    
    # get the movies currently playing
    movies = fetch_all_now_playing_movies(config.TMDB_API_KEY)
    
    # basic response, the reccommendation logic is not implemented
    return jsonify({
        "group": group_data.model_dump(),  # Convert the validated data to a dictionary
        "movies": [movie.title for movie in movies[:3]]  # names of the first 3 movies
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Run the Flask app on port 5000