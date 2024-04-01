import React from 'react'

const Card = ({ title, number, icon, subtext }) => {
    return (
        <>
            <div className="card bg-light bg-gradient border-0">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-lg-9">
                            <h2 className="card-title text-secondary">{number}</h2>
                        </div>
                        <div className="col-lg-3 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                            {icon}
                        </div>
                    </div>
                    <h4 className='fs-3 '>{title}</h4>
                    <p>{subtext}</p>
                </div>
            </div>

        </>
    )
}

export default Card
