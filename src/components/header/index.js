import Logo from '../../assets/logo.png'
import LogoWhite from '../../assets/logo-white.png'

import { Link } from 'react-router-dom'
import './styles.css'

/* Se eu receber a props whiteVersion significa que o logo do header será branco, se não, será a logo verde comum */
/* Sidebar Validação 1 - Habilito o header de receber a prop/atributo hidecart, que será usado para verificarmos se vamos ou não renderizar o componente sideBar */
const Header = ({ whiteVersion, hideCart }) => {

  /* Sidebar - 8/11
  Crio a função openDrawer
  Crio um event customizado (openCart)
  Envio este evento pela janela do navegador
  */
  const openDrawer = () => {
    const event = new CustomEvent('openCart');
    window.dispatchEvent(event);
  }

  return (
    <div className="col-12">
      {/* Rotas 6/6 - Colocamos o link para sempre que o usuário clicar na logo do site, ele seja redirecionado de volta para o root, path / */}
      <header className="py-4 px-4 text-center"> {/* py/px = padding eixo x + eixo y */}
        <Link to="/">
          <img src={whiteVersion ? LogoWhite : Logo } className="img-fluid" alt="Logo do PetFood" />
        </Link>
      </header>
    
      {/* Sidebar - 9/11 - Agora vou configurar para que quando o usuário clicar (onClick) a UI execute a função openDrawer*/}
      {/* Sidebar Validação 2 - Aqui eu verifico se não existir a propriedade hidecart, eu mostro o botão pra abrir a sidebar */}
      {!hideCart && 
      <button onClick={() => openDrawer()} className="btn cart-button">
        <span className="mdi mdi-cart"></span>
        2 itens
      </button>}
    </div>
)
}

export default Header
