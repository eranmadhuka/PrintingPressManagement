import React from 'react'
import BgImg from '../../assets/images/background.jpg'
import { Link } from 'react-router-dom'

const PageTopBanner = ({ title, path }) => {
    return (
        <>
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center py-5"
                style={{
                    backgroundImage: `url(${BgImg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                <h2>{title}</h2>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </nav>
            </div>
        </>
    )
}

export default PageTopBanner
