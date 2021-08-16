import GoogleMapReact from 'google-map-react';
import './styles.css'
import Marker from '../marker'

const GOOGLE_MAPS_API = require('../../keys.json').maps_key

const Map = () => {
  return (
    <div className="container-map" style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API}}
        center ={{
          lat: -27.081148, 
          lng: -48.860083,
        }}
        defaultZoom={15}
      >
        {/* O lat e o lng representam a latitude e longitude de um ponto no mapa, a gente colocou o componente marker dentro do componetne Google Map, desta forma, o posicionamento dele vai ficar certinho igual ao que o google maps mostra. */} 
        <Marker lat={-27.081148} lng={-48.860083}/>

      </GoogleMapReact>
       
    </div>
  )
}

export default Map
