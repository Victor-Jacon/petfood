import './styles.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MarkerIcon from '../../assets/marker.png';
import MarkerIconSelected from '../../assets/marker-selected.png';

const Marker = ({ petshop }) => {

  /* Petshop selecionada 5 - Ao invés de usar useState, vamos controlar o estado pelo redux usando o useSelector */
  const { petshopMapSelected } = useSelector(state => state.shop);

  return (
    <Link to ={`/petshop/${petshop._id}`}> {/* Vamos pegar o id da petshop que vier por props, e este id será usado no req params pra carregarmos a petshop correta */}
      {/* Petshop selecionada 6 - Implementamos a lógica, se o clicado for o mesmo da store, ele fica verdinho, se não, fica branco */} 
      <img src={petshopMapSelected === petshop._id ? MarkerIconSelected : MarkerIcon } />
      <img className="img-marker img-fluid" src={petshop.logo}/>
    </Link>
  )
}

export default Marker
