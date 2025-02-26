package com.j9603h.urcalenbackend.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginRequestDto {
    @NotBlank(message = "아이디가 입력되지 않았습니다.")
    private String username;

    @NotBlank(message = "비밀번호가 입력되지 않았습니다.")
    private String password;
}
