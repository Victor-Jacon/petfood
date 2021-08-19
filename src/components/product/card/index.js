import './styles.css'

/* CART 4 */
import { useDispatch, useSelector } from 'react-redux'; 
import { toggleCartProduct } from '../../../store/modules/shop/actions';

/* CART 5 - O product que está sendo passado como props é o mesmo que vamos usar na etapa do cart.  */
const ProductCard = ({ product }) => {

  const dispatch = useDispatch(); /* CART 6 */

  /* CART 8 - Se o usuário já tiver adicionado o produto no carrinho, ao invés de aparecer um sinal de + vai aparecer um sinal de - 
  Para isso eu preciso saber se o produto está no carrinho ou não.
  Eu importo o objeto cart da minha store.
  Crio a variavel added. Na variavel added será salvo se aquele produto em questão está no carrinho ou não (farei a lógica a seguir)
  A função findIndex executa uma verificação lógica nos objetos da array, e retorna o index/posicao do objeto daqueles que derem true.
  Eu verifico se o id do produto iterado é o mesmo do produto que está no carrinho.
  */
  const { cart } = useSelector((state) => state.shop);
  const added = cart.findIndex((p) => p._id === product._id) !== -1;

  return (
    <div className="product col-3">
      <img className="img-fluid align-center" src={product.capa} alt="" />
      
      {/* CART 7 - Quando acontecer o evento clique, dou dispatch da action
      CART 9 - Se o added for true, então troca o sinal para negativo, para o usuário saber que se ele clicar, ele removerá da sacola, e caso o produto não esteja no carrinho, então será false, ai vai aparecer o sinal de +, pra adicionar no carrinho. 
      CART 10 - Se o added for true, mude a classe para secondary (assim o botão fica vermelho(classe secondary) e o usuário entende que se ele clicar de novo, vai remover o produto do carrinho, caso contrário, deixe verde(classe primary). Mas isso tudo por classe. */}
      <button onClick={() => dispatch(toggleCartProduct(product))} className={`btn btn-${added ? 'secondary' : 'primary'}`}>
        {added ? '-' : '+'}
      </button>
      
      <h4><label className="badge bg-primary">R${product.preco.toFixed(2)}</label></h4>
      <small><b>{product.nome}</b></small>
    </div>
  )
}

export default ProductCard;
