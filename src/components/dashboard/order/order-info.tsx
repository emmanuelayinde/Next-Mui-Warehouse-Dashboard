import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Card, CardHeader, Divider, Grid } from '@mui/material';
import type { Order } from '../../../types/order';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

interface OrderInfoProps {
  onEdit: () => void;
  order: Order;
}

const statusVariants = [
  {
    label: 'Placed',
    value: 'placed'
  },
  {
    label: 'Processed',
    value: 'processed'
  },
  {
    label: 'Delivered',
    value: 'delivered'
  },
  {
    label: 'Complete',
    value: 'complete'
  }
];

export const OrderInfo: FC<OrderInfoProps> = (props) => {
  const { order, onEdit, ...other } = props;
  const statusVariant = statusVariants.find((variant) => variant.value === order.status);

  return (
    <Card {...other}>
      <CardHeader
        action={(
          <Button
            color="primary"
            onClick={onEdit}
            variant="text"
          >
            Edit
          </Button>
        )}
        title="Order Info"
      />
      <Divider />
      <Box
        sx={{
          px: 3,
          py: 1.5
        }}
      >
        <Avatar
          sx={{
            height: 64,
            width: 64
          }}
          variant="rounded"
        >
          {`${order.customer.firstName[0]} ${order.customer.lastName[0]}`}
        </Avatar>
      </Box>
      <Grid container>
        <Grid
          item
          sm={6}
          xs={12}
        >
          <PropertyList>
            <PropertyListItem
              label="CustomerLayout Name"
              value={`${order.customer.firstName} ${order.customer.lastName}`}
            />
            <PropertyListItem
              label="Email Address"
              value={order.customer.email}
            />
            <PropertyListItem
              label="Phone Number"
              value={order.customer.phone}
            />
          </PropertyList>
        </Grid>
        <Grid
          item
          sm={6}
          xs={12}
        >
          <PropertyList>
            <PropertyListItem
              label="Status"
              value={statusVariant.label}
            />
            <PropertyListItem
              label="Address"
              value={order.customer.address}
            />
            <PropertyListItem
              label="Country"
              value={order.customer.country}
            />
          </PropertyList>
        </Grid>
      </Grid>
    </Card>
  );
};

OrderInfo.propTypes = {
  onEdit: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object.isRequired
};
