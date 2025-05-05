import React, { useState } from 'react';
import styled from 'styled-components';
import { CardsContainerPaginator } from './paginadorStyled';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  margin: 0 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  background-color: ${({ active }) => (active ? '#007bff' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  cursor: pointer;
  border-radius: 4px;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Paginator = ({ items, renderItem, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  

  if (!items || items.length <= itemsPerPage) {
    return (
      <>
        {items && items.map((item, index) => (
          <div key={index}>
            {renderItem(item)}
          </div>
        ))}
      </>
    );
  }
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <CardsContainerPaginator>
      {currentItems.map((item, index) => (
        <div key={startIndex + index}>
          {renderItem(item)}
        </div>
      ))}
        
    </CardsContainerPaginator>
      <PaginationContainer>
        <PageButton 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </PageButton>
        {[...Array(totalPages)].map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <PageButton 
              key={pageNumber} 
              active={pageNumber === currentPage} 
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </PageButton>
          );
        })}
        <PageButton 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </PageButton>
      </PaginationContainer>
    </>
  );
};

export default Paginator;