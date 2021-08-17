/* Marker 11 - Importo as 2 actions que vou usar pra setar a petshop selecionada + setar o centro do mapa
Quero controlar o estado com redux, então ao invés de useState eu uso o useDispatch do redux. */
import { useDispatch } from 'react-redux'
import { setShopMapSelected, setMapCenter } from '../../store/modules/shop/actions';

import './styles.css'

/* REDUX COM FRONT 4 - 
Os dados do objeto petshop estão vindo do redux. A gente passou o objeto petshop como props para nosso componente lá no front. Agora aqui no código do componente, vamos PREPARAR o componente para ele receber este objeto. 
O src do nosso img estava estático, era URL da web. Como agora temos o objeto vindo do mongoDB vamos substituir de "link" por {petshop.propriedadeSalvaNoMongo} neste caso é o logo 
Nesta etapa de trocar dados estáticos por dados vindos do banco, é legal abrir o redux dev tools e ir olhando os dados a hierarquia dos dados, se é objeto, array, qual o nome foi dado, pra conseguir consumir certinho aqui no componente, e como consequência, aparecer certinho no front. Pq a gente não está consumindo direto do banco de dados, o dado passa primeiro pela store a gente de chegar aqui, então a "fonte da verdade" não é o banco, e sim a store. */
const Petshop = ({ petshop }) => {
  const dispatch = useDispatch()

  /* MARKER 6 - Criamos a função pra cuidar do state + centralizar o mapa */
  const setSelectedPetshop = () => {
    /* Marker 12 - setar a petshop selecionada */
    dispatch(setShopMapSelected(petshop));

      /* Marker 13 - setar o centro do mapa */
    dispatch(setMapCenter(petshop.location));
  }

  return (
    <li 
      className="petshop d-inline-block"
      onClick={() => setSelectedPetshop()} /* MARKER 5 - Quando clicado, este elemento vai executar a função que vai CONTROLAR O STATE + centralizar o mapa. */
    >
      <div className="d-inline-block">
        <img className="img-fluid" src={petshop.logo}/>
      </div>
      <div className="d-inline-block align-bottom petshop-showcase">
        <b>{petshop.nome}</b>
        <div className="petshop-infos">

          <span class="mdi mdi-star"></span>
          <text>
            <b>2,8</b>
          </text>

          <span class="mdi mdi-cash-usd-outline"></span>
          <text>{petshop.categoria}</text>

          <span class="mdi mdi-crosshairs-gps"></span>
          <text>2,9km</text>
        </div>
        <label className="badge bg-primary">Frete Grátis</label>
      </div>
    </li>
  )
}

export default Petshop
