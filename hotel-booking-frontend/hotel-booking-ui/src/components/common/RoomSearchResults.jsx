import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import RoomCard from '../room/RoomCard'
import RoomPaginator from './RoomPaginator'

const RoomSearchResults = ({ results, onClearSearch }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const resultsPerPage = 3
    const totalResults = results.length
    const totalPages = Math.ceil(totalResults / resultsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const startIndex = (currentPage - 1) * resultsPerPage
    const endIndex = startIndex + resultsPerPage
    const paginatedResult = results.slice(startIndex, endIndex)


    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className='text-center mt-5'>Search Results</h5>
                    <Row>
                        {paginatedResult.map((room => (
                            <RoomCard room={room} key={room.id} />
                        )))}
                    </Row>
                    <Row>
                        {totalResults > resultsPerPage && (
                            <RoomPaginator currentPage={currentPage}
                                onPageChange={handlePageChange} totalPages={totalPages} />
                        )}
                        <Button variant='secondary' onClick={onClearSearch}>
                            Clear Search
                        </Button>
                    </Row>
                </>
            ) :
                <p>
                </p>
            }
        </>
    )
}

export default RoomSearchResults