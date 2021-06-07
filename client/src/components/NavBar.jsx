import React from 'react'
import store from '../redux/store'
import { clearTasks } from '../redux/slices/todos-slice'

const NavBar = () => {
    return (
        <div className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">
                    TodoBin
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <button type="button" className="btn btn-primary" onClick={() => store.dispatch(clearTasks())}>+ Todo</button>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default NavBar
