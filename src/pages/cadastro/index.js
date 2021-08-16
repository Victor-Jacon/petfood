import Illustration from '../../assets/illustration.png'
import Header from '../../components/header'
import '../../styles/global.css'

import { useState } from 'react';
import { useDispatch } from 'react-redux'; /* REDUX 15 - Importo o useDispatch, ele é o react hook que vai enviar as actions para o reducer */
import { setCustomerStore } from '../../store/modules/shop/actions' /* REDUX BOAS PRÁTICAS 3 - Importo a action setCustomer que criei seguindo as boas práticas */

const Cadastro = () => {
  /* REDUX 16 - Implemento o useDispatch */
  
  const dispatch = useDispatch();

  /* REDUX 12 - 
  Gerenciamos o estado com useState
  A gente copia a requisição de exemplo que fizemos para o pagar-me e pegamos só o trecho que tem os dados do customer/cliente
  O external id precisa ser único, então usamos o new Date().getTime().toString() pois ele sempre retorna um valor unico de timestamp, então ele resolve a questão do id ser único.
  */
  const [customer, setCustomer] = useState({
    "external_id": new Date().getTime().toString(),
		"name": "",
		"type": "individual",
		"country": "br",
		"email": "",
		"documents": [
			{
				"type": "cpf",
				"number": ""
			}
		],
		"phone_numbers": [""],
		"birthday": ""
  })

  /* REDUX 17 - Crio a função goToCheckout que vai disparar a action SET_CUSTOMER(arquivo actions.js), e vai enviar o objeto customer, que é o objeto esperado pelo reducer lá no nosso reducer.js e na nossa action.js*/
  /* REDUX BOAS PRÁTICAS 3 - Chamo a action setCustomer, enviando o objeto customer como parâmetro */
  const goToCheckout = () => {
    dispatch(setCustomerStore(customer));   
  }

  return (
    <div className="container-fluid h-100 bg-primary">
      <Header whiteVersion hideCart/> {/* Sidebar validação 3 - Passamos a prop/atributo hidecart pra esconder o carrinho da tela de cadastro, não faz sentido mesmo mostrar isso na tela de cadastro. */}
      <div className="row content-cadastro">
        <div className="col-6 text-right my-auto content-img">
          <img src={Illustration} className="img-fluid" alt="Ilustração do PetFood" />
        </div>

        <div className="col-6 content-form">
          <div className="box col-8">
            <h2 className="text-center mb-3">Falta pouco para fazer o seu pet feliz</h2>
            <input type="text" className="form-control form-control-lg mb-3" placeholder="Nome Completo" onChange={(e) => { setCustomerStore({...customer, name: e.target.value}); }}/> {/* REDUX 13 - Coloco o onChange, vou usar o valor que o usuário digitou, e isto é um evento, então passo o "e" de evento como parâmetro, e configuro para que pegue tudo de customer, pra manter o objeto intacto, e coloque tb o que o usuário digitar (e.target.value), faremos o mesmo para todos os outros inputs. */}
            <input type="text" className="form-control form-control-lg mb-3" placeholder="Email" onChange={(e) => { setCustomerStore({...customer, email: e.target.value}); }}/>
            <input type="text" className="form-control form-control-lg mb-3" placeholder="Telefone" onChange={(e) => { setCustomerStore({...customer, phone_numbers: [e.target.value] }); }}/> { /* REDUX 14 - Como a api do pagarme recebe o phone numbers como array, a gente coloca ele com [] aqui, e no useState também. */}
            <input type="text" className="form-control form-control-lg mb-3" placeholder="CPF" onChange={(e) => setCustomerStore({...customer, "documents": [{"type": "cpf", "number": e.target.value }]})}/>
            <input type="date" className="form-control form-control-lg mb-3" placeholder="Data de Nascimento" onChange={(e) => { setCustomerStore({...customer, birthday: e.target.value }); }}/>
            
            {/* REDUX 18 - Implemento a função goToCheckout, que envia a action ao reducer */}
            <button onClick={() => goToCheckout()} type="button" className="btn btn-lg btn-block btn-secondary">Finalizar Pedido</button>          
          </div> {/* Close - box */}
        </div> {/* Close - col-6 (2) */}

      </div> {/* Close - row */}

    </div> /* Close - container-fluid */
  )
}

export default Cadastro;
