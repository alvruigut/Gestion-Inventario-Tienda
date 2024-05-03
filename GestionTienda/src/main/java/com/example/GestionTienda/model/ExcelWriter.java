package com.example.GestionTienda.model;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelWriter {

    public static void writeDataToExcel(List<Producto> productos, String filePath) {
        Workbook workbook = new XSSFWorkbook();
        Sheet productSheet = workbook.createSheet("Productos");
        fillProductSheet(productSheet, productos);

        try (FileOutputStream outputStream = new FileOutputStream(filePath)) {
            workbook.write(outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void fillProductSheet(Sheet sheet, List<Producto> productos) {
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Nombre");
        headerRow.createCell(1).setCellValue("Precio");
        headerRow.createCell(2).setCellValue("Descripción");
        headerRow.createCell(3).setCellValue("Imagen");
        headerRow.createCell(4).setCellValue("Disponible");
        headerRow.createCell(5).setCellValue("PVP");
        headerRow.createCell(6).setCellValue("Cantidad Disponible");
        headerRow.createCell(7).setCellValue("Categoría");

        for (int i = 0; i < productos.size(); i++) {
            Producto producto = productos.get(i);
            Row row = sheet.createRow(i + 1);
            row.createCell(0).setCellValue(producto.getNombre());
            row.createCell(1).setCellValue(producto.getPrecio());
            row.createCell(2).setCellValue(producto.getDescripcion());
            row.createCell(3).setCellValue(producto.getImagen());
            row.createCell(4).setCellValue(producto.isDisponible() ? "Sí" : "No");
            row.createCell(5).setCellValue(producto.getPvp());
            row.createCell(6).setCellValue(producto.getCantidadDisponible());
            row.createCell(7).setCellValue(producto.getCategoria().getNombre());
        }
    }
}
