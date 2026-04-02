'use client'

import { useMemo } from "react"

export default function OrderData(data, sortColumn, sortDirection, setSortColumn, setSortDirection) {
   
    
    const sortedData = useMemo(() => {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!sortColumn) return data
        return [...data].sort((a, b) => {
            const valueA = a[sortColumn]
            const valueB = b[sortColumn]

            
            if(regex.test(valueA)) {
                const toIso = d => d.split('/').reverse().join('-')
                return sortDirection === 'asc' ? new Date(toIso(valueA)) - new Date(toIso(valueB)) : new Date(toIso(valueB)) - new Date(toIso(valueA))
            }

            const numA = Number(valueA)
            const numB = Number(valueB)

            if (!isNaN(numA) && !isNaN(numB)) {
                return sortDirection === 'asc' ? numA - numB : numB - numA
            }

            if (typeof valueA === 'string') {
                return sortDirection === 'asc' ? (valueA ?? '').localeCompare(valueB ?? '') : (valueB ?? '').localeCompare(valueA ?? '')
            }

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