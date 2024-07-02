# import pickle
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "*"}})

# # Load the trained model
# with open('https://bank-sampah-bersinar.web.app/random_forest_regressor.pkl', 'rb') as f:
#     model = pickle.load(f)

# # Mapping dari nama kelas lama ke nama kelas baru
# class_mapping = {
#     'P5': 'P5', 
#     'P7': 'P7-P8', 
#     'P7 - Tutup': 'P7-P8', 
#     'P12 - MIX': 'P12-Mix. BM- Bening-P14', 
#     'P12 - BM': 'P12-Mix. BM- Bening-P14', 
#     'P12 - BENING': 'P12-Mix. BM- Bening-P14', 
#     'P14': 'P12-Mix. BM- Bening-P14', 
#     'P1': 'P20', 
#     'P8': 'P20', 
#     'P21': 'P21', 
#     'P9': 'P22-P23', 
#     'P20': 'P22-P23', 
#     'P22': 'P22-P23', 
#     'P23': 'P22-P23', 
#     'P26': 'P29', 
#     'P29': 'P29', 
#     'P31': 'P31-Galon Le-mineral', 
#     'Lemineral': 'Le-mineral', 
#     'P34': 'P17-P34-P37-Kemasan', 
#     'P38': 'P38-P39', 
#     'P39': 'P38-P39', 
#     'PM': 'S1-A3', 
#     'B8': 'B8-B9', 
#     'B9': 'B8-B9', 
#     'BW': 'BW-Bening-Warna', 
#     'Bening': 'BW-Bening-Warna', 
#     'Warna': 'BW-Bening-Warna', 
#     'K1': 'K1-K3-K4-K5-K6-K7-Tabloid', 
#     'K3': 'K1-K3-K4-K5-K6-K7-Tabloid', 
#     'K4': 'K1-K3-K4-K5-K6-K7-Tabloid', 
#     'K5': 'K1-K3-K4-K5-K6-K7-Tabloid', 
#     'K6': 'K1-K3-K4-K5-K6-K7-Tabloid', 
#     'K7': 'K1-K3-K4-K5-K6-K7-Tabloid', 
#     'Tabloid': 'K1-K3-K4-K5-K6-K7-Tabloid', 
#     'K2': 'K2', 
#     'Kemasan Obat': 'Kemasan Obat', 
#     'Mika': 'Mika'
# }

# trash_type_dict = {
#     'B8-B9': 0,
#     'BW-Bening-Warna': 1,
#     'K1-K3-K4-K5-K6-K7-Tabloid': 2,
#     'K2': 3,
#     'Kemasan Obat': 4,
#     'Mika': 5,
#     'P17-P34-P37-Kemasan': 6,
#     'P12-Mix. BM- Bening-P14': 7,
#     'P20': 8,
#     'P21': 9,
#     'P22-P23': 10,
#     'P31-Galon Le-mineral': 11,
#     'P32': 12,
#     'P38-P39': 13,
#     'P5': 14,
#     'P7 - Tutup Botol-P29': 15,
#     'Le-mineral': 16,
#     'P7-P8': 17,
#     'S1-A3': 18,
# }

# @app.route('/api/predict', methods=['POST'])
# def predict():
#     data = request.json
#     trash_type = data['trash_type']
#     month = int(data['month'])

#     # Lakukan mapping tipe sampah
#     mapped_trash_type = class_mapping.get(trash_type, trash_type)
    
#     if mapped_trash_type in trash_type_dict:
#         trash_type_encoded = trash_type_dict[mapped_trash_type]
#         features = [[trash_type_encoded, month]]
#         prediction = model.predict(features)
#         return jsonify({'prediction': prediction[0]})
#     else:
#         return jsonify({'error': 'Invalid trash type'}), 400

# if __name__ == '__main__':
#     app.run(debug=True)

import pickle
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# URL model di Firebase Hosting
MODEL_URL = "https://bank-sampah-bersinar.web.app/random_forest_regressor.pkl"

# Unduh model dari Firebase Hosting
response = requests.get(MODEL_URL)
model_path = os.path.join(os.getcwd(), 'random_forest_regressor.pkl')
with open(model_path, 'wb') as f:
    f.write(response.content)

# Muat model yang telah dilatih
with open(model_path, 'rb') as f:
    model = pickle.load(f)

trash_type_dict = {
    'B8-B9': 0,
    'BW-Bening-Warna': 1,
    'K1-K3-K4-K5-K6-K7-Tabloid': 2,
    'K2': 3,
    'Kemasan Obat': 4,
    'Mika': 5,
    'P17-P34-P37-Kemasan': 6,
    'P12-Mix. BM- Bening-P14': 7,
    'P20': 8,
    'P21': 9,
    'P22-P23': 10,
    'P31-Galon Le-mineral': 11,
    'P32': 12,
    'P38-P39': 13,
    'P5': 14,
    'P7 - Tutup Botol-P29': 15,
    'Lemineral': 16,
    'P7-P8': 17,
    'S1-A3': 18,
}

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    trash_type = data['trash_type']
    month = int(data['month'])

    if trash_type in trash_type_dict:
        trash_type_encoded = trash_type_dict[trash_type]
        features = [[trash_type_encoded, month]]
        prediction = model.predict(features)
        return jsonify({'prediction': prediction[0]})
    else:
        return jsonify({'error': 'Invalid trash type'}), 400

if __name__ == '__main__':
    app.run(debug=True)



# https://bank-sampah-bersinar.web.app/random_forest_regressor.pkl