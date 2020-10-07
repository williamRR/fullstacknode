import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TravelList = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [travelList, setTravelList] = useState([])

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/api/travels/${id}`)
    setIsLoading(true)
  }

  useEffect(() => {
    if (isLoading) {
      fetchOptions()
      setIsLoading(false)
    }
  }, [isLoading])

  const fetchOptions = async () => {
    const { data } = await axios.get('http://localhost:4000/api/travels')
    setTravelList(data)
    console.log(data)
  }

  return (
    <div className="row mt-3">
     { travelList.length < 1 ? "NO HAY VIAJES INGRESADOS TODAVÍA" : 
     <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">día y hora</th>
            <th scope="col">punto de inicio</th>
            <th scope="col">punto de termino</th>
            <th scope="col">distancia</th>
            <th scope="col">medio</th>
            <th scope="col">personas</th>
            <th scope="col">ida y vuelta</th>
            <th scope="col">kg/co2 pp</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {travelList.map((travel) => {
            return (
              <tr key={travel._id}>
                <td>
                  {travelList.indexOf(travel) + 1}
                </td>
                <td>
                  {travel.fecha}
                </td>
                <td>
                  {travel.direccionInicio}
                </td>
                <td>
                  {travel.direccionDestino}
                </td>
                <td>
                  {travel.distance}
                </td>
                <td>
                  {travel.medioTransporte}
                </td>
                <td>
                  {travel.cantidadPersonas}
                </td>
                <td>
                  {travel.idaVuelta ? "SI" : "NO"}
                </td>
                <td>
                  {travel.kgco2pp}
                </td>
                <td>
                  <button 
                  type="submit" 
                  className="btn btn-danger btn-sm"
                  onClick={(e)=>
                    handleDelete(travel._id)
                  }
                  >
                    ELIMINAR
            </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>}
    </div>
  )
}

export default TravelList
