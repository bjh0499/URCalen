package com.j9603h.urcalenbackend.domain.customcalendar.repository;

import com.j9603h.urcalenbackend.domain.customcalendar.entity.CustomCalendar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomCalendarRepository extends JpaRepository<CustomCalendar, Long> {
    @Query("SELECT cc FROM CustomCalendar cc " +
            "LEFT JOIN FETCH cc.user " +
            "WHERE cc.user.id = :userId")
    Page<CustomCalendar> findAllByUserId(Long userId, Pageable pageable);
}
