import React, {useEffect, useMemo, useState} from 'react';
import MaterialReactTable from 'material-react-table';
import {MenuItem} from '@mui/material';
import { Delete } from '@mui/icons-material';
import columnsDef from './columnsDef';
import addSubrows from "./addSubrows";
import {config} from "./URLconstans";

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
    }, []);

    const fetchData = async () => {
        if (!tableData.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }
        try {
            const response = await fetch(config.url + '/api/persons');
            const json = await response.json();
            addSubrows(json);
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

        values.id=row.id;

        try {
            const response = await fetch(config.url + `/api/person/` + row.id, {
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

        exitEditingMode();
    };

    const handleDepersonalization = async (row) => {
        try {
            const response = await fetch(config.url + `/api/depersonalization/` + row.id, {
                method: 'DELETE'
            });
        } catch (error) {
            setIsError(true);
            console.error(error);
            return;
        }
        setIsError(false);
        fetchData();
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={tableData}
            getRowId={(row) => row.id}
            editingMode="row"
            enableEditing
            enableExpanding
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
            renderRowActionMenuItems={({ row }) => {
                return [
                <MenuItem key="delete" onClick={() => handleDepersonalization(row)}>
                            <Delete/>
                    Depersonalization
                </MenuItem>
            ]}}
            state={{
                isLoading,
                showAlertBanner: isError,
                showProgressBars: isRefetching,
            }}
        />
    );
};

export default ListAndEdit;