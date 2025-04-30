'use client'

import React from "react"
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer"

export default function TablePDF({ data, title, wCellHeader, wCell, size, user }) {

    const styles = StyleSheet.create({
        page: {
            padding: 20,
            fontSize: 12,
            fontFamily: 'Helvetica',
        },
        
        table: {
            display: 'table',
            width: 'auto',
            top: '10px'
           
        },
        row: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#000',
        },
        
        cellHeader: {
            width: wCellHeader,
            padding: 5, 
            margin: 5
        },

        cell: {
            width: wCell,
            padding: 5,
            marginLeft: 5  
        },

        textHeader: {
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'left'  
        },

        textRow: {
            fontSize: '10px',
            textAlign: 'left',
            maxWidth: '100%',
        },

        textTitle: {
            fontSize: '20px',
            bottom: '10px',
            textAlign: 'center'
        },

        total: {
            fontSize: '10px',
            marginTop: 10,
            textAlign: 'left'
        }, 
        textDate: {
            fontSize: '10px',
            marginTop: 10,
            textAlign: 'left'
        },

        subHeader: {
          flexDirection: 'row',
            justifyContent: 'space-between',
        },
    })
   
    const header = Object.keys(data[0])
    const date = new Date()
    const total = data.length

    


    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page size={size} style={styles.page} >
                    <Text>Locasys</Text>
                    <View style={styles.subHeader}> 
                    <Text style={styles.textDate}>{`Data de Emissão: ${date.toLocaleDateString('pt-BR')}`}</Text>
                    <Text style={styles.textRow}>{`Usuário: ${user}`}</Text>
                    </View>
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
                                <Text style={styles.textRow}>{item[value]}</Text>
                            </View>
                        ))}
                       </View>
                    ))}
                    <Text style={styles.total}>{`Totalizador: ${total}`}</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}