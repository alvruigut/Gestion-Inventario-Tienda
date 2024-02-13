package com.example.GestionTienda.model;
import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code128Writer;

import java.io.FileOutputStream;
import java.io.OutputStream;

public class BarcodeGenerator {
    public static void generateBarcodeImage(String barcodeText, String filePath) throws Exception {
        Code128Writer barcodeWriter = new Code128Writer();
        BitMatrix bitMatrix = barcodeWriter.encode(barcodeText, BarcodeFormat.CODE_128, 300, 150);

        try (OutputStream outputStream = new FileOutputStream(filePath)) {
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
        }
    }
}