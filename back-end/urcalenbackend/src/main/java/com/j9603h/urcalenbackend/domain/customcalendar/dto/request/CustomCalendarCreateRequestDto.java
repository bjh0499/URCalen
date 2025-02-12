package com.j9603h.urcalenbackend.domain.customcalendar.dto.request;

import com.j9603h.urcalenbackend.domain.customcalendar.entity.CustomCalendar;
import com.j9603h.urcalenbackend.domain.user.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomCalendarCreateRequestDto {
    @NotBlank(message = "제목이 입력되지 않았습니다.")
    @Length(max = 20)
    private String title;

    @NotBlank(message = "달력 정보가 비어 있습니다.")
    private String calendarData;

    private String imageData;

    @NotNull(message = "공개 허가 여부가 비어 있습니다.")
    private Boolean isPublic;

    public CustomCalendar toEntity(User user) {
        return CustomCalendar.builder()
                .title(this.title)
                .calendarData(this.calendarData)
                .imageData(this.imageData)
                .user(user)
                .isPublic(this.isPublic)
                .build();
    }
}
