import './styles.css'
import Header from '../../components/header'
import Petshop from '../../components/petshop'
import Map from '../../components/map'

/* REDUX SAGA 12 - 
Nesta etapa queremos que o nosso front end consiga ativar a action requestPetshops. 
Veja abaixo o que cada um faz */
import { useDispatch } from 'react-redux' /* useDispatch para enviar a action para o reducer */
import { useEffect } from 'react' /* useEffect para dizer em qual momento do ciclo de vida do componente será executada a função, neste caso passamos uma array vazia[] isso significa que será executada assim que o componente for montado na tela. */
import { requestPetshops } from '../../store/modules/shop/actions' /* importamos a action em si, que queremos que seja enviada para o reducer. */

/* REDUX COM FRONT 1 - O useSelector permite que a gente acesse qualquer estado do nosso redux, a gente acessa a store, e depois, podemos acessar qualquer state.  */
import { useSelector } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch(); /* REDUX SAGA 13 - Implementamos o useDispatch para enviar a action para o reducer */
  const { petshops } = useSelector((state) => state.shop) /* REDUX COM FRONT 2 - no nosso reducer.js a gente tem o objeto petshops que a gente gerencia o estado pelo redux, e aqui estamos puxando ele */

  /* REDUX SAGA 14 - colocamos pra enviar a action para o reducer, e configuramos que a action que será enviada será a requestPetshops, e por ela estar dentro de um useEffect com dependencias vazias [], esse trecho de código será executado assim que o componente for montado */
  useEffect(() => { 
    dispatch(requestPetshops());
  }, [])

  return (
    <div className="h-100">
      <Header />
      <div className="container-fluid petshop-list-container">

        <div className="col-12 px-4 text-center">
          <h5>Mais próximos de você (5)</h5>
        </div>

{/* REDUX COM FRONT 3 - Trocamos a array de mock [1,2,3].map pelos dados que vem do useSelector do redux 
Os dados do objeto petshops estão vindo da nossa store do redux. Vamos passar estes dados para nosso componente PETSHOP através de props, a gente dá o nome Petshop para a prop, e passa o iterado da vez, que a gente deu o nome de p. */}
        <ul className="col-12 petshop-list">
         {petshops.map((p) => (
          <Petshop petshop={p}/>
         ))}
        </ul>

      </div>
{/* REDUX COM FRONT 5 - Os dados do objeto petshops estão vindo da nossa store do redux.
NOsso componente Map precisa da latitude e longitude das lojas parceiras pra poder mostrar no marker.
Então passamos os dados das petshops para o componente, pra depois ele consumir a lat + lng certinha e mostra no mapa. */}
      <Map petshops={petshops}/>
    </div>
  )
}

export default Home
