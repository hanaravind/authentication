import React, { useEffect, useState } from 'react'
import SearchInput from '../searchInput/Input'
import List from '../userList/List'
import UserList from '../../data/mock.json'
import './main.scss'
import useKeyPress from '../../hooks/KeyPress'

const Main = () => {
    const { user_list } = UserList
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const [cursor, setCursor] = useState(null)
    const downPress = useKeyPress('ArrowDown')
    const upPress = useKeyPress('ArrowUp')
    const [isKey, setKey] = useState(false)

    const searchQuery = (value) => {
        setQuery(value)
    }

    const setHovered = (i) => {
        setCursor(i)
    }

    const onMouseLeave = () => {    
        setCursor(null)
    }

    useEffect(() => {
        if(query) {
            const checkNested = user_list.map((element) => {
                return {...element, items : element.items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))}
            }).filter((el) => {
                if(el.items.length === 0) {
                    return el.name.toLowerCase().includes(query.toLowerCase()) || el.address.toLowerCase().includes(query.toLowerCase()) || el.id.toLowerCase().includes(query.toLowerCase()) || el.pincode.toLowerCase().includes(query.toLowerCase()) 
                } else {
                    return el
                }
            })
            setUsers(checkNested)
        } else {
            setUsers([])
        }
    }, [query])


    useEffect(() => {
        if (users.length && downPress) {
            if(cursor === null) {
                setCursor(0)
                return
            }
            setCursor(prevState =>
              prevState < users.length - 1 ? prevState + 1 : prevState
            );
        }
        if (users.length && upPress) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
        }
    }, [downPress, upPress])

  return (
    <div className='search-list-container'>
        <SearchInput searchQuery={searchQuery} />
        <List 
            users={users}
            query={query}
            cursor={cursor}
            iskey={isKey}
            onHovered={setHovered}
            onLeave={onMouseLeave}
        />
    </div>
  )
}

export default Main