import React from "react";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

const DataTable = ({ rows, columns }) => {
    const theme = useTheme(getTheme());
    return (
        <CompactTable columns={columns} data={{ nodes: rows }} theme={theme} />
    );
};

export default DataTable;