package com.j9603h.urcalenbackend.domain.user.dto.response;

import com.j9603h.urcalenbackend.domain.user.entity.Role;
import com.j9603h.urcalenbackend.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private String username;
    private String email;
    private String nickname;
    private Role role;

    public static UserResponseDto from(User entity) {
        return UserResponseDto.builder()
                .username(entity.getUsername())
                .email(entity.getEmail())
                .nickname(entity.getNickname())
                .role(entity.getRole())
                .build();
    }
}
