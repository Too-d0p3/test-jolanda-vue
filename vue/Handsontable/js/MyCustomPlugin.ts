// import HyperFormula, { FunctionPlugin, FunctionArgumentType, ErrorType, CellError } from "hyperformula";
//
// export class MyCustomPlugin extends FunctionPlugin {
//     static implementedFunctions = {
//         ROW: {
//             method: "getRow",
//             parameters: [{ argumentType: FunctionArgumentType.STRING }],
//         },
//     };
//
//     static translations = {
//         enGB: {
//             ROW: "ROW",
//         },
//     };
//
//     getRow(ast, state) {
//         return this.runFunction(ast.args, state, this.metadata("ROW"), (col: any) => {
//             console.log(col);
//             console.log(this, ast.args, state, this.metadata("ROW"));
//             let row = state.formulaAddress.row;
//             let searchCol = col + row;
//
//             // Vytvoření instance HyperFormula
//             const hf = HyperFormula.buildEmpty();
//             // Získání ID listu, na kterém se právě nacházíme
//             const sheetId = hf.getSheetId(state.formulaAddress.sheet);
//             // Získání adresy buňky
//             const cellAddress = { sheet: sheetId, col: searchCol, row: row };
//             // Získání hodnoty buňky
//             const cellValue = hf.getCellValue(cellAddress);
//
//             return cellValue;
//
//             // return state?.formulaAddress?.row ?? new CellError(ErrorType.VALUE);
//         });
//     }
// }
