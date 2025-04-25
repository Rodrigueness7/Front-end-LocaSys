'use client'

import React from "react"
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer"

export default function TablePDF({ data, title }) {

    const styles = StyleSheet.create({
        page: {
            padding: 20,
        },
        
        table: {
            display: 'table',
            width: '100%',
            top: '10px'
           
        },
        row: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#000',
        },
        cellHeader: {
            width: '25%',
            padding: 5
           
        },
        cell: {
            width: '25%',
            padding: 5,
        },
        textHeader: {
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'left',
        },
        text: {
            fontSize: '10px',
            textAlign: 'left',
        },
        textTitle: {
            top: '5px',
            textAlign: 'center'
        }


    })
   
    const header = Object.keys(data[0])

    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page size={'A4'} style={styles.page} >
                    <Text  style={styles.textTitle}>{title}</Text>
                    <View style={styles.table}>
                        <View style={styles.row}>
                        {header.map((item, index) => (
                        <View key={index} style={styles.cellHeader}>
                            <Text style={styles.textHeader}>{item}</Text>
                        </View>
                    ))}
                    </View>
                    {data.map((item, index) => (
                       <View key={index} style={styles.row}>
                         {header.map((value, index) => (
                            <View key={index} style={styles.cell}>
                                <Text style={styles.text}>{item[value]}</Text>
                            </View>
                        ))}
                       </View>

                    ))}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}