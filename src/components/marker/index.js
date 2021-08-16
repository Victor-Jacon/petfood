import { useState } from 'react'
import './styles.css'
import MarkerIcon from '../../assets/marker.png';
import MarkerIconSelected from '../../assets/marker-selected.png';

const Marker = () => {
  const [marker, setMarker] = useState(false);

  const updateMarker = () => {
    setMarker(!marker);
  }

  return (
    <div onClick={updateMarker}>
      <img src={!marker ? MarkerIcon : MarkerIconSelected} />
      <img className="img-marker img-fluid" src="https://www.petlove.com.br/static/uploads/banner_image/image/4304/logo-petlove-push.png"/>
    </div>
  )
}

export default Marker
