import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Users = () => {
    const [salesStaff, setSalesStaff] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/getStaff')
            .then((res) => {
                console.log(res);
                setSalesStaff(res.data); // Set the salesStaff state with the response data
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSalesStaff = salesStaff.filter((staff) => {
        return staff.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                <h2 className='mt-4 mb-4'>Totally Not Merchandise CRM</h2>

                    <div className="sidebar">
                        <ul className="list-group">
                            <li className="list-group-item">Dashboard</li>
                            <li className="list-group-item">Customers</li>
                            <li className="list-group-item active">Sales</li>
                            <li className="list-group-item">Orders</li>
                            <li className="list-group-item">Products</li>
                            <li className="list-group-item">Reports</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-9">
                    <h5 className="mt-3 mb-3">Sales - Sales Team Performance</h5>

                    <nav className="navbar navbar-light bg-light">
                        <form className="form-inline mb-5">
                            <input
                                className="form-control mr-sm-2 mb-4"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                Search
                            </button>
                        </form>
                    </nav>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quotes</th>
                                <th scope="col">Orders</th>
                                <th scope="col">Target</th>
                                <th scope="col">Target Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalesStaff.map((staff) => (
                                <tr key={staff.id}>
                                    <th scope="row">{staff.id}</th>
                                    <td>{staff.name}</td>
                                    <td>{staff.quotes}</td>
                                    <td>{staff.orders}</td>
                                    <td>{staff.target}</td>
                                    <td>{staff.target_progress}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;