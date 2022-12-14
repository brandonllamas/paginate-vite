import React from 'react'
import 'animate.css';

const Item = ({ name, thumbnail, }) => {
    return (
        <div className="card" >
            <img src={thumbnail} className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
            </div>
        </div>
    )
};

export default Item;