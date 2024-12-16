// pdfGenerator.ts
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { Population } from '@/lib/typedef/population-typedef'

// Extend the jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export function generatePDF(data: Population[], visibleColumns: string[]) {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(18)
  doc.text('Establishment Data Report', 14, 22)

  // Add date
  doc.setFontSize(11)
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30)

  // Prepare table headers and columns
  const tableHeaders = visibleColumns
    .filter((col) => col !== 'id' && col !== 'select' && col !== 'actions')
    .map((col) => (col === 'bld_no' ? 'Bldg No:' : col.charAt(0).toUpperCase() + col.slice(1)))

  const tableColumns = visibleColumns
    .filter((col) => col !== 'id' && col !== 'select' && col !== 'actions')

  // Prepare table rows
  const tableRows = data.map((row) => {
    return tableColumns.map((col) => {
      if (col === 'bld_no') {
        return `${row.bld_no}` // Format building number if needed
      }
      return row[col as keyof Population]
    })
  })

  // Add table to PDF
  doc.autoTable({
    head: [tableHeaders],
    body: tableRows,
    startY: 40,
  })

  // Open PDF in new tab
  window.open(URL.createObjectURL(doc.output('blob')), '_blank')
}
