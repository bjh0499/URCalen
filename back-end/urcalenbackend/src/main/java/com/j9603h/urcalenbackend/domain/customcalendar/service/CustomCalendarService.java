package com.j9603h.urcalenbackend.domain.customcalendar.service;

import com.j9603h.urcalenbackend.domain.customcalendar.dto.request.CustomCalendarCreateRequestDto;
import com.j9603h.urcalenbackend.domain.customcalendar.dto.response.CustomCalendarListWithPageResponseDto;
import com.j9603h.urcalenbackend.domain.customcalendar.dto.response.CustomCalendarResponseDto;
import com.j9603h.urcalenbackend.domain.customcalendar.repository.CustomCalendarRepository;
import com.j9603h.urcalenbackend.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomCalendarService {
    private final CustomCalendarRepository customCalendarRepository;

    @Transactional
    public CustomCalendarResponseDto createCustomCalendar(CustomCalendarCreateRequestDto requestDto, User user) {
        return CustomCalendarResponseDto.from(customCalendarRepository.save(requestDto.toEntity(user)));
    }

    public CustomCalendarListWithPageResponseDto getCustomCalendars(Pageable pageable) {
        return CustomCalendarListWithPageResponseDto.from(customCalendarRepository.findAll(pageable));
    }
}
