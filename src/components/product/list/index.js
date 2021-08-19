// CART 19
import { toggleCartProduct } from '../../../store/modules/shop/actions';
import { useDispatch, useSelector } from 'react-redux'; 

import './styles.css'

/* Cart 18 - Preparo o componente product para receber a props product (que são cada um dos produtos iterados do cart)
Substituo os valores estáticos por valores dinâmicos em cada campo (imagem do produto, preço e nome) */
const Product = ({ product }) => {

  const dispatch = useDispatch(); // CART 20 

  return (
    <div className="col-12 product-list">
      <div className="row">
        <div className="col-3">
          <img src={product.capa} className="img-fluid" alt="" />
        </div>
        <div className="col-6">
          <h6><label className="badge bg-secondary">R$ {product.preco.toFixed(2)}</label></h6> {/* O badge conforme o tutorial não funcionou, fiz assim e deu certo. */}
          <small><b>{product.nome}</b></small>
        </div>
        <div className="col-3 product-btn">
          {/* CART 21 - Ao clicar, dá dispatch na ação do redux */}
          <button className="" onClick={() => dispatch(toggleCartProduct(product))}>-</button>
        </div>
      </div>
    </div>
  )
}

export default Product
