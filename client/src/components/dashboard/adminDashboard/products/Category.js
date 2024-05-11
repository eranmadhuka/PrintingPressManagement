import React, { Component } from "react";
import axios from 'axios';
import AdminLayout from '../../../Layouts/AdminLayout'
import { Link } from "react-router-dom";

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        this.retrieveCategories();
    }

    retrieveCategories() {
        axios.get("http://localhost:5000/api/categories")
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        categories: res.data.existingCategories
                    }, () => {
                        console.log("Categories retrieved:", this.state.categories);
                    });
                } else {
                    console.error("Failed to retrieve categories:", res.data.error);
                }
            })
            .catch(err => console.error("Failed to fetch categories:", err));
    }


    //delete category

    onDelete = (id) => {
        axios.delete(`http://localhost:5000/api/categories/delete/${id}`)
            .then((res) => {
                if (res.data.success) {
                    alert("Failed to delete the categories");
                    this.retrieveCategories();
                } else {
                    alert('Deleted Succesfully');
                }
            })
            .catch(err => {
                console.error("Failed to delete category:", err);
                alert('Error while deleting category');
            });
    }

    filterData(categories, searchkey) {
        const result = categories.filter((category) =>
            category.cname.toLowerCase().includes(searchkey) ||
            category.description.toLowerCase().includes(searchkey)
        );

        return result;
    }

    //search

    handleSearchArea = (e) => {
        const searchkey = e.currentTarget.value;

        axios.get(`http://localhost:8000/api/categories?search=${searchkey}`)
            .then(res => {
                if (res.data.success) {
                    const filteredCategories = this.filterData(res.data.existingCategories, searchkey);
                    this.setState({ categories: filteredCategories }); // Update state with filtered data
                }
            })
            .catch(err => console.error("Failed to search categories:", err));
    }

    render() {
        return (
            <AdminLayout>
                <div className="bg-white p-3 mt-2">

                    <div className="bg-white p-3 mt-2">
                        <div className="row">
                            <div className="col-lg-9 mt-2 mb-2">
                                <h4 className="fs-5 fw-bold">All Categories</h4>
                                <Link to='/admin/products/AddCategory'>
                                    <button className="btn btn-success">
                                        Create New Category
                                    </button>
                                </Link>
                            </div>
                            <div className="col-lg-3 mt-2 mb-2">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search"
                                    name="searchQuery"
                                    onChange={this.handleSearchArea}
                                />
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">CID</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.categories.map(category => (
                                    <tr key={category._id}>
                                        <th scope="row">{category._id}</th>
                                        <td>
                                            <a href={`/admin/products/categoryDetails/${category._id}`} style={{ textDecoration: 'none' }}>
                                                {category.cname}
                                            </a>
                                        </td>
                                        <td>{category.description}</td>
                                        <td>
                                            <Link to={`/admin/products/editCategory/${category._id}`}>
                                                <i className="bi bi-pencil-square text-primary me-3"></i>
                                            </Link>

                                            <i className="bi bi-trash-fill text-danger"
                                                onClick={() => this.onDelete(category._id)}
                                            ></i>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </AdminLayout >
        );
    }
}
