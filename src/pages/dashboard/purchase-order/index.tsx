import type { MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import type { Filter } from '../../../types/filter';
import { orderApi } from '../../../api/order';
import { OrdersDnd } from '../../../components/dashboard/order/orders-dnd';
import { OrdersFilter } from '../../../components/dashboard/order/orders-filter';
import { OrdersTable } from '../../../components/dashboard/order/orders-table';
import type { Order } from '../../../types/order';
import { useMounted } from '../../../hooks/use-mounted';
import { useSelection } from '../../../hooks/use-selection';
import { Plus as PlusIcon } from '../../../icons/plus';
import { Scrollbar } from 'src/components/scrollbar';
import CreatePurchaseOrder from '../../../components/dashboard/purchase-order/CreatePurchaseOrder'
import PurchaseOrderSummary from '../../../components/dashboard/purchase-order/PurchaseOrderSummary'
import AcceptPurchaseOrder from 'src/components/dashboard/purchase-order/AcceptPurchaseOrder';

interface OrdersState {
    data?: {
        orders: Order[],
        ordersCount: number
    };
    error?: string;
    isLoading: boolean;
}

interface Controller {
    filters: Array<{ property: string; value: string; operator: string }>;
    page: number;
    query: string;
    sort: 'asc' | 'desc';
    sortBy: string;
    view: string;
}

const PurchaseOrder: NextPage = () => {
    const isMounted = useMounted();
    const [controller, setController] = useState<Controller>({
        filters: [],
        page: 0,
        query: '',
        sort: 'desc',
        sortBy: 'createdAt',
        view: 'all'
    });
    const [ordersState, setOrdersState] = useState<OrdersState>({ isLoading: true });
    const [
        selectedOrders,
        handleSelect,
        handleSelectAll
    ] = useSelection(ordersState.data?.orders);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>();
    const [openAcceptDialog, setOpenAcceptDialog] = useState<boolean>();
    const [mode, setMode] = useState('dnd');

    const getOrders = useCallback(async () => {
        setOrdersState(() => ({ isLoading: true }));

        try {
            const result = await orderApi.getOrders({
                filters: controller.filters,
                page: controller.page,
                query: controller.query,
                sort: controller.sort,
                sortBy: controller.sortBy,
                view: controller.view
            });

            if (isMounted()) {
                setOrdersState(() => ({
                    isLoading: false,
                    data: result
                }));
            }
        } catch (err) {
            console.error(err);

            if (isMounted()) {
                setOrdersState(() => ({
                    isLoading: false,
                    error: err.message
                }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controller]);

    useEffect(() => {
        getOrders().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controller]);


    const handleViewChange = (newView: string): void => {
        setController({
            ...controller,
            page: 0,
            view: newView
        });
    };

    const handleQueryChange = (newQuery: string): void => {
        setController({
            ...controller,
            page: 0,
            query: newQuery
        });
    };

    const handleFiltersApply = (newFilters: Filter[]): void => {
        const parsedFilters = newFilters.map((filter) => ({
            property: filter.property.name,
            value: filter.value,
            operator: filter.operator.value
        }));

        setController({
            ...controller,
            page: 0,
            filters: parsedFilters
        });
    };

    const handleFiltersClear = (): void => {
        setController({
            ...controller,
            page: 0,
            filters: []
        });
    };

    const handlePageChange = (newPage: number): void => {
        setController({
            ...controller,
            page: newPage - 1
        });
    };

    const handleSortChange = (event: MouseEvent<HTMLElement>, property: string): void => {
        const isAsc = controller.sortBy === property && controller.sort === 'asc';

        setController({
            ...controller,
            page: 0,
            sort: isAsc ? 'desc' : 'asc',
            sortBy: property
        });
    };

    const handleModeChange = (event: MouseEvent<HTMLElement>, newMode: string): void => {
        if (newMode) {
            setMode(newMode);
        }
    };

    return (
        <>
            <Head>
                <title>
                    Purchase Order: List | Dashboard
                </title>
            </Head>
            <Box sx={{ flexGrow: 1 }}>
                <Container
                    maxWidth="xl"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <Box sx={{ py: 4 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Purchase Order Page
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button
                                color="primary"
                                onClick={() => setOpenAcceptDialog(true)}
                                startIcon={<PlusIcon fontSize="small" />}
                                variant="contained"
                                size="large"
                            
                            >
                                Accept PO
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => setOpenCreateDialog(true)}
                                startIcon={<PlusIcon fontSize="small" />}
                                variant="contained"
                                size="large"
                                sx={{ml: 4}}
                            >
                                Add New Order
                            </Button>
                        </Box>
                    </Box>
                    <PurchaseOrderSummary />
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1
                        }}
                    >
                        <OrdersFilter
                            disabled={ordersState.isLoading}
                            filters={controller.filters}
                            mode={mode}
                            onFiltersApply={handleFiltersApply}
                            onFiltersClear={handleFiltersClear}
                            onModeChange={handleModeChange}
                            onQueryChange={handleQueryChange}
                            onViewChange={handleViewChange}
                            query={controller.query}
                            selectedOrders={selectedOrders}
                            view={controller.view}
                        />

                        {
                            mode === 'table'
                                ? (
                                    <OrdersTable
                                        error={ordersState.error}
                                        isLoading={ordersState.isLoading}
                                        onPageChange={handlePageChange}
                                        onSelect={handleSelect}
                                        onSelectAll={handleSelectAll}
                                        onSortChange={handleSortChange}
                                        orders={ordersState.data?.orders}
                                        ordersCount={ordersState.data?.ordersCount}
                                        page={controller.page + 1}
                                        selectedOrders={selectedOrders}
                                        sort={controller.sort}
                                        sortBy={controller.sortBy}
                                    />
                                )
                                : (
                                    <OrdersDnd
                                        error={ordersState.error}
                                        isLoading={ordersState.isLoading}
                                        orders={ordersState.data?.orders}
                                    />
                                )
                        }
                    </Card>
                </Container>
            </Box>

            <CreatePurchaseOrder
                onClose={() => setOpenCreateDialog(false)}
                open={openCreateDialog}
            />
            <AcceptPurchaseOrder
                onClose={() => setOpenAcceptDialog(false)}
                open={openAcceptDialog}
            />
        </>
    );
};


export default PurchaseOrder;
