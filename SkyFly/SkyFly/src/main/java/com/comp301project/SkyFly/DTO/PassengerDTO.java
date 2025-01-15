package com.comp301project.SkyFly.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PassengerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String birthDate;
    private String identityNumber;
    private String seatNumber;
}