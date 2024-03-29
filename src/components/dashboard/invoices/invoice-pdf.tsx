import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { Invoice } from '../../../types/invoice';

interface InvoicePDFProps {
  invoice: Invoice;
}


const COL1_WIDTH = 20;
const COLN_WIDTH = (100 - COL1_WIDTH) / 5;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 24
  },
  h4: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.5
  },
  subtitle2: {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 1.57
  },
  body2: {
    fontSize: 10,
    lineHeight: 1.47
  },
  h6: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.6
  },
  gutterBottom: {
    marginBottom: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  status: {
    textTransform: 'uppercase',
    color: 'rgba(236, 76, 71, 1)'
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 36,
    marginTop: 48
  },
  notes: {
    marginTop: 32
  },
  table: {
    display: 'flex',
    width: 'auto',
    border: '1px solid #e1e3ea',
    borderRadius: 6
  },
  tableHeader: {
    backgroundColor: 'rgba(243, 244, 247, 1)'
  },
  tableBody: {},
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    borderStyle: 'solid',
    flexDirection: 'row'
  },
  tableCell1: {
    padding: 6,
    width: `${COL1_WIDTH}%`,
    justifyContent: 'center'
  },
  tableCellN: {
    padding: 6,
    width: `${COLN_WIDTH}%`,
    justifyContent: 'center'

  }
});

export const InvoicePDF: FC<InvoicePDFProps> = (props) => {
  const { invoice } = props;

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.h4}>
              #
              {invoice.id}
            </Text>
          </View>
          <View>
            <Text style={[styles.h4, styles.status]}>
              {invoice.status}
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Invoice to
            </Text>
            <Text style={styles.body2}>
              Acme LTD GB54423345
            </Text>
            <Text style={styles.body2}>
              340 Lemon St. #5554
            </Text>
            <Text style={styles.body2}>
              Spring Valley, California
            </Text>
            <Text style={styles.body2}>
              United States
            </Text>
          </View>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Invoice for
            </Text>
            <Text style={styles.body2}>
              Natalie Rusell
            </Text>
            <Text style={styles.body2}>
              3845 Salty Street
            </Text>
            <Text style={styles.body2}>
              Salt Lake City
            </Text>
            <Text style={styles.body2}>
              United States
            </Text>
          </View>
        </View>
        <View style={styles.dates}>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Invoice Date
            </Text>
            <Text style={styles.body2}>
              {format(invoice.dueDate, 'dd MMM yyyy')}
            </Text>
          </View>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Due Date
            </Text>
            <Text style={styles.body2}>
              {format(invoice.issueDate, 'dd MMM yyyy')}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={[styles.h6, styles.tableCellN]}>
                  <Text>
                    QTY
                  </Text>
                </View>
                <View style={[styles.h6, styles.tableCellN]}>
                  <Text>
                    SKU
                  </Text>
                </View>
                <View style={[styles.h6, styles.tableCellN]}>
                  <Text>
                    UPC
                  </Text>
                </View>
                <View style={[styles.h6, styles.tableCell1]}>
                  <Text>
                    DESCRIPTION
                  </Text>
                </View>
                <View style={[styles.h6, styles.tableCellN]}>
                  <Text>
                    COST
                  </Text>
                </View>
                <View style={[styles.h6, styles.tableCellN]}>
                  <Text>
                    TOTAL
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableBody}>
              {invoice.lineItems.map((item, key) => (
                <View
                  style={styles.tableRow}
                  key={key}
                >
                  <View style={styles.tableCellN}>
                    <Text style={styles.body2}>
                      {item?.quantity}
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={styles.body2}>
                      {item?.sku}
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={styles.body2}>
                      {item?.upc}
                    </Text>
                  </View>
                  <View style={styles.tableCell1}>
                    <Text style={styles.body2}>
                      {item?.name}
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={styles.body2}>
                      {numeral(item?.unitAmount).format(`${item?.currencySymbol}0,0.00`)}
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={styles.body2}>
                      {numeral(item?.totalAmount).format(`${item?.currencySymbol}0,0.00`)}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.tableRow}>
                <View style={styles.tableCellN} />
                <View style={styles.tableCellN} />
                <View style={styles.tableCellN} />
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN} />
                <View style={styles.tableCellN}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.body2, { marginRight: 8 }]}>
                      Tax
                    </Text>
                    <Text style={styles.body2}>
                      {numeral(invoice?.taxAmount).format(`${invoice?.currencySymbol}0,0.00`)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellN} />
                <View style={styles.tableCellN} />
                <View style={styles.tableCellN} />
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN} />
                <View style={styles.tableCellN}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.body2, { marginRight: 8 }]}>
                      Total
                    </Text>
                    <Text style={styles.subtitle2}>
                      {numeral(invoice?.totalAmount).format(`${invoice?.currencySymbol}0,0.00`)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.notes}>
          <Text style={[styles.subtitle2, styles.gutterBottom]}>
            Notes
          </Text>
          <Text style={styles.body2}>
            {invoice.note}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

InvoicePDF.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};
