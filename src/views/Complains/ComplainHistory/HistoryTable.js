import React, { useEffect, useState, useRef } from 'react';
import { getComplaintHistory } from '../../../services/history.service';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';


function HistoryTable() {
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const userId = 100000; // Replace with dynamic userId if needed

    useEffect(() => {
        console.log('Calling fetchComplaintHistory...');
        fetchComplaintHistory();
    }, [page, perPage]);

    
    const fetchComplaintHistory = async () => {
        // setLoading(true);
        console.log('Fetching complaint history...');
            await getComplaintHistory(userId).then((result) => {
                
            if (result?.status) {
                console.log('Processing complaint data...');
                
                if (result?.data) {
                    const startIndex = (page - 1) * perPage;
                    console.log('Result.data', result.data);
                    // Sort data based on creation date in descending order
                    const sortedData = result?.data.sort(
                        (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    );
                    
                    const rowData = result.data.map((complaint, index) => ({
                        serialNumber: startIndex + index + 1,
                        id: complaint.id || '-',
                        description: complaint.description || '-',
                        status: complaint.status || '-',
                        created_at: new Date(complaint.created_at).toLocaleString(),
                        expected_resolution_date: complaint.expected_resolution_date
                            ? new Date(complaint.expected_resolution_date).toLocaleString()
                            : '-',
                    }));
                    console.log('Transformed Data:', rowData);
                    setRows(rowData);
                    
                    // Update total rows based on data length
                }
            } else {
                toast.error(result.message || 'Failed to fetch complaints history.');
            }
        }).catch((error) => {
            toast.error(
                error.response?.data?.message || 'An error occurred while fetching data.'
            );
        });
    }


    const columns = [
        
        {
            id: 'serial_number',
            name: 'S.No',
            center: true,
            selector: rowData => rowData.serialNumber,
        },
        {
            id: 'id',
            name: 'Complaint ID',
            selector: rowData => rowData.id,
        },
        {
            id: 'description',
            name: 'Description',
            selector: rowData => rowData.description,
        },
        {
            id: 'status',
            name: 'Status',
            selector: rowData => rowData.status,
        },
        {
            id: 'created_at',
            name: 'Created At',
            center: true,
            selector: rowData => rowData.created_at,
        },
        {
            id: 'expected_resolution_date',
            name: 'Expected Resolution Date',
            center: true,
            selector: rowData => rowData.expected_resolution_date,
        },
    ];

    return (
        <div className="history-table">
            <h1>Complaint History</h1>
            <DataTable
                pagination
                columns={columns}
                data={rows}
                progressPending={loading}
                highlightOnHover
                paginationServer
                paginationTotalRows={totalRows}
                paginationPerPage={perPage}
                onChangePage={(page) => setPage(page)}
                onChangeRowsPerPage={(currentRowsPerPage) => setPerPage(currentRowsPerPage)}
            />
        </div>
    );
}

export default HistoryTable;

