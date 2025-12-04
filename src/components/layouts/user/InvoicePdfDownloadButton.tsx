"use client";

import { getSingleOrder } from "@/api/OrderAPI";
import { useAuth } from "@/hooks/useAuth";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { useQuery } from "@tanstack/react-query";

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#333333',
    padding: 40,
    color: '#F5D57A'
  }
})

type AddressProps = {
  addressLine1: string
  city: string
  country: string
  landmark: string
  name: string
  phone: string
  postalCode: string
  state: string
}

type FromProps = {
  addressLine1: string
  city: string
  country: string
  email: string
  gstin: string
  name: string
  phone: string
  postalCode: string
  state: string
}

type TotalsProps = {
  amountDue: number
  currency:  string
  discount: number
  shipping: number
  subtotal: number
  total: number
}

type Items = {
  amount: number
  description: string
  price: number
  quantity: number
}

type InvoiceProps = {
  billedTo: AddressProps
  invoiceId: string
  invoiceDate: string
  from: FromProps
  totals: TotalsProps
  items: Items[]
}

const InvoicePDF = ({ data }: {data: InvoiceProps}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 3 }}>Invoice</Text>
        <Text style={{ fontSize: 12, marginTop: 18, marginBottom: 18 }}>#{data?.invoiceId}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
        <Text style={{ fontSize: 14, marginRight: 15, marginBottom: 6 }}>Invoice Date</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 6 }}>{new Date(data?.invoiceDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}
      </Text>
      </View>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center',  marginBottom: 3 }}>
        <Text style={{ fontSize: 14, marginRight: 15, marginBottom: 6 }}>Invoice Date</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 6 }}>6 March, 2023</Text>
      </View> */}
      <View style={{ width: '100%', height: 1, backgroundColor: '#4f4f4e', marginTop: 8, marginBottom: 30 }}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ fontSize: 14, marginRight: 40 }}>
          <Text style={{ marginBottom: 12 }}>Billed To</Text>
          <Text style={{ marginBottom: 8 }}>{data?.billedTo?.name}</Text>
          <Text style={{ marginBottom: 8, flexWrap: "wrap" }}>{data?.billedTo?.addressLine1} {data?.billedTo?.landmark}, {data?.billedTo?.city}, {data?.billedTo?.state}</Text>
          <Text style={{ marginBottom: 8 }}>{data?.billedTo?.phone}</Text>
        </View>
        <View style={{ fontSize: 12, marginRight: 10 }}>
          <Text style={{ marginBottom: 12  }}>From</Text>
          <Text style={{ marginBottom: 8 }}>SUGIMX Private Limited</Text>
          <Text style={{ marginBottom: 8 }}>www.tvkcup2026.com</Text>
          <Text style={{ marginBottom: 8 }}>support@sugimx.com</Text>
        </View>
      </View>
      <View style={{ marginTop: 40, marginBottom: 8 }}>
          <Text style={{ fontSize: 12 }}>This is an invoice sample. This message is set as default. You can always change it to whatever you like. Feel free.</Text>
      </View>
      <View style={{ marginTop: 35 }}>
          <View style={{ flexDirection: 'row', fontSize: 12, justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ marginRight: 10, width: '30%', fontSize: 14 }}>Description</Text>
              <Text style={{ marginRight: 10, width: '20%', textAlign: 'center', fontSize: 14 }}>Quantity</Text>
              <Text style={{ marginRight: 10, width: '20%', textAlign: 'center', fontSize: 14 }}>Price</Text>
              <Text style={{ marginRight: 10, width: '20%', textAlign: 'center', fontSize: 14 }}>Total Amount</Text>
          </View>
          <View style={{ width: '100%', height: 1, backgroundColor: '#4f4f4e', marginTop: 8, marginBottom: 8  }}></View>
          <View style={{ flexDirection: 'row', fontSize: 12, justifyContent: 'space-between' }}>
              <Text style={{ marginRight: 10, width: '30%', fontSize: 12  }}>Official TVK 2026 Cup Limited Edition</Text>
              <Text style={{ marginRight: 10, width: '20%', textAlign: 'center', fontSize: 12 }}>{data?.items[0]?.quantity}</Text>
              <Text style={{ marginRight: 10, width: '20%', textAlign: 'center', fontSize: 12 }}>{data?.items[0]?.price}</Text>
              <Text style={{ marginRight: 10, width: '20%', textAlign: 'center', fontSize: 12 }}>{data?.totals?.total}</Text>
          </View>
          <View style={{ width: '100%', height: 1, backgroundColor: '#4f4f4e', marginTop: 8, marginBottom: 8 }}></View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, fontSize: 12 }}>
          <View>
            <Text style={{ marginRight: 45, marginBottom: 15 }}>Unit Price</Text>
            <Text style={{ marginRight: 45, marginBottom: 15 }}>(5%) GST</Text>
            <Text style={{ marginRight: 45, marginBottom: 15 }}>Donation</Text>
            <Text style={{ marginRight: 45, marginBottom: 15 }}>Delivery</Text>
            <Text style={{ marginRight: 45, marginBottom: 15 }}>Total</Text>
          </View>
          <View>
              <Text style={{ marginRight: 45, marginBottom: 15 }}>304.00</Text>
              <Text style={{ marginRight: 45, marginBottom: 15 }}>15.20</Text>
              <Text style={{ marginRight: 45, marginBottom: 15 }}>0.80</Text>
              <Text style={{ marginRight: 45, marginBottom: 15 }}>{data?.billedTo?.state === 'others' ? 'Pay To Delivery' : 'Free'}</Text>
              <Text style={{ marginRight: 45, marginBottom: 15 }}>320</Text>
          </View>
      </View>
      <View>
        <Text style={{ fontSize: 12, marginTop: 30, marginBottom: 40 }}>This is a footer sample. You can add a special message to your user to thank them.</Text>
      </View>
      <View style={{ width: '100%', height: 1, backgroundColor: '#4f4f4e', marginTop: 25, marginBottom: 10 }}></View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 12 }}>#{data?.invoiceId} ·
          {new Date(data?.invoiceDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </Text>
        <Text style={{ fontSize: 12 }}>Page 1 of 1</Text>
      </View>
    </Page>
  </Document>
);

export default function InvoicePdfDownloadButton({ orderId }: { orderId: string }) {

  const { token } = useAuth()

  const { isSuccess, data, isPending } = useQuery({
    queryKey: ['summary', orderId],
    queryFn: () => getSingleOrder({ token: token!, orderId }),
    enabled: !!token && !!orderId
  })

  if(isPending) {
    return (
      <div className="flex justify-center items-center">
          <span className="button-loader"></span>
      </div>
    )
  }

  return (
    <>
    {isSuccess ? (
      <PDFDownloadLink
        document={<InvoicePDF data={data?.data} />}
        fileName="invoice.pdf"
      >
        {({ loading }) => (
          <button className="border-1 border-[#F5BB0B] px-7 py-2 text-xs text-[#F5BB0B] uppercase mb-2 cursor-pointer">
              {loading ? "loading..." : "Recipt Download"}
          </button>
        )}
      </PDFDownloadLink>
    ) : (
      <div></div>
    )}

    </>
  );
}