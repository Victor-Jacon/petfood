import './styles.css'

const ProductCard = () => {
  return (
    <div className="product col-3">
      <img className="img-fluid align-center" src="https://agroerr.com.br/wp-content/uploads/2020/05/Ra%C3%A7%C3%A3o_Pedigree_Equil%C3%ADbrio_Natural_para_C%C3%A3es_Adultos_de_Ra%C3%A7as_Pequenas_-_20_Kg.jpg" alt="" />
      <button className="btn btn-primary">+</button>
      <h4><label className="badge bg-primary">R$ 90,00</label></h4>
      <small><b>Ração Magnus Todo Dia Sabor Carne para Cães Adultos - 15 kg</b></small>
    </div>
  )
}

export default ProductCard;
