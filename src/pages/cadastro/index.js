import Illustration from '../../assets/illustration.png'
import Header from '../../components/header'
import '../../styles/global.css'

const Cadastro = () => {
  return (
    <div className="container-fluid h-100 bg-primary">
      <Header whiteVersion />
      <div className="row">
        <div className="col-6 text-right my-auto">
          <img src={Illustration} className="img-fluid" alt="Ilustração do PetFood" />
        </div>

        <div className="col-6">
          <div className="box col-8">
            <h2 className="text-center mb-3">Falta pouco para fazer o seu pet feliz</h2>
            <input type="text" className="form-control form-control-lg mb-3" placeholder="Nome Completo"/>
            <input type="text" className="form-control form-control-lg mb-3" placeholder="Email" />
            <input type="text" className="form-control form-control-lg mb-3" placeholder="Telefone" />
            <input type="text" className="form-control form-control-lg mb-3" placeholder="CPF" />
            <input type="date" className="form-control form-control-lg mb-3" placeholder="Data de Nascimento" />

            <button type="button" className="btn btn-lg btn-block btn-secondary">Finalizar Pedido</button>          
          </div> {/* Close - box */}
        </div> {/* Close - col-6 (2) */}

      </div> {/* Close - row */}

    </div> /* Close - container-fluid */
  )
}

export default Cadastro;
