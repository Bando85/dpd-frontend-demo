import React, {useEffect, useMemo, useState} from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import columnsDef from './columnsDef';

const ListAndEdit = () => {

    const columns = useMemo(
        () => columnsDef, [],
    );

    //data and fetching state
    const [tableData, setTableData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        if (!tableData.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }
        try {
            const response = await fetch('/api/persons');
            const json = await response.json();
            setTableData(json);
            setRowCount(json.length);
        } catch (error) {
            setIsError(true);
            console.error(error);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
    };

    const handleSaveRow = async ({exitEditingMode, row, values}) => {
        //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
        values.id=row.id;

        try {
            const response = await fetch(`/api/person/` + row.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
        } catch (error) {
            setIsError(true);
            console.error(error);
            return;
        }
        setIsError(false);

        fetchData();

        exitEditingMode(); //required to exit editing mode
    };

    const handleDepersonalization = async (row) => {
        try {
            const response = await fetch(`/api/depersonalization/` + row.id, {
                method: 'DELETE'
            });
        } catch (error) {
            setIsError(true);
            console.error(error);
            return;
        }
        setIsError(false);
        fetchData();//required to exit editing mode
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={tableData}
            getRowId={(row) => row.id}
            editingMode="row"
            enableEditing
            onEditingRowSave={handleSaveRow}
            muiToolbarAlertBannerProps={
                isError
                    ? {
                        color: 'error',
                        children: 'Error loading data',
                    }
                    : undefined
            }
            rowCount={rowCount}
            enableRowActions
            renderRowActionMenuItems={({ row }) => [
                <MenuItem key="delete" onClick={() => handleDepersonalization(row)}>
                            <Delete/>
                    Depersonalization
                </MenuItem>
            ]}
            state={{
                isLoading,
                showAlertBanner: isError,
                showProgressBars: isRefetching,
            }}
        />
    );
};

export default ListAndEdit;