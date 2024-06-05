import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
// import Web3 from "web3";
import { fetchAuthUser } from '../store/reducers/authSlice';
import { useDispatch } from 'react-redux';

const History = () => {
  const dispatch = useDispatch()

  const [historyLoaded, setHistoryLoaded] = useState(false)
  // const [history, setHistory] = useState(null)
  const { isConnected, address } = useAccount();

  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  const loadData = (pageNo) => {


        const authToken = localStorage.getItem('auth_token');

        axios.get('https://api.omniart.app/api/getBridgeDetails?page='+pageNo,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((result) => {
          if(result.data.status){
            // setHistory(result.data.bridge_details)
            setHistoryLoaded(true)

            setTotalPages(result.data.bridge_details.last_page)
            setData(result.data.bridge_details.data)
          }
        }).catch((err) => {
          
        });
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    loadData(page)
  };


  useEffect(()=>{
    if(isConnected){
      dispatch(fetchAuthUser({address:address, ref_by:null}))
      if(!historyLoaded){
        handlePageChange(1)
      }
    }
  },['address'])

  return (
    <div className='container text-start'>
      <h4 className='text-center'>Bridge History</h4>
      <div className="table-responsive bridge-links-container">
        <table className="table table-sm bridge-history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>TxHash</th>
              <th>From</th>
              <th>To</th>
              <th>TokenId</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length>0 && data.map((his,i)=>(
              <tr key={'h'+i}>
                <td>{((currentPage-1)*15) + (i+1)}</td>
                <td><a href={his.tx_hash} target='_blank' className='btn-link'>{his.tx_hash.replace('https://layerzeroscan.com/tx/','')}</a></td>
                <td>{his.from_chain_name}</td>
                <td>{his.to_chain_name}</td>
                <td>{his.token_id}</td>
                <td>{his.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mb-5'></div>
        <nav aria-label="Page navigation">
          <ul className="pagination pagination-dark justify-content-center">
            {/* Previous button */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next button */}
            <li
              className={`page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  )
}

export default History