import React from 'react';
import './newsgrid.css';

const NewProduct = (props) => {
  return (
    <div className="wrapper-index">
        <div className='cont-img'>
          <img src={props.product.image} className="img-index"/>
        </div>
        <div className="description-index">
            <h3>{props.product.name}</h3>     
            <p>{props.product.description}</p>
        </div>
    </div>
  );
};

export default NewProduct;