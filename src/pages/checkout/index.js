import React from 'react'
import { useSelector } from 'react-redux' /* Checkout 5 */
import { useState, useEffect } from 'react' /* Checkout 8 + Checkout 16(useEffect) */
import dayjs from 'dayjs' /* Checkout 10 */
import Header from '../../components/header'
import Product from '../../components/product/list'
import './styles.css'

const Checkout = () => {

  // Checkout 6
  const { cart } = useSelector((state) => state.shop)

  // Checkout 18 - Vamos somar o valor total da compra do cliente, para podermos atualizar no campo amount da requisição que enviaremos ao pagarme.
  const total = cart.reduce((total, product) => { 
    return total + product.preco; 
  },0)

  /* Checkout 9 - O transaction vai ser um objeto. Lá no insomnia a gente tem uma requisição de transação, então vamos copiar de lá e colar aqui(somente os dados que a gente não tem ainda). 
  Instalo a lib day.js - yarn add day.js
  Implemento a lib na linha delivery_date. Inicializo o dayjs. Entrega será em 7 dias, e formato para a data aparecer no formato de ano/mês/dia */
  const [transaction, setTransaction] = useState({
    amount: 0,
    card_number: "",
    card_cvv: "",
    card_expiration_date: "",
    card_holder_name: "",

    shipping: {
      name: "",
      fee: 1000,
      delivery_date: dayjs().add(7, 'days').format('YYYY-MM-DD'),
      expedited: true,
      address: {
        country: "br",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        street_number: "",
        zipcode: ""
      }
    },
    items: [],
    split_rules: []
  });

  /* Checkout 11 - Essa função vai atualizar o estado do objeto transaction.
  Ela vai pegar tudo de transaction, e vai alterar o shipping + address 
  Essa função ela recebe uma key, e um value. Criamos estes placeholder pra receber os dados dos nossos formulários.
  Lá no formulário, a cada onChange, será chamada essa função, e a gente vai passar, por ex, o cep é a chave/key, e o valor/value é o que o usuário digitar (e.target.value) */
  const setShippingValue = (key, value) => {
    setTransaction({
      ...transaction,
      shipping: {
        ...transaction.shipping,
        address: {
          ...transaction.shipping.address,
          [key]: value,
        }
      }
    })
  }

  /* Checkout 15 - Criamos a função makePurchase, essa função por enquanto vai ter apenas um console.log dentro dela.
  Desta forma a gente consegue ver o JSON final que vamos enviar para o pagarme.
  A gente coda, compara com a documentação do pagarme, até ficar igual, e depois disso, podemos realizar testes sandbox.
  Quando chegarmos nessa etapa, ai vamos de fato enviar este json para o endpoint do pagarme para ele fazer uma transação fictícia. */
  const makePurchase = () => {
    console.log(transaction)
  }

  /* Checkout 17 - 
  Nosso objeto transaction já está quase pronto pra ser enviado para o pagarme.
  Neste momento a gente quer preencher os itens que o cliente comprou + valor total do pedido(assim que o componente for renderizado)
  Para isso criamos nossa lógica, e colocamos dentro da dependência a variável total. Desta forma toda vez que a variável total mudar, o useEffect vai ser executado novamente. */
  useEffect(() => {
    /* Checkout 19 - Atualizar valor total da compra(campo amount)
    É importante sempre consultar como o endpoint de post espera receber um dado.
    O endpoint do pagarme espera que o campo amount seja postado sem virgula nem ponto, então a gente efetuou o tratamento dos dados na hora de enviar os dados. 
    
    Checkout 20 - Atualizar sacola do cliente(campo items) 
    O endpoint do pagarme tem uma forma como ele espera receber os dados.
    A gente consulta a requisição de exemplo, copia ela, e cola aqui dentro do objeto items.
    Mapeamos cada campo conforme o dado dinâmico. Neste caso temos vários produtos na sacola, então a gente executa um map, e cada item iterado preenche os dados do objeto item. Por ex product._id, vai preencher o objeto items no campo product._id. Preenchemos cada dado do nosso projeto, que seja equivalente ao dado que o pagarme espera.
    No unit price a gente trata da mesma forma que o amount, porque na documentação do pagarme, diz que ele não pode conter pontos nem virgulas.
    O quantity é um campo que por enquanto não respeita um use case real, porque uma pessoa precisa ter a opção de comprar mais de 1 do mesmo produto, então a gente precisa configurar isso mais tarde.
    */
    setTransaction({
      ...transaction,
      amount: total.toFixed(2).toString().replace('.',''),
      items: cart.map((product) => ({
        id: product._id,
        title: product.nome,
        unit_price: product.preco.toFixed(2).toString().replace('.', ''),
        quantity: 1,
        tangible: true
      }))
    })

  },[total])

  return (
    <div className="h-100">
      <Header hideCart/>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            <span className="section-title">Dados de Entrega</span>
            {/* Checkout 12 - 
            Passo a key que será o zipcode, e o value, que será o que o usuário digitar, desta forma, a gente atualiza o estado do objeto transaction, nas keys e values de endereço. 
            Cada campo do formulário será atualizado desta mesma forma, veja abaixo. */} 
            <div className="row mb-3">
              <div className="col-12">
                <input type="text" placeholder="CEP" className="form-control form-control-lg"
                onChange={(e) => setShippingValue('zipcode', e.target.value)}/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                  <input type="text" placeholder="CIDADE" className="form-control form-control-lg"
                  onChange={(e) => setShippingValue('city', e.target.value)}/>
              </div>

              <div className="col-6 ps-0">
                  <input type="text" placeholder="LOGRADOURO" className="form-control form-control-lg"
                  onChange={(e) => setShippingValue('street', e.target.value)}/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-5">
                  <input type="text" placeholder="NÚMERO" className="form-control form-control-lg"
                  onChange={(e) => setShippingValue('street_number', e.target.value)}/>
              </div>

              <div className="col-5 ps-0">
                  <input type="text" placeholder="BAIRRO" className="form-control form-control-lg"
                  onChange={(e) => setShippingValue('neighborhood', e.target.value)}/>
              </div>

              <div className="col-2 ps-0">
                  <input type="text" placeholder="UF" className="form-control form-control-lg"
                  onChange={(e) => setShippingValue('state', e.target.value)}/>
              </div>
            </div>

            <span className="section-title">Dados de Pagamento</span>

            {/* Checkout 13 - A partir daqui fica diferente pra atualizar o estado.
            A função setShippingValue só se aplica nos endereços.
            Daqui pra baixo são dados de pgto, aí a gente vai atualizar direto usando o useState mesmo
            A gente pega tudo o que vier do objeto transaction, copia (...transaction) e atualiza somente o campo do objeto que é equivalente a este campo aqui do formulário.
            O valor que vai ficar em card_number por ex, é o valor que o usuário digitar. o e é de evento. É assim que a gente pega o que o usuário digitou. */}
            <div className="row mb-3">
              <div className="col-6 mb-3">
                  <input type="text" placeholder="NÚMERO DO CARTÃO" className="form-control form-control-lg"
                  onChange={(e) => setTransaction({ ...transaction, card_number: e.target.value })}/>
              </div>

            {/* Checkout 14 - O pagar me exige o nome do cartão lá no endpoint de post deles (pra enviar a transação)
            A gente não tinha planejado pedir o nome que consta no cartão do cliente, então fizemos isso agora. */}
              <div className="col-6 mb-3 ps-0">
                  <input type="text" placeholder="NOME NO CARTÃO" className="form-control form-control-lg"
                  onChange={(e) => setTransaction({ ...transaction, card_holder_name: e.target.value })}/>
              </div>

              <div className="col-6">
                  <input type="date" placeholder="VALIDADE" className="form-control form-control-lg"
                  onChange={(e) => setTransaction({ ...transaction, card_expiration_date: e.target.value })}/>
              </div>

              <div className="col-6 ps-0">
                  <input type="text" placeholder="CVV" className="form-control form-control-lg"
                  onChange={(e) => setTransaction({ ...transaction, card_cvv: e.target.value })}/>
              </div>
            </div>

          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center"> {/* d-flex deixa inline (ativa o flexbox), justify deixa cada um em uma ponta, e o align alinha na vertical*/}
              <b>Total</b>
              <h3>R$ {total.toFixed(2)}</h3>
            </div>

            {/* Checkout 16 - Chamamos a função makePurchase */}
            <div className="col-12">
              <button className="btn btn-block btn-lg btn-primary"
              onClick={() => makePurchase()}>
                Finalizar compra
              </button>
            </div>
          </div>
          </div>
          <div className="col-6">
            <div className="box col mb-4 box-sidebar">
              
              <h4>Minha sacola ({cart.length})</h4>
              <div className="row products">
                {/* Checkout 7 */}
                {cart.map((p) => (
                <Product product={p}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
