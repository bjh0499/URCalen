package com.j9603h.urcalenbackend.domain.user.controller;

import com.j9603h.urcalenbackend.domain.customcalendar.dto.response.CustomCalendarListWithPageResponseDto;
import com.j9603h.urcalenbackend.domain.user.entity.User;
import com.j9603h.urcalenbackend.domain.user.service.UserService;
import com.j9603h.urcalenbackend.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/my/customcalendars")
    public ResponseEntity<ApiResponse<CustomCalendarListWithPageResponseDto>> getMyCustomCalendars(
            @AuthenticationPrincipal User user,
            Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
              userService.getMyCustomCalendars(user, pageable)
        ));
    }
}
