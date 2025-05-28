from flask import Flask
from flask_cors import CORS
from face.app_emotion_api import emotion_api



app = Flask(__name__)
# CORS(app)

# Enregistrer le blueprint
app.register_blueprint(emotion_api, url_prefix='/api/face')

@app.route('/api/health')
def health_check():
    return {"status": "OK"}, 200

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
