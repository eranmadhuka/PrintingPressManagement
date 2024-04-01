import React from 'react'
import HowImg1 from '../../assets/images/how1.jpg'

const HowitWorks = () => {

    const howItWorksData = [
        {
            id: 1,
            img: HowImg1,
            title: "Select A Product",
            des: "Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies porta nibh"
        },
        {
            id: 2,
            img: HowImg1,
            title: "Select A Product",
            des: "Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies porta nibh"
        },
        {
            id: 3,
            img: HowImg1,
            title: "Select A Product",
            des: "Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies porta nibh"
        },
    ]

    return (
        <>
            <section className='bg-white' >
                <div className='container p-5'>
                    <div className='text-center'>
                        <h4>HOW IT’S WORK</h4>
                        <h2>Order For <span>Business</span> Or <br /> <span>Personal</span> Use</h2>
                        <p>We have all the equipment, know-how and every thing you will need to receive fast, </p>
                    </div>

                    <div className='row pt-5'>
                        {howItWorksData.map((item) => {
                            return (
                                <div key={item.id} className='col-lg-4'>
                                    <div className='mb-3'>
                                        <img src={item.img} className="card-img-top" alt={item.img} />
                                        <div className="text-center py-3 px-4 d-flex flex-column align-items-center">
                                            <div style={{
                                                'background': '#EA454C',
                                                'borderRadius': '50%',
                                                'height': '50px',
                                                'width': '50px'
                                            }}
                                                className='d-flex justify-content-center align-items-center'>
                                                <h3 className='text-white m-0'>{item.id}</h3>
                                            </div>
                                            <h5 className="my-3">{item.title}</h5>
                                            <p className="card-text">{item.des}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HowitWorks
