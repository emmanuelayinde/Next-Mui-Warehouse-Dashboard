import type { FC } from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import type { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { Card } from '@mui/material';
import type { Order } from '../../../types/order';
import { OrderDroppable } from './order-dropable';
import { Scrollbar } from '../../scrollbar';


interface OrdersDndProps {
  error: string;
  isLoading: boolean;
  orders: Order[];
}

const statusVariants = [
  {
    badgeColor: 'info.main',
    label: 'Placed',
    value: 'placed'
  },
  {
    badgeColor: 'error.main',
    label: 'Processed',
    value: 'processed'
  },
  {
    badgeColor: 'warning.main',
    label: 'Delivered',
    value: 'delivered'
  }
];

const getColumns = (orders: Order[]) => {
  const columns = {};

  statusVariants.forEach((variant) => {
    columns[variant.value] = orders.filter((order) => order.status === variant.value);
  });

  return columns;
};

const reorder = (source, startIndex: number, endIndex: number) => {
  const result = [...source];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source,
  destination,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = [...source];
  const destClone = [...destination];

  const [removed] = sourceClone.splice(droppableSource.index, 1);
  removed.status = droppableDestination.droppableId;
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const OrdersDnd: FC<OrdersDndProps> = (props) => {
  const { error, isLoading, orders, ...other } = props;
  const [columns, setColumns] = useState(null);

  // NOTE: This event should make a server request,
  //  update the order document with the new status on the server, then update the order data
  //  on client side
  const handleDragEnd = ({ source, destination }: DropResult): void => {
    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    if (sourceId === destinationId) {
      const items = reorder(columns[sourceId], source.index, destination.index);
      const newState = { ...columns };
      newState[sourceId] = items;
      setColumns(newState);
    } else {
      const result = move(columns[sourceId], columns[destinationId], source, destination);
      const newState = { ...columns };
      newState[sourceId] = result[sourceId];
      newState[destinationId] = result[destinationId];
      setColumns(newState);
    }
  };

  useEffect(() => {
    setColumns(getColumns(orders));
  }, [orders]);

  if (!columns) {
    return null;
  }

  return (
    <Card
    sx={{
      backgroundColor: (theme) => theme.palette.mode == 'light' ? 'neutral.50' : 'neutral.900',
      display: 'flex',
      flexGrow: 1,
      mb: 2,
      mx: 2,
      overflow: 'auto'
      }}
      {...other}
      >
      <DragDropContext onDragEnd={handleDragEnd}>
       
        {statusVariants.map((option) => (
          <OrderDroppable
            badgeColor={option.badgeColor}
            id={option.value}
            orders={columns[option.value]}
            title={option.label}
            key={option.value}
          />
        ))}
      </DragDropContext>
    </Card>
  );
};

OrdersDnd.defaultProps = {
  orders: []
};

OrdersDnd.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  orders: PropTypes.array
};
