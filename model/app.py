from flask import Flask

from face.app_emotion_api import emotion_api # Tel que vous l'avez


from voice.app_emotion_api import audio_emotion_bp 


app = Flask(__name__)

# Enregistrer le blueprint pour les émotions faciales
app.register_blueprint(emotion_api, url_prefix='/api/face')

# Enregistrer le blueprint pour les émotions audio
app.register_blueprint(audio_emotion_bp, url_prefix='/api/audio')

@app.route('/') # Route racine simple pour vérifier que l'app fonctionne
def index():
    return "Serveur Flask combiné (Visage & Audio) est en cours d'exécution. Endpoints disponibles : /api/face/... et /api/audio/..."

@app.route('/api/health')
def health_check():
    return {"status": "OK"}, 200

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    
    # IMPORTANT pour le chargement des modèles dans les blueprints :
    # Flask peut recharger les modules en mode debug, ce qui peut causer des problèmes
    # avec le chargement unique des modèles.
    # use_reloader=False peut être utile pendant le développement si vous rencontrez
    # des problèmes de rechargement de modèle, mais désactive le rechargement automatique du code.
    # Pour la production, vous  utiliserez un serveur WSGI (comme Gunicorn ou uWSGI).   
    app.run(host='0.0.0.0', port=port, debug=True) # debug=True est pour le développement
    # app.run(host='0.0.0.0', port=port, debug=True, use_reloader=False) # Si problèmes de rechargement de modèle
