package com.j9603h.urcalenbackend.domain.customcalendar.controller;

import com.j9603h.urcalenbackend.domain.customcalendar.dto.request.CustomCalendarCreateRequestDto;
import com.j9603h.urcalenbackend.domain.customcalendar.dto.response.CustomCalendarListWithPageResponseDto;
import com.j9603h.urcalenbackend.domain.customcalendar.dto.response.CustomCalendarResponseDto;
import com.j9603h.urcalenbackend.domain.customcalendar.service.CustomCalendarService;
import com.j9603h.urcalenbackend.domain.user.entity.User;
import com.j9603h.urcalenbackend.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customcalendars")
@RequiredArgsConstructor
public class CustomCalendarController {
    private final CustomCalendarService customCalendarService;

    @PostMapping
    public ResponseEntity<ApiResponse<CustomCalendarResponseDto>> createCustomCalendar(
            @Valid @RequestBody CustomCalendarCreateRequestDto requestDto,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(
                    "달력이 저장되었습니다.",
                    "CREATED",
                    customCalendarService.createCustomCalendar(requestDto, user)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<CustomCalendarListWithPageResponseDto>> getCustomCalendars(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok(customCalendarService.getCustomCalendars(pageable)));
    }
}
