from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import List, Optional

class Person(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={ #Example of how the JSON schema will look like (for documentation purposes)
            "example": {
                "name": "Ana",  
                "genre": "Acción",
                "emojis": ["🔥"]
            }
        }
    )
    
    name: str = Field(..., min_length=1) # Name of the person (minimum 1 character)
    genre: List[str] = Field(..., min_length=1) # Name of the genre (minimum 1 character)
    emojis: List[str] = Field(..., min_length=1, max_length=2) # At least one emoji, maximum two

    @field_validator("genre", mode="before")
    @classmethod
    def ensure_genre_list(cls, v):
        if isinstance(v, str):
            return [v]
        return v

    @field_validator("emojis")
    @classmethod
    def validate_emojis(cls, v: List[str]) -> List[str]:
        if not v:
            raise ValueError("Debe incluir al menos 1 emoji") # Must include at least 1 emoji validation
        return v

class GroupRequest(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "Noche de amigos",
                "size": 4,
                "context": "amigos",
                "mood": "modo fan",
                "people": [],
                "comments": "Queremos algo emocionante"
            }
        }
    )
    
    name: str = Field(..., min_length=1) # Name of the group (minimum 1 character)
    size: int = Field(..., gt=0) # Size of the group (greater than 0)
    context: str = Field(..., pattern="^(solo|pareja|amigos|familia)$") # Context of the group (solo, pareja, amigos, familia)
    mood: str = Field(..., pattern="^(modo fan|explorador|buscando emociones fuertes|relajado|modo cita|quiero reírme|curioso por algo distinto|modo nostálgico|buscando profundidad)$") # Mood of the group (various options)
    people: List[Person] = Field(..., min_length=1)
    comments: Optional[str] = None

class Movie(BaseModel):
    id: str # Unique identifier for the movie
    title: str # Title of the movie
    genres: List[str] # List of genres
    mood_tags: List[str] = [] # List of mood tags
    audience_rating: float = Field(..., ge=0, le=10) # Audience rating (0 to 10)
    gemini_explanation: Optional[str] = None # Explanation from Gemini (optional)