import './styles.css'

const Petshop = () => {
  return (
    <li className="petshop d-inline-block">
      <div className="d-inline-block">
        <img className="img-fluid" src="https://www.petlove.com.br/static/uploads/banner_image/image/4304/logo-petlove-push.png"/>
      </div>
      <div className="d-inline-block align-bottom petshop-showcase">
        <b>Petlove</b>
        <div className="petshop-infos">

          <span class="mdi mdi-star"></span>
          <text>
            <b>2,8</b>
          </text>

          <span class="mdi mdi-cash-usd-outline"></span>
          <text>$$</text>

          <span class="mdi mdi-crosshairs-gps"></span>
          <text>2,9km</text>
        </div>
        <label className="badge bg-primary">Frete Grátis</label>
      </div>
    </li>
  )
}

export default Petshop
