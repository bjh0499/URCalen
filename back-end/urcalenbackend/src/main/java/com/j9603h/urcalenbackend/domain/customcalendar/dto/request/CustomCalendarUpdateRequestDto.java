package com.j9603h.urcalenbackend.domain.customcalendar.dto.request;

import lombok.Getter;

@Getter
public class CustomCalendarUpdateRequestDto {
    private String title;
    private String calendarData;
    private String imageData;
    private Boolean isPublic;
}
