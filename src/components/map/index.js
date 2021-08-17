import './styles.css'
import { useSelector } from 'react-redux'; /* MARKER 2 - O useSelector permite que a gente acesse qualquer estado do nosso redux, a gente acessa a store, e depois, podemos acessar qualquer state. */
import GoogleMapReact from 'google-map-react';
import Marker from '../marker'

const GOOGLE_MAPS_API = require('../../keys.json').maps_key

/* REDUX COM FRONT 6 - Preparo meu componente Map para receber a props petshops que eu enviei do front. */
const Map = ({ petshops }) => {

  /* MARKER 3 - Queremos que o valor da props center do componente GoogleMapReact seja dinâmico ao invés de estático.
  Precisamos puxar o estado do objeto mapCenter para ele substituir os valores estáticos que estávamos usando para lat e lng. */
  const { mapCenter } = useSelector(state => state.shop);

  return (
    <div className="container-map" style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API}}
        center ={mapCenter} /* MARKER 4 - Ao invés de estático, agora o valor da props center será o objeto mapCenter, que será controlado pelo reducer. */
        defaultZoom={15}
      >
        {/* REDUX COM FRONT 7 - 
        Entenda: O lat e o lng representam a latitude e longitude de um ponto no mapa, a gente colocou o componente marker dentro do componetne Google Map, desta forma, o posicionamento dele vai ficar certinho igual ao que o google maps mostra.
        Dentro do objeto petshops eu tenho várias petshops. Eu quero que cada uma delas renderize um marker no mapa. Vou fazer um loop e consumir a latitude e longitude de cada loja parceira. 
        Lá no meu frontend eu preciso mostrar cada marker com o logo da petshop. Pra isso, eu preciso ter acesso ao petshop.logo. Para meu marker ter acesso ao petshop.logo, eu passo o objeto petshop como props pra ele. O marker está dentro de um loop. Então não passamos o valor da forma comum que é tipo petshop={petshop} e sim, petshop={p}. Cada vez que iterar no map, ele enviarará uma props ao componente marker. */}
        {petshops.map(p => (
          <Marker petshop={p} lat={p.location.lat} lng={p.location.lng}/>
        ))}

      </GoogleMapReact>
       
    </div>
  )
}

export default Map
