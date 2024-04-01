import React from 'react'
import PageTopBanner from '../components/common/PageTopBanner'

const Shop = () => {

    const products = [
        {
            id: 1,
            img: "https://img.freepik.com/free-psd/modern-clean-professional-business-card-template_501970-93.jpg",  //product image url
            name: "The One Ring",
            price: "$40.00 - $80.00"
        },
        {
            id: 2,
            img: "https://img.freepik.com/free-vector/clean-style-modern-business-card-template_1017-30352.jpg?size=338&ext=jpg&ga=GA1.1.1687694167.1711670400&semt=ais",  //product image url
            name: "The One Ring",
            price: "$40.00 - $80.00"
        },
        {
            id: 3,
            img: "https://img.freepik.com/free-psd/modern-clean-professional-business-card-template_501970-93.jpg",  //product image url
            name: "The One Ring",
            price: "$40.00 - $80.00"
        },
        {
            id: 4,
            img: "https://img.freepik.com/free-vector/clean-style-modern-business-card-template_1017-30352.jpg?size=338&ext=jpg&ga=GA1.1.1687694167.1711670400&semt=ais",  //product image url
            name: "The One Ring",
            price: "$40.00 - $80.00"
        },
        {
            id: 5,
            img: "https://img.freepik.com/free-psd/modern-clean-professional-business-card-template_501970-93.jpg",  //product image url
            name: "The One Ring",
            price: "$40.00 - $80.00"
        },
        {
            id: 6,
            img: "https://img.freepik.com/free-vector/clean-style-modern-business-card-template_1017-30352.jpg?size=338&ext=jpg&ga=GA1.1.1687694167.1711670400&semt=ais",  //product image url
            name: "The One Ring",
            price: "$40.00 - $80.00"
        }
    ]

    return (
        <>
            <PageTopBanner
                title="Shop"
                path="/shop"
            />

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {products.map((item) => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-1 mb-5" key={item.id}>
                                    <div className="card h-100 border-0 shadow-sm">
                                        <img className="card-img-top" src={item.img} alt={item.img} />
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h5 className="fw-bolder">{item.name}</h5>
                                                {item.price}
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="text-center"><a className="btn btn-primary mt-auto" href="/products/:productId">View options</a></div>
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

export default Shop
