package com.j9603h.urcalenbackend.domain.customcalendar.repository;

import com.j9603h.urcalenbackend.domain.customcalendar.entity.CustomCalendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomCalendarRepository extends JpaRepository<CustomCalendar, Long> {
}
