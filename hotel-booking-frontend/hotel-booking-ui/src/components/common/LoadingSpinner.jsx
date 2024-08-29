import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" style={{
                width: "5rem", height: "5rem",
                marginTop: 240, justifyContent: 'center', alignItems: 'center'
            }} role="status">
                <span className='sr-only'>
                </span>
            </div>
        </div>
    )
}

export default LoadingSpinner