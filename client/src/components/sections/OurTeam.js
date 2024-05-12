import React from 'react';
import MemberImg1 from '../../assets/images/users/user1.jpg';

const OurTeam = () => {
    const teamMembers = [
        {
            img: MemberImg1,
            name: "Vikim Bhashitha",
            designation: "Product Manager"
        },
        {
            img: MemberImg1,
            name: "Sajith Fernando",
            designation: "Customer Manager"
        },
        {
            img: MemberImg1,
            name: "Eran Madhuka",
            designation: "Order Manager"
        },
        {
            img: MemberImg1,
            name: "Umanga kithmini",
            designation: "Product Manager"
        },
        {
            img: MemberImg1,
            name: "Eshani Nanayakkara",
            designation: "Supplier Manager"
        },
        {
            img: MemberImg1,
            name: "Thisal",
            designation: "Transport Manager"
        },
        {
            img: MemberImg1,
            name: "Chanuthi Savithma",
            designation: "Employee Manager"
        },
        {
            img: MemberImg1,
            name: "Ravindu Panadura",
            designation: "Financial Manager"
        },
    ];
    return (
        <>
            <section>
                <div className='container p-5'>
                    <div className='text-center'>
                        <h4>OUR TEAM</h4>
                        <h2>We are the best <span>team!</span></h2>
                        <p>We have all the equipment, know-how and everything you will need to receive fast.</p>
                    </div>
                    <div className="row mt-5">
                        {teamMembers.map((item, index) => {
                            return (
                                <div className="col-lg-3 mb-5" key={index} style={{ height: '400px' }}>
                                    <div className="card border-0 mb-3 rounded text-center">
                                        <img src={item.img} className="card-img-top" alt={item.name} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{item.name}</h5>
                                            <p className="card-text">{item.designation}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurTeam;
