
/**
 * Utility functions for Google Sheets-like functionality
 */

export const cellToColumnLetter = (index: number): string => {
  // Convert 0-based index to Excel-style column letter (A, B, C, ... Z, AA, AB, etc.)
  let temp = '';
  let letter = '';
  
  while (index > 25) {
    temp = String.fromCharCode(65 + (index % 26)) + temp;
    index = Math.floor(index / 26) - 1;
  }
  
  letter = String.fromCharCode(65 + index) + temp;
  return letter;
};

export const formatCellReference = (row: number, col: number): string => {
  // Format as A1, B2, etc. (row is 1-based, col is 0-based)
  return `${cellToColumnLetter(col)}${row}`;
};

export const parseSheetData = (csvData: string): string[][] => {
  // Simple CSV parser
  return csvData
    .split('\n')
    .map(row => row.split(',').map(cell => cell.trim()));
};

export const getAIInsights = (data: any[]): string[] => {
  // This would normally be an actual AI analysis
  // For demo purposes, return static insights
  return [
    "Seasonal patterns detected in your sales data. Consider adjusting inventory for upcoming peak season.",
    "Products SHIRT-001 and BAG-022 show higher growth rates than other items.",
    "You may have overstocked SHOE-153 based on current sales velocity.",
    "Your lead times for category 'Accessories' are 30% longer than industry average."
  ];
};

export const simulateGoogleSheetsFunctionality = {
  // Methods that would interact with Google Sheets API
  getCurrentSheet: () => "Sales Data",
  getSelectedRange: () => "A1:H32",
  writeToSheet: (data: any[][], range: string) => console.log(`Writing data to ${range}`),
  createNewSheet: (name: string) => console.log(`Created new sheet: ${name}`),
  highlightCells: (range: string, color: string) => console.log(`Highlighted ${range} with ${color}`),
  
  // This would normally create a Google Sheets formula
  createForecastFormula: (range: string) => `=FORECAST.ETS(A1:A30)`,
};
