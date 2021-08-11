import React from 'react'
import Header from '../../components/header'
import './styles.css'
import Product from '../../components/product/list'

const Checkout = () => {
  return (
    <div className="h-100">
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            <span className="section-title">Dados de Entrega</span>
            <div className="row mb-3">
              <div className="col-12">
                <input type="text" placeholder="CEP" className="form-control form-control-lg"/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                  <input type="text" placeholder="CIDADE" className="form-control form-control-lg"/>
              </div>

              <div className="col-6 pl-0">
                  <input type="text" placeholder="LOGRADOURO" className="form-control form-control-lg"/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-5">
                  <input type="text" placeholder="NÚMERO" className="form-control form-control-lg"/>
              </div>

              <div className="col-5 pl-0">
                  <input type="text" placeholder="BAIRRO" className="form-control form-control-lg"/>
              </div>

              <div className="col-2 pl-0">
                  <input type="text" placeholder="UF" className="form-control form-control-lg"/>
              </div>
            </div>

            <span className="section-title">Dados de Pagamento</span>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                  <input type="text" placeholder="NÚMERO DO CARTÃO" className="form-control form-control-lg"/>
              </div>

              <div className="col-6">
                  <input type="text" placeholder="VALIDADE" className="form-control form-control-lg"/>
              </div>

              <div className="col-6 pl-0">
                  <input type="text" placeholder="CVV" className="form-control form-control-lg"/>
              </div>
            </div>

          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center"> {/* d-flex deixa inline (ativa o flexbox), justify deixa cada um em uma ponta, e o align alinha na vertical*/}
              <b>Total</b>
              <h3>R$ 30,00</h3>
            </div>
            <div className="col-12">
              <button className="btn btn-block btn-lg btn-primary">
                Finalizar compra
              </button>
            </div>
          </div>
          </div>
          <div className="col-6">
            <div className="box col mb-4 box-sidebar">
              
              <h4>Minha sacola (5)</h4>
              <div className="row products">
                {[1,2,3,4,5,6,7,8,9].map((p => 
                <Product />
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
