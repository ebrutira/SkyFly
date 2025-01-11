package com.comp301project.SkyFly;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SqlServerConnectionTest {
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://localhost:1433;databaseName=skyflydatabase;encrypt=true;trustServerCertificate=true";
        String username = "sa";
        String password = "12345";

        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            System.out.println("Bağlantı başarılı!");

            // Flight tablosunu kontrol et
            checkTableExists(conn, "Flight");

            // Users tablosunu kontrol et
            checkTableExists(conn, "Users");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void checkTableExists(Connection conn, String tableName) {
        String query = "SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '" + tableName + "'";
        try (Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            if (rs.next()) {
                System.out.println(tableName + " tablosuna bağlantı başarılı!");
            } else {
                System.out.println(tableName + " tablosu bulunamadı!");
            }
        } catch (SQLException e) {
            System.out.println(tableName + " tablosuna bağlantı sırasında bir hata oluştu!");
            e.printStackTrace();
        }
    }
}
