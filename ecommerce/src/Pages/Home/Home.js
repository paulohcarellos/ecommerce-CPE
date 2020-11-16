import React, {useState, useEffect} from 'react';
import Carousel from "react-elastic-carousel";
import Header from '../../Components/Header'
import { getUser, getProductsAll } from '../../Components/tools'
import Footer from '../../Components/Footer/Footer'
import "./Home.css"
import { Button } from 'react-bootstrap';

function Home() {

    const [user, setUser] = useState(null);
    const [icones, setIcones] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            getUser()
            .then(user => setUser(user))
            .catch((err) => (console.log(err)));
        }

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            getProductsAll()
            .then(products => setIcones(products))
            .catch((err) => (console.log(err)));
        }
        
        fetchProducts();    
    }, []);

    console.log(icones)

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3, itemsToScroll: 3 },
        { width: 1200, itemsToShow: 5, itemsToScroll: 5 }
    ];

    return(
        <div id="paginaHome">
            <Header user={user}/>
            <div id="homeGeral">
                <div>
                    <video autoplay="true" muted loop id="myVideo">
                        <source src="BFvideo.mp4" type="video/mp4"></source>
                    </video>
                </div>
                <div className="produtos1">
                    <h2 className="ml-3"><b>Todos os produtos:</b></h2>
                    <div className="Carousel">
                        <Carousel breakPoints={breakPoints}>
                            {icones !== undefined && icones.map( (icone) => {
                                return(
                                <div id="item">
                                    <h3>{icone.name}</h3>
                                    <img id="img" src={'http://localhost:3030/product/image/' + icone.image}></img>
                                    <h5>{icone.description}</h5>
                                    <h4>{'R$' + icone.price}</h4> 
                                    <Button variant="outline-dark">Ver mais</Button>
                                </div> 
                                )
                            })}
                        </Carousel>
                        
                    </div>
                    <hr></hr>
                    <h2 id="tecnologia" className="ml-3"><b>Tecnologia:</b></h2>
                    <div className="Carousel">
                        <Carousel breakPoints={breakPoints}>
                            {icones !== undefined && icones.map( (icone) => {
                                return(
                                <div id="item">
                                    <h3>{icone.name}</h3>
                                    <img id="img" src={'http://localhost:3030/product/image/' + icone.image}></img>
                                    <h5>{icone.description}</h5>
                                    <h4>{'R$' + icone.price}</h4> 
                                    <Button variant="outline-dark">Ver mais</Button>
                                </div> 
                                )
                            })}
                        </Carousel>
                        
                    </div>
                    <h2 id="casaEletrodomestico" className="ml-3"><b>Casa e eletrodoméstico:</b></h2>
                    <div className="Carousel">
                        <Carousel breakPoints={breakPoints}>
                            {icones !== undefined && icones.map( (icone) => {
                                return(
                                <div id="item">
                                    <h3>{icone.name}</h3>
                                    <img id="img" src={'http://localhost:3030/product/image/' + icone.image}></img>
                                    <h5>{icone.description}</h5>
                                    <h4>{'R$' + icone.price}</h4> 
                                    <Button variant="outline-dark">Ver mais</Button>
                                </div> 
                                )
                            })}
                        </Carousel>
                        
                    </div>
                    <h2 id="esporteLazer" className="ml-3"><b>Esporte e lazer:</b></h2>
                    <div className="Carousel">
                        <Carousel breakPoints={breakPoints}>
                            {icones !== undefined && icones.map( (icone) => {
                                return(
                                <div id="item">
                                    <h3>{icone.name}</h3>
                                    <img id="img" src={'http://localhost:3030/product/image/' + icone.image}></img>
                                    <h5>{icone.description}</h5>
                                    <h4>{'R$' + icone.price}</h4> 
                                    <Button variant="outline-dark">Ver mais</Button>
                                </div> 
                                )
                            })}
                        </Carousel>
                        
                    </div>
                    <h2 id="modaBeleza" className="ml-3"><b>Moda e beleza:</b></h2>
                    <div className="Carousel">
                        <Carousel breakPoints={breakPoints}>
                            {icones !== undefined && icones.map( (icone) => {
                                return(
                                <div id="item">
                                    <h3>{icone.name}</h3>
                                    <img id="img" src={'http://localhost:3030/product/image/' + icone.image}></img>
                                    <h5>{icone.description}</h5>
                                    <h4>{'R$' + icone.price}</h4> 
                                    <Button variant="outline-dark">Ver mais</Button>
                                </div> 
                                )
                            })}
                        </Carousel>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;