const path = require('path');
const os = require('os');
const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    if (!worksheet) {
        throw new Error(`Worksheet "Sheet1" was not found in ${filePath}`);
    }

    const output = readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = { row: rowNumber, column: colNumber };
            }
        });
    });
    return output;
}

test('Upload download excel validation - edit and upload', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = 350;
    const filePath = path.join(os.homedir(), 'Downloads', 'download.xlsx');

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download' }).click()
    ]);

    await download.saveAs(filePath);
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
    await page.locator('#fileinput').setInputFiles(filePath);

    await expect(page.locator('#fileinput')).toBeVisible();
});
