import React from 'react'

import BoxImg1 from '../../assets/images/box.webp'
import product1 from '../../assets/images/product1.png'
import product2 from '../../assets/images/product2.png'
import product3 from '../../assets/images/product3.png'
import product4 from '../../assets/images/product4.png'

const ServicesSection = () => {

    const services = [
        {
            img: BoxImg1,
            title: "Banners",
            des: "Lobortis vitae justo eget magna fermentum iaculis"
        },
        {
            img: BoxImg1,
            title: "Banners",
            des: "Lobortis vitae justo eget magna fermentum iaculis"
        },
        {
            img: BoxImg1,
            title: "Banners",
            des: "Lobortis vitae justo eget magna fermentum iaculis"
        },
        {
            img: BoxImg1,
            title: "Banners",
            des: "Lobortis vitae justo eget magna fermentum iaculis"
        },
        {
            img: BoxImg1,
            title: "Banners",
            des: "Lobortis vitae justo eget magna fermentum iaculis"
        },
        {
            img: BoxImg1,
            title: "Banners",
            des: "Lobortis vitae justo eget magna fermentum iaculis"
        },
    ]

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h4>LET’S GET PRINTING</h4>
                            <h2>Develop Your Brand</h2>
                            <p>We have all the equipment, know-how and every thing you will need to receive fast, </p>

                            <div className="row mt-5">
                                {services.map((item, index) => {
                                    return (
                                        <div className="col-lg-4 col-md-4 col-sm-6">
                                            <div key={index}>
                                                <img src={item.img} alt="BoxImg" style={{ 'width': '80px' }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p>{item.des}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="col-lg-6 d-none d-md-block">
                            <div className="row">
                                <div className="col-lg-6">
                                    <img src={product1} alt="product1" className='p-3' style={{ 'width': '100%' }} />
                                </div>
                                <div className="col-lg-6">
                                    <img src={product2} alt="product2" className='p-3' style={{ 'width': '100%' }} />
                                </div>
                                <div className="col-lg-6">
                                    <img src={product3} alt="product3" className='p-3' style={{ 'width': '100%' }} />
                                </div>
                                <div className="col-lg-6">
                                    <img src={product4} alt="product4" className='p-3' style={{ 'width': '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default ServicesSection
