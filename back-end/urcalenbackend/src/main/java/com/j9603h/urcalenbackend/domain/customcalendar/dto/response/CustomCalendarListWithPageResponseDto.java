package com.j9603h.urcalenbackend.domain.customcalendar.dto.response;

import com.j9603h.urcalenbackend.domain.customcalendar.entity.CustomCalendar;
import com.j9603h.urcalenbackend.domain.user.dto.response.UserResponseDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class CustomCalendarListWithPageResponseDto {
    private final List<CustomCalendarListResponseDto> customCalendars;
    private final Long totalPages;
    private final Boolean hasNext;
    private final Boolean hasPrevious;

    public static CustomCalendarListWithPageResponseDto from(Page<CustomCalendar> customCalendars) {
        return CustomCalendarListWithPageResponseDto.builder()
                .customCalendars(customCalendars.getContent().stream()
                        .map(CustomCalendarListResponseDto::from)
                        .toList())
                .totalPages((long) customCalendars.getTotalPages())
                .hasNext(customCalendars.hasNext())
                .hasPrevious(customCalendars.hasPrevious())
                .build();
    }

    @Getter
    @Builder
    static class CustomCalendarListResponseDto {
        private final Long id;
        private final String title;
        private final UserResponseDto user;
        private final LocalDateTime createdAt;
        private final LocalDateTime updatedAt;

        public static CustomCalendarListResponseDto from(CustomCalendar entity) {
            return CustomCalendarListResponseDto.builder()
                    .id(entity.getId())
                    .title(entity.getTitle())
                    .user(UserResponseDto.from(entity.getUser()))
                    .createdAt(entity.getCreatedAt())
                    .updatedAt(entity.getUpdatedAt())
                    .build();
        }
    }
}
