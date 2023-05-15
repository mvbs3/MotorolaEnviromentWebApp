import React from 'react'
import motoLogo from './img/motoLogo.png'
import style from './Header.module.css'

function Header(){
    return (
        <header className ={style.header}>
            <nav>
            <a href='index.html'><img src={motoLogo} alt="logo"/></a>
                <ul classname = {style.headerItens}>
                    <button>buttonSideBar</button>
                    <a href = "https://www.instagram.com/ratue_tcg/">Login</a>
                    <a href = "https://www.instagram.com/ratue_tcg/">Login</a>
                    <a href = "https://www.instagram.com/ratue_tcg/">Login</a>
                </ul> 
            </nav>
        </header>
    )
};

export default Header

