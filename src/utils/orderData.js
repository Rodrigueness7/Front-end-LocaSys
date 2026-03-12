'use client'

import { useMemo } from "react"

export default function OrderData(data, sortColumn, sortDirection, setSortColumn, setSortDirection) {
    const regexDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;
    
    const sortedData = useMemo(() => {
        if (!sortColumn) return data
        return [...data].sort((a, b) => {
            const valueA = a[sortColumn]
            const valueB = b[sortColumn]

            
            if (typeof valueA === 'string') {
                return sortDirection === 'asc' ? (valueA ?? '').localeCompare(valueB ?? '') : (valueB ?? '').localeCompare(valueA ?? '')
            }


            if(typeof valueA === '')
            return sortDirection === 'asc' ? valueA - valueB : valueB - valueA
        })
    }, [data, sortColumn, sortDirection])
    
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')   
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    return { sortedData, handleSort, sortColumn, sortDirection }
    
}