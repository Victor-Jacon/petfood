import './styles.css'
import Dock from 'react-dock'; /* Sidebar - 2/11 - Importa a lib de sidebar */
import { useState, useEffect } from 'react'
import Product from '../product/list'; /* Sidebar - 7/11 - importa o product que chamamos na etapa anterior */

/* Sidebar - 1/11 - Prepara o componente, só rafce mesmo. */
const Sidebar = () => {

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
      <h5>Minha Sacola (5)</h5>

      <div className="row products">
        {[1,2,3,4,5,6,7,8,9].map((p) => (
        <Product />
        ))}
      </div>

      <div className="row align-items-end footer">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <b className="d-inline-block">Total</b>
          <h3>R$ 90,00</h3>
        </div>
        <button className="btn btn-block btn-lg btn-primary rounded-0 h-50 align-items-center">Finalizar Compra</button>
      </div>
    </div>
  </Dock>
  )
}

export default Sidebar
