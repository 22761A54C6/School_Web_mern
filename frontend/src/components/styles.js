import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

const drawerWidth = 240

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#550080',
        color: theme.palette.common.white,
        fontWeight: 700,
        fontSize: '14px',
        borderBottom: '2px solid #7f56da',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: '#2c3e50',
        borderBottom: '1px solid #e9ecef',
        padding: '16px 8px',
        fontWeight: 500,
    },
    '&:first-of-type': {
        borderLeft: 'none',
    },
    '&:last-of-type': {
        borderRight: 'none',
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(127, 86, 218, 0.02)',
    },
    '&:nth-of-type(even)': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    '&:hover': {
        backgroundColor: 'rgba(127, 86, 218, 0.08)',
        transition: 'background-color 0.2s ease',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:first-of-type': {
        borderTop: 'none',
    },
}));

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(135deg, #7f56da 0%, #6d35a7 100%)',
    boxShadow: '0 4px 20px rgba(127, 86, 218, 0.2)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
            borderRight: '1px solid rgba(127, 86, 218, 0.1)',
            boxShadow: '2px 0 8px rgba(127, 86, 218, 0.1)',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);