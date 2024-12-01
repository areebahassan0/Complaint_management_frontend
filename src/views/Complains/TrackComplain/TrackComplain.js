import React, { useEffect, useState } from 'react';
import { getComplaintTrack } from '../../../services/history.service';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const TrackHistory = () => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState('All');
    const [dropdownVisible, setDropdownVisible] = useState({});
    const userId = 100000; // Replace with dynamic userId if needed

    useEffect(() => {
        fetchComplaintTrack();
    }, []);

    const fetchComplaintTrack = async () => {
        setLoading(true);
        try {
            const result = await getComplaintTrack(userId);
            if (result?.status) {
                const sortedData = result.data.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );

                const transformedData = sortedData.map((complaint, index) => ({
                    id: complaint.id || '-',
                    issueddate: new Date(complaint.created_at).toLocaleDateString() || '-',
                    predicteddate: complaint.expected_resolution_date
                        ? new Date(complaint.expected_resolution_date).toLocaleDateString()
                        : '-',
                    type: complaint.description || '-',
                    status: complaint.status || '-',
                }));
                setRows(transformedData);
            } else {
                toast.error(result.message || 'Failed to fetch complaints.');
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'An error occurred while fetching complaints.'
            );
        } finally {
            setLoading(false);
        }
    };

    // Filtered complaints based on selected filter
    const filteredComplaints = rows.filter((complaint) => {
        if (filter === 'All') return true;
        return complaint.status.toLowerCase() === filter.toLowerCase();
    });

    // Toggle dropdown visibility for specific rows
    const toggleDropdown = (id) => {
        setDropdownVisible((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Dynamic status styles
    const statusStyles = {
        Pending: { backgroundColor: '#ffc107', color: '#fff' },
        viewed: { backgroundColor: '#17a2b8', color: '#fff' },
    };

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
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Track Complaints</h1>
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
                {['All', 'Pending', 'viewed'].map((filterOption) => (
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
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
                <DataTable
                    columns={[
                        {
                            name: 'ID',
                            selector: (row) => row.id,
                        },
                        {
                            name: 'Issued Date',
                            selector: (row) => row.issueddate,
                        },
                        {
                            name: 'Predicted Date',
                            selector: (row) => row.predicteddate,
                        },
                        {
                            name: 'Type',
                            selector: (row) => row.type,
                        },
                        {
                            name: 'Status',
                            cell: (row) => (
                                <span
                                    style={{
                                        ...statusStyles[row.status],
                                        padding: '5px 10px',
                                        borderRadius: '15px',
                                        display: 'inline-block',
                                    }}
                                >
                                    {row.status}
                                </span>
                            ),
                        },
                        {
                            name: 'Action',
                            cell: (row) => (
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <span
                                        onClick={() => toggleDropdown(row.id)}
                                        style={{
                                            cursor: 'pointer',
                                            color: '#6c757d',
                                            fontSize: '20px',
                                            padding: '5px',
                                        }}
                                    >
                                        ...
                                    </span>
                                    {dropdownVisible[row.id] && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '25px',
                                                right: '0',
                                                background: '#fff',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                                borderRadius: '5px',
                                                zIndex: 1000,
                                                width: '150px',
                                                color: 'black',
                                            }}
                                        >
                                            <div
                                                onClick={() => alert(`Viewing complaint ID: ${row.id}`)}
                                                style={{
                                                    padding: '10px 15px',
                                                    cursor: 'pointer',
                                                    borderBottom: '1px solid #ddd',
                                                }}
                                            >
                                                View
                                            </div>
                                            <div
                                                onClick={() => alert(`Updating complaint ID: ${row.id}`)}
                                                style={{
                                                    padding: '10px 15px',
                                                    cursor: 'pointer',
                                                    borderBottom: '1px solid #ddd',
                                                }}
                                            >
                                                Update
                                            </div>
                                            <div
                                                onClick={() => alert(`Deleting complaint ID: ${row.id}`)}
                                                style={{
                                                    padding: '10px 15px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Delete
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ),
                        },
                    ]}
                    data={filteredComplaints}
                    progressPending={loading}
                    highlightOnHover
                    pagination
                />
            </div>
        </div>
    );
};

export default TrackHistory;

