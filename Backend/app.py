import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from flask_cors import CORS
from tensorflow.keras.backend import clear_session

# Generar datos de ejemplo
nacionalidades = ['Ecuatoriana', 'Venezolana', 'Colombiana', 'Peruana', 'Brasileña', 'Mexicana', 'Española','Argentina','Italiana', 'Inglesa','China']
data = {
    'nacionalidad': np.random.choice(nacionalidades, 5000),
    'mes': np.random.randint(1, 13, 5000),
    'anio': np.random.randint(2020, 2022, 5000),
    'horas_interaccion': np.random.uniform(1, 60, 5000)
}
df = pd.DataFrame(data)

# Preparar datos para el modelo
le = LabelEncoder()
df['nacionalidad_encoded'] = le.fit_transform(df['nacionalidad'])
scaler = MinMaxScaler()
df['horas_interaccion_scaled'] = scaler.fit_transform(df[['horas_interaccion']])

# Dividir los datos en conjuntos de entrenamiento y prueba
train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)
X_train = train_df[['nacionalidad_encoded', 'mes', 'anio']]
y_train = train_df['horas_interaccion_scaled']
X_test = test_df[['nacionalidad_encoded', 'mes', 'anio']]
y_test = test_df['horas_interaccion_scaled']

# Crear el modelo LSTM
model = Sequential()
model.add(LSTM(50, input_shape=(1, 3), return_sequences=True))
model.add(LSTM(50, return_sequences=True))
model.add(LSTM(50))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')

# Entrenar el modelo
X_train_reshaped = X_train.values.reshape(-1, 1, 3)
X_test_reshaped = X_test.values.reshape(-1, 1, 3)
history = model.fit(X_train_reshaped, y_train, epochs=100, batch_size=32, validation_data=(X_test_reshaped, y_test), verbose=0)

# Evaluar el modelo
y_pred = model.predict(X_test_reshaped)
y_pred_unscaled = scaler.inverse_transform(y_pred)
# Desescalar y_test antes de calcular el error absoluto medio
y_test_unscaled = scaler.inverse_transform(y_test.to_numpy().reshape(-1, 1))

mae = mean_absolute_error(y_test_unscaled, y_pred_unscaled)
print(f'MAE: {mae}')

app = Flask(__name__)
CORS(app) 

@app.route('/predict', methods=['GET','POST'])
def predict():
    clear_session()
    data = request.get_json()
    nacionalidad = data['nacionalidad']
    mes = int(data['mes'])
    anio = int(data['anio'])
    
    print("Nacionalidad:", nacionalidad)  # Agrega esta línea
    print("Mes:", mes)  # Agrega esta línea
    print("Año:", anio)  # Agrega esta línea

    nacionalidad_encoded = le.transform([nacionalidad])[0]
    input_data = np.array([[nacionalidad_encoded, mes, anio]])
    input_data_reshaped = input_data.reshape(-1, 1, 3)
    predicted_hours_scaled = model.predict(input_data_reshaped)
    predicted_hours = scaler.inverse_transform(predicted_hours_scaled)[0][0]

    output = {
        'nacionalidad': nacionalidad,
        'tiempo': f'{predicted_hours:.2f} horas'
    }
    return jsonify(output)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)