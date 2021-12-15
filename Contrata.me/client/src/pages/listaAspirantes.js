import React from "react";
import "../css/listaAspirantes.css";
import { useGlobalContext } from "../controller/context";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import LeftBarEmpresa from "../components/LeftBarEmpresa";
import HeaderEmpresa from "../components/HeaderEmpresa";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { setItem } from "../util/Storage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

let data = [];

function ListaAspirantes() {
    const [flag, setFlag] = React.useState(false);
    React.useEffect(() => {

    }, [flag])
    const { handleEstudiantesList } = useGlobalContext();
    const aspirantes = async () => {
        let h = await handleEstudiantesList()
        console.log(h)
        h.forEach(element => {

            data.push(element);

        });
        setFlag(!flag)
    }
    if (!flag) {

        aspirantes();
    }

    return (
        <section className='listaAspirantes'>
            <LeftBarEmpresa />
            <div className='la-information'>
                <HeaderEmpresa />
                <div className='form-ladata'>
                    <label className='neg-text tam-tit'>Aspirantes</label>
                    <br />
                    <label className='la-text'>No. Aspirantes: # {data.length}</label>
                    <div className='la-tabla'>
                        <Tabla />
                    </div>
                </div>
            </div>
        </section>
    );
}

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label='first page'>
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label='previous page'>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='next page'>
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='last page'>
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}


const Tabla = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell width="150" align='center'>Nombre </StyledTableCell>
                        <StyledTableCell width="50" align='center'>Edad</StyledTableCell>
                        <StyledTableCell width="200" align='center'>Semestre</StyledTableCell>
                        <StyledTableCell width="150" align='center'>Correo</StyledTableCell>
                        <StyledTableCell width="150" align='center'>Telefono</StyledTableCell>
                        <StyledTableCell width="150" align='center'>Sexo</StyledTableCell>
                        <StyledTableCell width="150" align='center'></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component='th' scope='row' align='center'>
                                {row.nombre}
                            </StyledTableCell>
                            <StyledTableCell align='center'>{row.id}</StyledTableCell>
                            <StyledTableCell align='center'>{row.semestre}</StyledTableCell>
                            <StyledTableCell align='center'>{row.email}</StyledTableCell>
                            <StyledTableCell align='center'>{row.telefono}</StyledTableCell>
                            <StyledTableCell align='center'>{row.sexo}</StyledTableCell>
                            <StyledTableCell align='center'>
                                <Button>
                                    <Link to={{pathname:'/aspiranteVO'}} onClick={()=>{setItem('aspiranteID',row.uid)}}>
                                        Ver más
                                    </Link>

                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                            colSpan={3}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    "aria-label": "rows per page",
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}


export default ListaAspirantes;