/* Rotas 1/6 - Eu crio o arquivo routes.js, este arquivo aqui que eu estou escrevendo. ANtes de chegar nesta etapa, a gente não tem este arquivo.
Com yarn add react-router-dom eu instalo a lib, e aqui no routes.js eu importo a lib
Além disso, eu mudo o nome padrão de BrowserRouter para Router, isso é opcional.
*/
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './styles/global.css';
import Cadastro from './pages/cadastro';
import Checkout from './pages/checkout';
import Petshop from './pages/petshop';
import Sidebar from './components/sidebar' /* Sidebar 11/11 - Importamos nesta linha, e depois, implementamos ali embaixo */
import Home from './pages/home';

import React from 'react'

/* Rotas 4/6
Crio meu componente funcional Routes, Coloco a closing tag fragment, pq no react só pode ter um elemento pai.
Envolvo toda a hierarquia de Route em <Router>, esse componente do react-router-dom serve pra "ligar" o modo de links funcionando na nossa aplicação
Agora na configuração de cada route, 
1-a gente coloca o path="" que determina qual URL do site estamos configurando
2-exact : essa props a gente coloca quando queremos que um certo componente só seja renderizado naquela rota, se ela for exatamente igual aquela. É muito útil por ex na hora de editar os produtos que o parceiro está vendendo no petshop dele.
3-component={} nessa parte a gente determina qual componente será renderizado quando o usuário acessar o path="" que estiver configurando. Se for path="/" component={home}, significa que quando o usuário acessar o root, que é o path /, será renderizao pra ele o componente home. Para testar se a sua config de routes funcionou,é só ir no navegador com yarn start, e escrever a rota no topo e tentar acessar, se renderizar o componente certo, então significa que o código funcionou.
*/ 
const Routes = () => {
  return (
    <>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/petshop/:id" exact component={Petshop} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/cadastro" exact component={Cadastro} />
        <Sidebar /> {/* Checkout 4 - Coloco a sidebar dentro do router, para que o useHistory funcione. Ele é igual <Link>, só funciona se estiver dentro do contexto do router */}
      </Router>
    </>
    /* Rotas 5/6 - A gente coloca a sidebar aqui no routes.js, durante o desenvolvimento ele estava no index.js que tem o react.domrender, mas o lugar correto FINAL é dentro do routes. */
  )
}

export default Routes
