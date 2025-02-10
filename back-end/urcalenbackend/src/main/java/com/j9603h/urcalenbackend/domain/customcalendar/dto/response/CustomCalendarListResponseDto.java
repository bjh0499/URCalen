package com.j9603h.urcalenbackend.domain.customcalendar.dto.response;

import com.j9603h.urcalenbackend.domain.customcalendar.entity.CustomCalendar;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
public class CustomCalendarListResponseDto {
    private final List<CustomCalendarResponseDto> customCalendars;

    public static CustomCalendarListResponseDto from(Page<CustomCalendar> customCalendars) {
        return CustomCalendarListResponseDto.builder()
                .customCalendars(customCalendars.getContent().stream()
                        .map(CustomCalendarResponseDto::from)
                        .toList())
                .build();
    }
}
