import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Form = () => {
  let history = useHistory();
  const [completedTravel, setCompletedTravel] = useState({
    idaVuelta: false,
    medioTransporte: 'Metro (Tren, Subway, Subterráneo)',
    fecha: new Date()
  })

  const options = [
    'Metro (Tren, Subway, Subterráneo)',
    'Auto (Gasolina)',
    'Camioneta (Diésel)',
    'Motocicleta (Gasolina)',
    'Bus Transantiago (Transporte público)',
    'Bus (Vehículo privado)',
    'Avión (Chile)',
    'Avión (Internacional)',
    'Caminando'
  ]

  const handlePost = async () => {
    let response = await axios.post('http://localhost:4000/api/travels', completedTravel)
    if (response.statusText === "OK")
      history.push("/")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handlePost()
  }

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body ">
        <h3>INGRESAR VIAJE</h3>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <input
              id="direccionInicio"
              type="text"
              className="form-control form-control-sm"
              placeholder="direccionInicio"
              required
              onChange={(e) => setCompletedTravel(
                {
                  ...completedTravel,
                  direccionInicio: e.currentTarget.value,
                }
              )}
            />
          </div>

          <div className="form-group">
            <input
              id="direccionDestino"
              type="text"
              className="form-control form-control-sm"
              placeholder="direccionDestino"
              required
              onChange={(e) => setCompletedTravel(
                {
                  ...completedTravel,
                  direccionDestino: e.currentTarget.value,
                }
              )}
            />
          </div>

          <div className="form-group">
            <select
              className="form-control form-control-sm"
              id="medioTransporte"
              onChange={(e) => setCompletedTravel(
                {
                  ...completedTravel,
                  medioTransporte: e.currentTarget.value,
                }
              )}>
              {options.map((option) => {
                return (
                  <option key={option} value={option}>{option}</option>
                )
              })}
            </select>
          </div>


          <div className="form-group">
            <input
              id="distance"
              type="text"
              className="form-control form-control-sm"
              placeholder="distancia"
              required
              onChange={(e) => setCompletedTravel(
                {
                  ...completedTravel,
                  distance: e.currentTarget.value,
                }
              )}
            />
          </div>

          <div className="form-group">
            <input
              id="cantidadPersonas"
              type="text"
              className="form-control form-control-sm"
              placeholder="cantidadPersonas"
              required
              onChange={(e) => setCompletedTravel(
                {
                  ...completedTravel,
                  cantidadPersonas: e.currentTarget.value,
                }
              )}
            />

            <div className="form-check mt-2 mb-2">
              <input
                className="form-check-input"
                id="idaVuelta"
                type="checkbox"
                onChange={(e) => {
                  setCompletedTravel(
                    {
                      ...completedTravel,
                      idaVuelta: !completedTravel.idaVuelta,
                    }
                  )
                }}
              />
              <label className="form-check-label" >Ida y vuelta?</label>
            </div>

            <div className="form-group">
              <DatePicker
                id="fecha"
                clasName="form-control form-control-sm"
                selected={completedTravel.fecha}
                onChange={e => {
                  setCompletedTravel({
                    ...completedTravel,
                    fecha: e
                  })
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              GUARDAR
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Form
