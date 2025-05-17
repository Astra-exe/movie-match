from collections import defaultdict
import spacy
import emoji
from typing import List, Dict
import google.generativeai as genai
import config

# load the Spanish NLP model
nlp = spacy.load("es_core_news_md")

# Load the Gemini model
genai.configure(api_key=config.GEMINI_API_KEY)
gemini = genai.GenerativeModel('gemini-2.0-flash')

# Manual mapping of emojis to features in Spanish
EMOJI_TO_FEATURES = {
    "😂": ["comedia", "felicidad"],
    "❤️": ["amor", "romance"],
    "🥲": ["nostalgia", "emoción"],
    "👍": ["positivo", "aceptación"],
    "🥰": ["amor", "ternura"],
    "😍": ["romance", "atracción"],
    "😭": ["tristeza", "drama"],
    "🙏": ["agradecimiento", "esperanza"],
    "🔥": ["acción", "intensidad"],
    "💖": ["amor", "brillo"],
    "😎": ["confianza", "cool"],
    "✨": ["fantasía", "magia"],
    "😡": ["ira", "conflicto"],
    "😅": ["nervios", "situaciones incómodas"],
    "✅": ["resuelto", "positivo"],
    "😱": ["terror", "sorpresa"],
    "🤔": ["reflexión", "misterio"],
    "😐": ["neutral", "apatía"],
    "☹️": ["melancolía", "tristeza"],
    "👏": ["logro", "aplausos"],
    "😘": ["beso", "coqueto"],
    "😜": ["diversión", "irreverente"],
    "💔": ["ruptura", "drama"],
    "😴": ["aburrimiento", "relajación"],
    "😲": ["sorpresa", "increíble"],
    "😻": ["amor", "ternura"],
    "🤭": ["vergüenza", "secreto"],
    "🤯": ["mente volada", "impacto"],
    "😵": ["confusión", "caos"],
    "🌍": ["global", "realidad"],
    "😈": ["rebeldía", "villano"],
    "💩": ["humor", "irreverencia"],
    "🤡": ["absurdo", "engaño"],
    "🥳": ["celebración", "fiesta"],
    "🥂": ["brindis", "evento especial"],
    "🍺": ["relajo", "amistad"],
    "🎬": ["cine", "películas"],
    "🍿": ["cine", "entretenimiento"],
    "⭐": ["favorito", "excelente"],
    "👀": ["curiosidad", "atención"],
    "⏰": ["tiempo", "urgencia"],
    "🦋": ["transformación", "belleza"],
    "😹": ["comedia", "gatos"],
    "🫠": ["derretido", "vergüenza"],
    "🤞": ["esperanza", "deseo"],
    "😇": ["inocencia", "bondad"],
    "😬": ["incomodidad", "tensión"],
    "🎉": ["celebración", "fiesta"],
    "🫶": ["cariño", "apoyo"],
    "🎧": ["música", "concentración"]
}


def emoji_to_spanish_text(emoji_char: str) -> List[str]:
    #verify if the emoji is in the local mapping
    if emoji_char in EMOJI_TO_FEATURES:
        return EMOJI_TO_FEATURES[emoji_char]
    
    # if not, use the emoji library to get the name in Spanish
    emoji_name_es = emoji.demojize(emoji_char, language='es').strip(":").replace("_", " ")
    
    #Process the emoji name with spaCy
    doc = nlp(emoji_name_es)
    keywords = [
        token.text.lower() 
        for token in doc 
        if token.pos_ in ["NOUN", "ADJ"] and len(token.text) > 3
    ]
    
    return keywords if keywords else [emoji_name_es]

def get_emotion_profile(emojis: List[str]) -> Dict[str, float]:
    #generate a profile of emotions based on the emojis
    emotion_counts = defaultdict(int)
    total = 0
    
    for emoji_char in emojis:
        keywords = emoji_to_spanish_text(emoji_char)
        for word in keywords:
            emotion_counts[word] += 1
        total += len(keywords)
    
    return {k: v/total for k, v in emotion_counts.items()} if total > 0 else {}

def extract_mood_tags(text: str) -> List[str]:
    # Extract mood tags from the free text
    doc = nlp(text)
    return [
        token.text.lower()
        for token in doc
        if token.pos_ in ["NOUN", "ADJ"] and len(token.text) > 4
    ][:11]

def generate_gemini_explanation(group_data, movie, affinity_score: float, is_top:bool) -> str:
    prompt = f"""
    Eres un experto en recomendación de películas. Genera una explicación clara y amigable en español latino (máximo 7 frases) de por qué la película {movie.title} 
    es buena para el grupo que busca **{group_data.mood}**. 

    Contexto:
    - Géneros favoritos del grupo: {', '.join([g for p in group_data.people for g in p.genre])}
    - Emojis del grupo: {', '.join([e for p in group_data.people for e in p.emojis])}
    - Texto libre del grupo: "{group_data.comments}" (Si no hay, omite este punto)
    - Porcentaje de afinidad: {affinity_score*100:.1f}%

    La película:
    - Géneros: {', '.join(movie.genres)}
    - Rating: {movie.audience_rating}/10
    - Mood tags: {', '.join(movie.mood_tags)}

    Instrucciones:
    {"¡Destacar como la mejor recomendación usando 2 emojis relevantes!" if is_top else "1. Presentar como buena alternativa con 1 emoji"}
    1. Usa emojis relevantes.
    2. Destaca 1-2 características clave.
    3. Sé entusiasta queremos que vayan al cine.
    4. Explica cómo se relaciona con el mood del grupo.
        """
    
    response = gemini.generate_content(prompt)
    return response.text