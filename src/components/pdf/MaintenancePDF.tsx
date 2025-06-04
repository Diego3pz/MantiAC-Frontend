import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

function formatDate(dateStr?: string) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return d.toISOString().substring(0, 10);
}

interface MaintenancePDFProps {
  maintenance: {
    type?: string;
    date?: string;
    completed?: boolean;
    technician?: string;
    supervisedBy?: string;
    cost?: number;
    createdAt?: string;
    updatedAt?: string;
    description?: string;
  };
  equipment: {
    brand?: string;
    serialNumber?: string;
    location?: string;
  };
  technician?: {
    name?: string;
  };
}

export function MaintenancePDF({ maintenance, equipment, technician }: MaintenancePDFProps) {
  const MAX_DESC = 400;
  const desc = (maintenance?.description || "No aplica")
    .split('\n').slice(0, 10).join('\n'); // máximo 10 saltos de línea
  const descTrunc = desc.length > MAX_DESC ? desc.slice(0, MAX_DESC) + "..." : desc;

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.company}>MantiAC</Text>
            <Text style={styles.reportTitle}>Reporte de Mantenimiento</Text>
            <Text style={styles.reportDate}>Fecha de generación: {formatDate(new Date().toISOString())}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Mantenimiento</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tipo:</Text>
            <Text style={styles.value}>{maintenance?.type || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{formatDate(maintenance?.date)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{maintenance?.completed ? "Completado" : "Pendiente"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Técnico:</Text>
            <Text style={styles.value}>
              {technician?.name || technician?.name || "No disponible"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Supervisor:</Text>
            <Text style={styles.value}>{maintenance?.supervisedBy || "No disponible"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Costo:</Text>
            <Text style={styles.value}>{maintenance?.cost ? `$${maintenance.cost}` : "No aplica"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Creado:</Text>
            <Text style={styles.value}>{formatDate(maintenance?.createdAt)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Actualizado:</Text>
            <Text style={styles.value}>{formatDate(maintenance?.updatedAt)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.value}>{descTrunc}</Text>
          </View>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Equipo</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Marca:</Text>
            <Text style={styles.value}>{equipment?.brand || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>N.º Serie:</Text>
            <Text style={styles.value}>{equipment?.serialNumber || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ubicación:</Text>
            <Text style={styles.value}>{equipment?.location || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observaciones / Consideraciones</Text>
          <View style={styles.textArea}>
            <Text style={styles.textAreaLine}>{" ".repeat(90)}</Text>
            <Text style={styles.textAreaLine}>{" ".repeat(90)}</Text>
            <Text style={styles.textAreaLine}>{" ".repeat(90)}</Text>
            <Text style={styles.textAreaLine}>{" ".repeat(90)}</Text>
            <Text style={styles.textAreaLine}>{" ".repeat(90)}</Text>
          </View>
        </View>


        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Firma del Técnico</Text>
            <View style={styles.signatureLine} />
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Firma del Supervisor</Text>
            <View style={styles.signatureLine} />
          </View>
        </View>

        <Text style={styles.footer}>Generado por MantiAC - {formatDate(new Date().toISOString())}</Text>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 24,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  logo: { width: 50, height: 50, marginBottom: 6 },
  company: { fontSize: 14, fontWeight: 'bold', color: '#1a237e' },
  reportTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 2, color: '#000' },
  reportDate: { fontSize: 10, color: '#666', marginTop: 4 },

  section: {
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0d47a1',
    textDecoration: 'underline',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
    flexWrap: 'wrap',
  },
  label: {
    width: 110,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#111',
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 4,
    minHeight: 70,
    padding: 8,
    marginTop: 6,
    backgroundColor: '#fafafa',
  },
  textAreaLine: {
    minHeight: 14,
    fontSize: 12,
    color: '#333',
  },

  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
  signatureBox: {
    width: '40%',
    alignItems: 'center',
  },
  signatureLabel: {
    fontSize: 11,
    color: '#333',
    marginBottom: 24,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    marginTop: 24,
  },

  footer: {
    marginTop: 18,
    fontSize: 9,
    color: 'gray',
    textAlign: 'center',
  },
});

