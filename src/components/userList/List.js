import React, { useEffect, useRef } from 'react'
import Mark from "mark.js";
import './list.scss'

const List = ( {users, query, onHovered, cursor, onLeave} ) => {

    const listRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            let instance = new Mark(listRef.current);
            instance.unmark(query)
            instance.mark(query,{
                "acrossElements": true
            });
        }, 100)

    }, [query])

    useEffect(() => {
        const el = document.querySelector('.user-list-main.active')
        if(el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [cursor])

    return (
        <>
        <div className='user-list-container' ref={listRef}>
            {users.length !==0 && users.map((user, i) => <div className={'user-list-main' + `${cursor === i ? ' active': ''}`} key={user.id} onMouseLeave={(e) => onLeave()} onMouseEnter={(e) => onHovered(i)}> 
                <p className='user-id user-items'>{user.id}</p>
                <p className='user-name user-items'>{user.name}</p>
                { user.items.length !== 0 && <ul className='li-user-items'><li> "<span>{query}</span>" found in items</li></ul>}
                <p className='user-address user-items'>{user.address}-{user.pincode}</p>
            </div>)}
        </div>
        {users.length === 0 && query && <p className='no-result-text'>No Results Found</p>}
        </>
    )
}

export default List