// hooks/useOverviewFilter.js
import { useState, useMemo } from 'react';

export const useOverviewFilter = ({
  data = [],
  searchFields = ['name'], // Fields to search in
  statusField = 'status', // Field that contains status
  itemsPerPage = 5,
  statusOptions = []
}) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');

  // Calculate stats based on data
  const stats = useMemo(() => {
    const total = data.length;
    
    // Count by each status
    const statusCounts = statusOptions.reduce((acc, status) => {
      acc[status] = data.filter(item => item[statusField] === status).length;
      return acc;
    }, {});

    return [
      {
        title: "Total",
        number: total,
        subtitle: `Total items`,
        filterValue: 'all'
      },
      ...statusOptions.map(status => ({
        title: status,
        number: statusCounts[status] || 0,
        subtitle: `${status} items`,
        filterValue: status
      }))
    ];
  }, [data, statusOptions, statusField]);

  // Filter data based on search and status
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search logic - check multiple fields
      const matchesSearch = searchFields.some(field => {
        const fieldValue = item[field];
        return fieldValue && fieldValue.toString().toLowerCase().includes(search.toLowerCase());
      });
      
      // Status filter logic
      const matchesStatus = activeFilter === 'all' || item[statusField] === activeFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [data, search, activeFilter, searchFields, statusField]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setActiveFilter(status);
    setCurrentPage(1);
  };

  const handleOverviewCardClick = (filterValue) => {
    setActiveFilter(filterValue);
    setCurrentPage(1);
    
    // Scroll to table
    setTimeout(() => {
      const tableElement = document.querySelector('.filtered-table');
      if (tableElement) {
        tableElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const resetFilters = () => {
    setSearch("");
    setActiveFilter('all');
    setCurrentPage(1);
  };

  return {
    // State
    search,
    currentPage,
    activeFilter,
    
    // Computed data
    stats,
    filteredData,
    paginatedData,
    totalPages,
    
    // Handlers
    handleSearchChange,
    handleStatusChange,
    handleOverviewCardClick,
    setCurrentPage,
    resetFilters
  };
};