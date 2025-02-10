package com.j9603h.urcalenbackend.domain.customcalendar.dto.response;

import com.j9603h.urcalenbackend.domain.customcalendar.entity.CustomCalendar;
import com.j9603h.urcalenbackend.domain.user.dto.response.UserResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CustomCalendarResponseDto {
    private final Long id;
    private final String title;
    private final String calendarData;
    private final String imageData;
    private final UserResponseDto user;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static CustomCalendarResponseDto from(CustomCalendar entity) {
        return CustomCalendarResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .calendarData(entity.getCalendarData())
                .imageData(entity.getImageData())
                .user(UserResponseDto.from(entity.getUser()))
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
