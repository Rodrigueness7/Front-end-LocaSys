'use client'
import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";


const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function LargePdfTable({ data, size = "A4", user, title }) {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 10,
    },
    section: {
      marginBottom: 15,
      borderBottom: '1px solid #000',
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 4,

    },
    cellHeader: {
      width: '25%',
      fontWeight: 'bold',
      padding: 4,
      backgroundColor: '#f0f0f0',
      borderRight: '1px solid #000',
    },
    cellValue: {
      width: '25%',
      padding: 4,
      borderRight: '1px solid #000',

    },
    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    footer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 9,
      color: 'gray',
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
    }
  });

  const date = new Date()
  const total = data.length

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size={size} style={styles.page}>
          <Text>Locasys</Text>
          <View style={styles.subHeader}>
            <Text style={styles.textDate}>{`Data de Emissão: ${date.toLocaleDateString('pt-BR')}`}</Text>
            <Text style={styles.textRow}>{`Usuário: ${user}`}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          {data.map((item, index) => {
            const keys = Object.keys(item);
            const chunks = chunkArray(keys, 4);

            return (
              <View key={index} style={styles.section}>
                {chunks.map((chunk, chunkIndex) => (
                  <React.Fragment key={chunkIndex}>
                    <View style={styles.row}>
                      {chunk.map((key, i) => (
                        <Text key={`header-${i}`} style={styles.cellHeader}>{key}</Text>
                      ))}
                    </View>
                    <View style={styles.row}>
                      {chunk.map((key, i) => (
                        <Text key={`value-${i}`} style={styles.cellValue}>{item[key]}</Text>
                      ))}
                    </View>
                  </React.Fragment>
                ))}
              </View>
            );
          })}
          <Text style={styles.total}>{`Totalizador: ${total}`}</Text>
          <Text style={styles.footer} render={({ pageNumber }) => `Página ${pageNumber} `} fixed />
        </Page>
      </Document>
    </PDFViewer>
  );
}
