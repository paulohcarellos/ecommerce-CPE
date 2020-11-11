import React, {useState, useEffect} from 'react';
import { FormControl }from 'react-bootstrap'
import "./Home.css"
import Carousel from "react-elastic-carousel";
import {fotos} from "./Fotos"
import Header from '../../Components/Header'
import {getUser, getProducts} from '../../Components/tools'
import Footer from '../../Components/Footer/Footer'

function Home() {

    const [user, setUser] = useState(null);
    const [icones, setIcones] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            getUser()
            .then(user => setUser(user))
            .catch((err) => (console.log(err)));
        }

        const fetchProducts = async () => {
            getProducts()
            .then(products => setIcones(products))
            .catch((err) => (console.log(err)));
        }

        fetchUser();
        fetchProducts();
    }, [])

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3, itemsToScroll: 3 },
        { width: 1200, itemsToShow: 5, itemsToScroll: 5 }
    ];

    return(
        <div id="paginaHome">
            <Header user={user}/>

            <video autoplay="true" muted loop id="myVideo">
                <source src="BFvideo.mp4" type="video/mp4"></source>
            </video>
            <div className="produtos1">
                <h2 className="ml-3"><b>Os mais vendidos:</b></h2>
                <div className="Carousel">
                    <Carousel breakPoints={breakPoints}>
                        {fotos.map( (foto) => {
                            return(
                            <div id="item">
                                <h3>{foto.nome}</h3>
                                <img id="img" alt={foto.descricao} src={foto.url}></img>
                                <h5>{foto.descricao}</h5>
                                <h4>{foto.preco}</h4>
                            </div> 
                            )
                        })}
                    </Carousel>
                </div>
            </div>
            <div>
                <h1>sei lá</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
