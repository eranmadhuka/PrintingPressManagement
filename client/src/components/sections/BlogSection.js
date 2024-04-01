import React from 'react'
import product1 from '../../assets/images/product1.png'
import product2 from '../../assets/images/product2.png'

const BlogSection = () => {
    return (
        <>
            <section>
                <div className='container p-5'>
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className='text-start'>
                                <h4>MOST RECENT NEWS</h4>
                                <h2>Read our latest <span>blog</span> posts</h2>
                                <p>We have all the equipment, know-how and every thing you will need to receive fast, reliable printing services with high quality results.</p>
                                <button className='btn btn-primary'>More Blogs</button>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 bg-transparent">
                                <img src={product1} className="card-img-top rounded" alt="product1" style={{ 'height': '250px', 'objectFit': 'cover' }} />
                                <div className="card-body ps-0">
                                    <span>Printec</span>
                                    <h5 className="card-title fw-semibold mb-3">Tips to Find Best Print on Demand Business Name Ideas</h5>
                                    <p><a href="/" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Read More</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card border-0 bg-transparent">
                                <img src={product2} className="card-img-top rounded" alt="product2" style={{ 'height': '250px', 'objectFit': 'cover' }} />
                                <div className="card-body ps-0">
                                    <span>Printec</span>
                                    <h5 className="card-title fw-semibold mb-3">Tips to Find Best Print on Demand Business Name Ideas</h5>
                                    <p><a href="/" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Read More</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogSection
