import React, { useEffect, useState } from 'react';
import { getComplaintHistory } from '../../../services/history.service';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

function HistoryTable() {
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState('All');
    const [dropdownVisible, setDropdownVisible] = useState({});

    useEffect(() => {
        fetchComplaintHistory();
    }, [page, perPage]);

    const fetchComplaintHistory = async () => {
        setLoading(true);
        try {
            const result = await getComplaintHistory();
            if (result?.status) {
                const startIndex = (page - 1) * perPage;
                const sortedData = result?.data.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );

                const rowData = sortedData.map((complaint, index) => ({
                    serialNumber: startIndex + index + 1,
                    id: complaint.id || '-',
                    description: complaint.description || '-',
                    status: complaint.status || '-',
                    created_at: new Date(complaint.created_at).toLocaleString(),
                    expected_resolution_date: complaint.expected_resolution_date
                        ? new Date(complaint.expected_resolution_date).toLocaleString()
                        : '-',
                    further_subcategory_name:complaint.further_subcategory_name
                }));

                setRows(rowData);
                setTotalRows(result?.data.length);
            } else {
                toast.error(result.message || 'Failed to fetch complaints history.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };
    const filteredComplaints = rows.filter((complaint) => {
        if (filter === 'All') return true;
        return complaint.status.toLowerCase() === filter.toLowerCase();
    });
    const toggleDropdown = (id) => {
        setDropdownVisible((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    // Dynamic status styles
    const statusStyles = {
        pending: { backgroundColor: '#ffc107', color: '#fff' },
        viewed: { backgroundColor: '#17a2b8', color: '#fff' },
        resolved: { backgroundColor: '#28a745', color: '#fff' },
    };
    const columns = [
        {
            id: 'serial_number',
            name: 'S.No',
            center: true,
            selector: rowData => rowData.serialNumber,
        },
        {
            id: 'id',
            name: 'Track ID',
            width:'100px',
            selector: rowData => rowData.id,
        },
        {
            id: 'Category',
            name: 'Category',
            selector: rowData => rowData.further_subcategory_name,
        },
        {
            id: 'description',
            name: 'Description',
            selector: rowData => rowData.description,
        },
        {
            id: 'created_at',
            name: 'Issued Date',
            center: true,
            selector: rowData => rowData.created_at,
        },
        {
            id: 'expected_resolution_date',
            name: 'Predicted Date',
            center: true,
            selector: rowData => rowData.expected_resolution_date,
        },
        {
            id: 'status',
            name: 'Status',
            cell: (rows) => {
                const getStatusStyle = (status) => {
                    switch (status.toLowerCase()) {
                        case 'pending':
                            return { backgroundColor: '#ffc107', color: '#fff' };
                        case 'viewed':
                            return { backgroundColor: '#17a2b8', color: '#fff' };
                        case 'resolved':
                            return { backgroundColor: '#28a745', color: '#fff' };
                        case 'rejected':
                            return { backgroundColor: '#dc3545', color: '#fff' };
                        default:
                            return { backgroundColor: '#6c757d', color: '#fff' };
                    }
                };

                return (
                    <span
                        style={{
                            ...statusStyles[rows.status],
                            padding: '5px 10px',
                            borderRadius: '15px',
                            display: 'inline-block',
                        }}
                    >
                        {rows.status}
                    </span>
        );
            },
        },
        
    ];

    return (
        <div>
        {/* Header */}
        <div
            style={{
                background: 'linear-gradient(45deg, #eecaca, #e3d0d000)',
                padding: '20px',
                color: 'black',
                marginBottom: '20px',
            }}
        >
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Complaints History</h1>
        </div>
            {/* Filter Buttons */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    paddingBottom: '10px',
                    marginBottom: '20px',
                    backgroundColor: '#f8f9fa',
                }}
            >
                {['All', 'Pending', 'Viewed','Resolved'].map((filterOption) => (
                    <div
                        key={filterOption}
                        onClick={() => setFilter(filterOption)}
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '10px 0',
                            cursor: 'pointer',
                            backgroundColor:
                                filter === filterOption ? 'rgb(166 149 192)' : 'transparent',
                            color: filter === filterOption ? '#fff' : '#000',
                            transition: '0.3s',
                        }}
                    >
                        {filterOption}
                    </div>
                ))}
            </div>
            {/* Table */}
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px' }}>
                <DataTable
                    pagination
                    columns={columns}
                    data={filteredComplaints}
                    progressPending={loading}
                    highlightOnHover
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationPerPage={perPage}
                    onChangePage={(page) => setPage(page)}
                    onChangeRowsPerPage={(currentRowsPerPage) => setPerPage(currentRowsPerPage)}
                />
            </div>
        </div>
    );
}

export default HistoryTable;
