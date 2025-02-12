package com.j9603h.urcalenbackend.domain.customcalendar.entity;

import com.j9603h.urcalenbackend.domain.customcalendar.dto.request.CustomCalendarUpdateRequestDto;
import com.j9603h.urcalenbackend.domain.user.entity.User;
import com.j9603h.urcalenbackend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustomCalendar extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String title;

    @Column(nullable = false)
    private String calendarData;

    private String imageData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Boolean isPublic;

    @Builder
    public CustomCalendar(String title, String calendarData, String imageData, User user, Boolean isPublic) {
        this.title = title;
        this.calendarData = calendarData;
        this.imageData = imageData;
        this.user = user;
        this.isPublic = isPublic;
    }

    public CustomCalendar update(CustomCalendarUpdateRequestDto requestDto) {
        this.title = title;
        this.calendarData = calendarData;
        this.imageData = imageData;
        this.isPublic = isPublic;

        return this;
    }
}
