import React from 'react'

/* PETSHOP QUERY 1 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* PETSHOP QUERY 12 */
import { requestPetshop } from '../../store/modules/shop/actions'

import Header from '../../components/header'
import ProductCard from '../../components/product/card'
import './styles.css'


/* PETSHOP QUERY 11 - O match é uma props disponível do react router dom quando a gente usa routes, com a props match a gente consegue recuperar o id da URL do req params (tipo o location) */
const Petshop = ({ match }) => {

  /* PETSHOP QUERY 2 */
  const dispatch = useDispatch();

  /* PETSHOP QUERY 14 */
  const { petshop } = useSelector((state) => state.shop)

  useEffect(() => {
    dispatch(requestPetshop(match.params.id)) /* PETSHOP QUERY 13 - A props match é similar ao req.params.id */
  }, [])

  return (
    <div className="h-100">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-2">
            <img className="img-fluid petshop-image" src={petshop.logo}/>
            <b>{petshop.nome}</b>
            <div className="petshop-infos">

              <span class="mdi mdi-star"></span>
              <text>
                <b>2,8</b>
              </text>

              <span class="mdi mdi-cash-usd-outline"></span>
              <text>{petshop.categoria}</text>

              <span class="mdi mdi-crosshairs-gps"></span>
              <text>2,9km</text>
            </div>
            <label className="badge bg-primary">Frete Grátis</label>
          </div>

          <div className="col-10">
            <h5>Produtos</h5>
            <br />
            <div className="row">
            {/* BUG 1 - Colocamos o ?(optional chaining) para permitir que products seja nulo enquanto o saga não retorna pra gente os dados do endpoint */}
            {petshop.products?.map((p) => (
              <ProductCard product={p} />
            ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Petshop
