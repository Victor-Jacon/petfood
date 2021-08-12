import GoogleMapReact from 'google-map-react';
import './styles.css'
import Marker from '../marker'

const Map = () => {
  return (
    <div className="container-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCWBxlNpEtAk1yi9lgZ5WeW89b5pdva0Ek'}}
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
