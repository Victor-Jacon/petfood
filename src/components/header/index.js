import Logo from '../../assets/logo.png'
import LogoWhite from '../../assets/logo-white.png'

/* Se eu receber a props whiteVersion significa que o logo do header será branco, se não, será a logo verde comum */
const Header = ({ whiteVersion }) => {
  return (
    <div className="col-12">
      <header className="py-4 px-4 text-center"> {/* py/px = padding eixo x + eixo y */}
        <img src={whiteVersion ? LogoWhite : Logo } className="img-fluid" alt="Logo do PetFood" />
      </header>
    </div>
)
}

export default Header
