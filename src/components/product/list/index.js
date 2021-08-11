import './styles.css'

const Product = () => {
  return (
    <div className="col-12 product-list">
      <div className="row">
        <div className="col-3">
          <img src="https://staticpetz.stoom.com.br/fotos/1562334106185.jpg" className="img-fluid" alt="" />
        </div>
        <div className="col-6">
          <h6><label className="badge bg-secondary">R$ 30,00</label></h6> {/* O badge conforme o tutorial não funcionou, fiz assim e deu certo. */}
          <small><b>Ração úmida nestlé purina dog chow extra life sachê carne para cães Filhotes - 100g</b></small>
        </div>
        <div className="col-3">
          <button className="">-</button>
        </div>
      </div>
    </div>
  )
}

export default Product
