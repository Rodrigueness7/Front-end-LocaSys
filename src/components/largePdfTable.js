import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";

const paginateData = (data, itemsPerPage = 30) => {
  const pages = [];
  for (let i = 0; i < data.length; i += itemsPerPage) {
    pages.push(data.slice(i, i + itemsPerPage));
  }
  return pages;
};

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function LargePdfTable({ data, size = "A4", user, title, width = 150 }) {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 10,
    },
    section: {
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
    },
    title: {
      fontSize: 18,
      marginBottom: 12,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 3,
    },
    cellHeader: {
      width,
      fontSize: 10,
      fontWeight: 'bold',
      padding: 4,
      backgroundColor: '#f0f0f0',
      borderRightWidth: 1,
      borderRightColor: '#000',
      borderRightStyle: 'solid',
    },
    cellValue: {
      width,
      fontSize: 10,
      padding: 4,
      borderRightWidth: 1,
      borderRightColor: '#000',
      borderRightStyle: 'solid',
    },
    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    textDate: {
      fontSize: 9,
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
      marginTop: 10,
      fontSize: 10,
    },
  });

  const date = new Date();
  const paginatedData = paginateData(data, 7); 

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        {paginatedData.map((pageData, pageIndex) => (
          <Page key={pageIndex} size={size} style={styles.page}>
            <Text>Locasys</Text>
            <View style={styles.subHeader}>
              <Text style={styles.textDate}>Data: {date.toLocaleDateString('pt-BR')}</Text>
              <Text style={styles.textDate}>Usuário: {user}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>

            {pageData.map((item, index) => {
              const keys = Object.keys(item);
              const chunks = chunkArray(keys, 4); 

              return (
                <View key={index} style={styles.section}>
                  {chunks.map((chunk, chunkIndex) => (
                    <React.Fragment key={chunkIndex}>
                      <View style={styles.row}>
                        {chunk.map((key, i) => (
                          <Text key={`header-${i}`} style={styles.cellHeader}>
                            {key}
                          </Text>
                        ))}
                      </View>
                      <View style={styles.row}>
                        {chunk.map((key, i) => (
                          <Text key={`value-${i}`} style={styles.cellValue}>
                            {String(item[key])}
                          </Text>
                        ))}
                      </View>
                    </React.Fragment>
                  ))}
                </View>
              );
            })}

            <Text style={styles.total}>
              Página {pageIndex + 1} - Total acumulado: {pageIndex * 20 + pageData.length}
            </Text>
            <Text style={styles.footer} fixed render={({ pageNumber }) => `Página ${pageNumber}`} />
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
}
