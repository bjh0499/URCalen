package com.j9603h.urcalenbackend.domain.customcalendar.service;

import com.j9603h.urcalenbackend.domain.customcalendar.dto.request.CustomCalendarCreateRequestDto;
import com.j9603h.urcalenbackend.domain.customcalendar.dto.response.CustomCalendarResponseDto;
import com.j9603h.urcalenbackend.domain.customcalendar.repository.CustomCalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomCalendarService {
    private final CustomCalendarRepository customCalendarRepository;

    @Transactional
    public CustomCalendarResponseDto createCustomCalendar(CustomCalendarCreateRequestDto requestDto) {
        return CustomCalendarResponseDto.from(customCalendarRepository.save(requestDto.toEntity(null)));
    }
}
