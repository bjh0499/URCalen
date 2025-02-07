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
public class SignupResponseDto {
    private String username;
    private String email;
    private String nickname;
    private Role role;

    public static SignupResponseDto from(User entity){
        return SignupResponseDto.builder()
                .username(entity.getUsername())
                .email(entity.getEmail())
                .nickname(entity.getNickname())
                .role(entity.getRole())
                .build();
    }
}
