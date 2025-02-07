package com.j9603h.urcalenbackend.domain.user.dto.request;

import com.j9603h.urcalenbackend.domain.user.entity.Role;
import com.j9603h.urcalenbackend.domain.user.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    @NotBlank(message = "계정명이 입력되지 않았습니다.")
    @Length(min = 4, max = 20, message = "계정명은 4자 이상, 20자 이하여야 합니다.")
    private String username;

    @NotBlank(message = "비밀번호가 입력되지 않았습니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수 문자가 각각 1자 이상 포함되어야 합니다.")
    private String password;

    @NotBlank(message = "이메일이 입력되지 않았습니다.")
    @Email(message = "올바르지 않은 이메일 형식입니다.")
    private String email;

    @NotBlank(message = "닉네임이 입력되지 않았습니다.")
    @Length(min = 4, max = 20, message = "닉네임은 4자 이상, 20자 이하여야 합니다.")
    private String nickname;

    public User toEntity(String encodedPassword) {
        return User.builder()
                .username(this.getUsername())
                .password(encodedPassword)
                .email(this.getEmail())
                .nickname(this.getNickname())
                .role(Role.ROLE_USER)
                .build();
    }
}
