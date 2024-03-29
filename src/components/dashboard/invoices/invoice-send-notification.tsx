import type { FC } from 'react';
import { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, Card, CardContent, CardHeader, Divider, MenuItem } from '@mui/material';
import { useDialog } from '../../../hooks/use-dialog';
import { Cash as CashIcon } from '../../../icons/cash';
import { Download as DownloadIcon } from '../../../icons/download';
import { Duplicate as DuplicateIcon } from '../../../icons/duplicate';
import { Eye as EyeIcon } from '../../../icons/eye';
import { Mail as MailIcon } from '../../../icons/mail';
import { Trash as TrashIcon } from '../../../icons/trash';
import type { Invoice } from '../../../types/invoice';
import { ActionList } from '../../action-list';
import { ActionListItem } from '../../action-list-item';
import { ConfirmationDialog } from '../../confirmation-dialog';
import { InputField } from '../../input-field';
import { InvoicePDF } from './invoice-pdf';

interface InvoiceSendNotificationProps {
  invoice: Invoice;
}

const notificationOptions = [
  {
    label: 'Invoice created',
    value: 'invoiceCreated'
  },
  {
    label: 'Payment received',
    value: 'paymentConfirmation'
  }
];

export const InvoiceSendNotification: FC<InvoiceSendNotificationProps> = (props) => {
  const { invoice } = props;
  const router = useRouter();
  const [markDialogOpen, handleOpenMarkDialog, handleCloseMarkDialog] = useDialog();
  const [duplicateDialogOpen, handleOpenDuplicateDialog, handleCloseDuplicateDialog] = useDialog();
  const [deleteDialogOpen, handleOpenDeleteDialog, handleCloseDeleteDialog] = useDialog();
  const [notification, setNotification] = useState<string>(notificationOptions[0].value);

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNotification(event.target.value);
  };

  const handleSendNotification = (): void => {
    setNotification(notification);
    toast.success('Notification sent');
  };

  const handleMark = (): void => {
    handleCloseMarkDialog();
    toast.error('This action is not available on demo');
  };

  const handleDuplicate = (): void => {
    handleCloseDuplicateDialog();
    toast.error('This action is not available on demo');
  };

  const handleDelete = (): void => {
    handleCloseDeleteDialog();
    toast.error('This action is not available on demo');
  };

  return (
    <>
      <Card {...props}>
        <CardHeader title="Send Notification" />
        <Divider />
        <CardContent>
          <InputField
            fullWidth
            onChange={handleStatusChange}
            select
            value={notification}
          >
            {notificationOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </InputField>
          <Button
            color="primary"
            onClick={handleSendNotification}
            startIcon={<MailIcon />}
            sx={{ mt: 2 }}
            variant="outlined"
          >
            Send Email
          </Button>
        </CardContent>
        <Divider />
        <ActionList>
          <ActionListItem
            icon={EyeIcon}
            label="Preview"
            onClick={() => router.push('/dashboard/invoices/1/preview')}
          />
          <ActionListItem
            icon={CashIcon}
            label="Mark Paid"
            onClick={handleOpenMarkDialog}
          />
          <ActionListItem
            icon={DuplicateIcon}
            label="Duplicate"
            onClick={handleOpenDuplicateDialog}
          />
          <PDFDownloadLink
            document={<InvoicePDF invoice={invoice} />}
            fileName="invoice"
            style={{
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <ActionListItem
              icon={DownloadIcon}
              label="Download (PDF)"
            />
          </PDFDownloadLink>
          <ActionListItem
            icon={TrashIcon}
            label="Delete"
            onClick={handleOpenDeleteDialog}
          />
        </ActionList>
      </Card>
      <ConfirmationDialog
        message="Are you sure you want to mark this invoice as paid? This can't be undone."
        onCancel={handleCloseMarkDialog}
        onConfirm={handleMark}
        open={markDialogOpen}
        title="Mark Invoice as paid"
        variant="info"
      />
      <ConfirmationDialog
        message="Are you sure you want to duplicate this invoice? This can't be undone."
        onCancel={handleCloseDuplicateDialog}
        onConfirm={handleDuplicate}
        open={duplicateDialogOpen}
        title="Duplicate Invoice"
        variant="warning"
      />
      <ConfirmationDialog
        message="Are you sure you want to delete this invoice? This can't be undone."
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        open={deleteDialogOpen}
        title="Delete Invoice"
        variant="error"
      />
    </>
  );
};

InvoiceSendNotification.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};
