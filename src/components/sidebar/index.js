import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux' /* Cart 14 */

import Dock from 'react-dock'; /* Sidebar - 2/11 - Importa a lib de sidebar */
import Product from '../product/list'; /* Sidebar - 7/11 - importa o product que chamamos na etapa anterior */
import './styles.css'

/* Sidebar - 1/11 - Prepara o componente, só rafce mesmo. */
const Sidebar = () => {

  const { cart } = useSelector((state) => state.shop) /* Cart 15 */

  /* CART 22 - Queremos somar o total de produtos que tem no carrinho.
  A função reduce faz a soma dos produtos que tem na lista/array do carrinho, ele é tipo um forEach para somar valores de array.
  O .reduce é um metodo padrão de arrays, o último parâmetro, que é o zero, é o valor inicial da somatória. 
  O primeiro parâmetro é o valor total acumulado, e o segundo é o item iterado, no nosso caso, somaremos os produtos, então é product.
  A gente retorna para a variavel total o valor do total + todos os produtos.preco da array somados  */
  const total = cart.reduce((total, product) => { 
    return total + product.preco; 
  },0)

  const [opened, setOpened] = useState(false) /* Sidebar - 4/11 - Gerenciar estado pra saber se o sidebar está aberto ou não + determina que ele estará fechado por padrão (false) */

  /* Sidebar - 10/11 - 
  Estamos enviando um evento da etapa anterior (onClick)
  Queremos que quando for escutado o evento openCart, execute a função a seguir.
  A função no caso faz o estado do drawer ficar true, ou seja, ativo.
  A gente colocou ele dentro do useEffect, como demos uma dependência vazia, ela será executada assim que o componente Sidebar for montado na tela.
  */
  useEffect(() => {
    window.addEventListener('openCart', () => {
      setOpened(true);
    });
  }, [])

  return (
    /* Sidebar - 3/11 - position:right (de qual lado o drawer vai abrir.) */
  <Dock 
    position="right"

    /* Sidebar - 5/11 - Diz se a sidebar estará aberta ou não, e o valor dela, naturalmente, é o estado. SE o estado representar "true", então a sidebar vai estar aparecendo na tela, ou seja, visible = true */
    isVisible={opened}
    
    /* Sidebar - 6/11 - se tiver mudança de visibilidade, execute a função a seguir. A função a seguir atualiza o estado*/
    onVisibleChange={(visible) => {
      setOpened(visible)
    }}

  > 
    <div className="container-fluid h-100 pt-4 sidebar">
      <h5>Minha Sacola ({cart.length})</h5> {/* Cart 16 */}

      <div className="row products">
        {/* Cart 17 - O cart vem da store do redux. Cada p é um produto que está dentro a array cart. Passo cada produto para o componente Product através da props product={p}, sendo o p a representação de cada produto iterado da array cart. */}
        {cart.map((p) => (
        <Product product={p} />
        ))}
      </div>

      <div className="row align-items-end footer">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <b className="d-inline-block">Total</b>
          <h3>R$ {total.toFixed(2)}</h3>
        </div>
        <button className="btn btn-block btn-lg btn-primary rounded-0 h-50 align-items-center">Finalizar Compra</button>
      </div>
    </div>
  </Dock>
  )
}

export default Sidebar
