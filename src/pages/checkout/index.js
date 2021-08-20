import React from 'react'
import { useSelector, useDispatch } from 'react-redux' /* Checkout 5 + split rules 21 */
import { useState, useEffect } from 'react' /* Checkout 8 + Checkout 16(useEffect) */
import dayjs from 'dayjs' /* Checkout 10 */
import _ from 'underscore' /* SPLIT RULES 1 -Instalei underscore.js (yarn add underscore) + importei */

/* Split rules 23 - Passamos um alias para ele, porque por acaso ele tinha o mesmo nome já usado por outra variável neste arquivo, e fazer assim é mais rápido do que mudar no types, actions etc.. */
/* SPLIT RULES 37 - Importamos a action makePurchase */
import { setTransaction as setStoreTransaction, makePruchase } from '../../store/modules/shop/actions'
import Header from '../../components/header'
import Product from '../../components/product/list'
import './styles.css'

const Checkout = () => {

  const dispatch = useDispatch() /* split rules 22 */

  // Checkout 6(cart) + SPLIT RULES 9(transaction fee) + SPLIT RULES 15(defaultRecipient)
  const { cart, transactionFee, defaultRecipient } = useSelector((state) => state.shop)

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
      name: "Petfood ltda",
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
  /* split rules 24 - Nesta etapa enviamos a transaction para o pagarme.
  Neste projeto não fizemos a validação dos campos, é importante fazer se for subir em produção. */
  /* SPLIT RULES 38 - Espero 100 milisegundos para o setStoreTransaction conseguir popular o estado global da transação. Executo a ação makePurchase depois dos 100 milisegundos.*/
  const makePurchase = () => {
    dispatch(setStoreTransaction(transaction));
    setTimeout(() => {
      dispatch(makePruchase());
    }, 100)
  };

   // Este consolelog estava dentro de makePurchase: console.log(transaction) - estávamos usando para fins de desenvolvimento, para ver como chegava o JSON do transaction que enviariamos até a pagarme, na etapa 24 ele é desabilitado

  /* SPLIT RULES 2 - Criei a função getSplitRules. Esta função vai preencher o objeto split_rules do JSON que vamos enviar para o pagarme.
  Nesta etapa criamos a lógica de como será feita a "divisão" dos pgtos recebidos pela plataforma. 
  Nossa plataforma permite o cliente de comprar de 2 lojas ao mesmo tempo, similar ao mercado livre. No ifood ele precisa comprar de 1, e depois, comprar de outro. 
  Sendo assim, a gente precisa ser capaz de separar quais produtos foram vendidos, e de quais lojas eles são.
  Na variável productsByPetshop vamos agrupar os produtos do carrinho que tem o mesmo ID de petshop.
  SPLIT RULES 3 - A pagarme espera receber no endpoint CREATE SPLIT TRANSACTION um recipient_id, e não uma petshop id. Vamos tratar isso. 
  SPLIT RULES 5 - Preparamos o objeto da petshop na etapa anterior, e agora, vamos acessar o recipient id daquela petshop.*/
  const getSplitRules = () => {
    const productsByPetshop = _.groupBy(cart, (product) => product.petshop_id.recipient_id
    );

    let result = [];

    /* SPLIT RULES 6 - O endpoint do pagarme não espera uma soma do valor total, ele espera uma porcentagem. Por ex, quantos % da venda vai ficar para cada recipientid/petshop. Então vamos agora percorrer os objetos(object.keys)+arrays(map) pra descobrir este percentual total. 
    Supondo 2 lojas parceiras, e o cliente comprou 3 pacotes de ração em cada.
    O objeto productsByPetshop tem salvo dentro dele neste momento 2 arrays, e dentro de cada array, 3 produtos. 
    Com object keys a gente acessa o objeto split rules
    Com .map(petshop) a gente vai iterar sobre cada item da lista de cada petshop.
    Quando tiver percorrendo cada produto, salve na variavel products de qual petshop ele faz parte.
    Na variavel totalValuePetPetshop salve o resultado a seguir: A soma de todos os produtos da arrays products. 
    O método reduce recebe um acumulador, que é tipo o i, porém para soma de valores(total) e recebe o iterado que será somado(product)
    O acumulador vai começar com seu valor em zero (o valor inicial dele fica lá no final, igual no useEffect)
    A gente retorna a soma do acumulador(total) + o preço de cada produto(product.preco)
    No final, a gente diz que quer ficar só com 2 casas depois da virgula .toFixed(2)
    Retornamos o resultado */
    Object.keys(productsByPetshop).map((petshop) => {
      const products = productsByPetshop[petshop];
      const totalValuePerPetshop = products.reduce((total, product) => {
        return total + product.preco;
      }, 0).toFixed(2)

      /* SPLIT RULES 10 - Vamos calcular nossa comissão de marketplace.
      A gente precisa saber quanto é 10% do valor total por petshop.
      Se a petshop tem 100 reais de venda, a taxa será * 0,1 e vai dar 10 reais. (10%) */
      const totalFee = (totalValuePerPetshop * transactionFee).toFixed(2);

      /* SPLIT RULES 7 - Nesta etapa eu peguei a compra do cliente, separei, e sei quanto cada petshop vendeu. Vou agora colocar este valor na array.
      Liable: Se este parceiro é responsabilizado por chargeback; charge_processing_fee: Se ele vai ser cobrado a % que o pagarme cobra de taxa de serviço 
      Copiamos da documentação do pagarme como ele espera receber os dados.
      recipient_id: acessamos o primeiro produto da array, acessamos o objeto petshop, e acessamos a propriedade recipient_id, fácil. (para entender mais da lógica, é só ver a função makePurchase, lá tem um console log do objeto transaction antes de ser enviado ao pagarme.)
      SPLIT RULES 11 - Em percentage, vamos arredondar a operação, que será o valor total que a petshop tem pra receber - nossa comissão de marketplace. 
      Vamos também dividir isso pelo valor total, desta forma, sabemos quanto do valor total da transação esta petshop irá receber. Exemplo 70/100, vai dar 0.7, a gente multiplica isso por 100 pra termos o percentual, então o percentage será 70, ela vai receber 70% do valor total da transação.
      SPLIT RULES 12 - Nesta etapa se fizermos uma simulação, a gente vai ver que o objeto transaction vai ter lá os petshops, e o percentual que cada um tem direito sobre a venda total.
      Mas se a gente simular uma compra, abrir o console, e somar o percentage de todas as lojas que venderam naquela transação, não vai dar 100%. Isso é pq a diferença deste valor para 100, é justamente nossa comissão de marketplace. 
      Então nesta etapa vamos criar um recebedor lá na pagarme, que seremos nós. */
      result.push({
        recipient_id: products[0].petshop_id.recipient_id,
        percentage: Math.floor(((totalValuePerPetshop - totalFee) / total) * 100 ),
        liable: true,
        charge_processing_fee: true,
      })
    })

    /* SPLIT RULES 14 
    Nesta etapa vamos somar de fato os percentuais de participação nas vendas de cada petshop, e salvar no objeto totalPetshopsPercentage 
    O método reduce é um loop executado em uma array pra somar todos os valores dela. Inicia com um valor zero, acessa o objeto recipient, e soma o percentage dele no total, até ter somado todos.
    O método parseFloat transforma uma string em float. */
    const totalPetshopsPercentage = result.reduce((total, recipient) => {
      return total + parseFloat(recipient.percentage);
    },0)

     /* SPLIT RULES 16 - Aqui vamos adicionar nosso percentual de comissão de dono do marketplace.
     Pegamos tudo que tem no defaultRecipient.
     Onde tem o percentage do objeto defaultRecipient a gente vai sobreescrever com o cálculo a seguir,
     A nossa comissão vai ser o resto da transação. 
     O valor a ser recebido pelas petshops soma 90%, então vai ficar 100 - 90, dá 10, então nossa comissão será 10%.
     A Lógica é feita desta forma, pois é assim que o pagarme espera receber no endpoint create split transaction.*/
    result.push({
      ...defaultRecipient,
      percentage: 100 - totalPetshopsPercentage
    })

    return result;
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
      })),
      split_rules: getSplitRules()
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
                  <input type="text" placeholder="VALIDADE" className="form-control form-control-lg"
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
