import React from 'react'
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import '../style/SkeletonLoader.css';

const SkeletonView = () => {
  return (
    // <SkeletonTheme baseColor="#202020" highlightColor="#444">
    //     <p>
    //       <Skeleton count={3} />
    //     </p>
    // </SkeletonTheme>
    <div className="container skeleton-loade w-100r">
      <div className="row main-mint-area">
        <div className="col-md-4 pe-5 nft-details-container">
          <div className="skeleton-row w-75" style={{height: '250px', borderRadius: '5px'}}></div>
          <div className='skeleton-row mt-4' style={{height: '30px', width: '60%'}}></div>
          <p className='skeleton-row'></p>
          <p className='skeleton-row'></p>
          <p className='skeleton-row'></p>
          <p className='skeleton-row'></p>
          <p className='skeleton-row'></p>
          <p className='skeleton-row'></p>
        </div>
        <div className="col-md-8 sub-mint-area ps-5 pt-3">
          <p className='skeleton-row w-25'></p>
          <div className='skeleton-row w-50' style={{height: '40px', maxWidth: '300px'}}></div>

          <p className='skeleton-row w-25 mt-5'></p>
          <div className='skeleton-row w-50' style={{height: '40px', maxWidth: '300px'}}></div>

          <div className='skeleton-row w-75 mt-5' style={{height: '40px'}}></div>

          <button className='btn btn-sm skeleton-row w-25' style={{height: '40px'}}></button>
          <button className='btn btn-sm skeleton-row w-25 ms-3' style={{height: '40px'}}></button>
        </div>

      </div>
      {/* Add more rows as needed */}
    </div>
  )
}

export default SkeletonView