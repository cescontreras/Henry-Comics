import React, { useEffect, useState } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import { faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './filter.css';

const Filter = ({products,filter,clean,status}) => { 
    
    const [filtro, setFiltro] = useState(false);
    const [collection, setCollection] = useState(false);
    const [serie, setSerie] = useState(false);
    const [year, setYear] = useState(false);

    const toggleF = () =>{
        setFiltro(!filtro);
        setCollection(false);
        setSerie(false);
        setYear(false);
    };
    const toggleA = () => setCollection(!collection);
    const toggleE = () => setSerie(!serie);
    const toggleY = () => setYear(!year);

    const [filtros,setFiltros] = useState({
        collection: [],
        serie: [],
        año: [],
    })


    const getFilterList = () => {
        let newCollections = products && products.map(p => p.collection)
        let newSeries = products && products.map(p => p.serie)
        let newAño = products && products.map(p => p.year)
        setFiltros({
            ...filtros,
            collection: [...new Set(newCollections)],
            serie: [...new Set(newSeries)],
            año: [...new Set(newAño)]
        })
    }
  
    useEffect(() => {        
        getFilterList()
    },[products])

    return (
        <div className="filter-fixed ">
            <div className='filter-header'>
                <h5 onClick={toggleF} className="cursor"><FontAwesomeIcon icon={faFilter} /> Filtros</h5>
                {status && <button type='button' className='btn btn-danger' onClick={() => clean()}><FontAwesomeIcon icon={faTrash} /></button>}  
            </div>
            <Collapse isOpen={filtro}>
                <Card>
                <CardBody className='body' >
                    <h5  onClick={toggleA} className="cursor">Collección</h5>
                    <Collapse isOpen={collection}>
                        <Card>
                        <CardBody>
                            <ul className='filtro'>
                                {filtros.collection[0] && filtros.collection.map(a => <li className='lista'><a name={a} type='button' onClick={()=>filter(a,'collection')}>{a}</a></li>)}
                            </ul>
                        </CardBody>
                        </Card>
                    </Collapse>
                    <h5 onClick={toggleE} className="cursor">Serie</h5> 
                    <Collapse isOpen={serie}>
                            <Card>
                            <CardBody>
                                <ul className='filtro'>
                                    {filtros.serie[0] &&filtros.serie.map(a => <li className='lista'><a name={a} type='button' onClick={()=>filter(a,'serie')}>{a}</a></li>)}
                                </ul>
                            </CardBody>
                            </Card>
                    </Collapse>
                    <h5 onClick={toggleY} className="cursor" >Año</h5>
                    <Collapse isOpen={year}>
                        <Card>
                        <CardBody>
                            <ul className='filtro'>
                                {filtros.año[0] && filtros.año.map(a => <li className='lista'><a name={a} type='button' onClick={()=>filter(a,'year')}>{a}</a></li>)}
                            </ul>
                        </CardBody>
                        </Card>
                    </Collapse>
                </CardBody>
                </Card>
            </Collapse>
            
        </div>
    )
}

export default Filter;