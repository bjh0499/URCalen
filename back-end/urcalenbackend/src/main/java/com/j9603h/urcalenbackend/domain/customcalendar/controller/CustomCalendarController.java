package com.j9603h.urcalenbackend.domain.customcalendar.controller;

import com.j9603h.urcalenbackend.domain.customcalendar.dto.request.CustomCalendarCreateRequestDto;
import com.j9603h.urcalenbackend.domain.customcalendar.dto.response.CustomCalendarResponseDto;
import com.j9603h.urcalenbackend.domain.customcalendar.service.CustomCalendarService;
import com.j9603h.urcalenbackend.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customcalendars")
@RequiredArgsConstructor
public class CustomCalendarController {
    private final CustomCalendarService customCalendarService;

    @PostMapping
    public ResponseEntity<ApiResponse<CustomCalendarResponseDto>> createCustomCalendar(@Valid @RequestBody CustomCalendarCreateRequestDto requestDto) {
        return ResponseEntity.ok(ApiResponse.ok(customCalendarService.createCustomCalendar(requestDto)));
    }
}
