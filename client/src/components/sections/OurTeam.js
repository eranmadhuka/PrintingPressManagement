import React from 'react';
import MemberImg1 from '../../assets/images/users/user1.jpg';
import chanuthi from '../../assets/images/members/chanuthi.jpg';
import eran from '../../assets/images/members/eran.jpg';
import eshani from '../../assets/images/members/eshani.jpg';
import ravindu from '../../assets/images/members/ravindu.jpg';
import sajith from '../../assets/images/members/sajith.jpg';
import thisal from '../../assets/images/members/thisal.jpg';
import vikum from '../../assets/images/members/vikum.jpg';

const OurTeam = () => {
    const teamMembers = [
        {
            img: vikum,
            name: "Vikim Bhashitha",
            designation: "Product Manager"
        },
        {
            img: sajith,
            name: "Sajith Fernando",
            designation: "Customer Manager"
        },
        {
            img: eran,
            name: "Eran Madhuka",
            designation: "Order Manager"
        },
        {
            img: MemberImg1,
            name: "Umanga kithmini",
            designation: "Product Manager"
        },
        {
            img: eshani,
            name: "Eshani Nanayakkara",
            designation: "Supplier Manager"
        },
        {
            img: thisal,
            name: "Thisal",
            designation: "Transport Manager"
        },
        {
            img: chanuthi,
            name: "Chanuthi Savithma",
            designation: "Employee Manager"
        },
        {
            img: ravindu,
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
