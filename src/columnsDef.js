const columnsDef = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'birth',
        header: 'Day of birth',
    },
    {
        accessorKey: 'mother',
        header: 'Mother name',
    },
    {
        accessorKey: 'taj',
        header: 'TAJ Id',
    },
    {
        accessorKey: 'tax',
        header: 'TAX id',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'address',
        header: 'Address',
        Cell: ({ cell }) => <>{
            cell.getValue() ? (cell.getValue().split(";") ? cell.getValue().split(";")[0] : cell.getValue()) : ''
        }</> ,
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
        Cell: ({ cell }) => <>{
            cell.getValue() ? (cell.getValue().split(";") ? cell.getValue().split(";")[0] : cell.getValue()) : ''
        }</> ,
    },
];

export default columnsDef;
