import React from 'react'
import './input.scss'

const Input = ({searchQuery}) => {
    const placeholder = 'Search Users by ID, address, name'
    return (
        <div className='search-box' tabIndex={1}>
            <input type={'search'} className="search-input" onChange={(e) => searchQuery(e.target.value)} placeholder={placeholder} name="search" autoComplete="off" spellCheck="off" />
        </div>
    )
}

export default Input