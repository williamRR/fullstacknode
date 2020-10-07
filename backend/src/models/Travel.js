const { Schema, model } = require('mongoose')

const travelSchema = new Schema({
  direccionInicio: {
    type: String,
  },
  direccionDestino: {
    type: String,
  },
  medioTransporte: {
    type: String,
    enum: [
      'Metro (Tren, Subway, Subterráneo)',
      'Auto (Gasolina)',
      'Camioneta (Diésel)',
      'Motocicleta (Gasolina)',
      'Bus Transantiago (Transporte público)',
      'Bus (Vehículo privado)',
      'Avión (Chile)',
      'Avión (Internacional)',
      'Caminando'
    ],
  },
  distance: Number,
  cantidadPersonas: Number,
  idaVuelta: Boolean,
  fecha: {
    type: Date,
    default: Date.now,
  },
  kgco2pp: Number,
}, {
  timestamps: true
})

module.exports = model('Travel', travelSchema)