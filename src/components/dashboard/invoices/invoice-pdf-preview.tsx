import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Box, Card, Paper, Typography } from '@mui/material';
import type { Invoice } from '../../../types/invoice';
import { InvoiceTable } from './invoice-table';

interface InvoicePreviewPdfProps {
  invoice: Invoice;
}

export const InvoicePdfPreview: FC<InvoicePreviewPdfProps> = (props) => {
  const { invoice } = props;

  return (
    <Paper
      elevation={24}
      sx={{ p: 3 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          color="textPrimary"
          variant="h4"
        >
          #
          {invoice.id}
        </Typography>
        <Typography
          align="right"
          color="error.main"
          sx={{ textTransform: 'uppercase' }}
          variant="h4"
        >
          {invoice.status}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          // flexDirection: 'row',
          mt: 2
        }}
      >
        <Box
          sx={{
            textAlign: {
              md: 'right',
              xs: 'left'
            }
          }}
        >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="subtitle2"
          >
            Invoice to
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Acme LTD GB54423345
            <br />
            340 Lemon St. #5554
            <br />
            Spring Valley, California
            <br />
            United States
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: {
              md: 'right',
              xs: 'left'
            }
          }}
        >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="subtitle2"
            sx={{
              textAlign: 'right'
            }}
          >
            Invoice for
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
            sx={{
              textAlign: 'right'
              
            }}
          >
            Natalie Rusell
            <br />
            3845 Salty Street
            <br />
            Salt Lake City
            <br />
            United States
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 6
        }}
      >
        <Box>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="subtitle2"
          >
            Invoice Date
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {format(invoice.issueDate, 'dd MMM yyyy')}
          </Typography>
        </Box>
        <Box>
          <Typography
            align="right"
            color="textPrimary"
            gutterBottom
            variant="subtitle2"
          >
            Due Date
          </Typography>
          <Typography
            align="right"
            color="textSecondary"
            variant="body2"
          >
            {format(invoice.dueDate, 'dd MMM yyyy')}
          </Typography>
        </Box>
      </Box>
      <Card sx={{ my: 4.5 }}>
        <InvoiceTable invoice={invoice} />
      </Card>
      <Typography
        color="textPrimary"
        gutterBottom
        variant="subtitle2"
      >
        Notes
      </Typography>
      <Typography
        color="textsecondary"
        variant="body2"
      >
        “
        {invoice.note}
        ”
      </Typography>
    </Paper>
  );
};

InvoicePdfPreview.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};
