import React, {useState} from 'react';
import { FormControl }from 'react-bootstrap'
import "./Home.css"
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import {fotos} from "./Fotos"
import Header from '../../Components/Header'

function Home() {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href="/home"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
          &#x25bc;
        </a>
      ));

    const [value, setValue] = useState('');
    const [name, setName] = useState('Entrar');

    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            
        
        return (
            <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Filtrar..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                    (child) =>
                        !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
            );
            },
      );

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3, itemsToScroll: 3 },
        { width: 1200, itemsToShow: 5, itemsToScroll: 5 }
    ];

    let user;

    fetch('http://localhost:3030/user', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(response => {
        user = response.body

        if (response.logged) {
            setName(user.first_name);
            document.querySelector('#login-icon').href = '/profile'
        }
    });

    console.log(user);

    return(
        <div id="paginaHome">
            <Header />

            <video autoplay="true" muted loop id="myVideo">
                <source src="BFvideo.mp4" type="video/mp4"></source>
            </video>
            <div className="produtos1">
                <h2><b>Os mais vendidos:</b></h2>
                <div className="Carousel">
                    <Carousel breakPoints={breakPoints}>
                        {fotos.map( (foto) => {
                            return(
                            <Item id="item">
                                <h3>{foto.nome}</h3>
                                <img id="img" alt={foto.descricao} src={foto.url}></img>
                                <h5>{foto.descricao}</h5>
                                <h4>{foto.preco}</h4>
                            </Item> 
                            )
                        })}
                    </Carousel>
                </div>
            </div>


        </div>
        
    );

}


export default Home;
