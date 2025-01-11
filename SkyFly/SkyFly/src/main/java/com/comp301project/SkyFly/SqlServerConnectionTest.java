package com.comp301project.SkyFly;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SqlServerConnectionTest {
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://localhost:1433;databaseName=skyflydatabase;encrypt=true;trustServerCertificate=true";
        String username = "sa";
        String password = "12345";

        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            System.out.println("Bağlantı başarılı!");
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
