const travelsCtrl = {}

const Travel = require('../models/Travel')

travelsCtrl.getTravels = async (req, res) => {
  const travels = await Travel.find()
  res.json(travels)
}

/**
 * método para calcular emisiones
 * @param {enum} medioTransporte - tipo de transporte
 * @param {number} distance - distancia recorrida en km
 * @param {boolean} idaVuelta - flag que indica si se suma dos veces
 */
const calcular = (medioTransporte, distance, idaVuelta) => {
  let factor = 0

  switch (medioTransporte) {
    case 'Metro (Tren, Subway, Subterráneo)':
      factor = 0.033
      break
    case 'Auto (Gasolina)':
      factor = 0.21
      break
    case 'Camioneta (Diésel)':
      factor = 0.249
      break
    case 'Motocicleta (Gasolina)':
      factor = 0.092
      break
    case 'Bus Transantiago (Transporte público)':
      factor = 0.039
      break
    case 'Bus (Vehículo privado)':
      factor = 0.012
      break
    case 'Avión (Chile)':
      factor = 0.279
      break
    case 'Avión (Internacional)':
      factor = 0.179
      break
    case 'Caminando':
      factor = 0
      break
    default:
      factor = 0
      break     
  }

  if (idaVuelta)
    factor=factor*2

  return distance*factor
}


travelsCtrl.createTravel = async (req, res) => {
  const {
    direccionInicio,
    direccionDestino,
    medioTransporte,
    distance,
    cantidadPersonas,
    idaVuelta,
    fecha,
  } = req.body

  const kgco2pp = calcular(medioTransporte, distance, idaVuelta)

  const newTravel = new Travel({
    direccionInicio,
    direccionDestino,
    medioTransporte,
    distance,
    cantidadPersonas,
    idaVuelta,
    fecha,
    kgco2pp,
  })

  await newTravel.save()

  res.json(newTravel)
}

travelsCtrl.deleteTravel = async (req, res) => {
  await Travel.findByIdAndDelete(req.params.id)
  res.send("Travel deleted")
}
module.exports = travelsCtrl