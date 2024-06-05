import React from 'react'
import { useSelector } from 'react-redux'


const Coins = () => {

    const state = useSelector(state => state)

    return (
        <span className='wallet-coins'><img src="../assets/img/wallet-icon.png" alt='$'></img><span style={{ display: 'inline-block', marginTop: '2px' }}>
            {state && state.auth && state.auth.logedInUser ? state && state.auth && state.auth.logedInUser.coins : 0}    
        </span></span>
    )
}

export default Coins
