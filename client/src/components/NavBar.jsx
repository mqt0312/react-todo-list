import React from 'react'
import store from '../redux/store'
import { clearTasks } from '../redux/slices/todosSlice'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    TodoBin
                </a>
                <Link to="/todos">
                    <button type="button" className="btn btn-primary" onClick={() => store.dispatch(clearTasks())}>+ Todo</button>
                </Link>

            </div>
        </div>
    )
}

export default NavBar
