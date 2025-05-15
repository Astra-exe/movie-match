from collections import defaultdict
import spacy
import emoji
from typing import List, Dict

# load the Spanish NLP model
nlp = spacy.load("es_core_news_md")

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