package com.j9603h.urcalenbackend.domain.user.service;

import com.j9603h.urcalenbackend.domain.customcalendar.dto.response.CustomCalendarListWithPageResponseDto;
import com.j9603h.urcalenbackend.domain.customcalendar.repository.CustomCalendarRepository;
import com.j9603h.urcalenbackend.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    private final CustomCalendarRepository customCalendarRepository;

    public CustomCalendarListWithPageResponseDto getMyCustomCalendars(User user, Pageable pageable) {
        return CustomCalendarListWithPageResponseDto.from(
                customCalendarRepository.findAllByUserId(user.getId(), pageable)
        );
    }
}
