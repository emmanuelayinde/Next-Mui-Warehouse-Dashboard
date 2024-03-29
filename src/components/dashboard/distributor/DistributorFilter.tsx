import type { FC } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Tab, Tabs } from '@mui/material';
import { Adjustments as AdjustmentsIcon } from '../../../icons/adjustments';
import type { Filter } from '../../../types/filter';
import {
    containsOperator,
    endsWithOperator,
    equalOperator,
    greaterThanOperator,
    isAfterOperator,
    isBeforeOperator,
    isBlankOperator,
    isPresentOperator,
    lessThanOperator,
    notContainsOperator,
    notEqualOperator,
    startsWithOperator
} from '../../../utils/filter-operators';
import { BulkActionsMenu } from '../../bulk-actions-menu';
import { FilterDialog } from '../../filter-dialog';
import { Query } from '../../query';

interface DistributorsFilterProps {
    disabled: boolean;
    filters: Array<{ property: string; value: string; operator: string }>;
    onFiltersApply: (newFilters: Filter[]) => void;
    onFiltersClear: () => void;
    onQueryChange: (newQuery: string) => void;
    onViewChange: (newView: string) => void;
    query: string;
    selectedDistrubutors: string[];
    view: string;
}

const views = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'Published',
        value: 'published'
    },
    {
        label: 'Draft',
        value: 'draft'
    },
    {
        label: 'Archived',
        value: 'archived'
    }
];

const filterProperties = [
    {
        label: 'Name',
        name: 'name',
        type: 'string'
    },
    {
        label: 'Updated At',
        name: 'updatedAt',
        type: 'date'
    },
    {
        label: 'Status',
        name: 'status',
        type: 'string'
    }
];

const filterOperators = [
    equalOperator,
    notEqualOperator,
    containsOperator,
    notContainsOperator,
    startsWithOperator,
    endsWithOperator,
    greaterThanOperator,
    lessThanOperator,
    isAfterOperator,
    isBeforeOperator,
    isBlankOperator,
    isPresentOperator
];

export const DistributorsFilter: FC<DistributorsFilterProps> = (props) => {
    const {
        disabled,
        filters,
        onFiltersApply,
        onFiltersClear,
        onQueryChange,
        onViewChange,
        query,
        selectedDistrubutors,
        view
    } = props;
    const [openFilterDialog, setOpenFilterDialog] = useState(false);

    return (
        <>
            <div>
                <Box
                    sx={{
                        px: {
                            sm: 3
                        }
                    }}
                >
                    <Tabs
                        onChange={(event, value) => onViewChange?.(value)}
                        allowScrollButtonsMobile
                        value={view}
                        variant="scrollable"
                    >
                        {views.map((option) => (
                            <Tab
                                disabled={disabled}
                                key={option.label}
                                label={option.label}
                                value={option.value}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Divider />
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: {
                            sm: selectedDistrubutors.length > 0 ? 'auto 1fr auto' : '1fr auto',
                            xs: 'auto'
                        },
                        justifyItems: 'flex-start',
                        p: 3
                    }}
                >
                    <BulkActionsMenu
                        disabled={disabled}
                        onArchive={() => { }}
                        onDelete={() => { }}
                        selectedCount={selectedDistrubutors.length}
                        sx={{
                            display: selectedDistrubutors.length > 0 ? 'flex' : 'none',
                            order: {
                                sm: 1,
                                xs: 2
                            }
                        }}
                    />
                    <Query
                        disabled={disabled}
                        onChange={onQueryChange}
                        sx={{
                            order: {
                                sm: 2,
                                xs: 1
                            }
                        }}
                        value={query}
                    />
                    <Button
                        color="primary"
                        disabled={disabled}
                        onClick={() => setOpenFilterDialog(true)}
                        startIcon={<AdjustmentsIcon />}
                        size="large"
                        sx={{ order: 3 }}
                        variant={filters.length ? 'contained' : 'text'}
                    >
                        Filter
                    </Button>
                </Box>
            </div>
            <FilterDialog
                onApply={onFiltersApply}
                onClear={onFiltersClear}
                onClose={() => setOpenFilterDialog(false)}
                open={openFilterDialog}
                operators={filterOperators}
                properties={filterProperties}
            />
        </>
    );
};

DistributorsFilter.defaultProps = {
  filters: [],
  selectedDistrubutors: [],
  view: 'all'
};

DistributorsFilter.propTypes = {
  disabled: PropTypes.bool,
  filters: PropTypes.array,
  onFiltersApply: PropTypes.func,
  onFiltersClear: PropTypes.func,
  onQueryChange: PropTypes.func,
  onViewChange: PropTypes.func,
  query: PropTypes.string,
  selectedDistrubutors: PropTypes.array,
  view: PropTypes.string
};
